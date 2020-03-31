import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { OTHELLO_BOARD } from "../constants/othelloBoard"
import { shouldTurn, checkIsValid } from "../utils/validateMovement"
import Cell from "./Cell"

const Board = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: orange;
  border: none;
  text-transform: capitalize;
  ${p =>
    p.minWidth &&
    `
    min-width: 40px;
    min-height: 25px;
    `}
`

export default ({ playerTurn, onPlayerMove, onClose }) => {
  const [board, setBoard] = useState(OTHELLO_BOARD)

  const handleSelectCell = newSelection => {
    if (newSelection.cell.color) return
    const { row: y1, cell: x1 } = newSelection
    const isValid = checkIsValid(y1, x1, playerTurn, board)
    const newBoard = {
      rows: board.rows.map(({ number: y2, cells }) => ({
        number: y2,
        cells: cells.map(cell => {
          const x2 = cell.number
          if (isValid && y2 === y1 && x2 === x1) {
            onPlayerMove(playerTurn)
            return {
              ...cell,
              color: playerTurn,
            }
          }
          if (isValid && shouldTurn(y1, x1, y2, x2, playerTurn, board)) {
            return {
              ...cell,
              color: playerTurn,
            }
          }
          return cell
        }),
      })),
    }
    setBoard(newBoard)
  }

  useEffect(() => {
    let whiteCount = 0
    let blackCount = 0
    let validPlacement = 0
    board.rows.forEach(row =>
      row.cells.forEach(cell => {
        if (cell.color === "white") whiteCount++
        else if (cell.color === "black") blackCount++
        if (
          !cell.color &&
          checkIsValid(row.number, cell.number, playerTurn, board)
        ) {
          validPlacement++
        }
      })
    )
    if (whiteCount + blackCount === 64 || validPlacement === 0) {
      onClose(whiteCount > blackCount ? "white" : "black")
    }
  }, [board, playerTurn, onClose])

  return (
    <Board>
      <Row>
        <Title></Title>
        {board.rows.map(row => (
          <Title key={row.number}></Title>
        ))}
        <Title></Title>
      </Row>
      {board.rows.map(row => (
        <Row key={row.number}>
          <Title></Title>
          {row.cells.map(cell => (
            <Cell
              key={row.number + cell.number}
              cell={cell}
              row={row}
              onClick={() =>
                handleSelectCell({ row: row.number, cell: cell.number })
              }
            />
          ))}
          <Title></Title>
        </Row>
      ))}
      <Row>
        <Title></Title>
        {board.rows.map(row => (
          <Title key={row.number}></Title>
        ))}
        <Title></Title>
      </Row>
    </Board>
  )
}
