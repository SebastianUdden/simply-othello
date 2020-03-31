import React from "react"
import styled from "styled-components"

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 40px;
  min-height: 45px;
  background-color: ${p => p.color};
  border: 1px solid black;
  color: #ccc;
  opacity: 0.9;
  :hover {
    cursor: pointer;
    opacity: 1;
    background-color: #bb8034;
  }
  :active {
    background-color: #794013;
  }
`
const FlipWrapper = styled.div`
  width: 40px;
  height: 40px;
  perspective: 80px;
`

const FlipTile = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: ${p => (p.color === "white" ? "rotateY(180deg)" : "rotateY(0)")}
    translateX(-20px);
  transition: transform 0.5s;
  transform-style: preserve-3d;
`

const Svg = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  ${p =>
    p.back &&
    `
    transform: rotateY(180deg);
  `}
`

const getTile = color => {
  if (!color) return undefined
  return (
    <FlipWrapper>
      <FlipTile color={color}>
        <Svg height="40" width="40">
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="black"
            strokeWidth="3"
            fill="black"
          />
        </Svg>
        <Svg height="40" width="40" back>
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="white"
            strokeWidth="3"
            fill="white"
          />
        </Svg>
      </FlipTile>
    </FlipWrapper>
  )
}

export default ({ row, cell, onClick }) => {
  const isSelected = cell.selected ? "isSelected" : ""
  return (
    <Cell
      id={cell.number.toString() + row.number.toString()}
      color="#0B6623"
      onClick={onClick}
      data-cy={isSelected}
    >
      {getTile(cell.color)}
    </Cell>
  )
}
