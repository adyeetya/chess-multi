import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="pt-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
          <div className="flex justify-center">
            <img
              src="/chessboard.jpg"
              alt="chessboard"
              className="w-full md:max-w-full rounded"
            />
          </div>
          <div className="mt-8">
            <h1 className="text-4xl font-bold">Chess #2</h1>
            <p className="text-lg">
              Welcome to Chess. The classic game of strategy. Play with a friend
              online.
            </p>
            <div className="mt-8">
              <Button onClick={() => navigate('/game')}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
