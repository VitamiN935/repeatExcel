import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  onMousedown(event) {
    const target = event.target;
    if (target.closest('.row-resize') || target.closest('.col-resize')) {
      const resize = target.closest('.row-resize') ? event.pageY : event.pageX;
      event.target.setAttribute('data-resize', resize);
      event.target.classList.add('resize')
      this.addListener('mousemove');
      this.addListener('mouseup');
    }
  }

  onMousemove(event) {
    if (event.target.closest('row-resize')) {
      let target = document.querySelector('.resize');


    } else {

    }

  }

  onMouseup(event) {
    this.removeListener('mousemove')
    this.removeListener('mouseup')
  }

  toHTML() {
    return createTable()
  }
}
