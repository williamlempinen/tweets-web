import { createTheme } from '@mui/material'
import { orange, purple, grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: orange[700],
      light: orange[300],
      dark: orange[900],
      contrastText: '#fff',
    },
    secondary: {
      main: purple[500],
      light: purple[300],
      dark: purple[700],
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: orange[700],
          color: 'white',
          '&:hover': {
            backgroundColor: orange[300],
          },
          '&:active': {
            backgroudColor: grey[200],
          },
        },
      },
    },
  },
})

export default theme
