export const INIT_GAME = 'init_game'
export const MOVE = 'move'
export const GAME_OVER = 'game_over'

const initMsg = {
  type: 'init_game',
}

const whiteMove = {
  type: 'move',
  move: {
    from: 'a2',
    to: 'a3',
  },
}