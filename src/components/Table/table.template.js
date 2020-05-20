const CODE = {
  A: 65,
  Z: 90,
}

function getCell() {
  return `<div class="ceil"></div>`
}

function getColumn(ch) {
  return ` <div class="column">
                ${ch}
                <div class="col-resize"></div>
           </div>`
}

function createRow(content, rowCount = '') {
  const resize = rowCount ? `<div class="row-resize"></div>` : '';
  return `
         <div class="row">
           <div class="row-info">
                ${rowCount}
                ${resize}
            </div>
           <div class="row-data">${content}</div>
        </div>
`
}

function toChar(_, idx) {
  return String.fromCharCode(CODE.A + idx)
}

export function createTable(rowCount = 15) {
  const colsCount = CODE.Z - CODE.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(getColumn)
      .join('')

  const cells = new Array(colsCount)
      .fill('')
      .map(getCell)
      .join('')

  rows.push(createRow(cols))
  for (let row = 1; row <= rowCount; row++) {
    rows.push(createRow(cells, row))
  }


  return rows.join('').trim()
}
