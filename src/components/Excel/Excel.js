import {$} from '@core/dom'

export class Excel {
  constructor(selector, {components}) {
    this.$el = $(selector);
    this.components = components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components = this.components.map(Component => {
      const $container = $.create('section', Component.className);
      const component = new Component($container);
      if (component.name) {
        window['c' + component.name] = component;
      }
      $container.html(component.toHTML())
      $root.append($container);
      return component;
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}
