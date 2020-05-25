import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';
import {resizeHandler} from '@/components/Table/table.resize';
// eslint-disable-next-line max-len
import {isCelling, matrix, moveButtons, nextSelector, shouldResize} from '@/components/Table/table.functions';
import {TableSelection} from '@/components/Table/TableSelection';
import {$} from '@core/dom'
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  prepare() {
    this.selector = new TableSelection();
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  init() {
    super.init();
    this.selectCell(this.$root.find(`[data-id="0:0"]`));

    this.$on('formula:input', data => {
      this.selector.$current.text(data)
      this.changeTextInStore(data)
    })

    this.$on(`formula:enter`, () => {
      this.selector.$current.focus()
    })

    this.$on('toolbar:applyStyle', style => {
      this.selector.applyStyle(style);
    })
  }

  changeTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selector.$current.id(),
      value,
    }))
  }

  selectCell($cell) {
    this.selector.select($cell);
    this.$emit(`table:changeCell`, $cell);
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.changeTextInStore($(event.target).text())
  }

  async tableResize(event) {
    const data = await resizeHandler(this.$root, event);
    this.$dispatch(actions.tableResize(data));
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event);
    } else if (isCelling(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $group = matrix(this.selector.$current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selector.selectGroup($group);
      } else {
        this.selectCell($target);
        console.log($target.getStyles(Object.keys(defaultStyles)))
      }
    }
  }

  onKeydown(event) {
    const {key} = event;
    if (moveButtons(event)) {
      event.preventDefault()
      const id = this.selector.$current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next)
    }
  }
}

