import * as React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import ContentPaper from '../components/ContentPaper'
import { AppContext } from '../AppContext'

const UserProfile = (): JSX.Element => {
  const { user } = React.useContext(AppContext)

  return (
    <ContentPaper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 4,
          gap: 3,
        }}
      >
        <Avatar sx={{ height: 100, width: 100, boxShadow: 2, '&:hover': { backgroundColor: 'primary.main' } }}></Avatar>
        <Typography variant="h3">{user?.name}</Typography>
        <Typography variant="h4">{user?.email}</Typography>
      </Box>
    </ContentPaper>
  )
}

export default UserProfile
