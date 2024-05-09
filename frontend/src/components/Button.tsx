const Button = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded text-2xl w-full"
    >
      Start Game
    </button>
  )
}

export default Button
