import { Typography, Box, Button } from '@mui/material'
import * as React from 'react'

const App = (): JSX.Element => {
  const [count, setCount] = React.useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
  }
  return (
    <Box>
      <Typography>Hello world!</Typography>
      <Button onClick={increment}>Set counter</Button>
      <Typography>{count}</Typography>
    </Box>
  )
}

export default App
