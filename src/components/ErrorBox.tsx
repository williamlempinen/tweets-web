import { Box, Button, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

const ErrorBox = ({
  isLoading,
  onClick,
  message,
  buttonText,
}: {
  isLoading: boolean
  onClick?: () => void
  message: string
  buttonText?: string
}): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        m: 2,
      }}
    >
      <ErrorIcon fontSize="large" color="error" />
      <Typography variant="h6">{message}</Typography>
      {onClick ? (
        <Button onClick={onClick} disabled={isLoading}>
          {buttonText}
        </Button>
      ) : null}
    </Box>
  )
}

export default ErrorBox
