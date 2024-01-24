import { Dialog, DialogTitle, Box, Typography } from '@mui/material'

const NoFeatureDialog = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: (arg: boolean) => void
}): JSX.Element => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>This feature is still in progress.</DialogTitle>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2 }}>
        <Typography>Feature will be implemented later.</Typography>
      </Box>
    </Dialog>
  )
}

export default NoFeatureDialog
