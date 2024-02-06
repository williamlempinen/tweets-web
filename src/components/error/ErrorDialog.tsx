import { Dialog, Box, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

const ErrorDialog = ({ open }: { open: boolean }): JSX.Element => {
  return (
    <Dialog open={open} fullWidth>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          m: 2,
          gap: 2,
        }}
      >
        <ErrorIcon fontSize="large" color="error" />
        <Typography variant="h6">Error</Typography>
      </Box>
    </Dialog>
  )
}

export default ErrorDialog
