import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();
    const $formula = this.$root.find(`[data-id="formula"]`);

    // this.$on('table:input', $cell => {
    //   $formula.text($cell.text());
    // })

    this.$on('table:changeCell', $cell => {
      $formula.text($cell.text());
    })
  }

  storeChanged(changes) {
    const $formula = this.$root.find(`[data-id="formula"]`);
    $formula.text(changes.currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Tab', 'Enter'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }

  toHTML() {
    return ` <div class="title">fx</div>
            <div 
            class="input"
            data-id="formula" 
            contenteditable 
            spellcheck="false"
            ></div>`
  }
}
