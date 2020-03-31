import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  margin-bottom: 2rem;
  padding: 1rem 3rem;
  font-size: large;
  border: none;
  background-color: #444;
  color: white;
  :hover {
    cursor: pointer;
    background-color: #777;
  }
`

const Score = styled.p`
  color: #444;
  display: flex;
  font-size: 30px;
  margin: 0 0 1rem;
  align-items: center;
`

const White = styled.strong`
  margin-right: 0.7rem;
  font-size: 50px;
  color: white;
`

const Black = styled.strong`
  margin-left: 0.5rem;
  color: black;
  font-size: 55px;
`

export default ({ onClick, score }) => {
  return (
    <Wrapper>
      <Score>
        <White id="score-white">{score.white}</White> -{" "}
        <Black id="score-black">{score.black}</Black>
      </Score>
      <Button id="play" onClick={onClick}>
        Play
      </Button>
    </Wrapper>
  )
}
