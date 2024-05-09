import React, { useEffect, useState } from 'react'
import Chessboard from '../components/Chessboard'
import Button from '../components/Button'
import { useSocket } from '../hooks/useSocket'
import { Chess } from 'chess.js'

export const INIT_GAME = 'init_game'
export const MOVE = 'move'
export const GAME_OVER = 'game_over'

const Game = () => {
  const socket = useSocket()
  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // console.log(socket)
    if (!socket) return

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log(message)
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board())
          setStarted(true)
          // console.log('init game')
          break
        case MOVE:
          // console.log('move made')
          console.log(message.payload)
          const move = message.payload
          chess.move(move)
          setBoard(chess.board())
          break
        case GAME_OVER:
          // console.log('game over')
          break
      }
    }
  }, [socket])

  return (
    <div>
      <div className="pt-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 p-4 ">
          <div className="col-span-4 flex justify-center w-full">
            <Chessboard
              chess={chess}
              setBoard={setBoard}
              board={board}
              socket={socket}
            />
          </div>
          <div className="col-span-2  pt-8 w-full">
            <div className="">
              {!started && (
                <Button
                  onClick={() => {
                    socket?.send(JSON.stringify({ type: INIT_GAME }))
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
