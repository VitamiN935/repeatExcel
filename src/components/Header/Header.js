import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from '@/components/Header/header.template';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()))
  }
}
