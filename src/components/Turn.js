import React from "react"
import styled from "styled-components"

const Turn = styled.h2`
  text-align: center;
`
export const WrapWord = styled.span`
  border-bottom: 1px solid ${p => p.color};
`
const Color = styled.strong`
  color: ${p => p.color};
`

export default ({ playerTurn }) => (
  <Turn>
    <WrapWord color={playerTurn}>
      <Color id="playerTurn" color={playerTurn}>
        {playerTurn === "white" ? "White" : "Black"}
      </Color>
      's turn
    </WrapWord>
  </Turn>
)
