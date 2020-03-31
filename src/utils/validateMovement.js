export const getOpponentCells = (cells, playerTurn) => {
  const firstMissingIndex = cells.findIndex(cell => !cell.color)
  const coloredCells = cells.slice(
    0,
    firstMissingIndex !== -1 ? firstMissingIndex : cells.length
  )
  const firstSameColorIndex = coloredCells.findIndex(
    cell => cell.color === playerTurn
  )
  if (firstSameColorIndex < 0) return []
  return coloredCells.slice(0, firstSameColorIndex)
}

export const turnTileStraight = (cells, playerTurn, x) =>
  cells && getOpponentCells(cells, playerTurn).some(cell => cell.number === x)

export const turnTileDiagonal = (cells, playerTurn, y, x) =>
  cells &&
  getOpponentCells(cells, playerTurn).some(
    ({ number, row }) => number === x && row === y
  )

export const getRowsBelow = (board, y1) =>
  board.rows.filter(row => row.number < y1).reverse()

export const getRowsAbove = (board, y1) =>
  board.rows.filter(row => row.number > y1)

export const getCellsRight = (rows, x1) =>
  rows.map((row, index) => ({
    row: row.number,
    ...row.cells.find(cell => cell.number === x1 + 1 + index),
  }))

export const getCellsLeft = (rows, x1) =>
  rows.map((row, index) => ({
    row: row.number,
    ...row.cells.find(cell => cell.number === x1 - 1 - index),
  }))

export const getCellsDiagonal = (y1, x1, y2, x2, board) => {
  if (y2 < y1 && x1 < x2) return getCellsRight(getRowsBelow(board, y1), x1)
  if (y1 < y2 && x1 < x2) return getCellsRight(getRowsAbove(board, y1), x1)
  if (y2 < y1 && x2 < x1) return getCellsLeft(getRowsBelow(board, y1), x1)
  if (y1 < y2 && x2 < x1) return getCellsLeft(getRowsAbove(board, y1), x1)
  return undefined
}

export const getCellsStraight = (cells, x1, x2) => {
  if (x1 < x2) return cells.slice(x1)
  if (x2 < x1) return cells.slice(0, x1 - 1).reverse()
  return undefined
}

export const getCellsHorizontal = (y, x1, x2, board) => {
  const horizontalCells = board.rows[y - 1].cells
  return getCellsStraight(horizontalCells, x1, x2)
}

export const getCellsVertical = (x, y1, y2, board) => {
  const verticalCells = board.rows.map(row => ({
    ...row.cells.find(cell => cell.number === x),
    number: row.number,
  }))
  return getCellsStraight(verticalCells, y1, y2)
}

export const shouldTurn = (y1, x1, y2, x2, playerTurn, board) => {
  if (y1 === y2) {
    const cells = getCellsHorizontal(y1, x1, x2, board)
    return turnTileStraight(cells, playerTurn, x2)
  }
  if (x1 === x2) {
    const cells = getCellsVertical(x1, y1, y2, board)
    return turnTileStraight(cells, playerTurn, y2)
  }
  const cells = getCellsDiagonal(y1, x1, y2, x2, board)
  return turnTileDiagonal(cells, playerTurn, y2, x2)
}

export const validate = (cells, playerTurn) => {
  const nextPlayerTileIndex = cells.findIndex(cell => cell.color === playerTurn)
  if (nextPlayerTileIndex === -1) return false
  const validatedCells = cells.slice(0, nextPlayerTileIndex).map(cell => {
    if (!cell.color) return undefined
    return cell.color !== playerTurn
  })
  return validatedCells.length && validatedCells.every(Boolean)
}

export const validateDiagonal = (rows, direction, playerTurn, x) => {
  const cellsTopLeft = direction(rows, x)
  return validate(cellsTopLeft, playerTurn)
}

export const checkIsValid = (y, x, playerTurn, board) => {
  const row = board.rows.find(row => row.number === y)
  const clickedCell = row.cells.find(cell => cell.number === x)
  if (clickedCell.color) return false

  const cellsHorizontal = board.rows.find(row => row.number === y).cells.slice()
  const cellsVertical = board.rows.map(row => ({
    ...row.cells.find(cell => cell.number === x),
    number: row.number,
  }))
  if (validate(cellsHorizontal.slice(x), playerTurn)) return true
  if (validate(cellsHorizontal.slice(0, x - 1).reverse(), playerTurn))
    return true
  if (validate(cellsVertical.slice(y), playerTurn)) return true
  if (validate(cellsVertical.slice(0, y - 1).reverse(), playerTurn)) return true

  const rowsAbove = getRowsAbove(board, y)
  const rowsBelow = getRowsBelow(board, y)
  if (validateDiagonal(rowsAbove, getCellsLeft, playerTurn, x)) return true
  if (validateDiagonal(rowsAbove, getCellsRight, playerTurn, x)) return true
  if (validateDiagonal(rowsBelow, getCellsLeft, playerTurn, x)) return true
  if (validateDiagonal(rowsBelow, getCellsRight, playerTurn, x)) return true

  return false
}
