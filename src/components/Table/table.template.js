const CODE = {
  A: 65,
  Z: 90,
}
const DEFAULT_WIDTH_COLUMN = 120;
const DEFAULT_HEIGHT_ROW = 28;

function getCell(row, state) {
  return ({_, col, width}) => {
    const id = `${row}:${col}`;
    const data = state[id] || '';
    return `<div 
            class="ceil" 
            data-type="cell"
            data-id=${row}:${col}
            data-col=${col}
            style="width: ${width}"
            contenteditable
          >${data}</div>`
  }
}

function getColumn({ch, col, width}) {
  return ` <div 
           class="column" 
           data-type="resizable" 
           data-col=${col} 
           style="width: ${width}"
           >
                ${ch}
                <div class="col-resize" data-resize="col"></div>
           </div>`
}

function createRow(content, rowCount = '', state = {}) {
  const height = (state[rowCount] || DEFAULT_HEIGHT_ROW) + 'px';
  const resize = rowCount !== '' ?
    `<div class="row-resize" data-resize="row"></div>` : '';

  return `
         <div 
         class="row" 
         data-type="resizable" 
         data-row="${rowCount}" 
         style="height: ${height}">
           <div class="row-info">
                ${rowCount !== '' ? rowCount + 1 : ''}
                ${resize}
            </div>
           <div class="row-data">${content}</div>
        </div>
`
}

function toChar(_, idx) {
  return String.fromCharCode(CODE.A + idx)
}

function getWidth(state, col) {
  return (state[col] || DEFAULT_WIDTH_COLUMN) + 'px';
}

function withWidthFrom(state) {
  return function(ch, col) {
    return {ch, col, width: getWidth(state.colState, col)}
  }
}

export function createTable(rowCount = 15, state = {}) {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(getColumn)
      .join('')

  rows.push(createRow(cols))
  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(withWidthFrom(state))
        .map(getCell(row, state.dataState))
        .join('')
    rows.push(createRow(cells, row, state.rowState))
  }


  return rows.join('').trim()
}
