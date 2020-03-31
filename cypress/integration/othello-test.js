describe("Try some wrong othello moves", () => {
  before(() => {
    cy.visit("http://localhost:8000")
  })
  it("Start game", () => {
    cy.get("#play").click()
  })
  it("Select an invalid empty square", () => {
    cy.get("#11").click()
    cy.get("#11").should("not.have.data", "isSelected")
  })
  //   it("Select an enemy chesspiece before current players chesspiece", () => {
  //     cy.get("#D7").click()
  //     cy.get("#D7").should("not.have.data", "isSelected")
  //   })
  //   it("Select a square further than allowed distance", () => {
  //     cy.get("#D2").click()
  //     cy.get("#D5").click()
  //     cy.get("#D5").should("not.have.data", "isSelected")
  //   })
  //   it("Move diagonally when not allowed", () => {
  //     cy.get("#D2").click()
  //     cy.get("#E3").click()
  //     cy.get("#E3").should("not.have.data", "isSelected")
  //   })
  //   it("Move straight when not allowed", () => {
  //     cy.get("#C2").click()
  //     cy.get("#C3").click()
  //     cy.get("#C1").click()
  //     cy.get("#C2").click()
  //     cy.get("#C2").should("not.have.data", "isSelected")
  //   })
  //   it("Move straight through a unit when not allowed", () => {
  //     cy.get("#D1").click()
  //     cy.get("#D3").click()
  //     cy.get("#D3").should("not.have.data", "isSelected")
  //   })
  //   it("Move diagonally through a unit when not allowed", () => {
  //     cy.get("#D1").click()
  //     cy.get("#F3").click()
  //     cy.get("#F3").should("not.have.data", "isSelected")
  //   })
  //   it("Quit game", () => {
  //     cy.get("#quit").click()
  //   })
  //   it("Should be 0-0 in score", () => {
  //     cy.get("#score-white").should("have.text", "0")
  //     cy.get("#score-black").should("have.text", "0")
  //   })
})

const W = "White"
const B = "Black"

describe("Play a game of othello", () => {
  before(() => {
    cy.visit("http://localhost:8000")
  })
  it("Start game", () => {
    cy.get("#play").click()
  })
  const selectOthelloTile = (player, pos1) =>
    it(`${player} - Select tile ${pos1}`, () => {
      cy.wait(200)
      cy.get(`#${pos1}`).click()
    })
  it(`Check that White starts`, () => {
    cy.get(`#playerTurn`).should("have.text", "White")
  })
  selectOthelloTile(W, "34")
  it(`Check that Black is next`, () => {
    cy.get(`#playerTurn`).should("have.text", "Black")
  })
  selectOthelloTile(B, "33")
  selectOthelloTile(W, "32")
  selectOthelloTile(B, "22")
  selectOthelloTile(W, "43")
  selectOthelloTile(B, "53")
  selectOthelloTile(W, "62")
  selectOthelloTile(B, "63")
  selectOthelloTile(W, "64")
  selectOthelloTile(B, "35")
  selectOthelloTile(W, "36")
  selectOthelloTile(B, "65")
  selectOthelloTile(W, "75")
  selectOthelloTile(B, "86")
  selectOthelloTile(W, "85")
  selectOthelloTile(B, "84")
  selectOthelloTile(W, "73")
  selectOthelloTile(B, "83")
  selectOthelloTile(W, "52")
  selectOthelloTile(B, "23")
  selectOthelloTile(W, "12")
  selectOthelloTile(B, "11")
  selectOthelloTile(W, "21")
  selectOthelloTile(B, "31")
  selectOthelloTile(W, "72")
  selectOthelloTile(B, "46")
  selectOthelloTile(W, "56")
  selectOthelloTile(B, "47")
  selectOthelloTile(W, "38")
  selectOthelloTile(B, "81")
  selectOthelloTile(W, "37")
  selectOthelloTile(B, "48")
  selectOthelloTile(W, "58")
  selectOthelloTile(B, "13")
  selectOthelloTile(W, "42")
  selectOthelloTile(B, "66")
  selectOthelloTile(W, "76")
  selectOthelloTile(B, "61")
  selectOthelloTile(W, "82")
  selectOthelloTile(B, "41")
  selectOthelloTile(W, "87")
  selectOthelloTile(B, "88")
  selectOthelloTile(W, "74")
  selectOthelloTile(B, "71")
  selectOthelloTile(W, "51")
  selectOthelloTile(B, "77")
  selectOthelloTile(W, "67")
  selectOthelloTile(B, "78")
  selectOthelloTile(W, "68")
  selectOthelloTile(B, "28")
  selectOthelloTile(W, "24")
  selectOthelloTile(B, "14")
  selectOthelloTile(W, "15")
  selectOthelloTile(B, "16")
  selectOthelloTile(W, "25")
  selectOthelloTile(B, "57")

  it("Should be 0-1 in black player's favor", () => {
    cy.get("#score-white").should("have.text", "0")
    cy.get("#score-black").should("have.text", "1")
  })
})
