import { Slider } from '@mui/material'
import { useContext } from 'react'
import { SizeContext } from '../contexts/SizeContext'

export default function SizeSlider() {
  const { size, setSize } = useContext(SizeContext)
  return (
    <Slider
      style={{ maxWidth: '300px' }}
      value={size}
      onChange={e => setSize(e.target.value)}
    />
  )
}
