import {range} from '@core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCelling(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($current, $target) {
  const current = $current.id(true);
  const target = $target.id(true);
  const rows = range(current.row, target.row);
  const cols = range(current.col, target.col);
  return rows.reduce((acc, row) => {
    cols.forEach(col => acc.push(`${row}:${col}`))
    return acc;
  }, [])
}

const keys = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowDown',
  'ArrowUp',
  'Tab',
  'Enter',
]

export function moveButtons(event) {
  return keys.includes(event.key) && !event.shiftKey;
}

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col++;
      break;
    case 'ArrowDown':
    case 'Enter':
      row++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : --col
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : --row
  }
  return `[data-id="${row}:${col}"]`
}
