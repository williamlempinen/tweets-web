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
        backgroundAttachment: 'fixed',
        opacity: 0.9,
        height: '100%',
        minWidth: '100%',
        overflowY: 'auto',
      }}
    >
      {children}
    </Box>
  )
}

export default Background
