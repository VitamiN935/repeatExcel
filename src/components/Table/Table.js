import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';
import {resizeHandler} from '@/components/Table/table.resize';
// eslint-disable-next-line max-len
import {isCelling, matrix, moveButtons, nextSelector, shouldResize} from '@/components/Table/table.functions';
import {TableSelection} from '@/components/Table/TableSelection';
import {$} from '@core/dom'

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
    return createTable()
  }

  init() {
    super.init();
    this.selectCell(this.$root.find(`[data-id="0:0"]`));

    this.$on('formula:input', data => {
      this.selector.$current.text(data)
    })

    this.$on(`formula:enter`, () => {
      this.selector.$current.focus()
    })
  }

  selectCell($cell) {
    this.selector.select($cell);
    this.$emit(`table:changeCell`, $cell);
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCelling(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $group = matrix(this.selector.$current, $target)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selector.selectGroup($group);
      } else {
        this.selectCell($target)
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

