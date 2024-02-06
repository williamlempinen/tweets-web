import { Stack, LinearProgress } from '@mui/material'

const LinearLoadingProgress = ({ absolute }: { absolute?: boolean }): JSX.Element => {
  return (
    <Stack
      sx={{
        width: '90%',
        color: 'grey.500',
        gap: 1,
        position: absolute ? 'absolute' : '',
        top: absolute ? '90%' : '',
        m: 1,
      }}
    >
      <LinearProgress color="primary" />
      <LinearProgress color="secondary" />
    </Stack>
  )
}

export default LinearLoadingProgress
