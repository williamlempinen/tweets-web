import { Box } from '@mui/material'
import img from '../background.png'

const Background = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Box
      sx={{
        backgroundPosition: 'center',
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity: 0.9,
        minHeight: '100vh',
        minWidth: '100vh',
      }}
    >
      {children}
    </Box>
  )
}

export default Background
