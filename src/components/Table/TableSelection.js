export class TableSelection {
  static ACTIVE_CELL = 'selected'
  constructor() {
    this.group = [];
    this.$current = null;
  }

  select($cell) {
    this.clear();
    this.group.push($cell);
    $cell.focus().addClass(TableSelection.ACTIVE_CELL);
    this.$current = $cell;
  }

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelection.ACTIVE_CELL))
    this.group = [];
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    $group.forEach($cell => $cell.addClass(TableSelection.ACTIVE_CELL))
  }
}
