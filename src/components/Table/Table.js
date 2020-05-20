import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
    });
  }
  toHTML() {
    return createTable()
  }
}
