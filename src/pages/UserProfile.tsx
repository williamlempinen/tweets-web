import * as React from 'react'
import { Avatar, Box, Typography, Card } from '@mui/material'
import ContentPaper from '../components/ContentPaper'
import { AppContext } from '../AppContext'
import theme from '../theme'

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
        <Card sx={{ width: '100%' }}>
          {user?.friendsList.map((friend) => (
            <Box
              key={friend.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                py: 2,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 1,
              }}
            >
              <Typography>{friend.name}</Typography>
              <Typography>{friend.email}</Typography>
            </Box>
          ))}
        </Card>
      </Box>
    </ContentPaper>
  )
}

export default UserProfile
