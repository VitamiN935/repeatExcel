import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`Root component not defined!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach(type => {
      const method = getMethodName(type);
      if (!this[method]) {
        throw new Error(`
        Method: ${method} has not defined component: ${this.name}`)
      } else {
        this[method] = this[method].bind(this);
        this.$root.on(type, this[method]);
      }
    })
  }

  removeDomListeners() {
    this.listeners.forEach(type => {
      const method = getMethodName(type);
      this.$root.off(type, this[method]);
    })
  }

  addListener(type) {
    const method = getMethodName(type);
    if (!this[method]) {
      throw new Error(`
        Method: ${method} has not defined component: ${this.name}`)
    } else {
      this[method] = this[method].bind(this);
      this.$root.on(type, this[method]);
    }
  }

  removeListener(type) {
    const method = getMethodName(type);
    this.$root.off(type, this[method]);
  }
}


function getMethodName(typeEvent) {
  return 'on' + capitalize(typeEvent);
}
