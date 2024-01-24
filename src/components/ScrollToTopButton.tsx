import * as React from 'react'
import { Box, Tooltip, IconButton } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import theme from '../theme'

const ScrollToTopButton = (): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  const toggleVisibility = () => {
    setIsVisible(document.documentElement.scrollTop > 180)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  window.addEventListener('scroll', toggleVisibility)
  return (
    <Box sx={{ display: isVisible ? 'inline' : 'none', position: 'fixed', bottom: 20, right: 40, zIndex: 100 }}>
      <Tooltip title="Go to top">
        <IconButton onClick={scrollToTop}>
          <KeyboardDoubleArrowUpIcon fontSize="large" sx={{ color: theme.palette.secondary.main }} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ScrollToTopButton
