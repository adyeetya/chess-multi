import { Color, PieceSymbol, Square } from 'chess.js'
import React, { useState } from 'react'
import { MOVE } from '../screens/Game'

const Chessboard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square
    type: PieceSymbol
    color: Color
  } | null)[][]
  socket: WebSocket | null
  setBoard: any
  chess: any
}) => {
  const [from, setFrom] = useState<null | Square>(null)
  const [to, setTo] = useState<null | Square>(null)
  // console.log(socket)
  return (
    <div className="text-black ">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => {
            const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
              '' +
              (8 - i)) as Square
            return (
              <div
                onClick={() => {
                  if (!from) {
                    setFrom(squareRepresentation ?? null)
                  } else {
                    console.log('sent move from the fe')
                    socket?.send(
                      JSON.stringify({
                        type: MOVE,
                        payload: {
                          move: { from: from, to: squareRepresentation },
                        },
                      })
                    )
                    setFrom(null)
                    chess.move({ from: from, to: squareRepresentation })
                    setBoard(chess.board())
                    console.log({ from, to: squareRepresentation })
                  }
                }}
                key={j}
                className={`w-20 h-20 flex justify-center items-center ${
                  (i + j) % 2 === 0 ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <div className="w-full justify-center flex h-full">
                  <div className="flex justify-center h-full flex-col">
                    {square ? (
                      <img
                        src={`/pieces/${
                          square?.color === 'b'
                            ? 'b-' + square?.type
                            : 'w-' + square?.type
                        }.png`}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Chessboard
