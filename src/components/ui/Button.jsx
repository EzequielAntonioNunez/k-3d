import useSound from 'use-sound'
import clickSfx from '../../assets/sounds/click.mp3'
import hoverSfx from '../../assets/sounds/hover.mp3'

export const Button = ({ children, onClick, variant = 'pill', className = '', ...props }) => {
  const [playHover] = useSound(hoverSfx, { volume: 0.25 })
  const [playClick] = useSound(clickSfx, { volume: 0.5 })

  return (
    <button
      type="button"
      className={`btn-${variant} ${className}`.trim()}
      onMouseEnter={() => playHover()}
      onClick={(event) => {
        playClick()
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
