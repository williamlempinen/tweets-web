import { Box, Button } from '@mui/material'

const LargeActionButton = ({
  onClick,
  buttonText,
  isLoading,
  Icon,
}: {
  onClick: () => void
  buttonText: string
  isLoading?: boolean
  Icon?: React.FC
}): JSX.Element => {
  return (
    <Box>
      <Button
        onClick={onClick}
        startIcon={Icon ? <Icon /> : null}
        disabled={isLoading ? isLoading : false}
      >
        {buttonText}
      </Button>
    </Box>
  )
}

export default LargeActionButton
