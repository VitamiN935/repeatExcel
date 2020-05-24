import {$} from '@core/dom'
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
    this.emitter = new Emitter();
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };
    this.components = this.components.map(Component => {
      const $container = $.create('section', Component.className);
      const component = new Component($container, componentOptions);
      $container.html(component.toHTML())
      $root.append($container);
      return component;
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(component => component.destroy());
  }
}
