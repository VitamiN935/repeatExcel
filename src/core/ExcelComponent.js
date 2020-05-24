import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.store = options.store;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  storeChanged() {}

  init() {
    this.initDomListeners();
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback)
    this.unsubscribers.push(unsub);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }

  toHTML() {
    return ''
  }
}
