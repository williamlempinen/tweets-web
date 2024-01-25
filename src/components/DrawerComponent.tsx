import * as React from 'react'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import HomeIcon from '@mui/icons-material/Home'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import DraftsIcon from '@mui/icons-material/Drafts'
import SettingsIcon from '@mui/icons-material/Settings'
import AttributionIcon from '@mui/icons-material/Attribution'
import theme from '../theme'
import { useNavigate } from 'react-router-dom'
import NoFeatureDialog from './NoFeatureDialog'

type DrawerElement = {
  name: string
  Icon?: React.ReactNode
  func?: () => void
}

const DrawerContent = (): JSX.Element => {
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const navigate = useNavigate()

  const drawerPrimaryElements: DrawerElement[] = [
    { name: 'Home', Icon: <HomeIcon />, func: () => navigate('/user-content') },
    { name: 'Messages', Icon: <MailIcon />, func: () => handleDialog() },
    { name: 'Friends', Icon: <PeopleAltIcon />, func: () => handleDialog() },
    { name: 'Drafts', Icon: <DraftsIcon />, func: () => handleDialog() },
  ]

  const drawerSecondaryElements: DrawerElement[] = [
    { name: 'Settings', Icon: <SettingsIcon />, func: () => handleDialog() },
    { name: 'Author', Icon: <AttributionIcon />, func: () => handleDialog() },
  ]

  const handleDialog = () => {
    setOpenDialog((prev) => !prev)
  }

  const handleAvatar = () => {
    navigate('/user-profile')
    console.log('avatar clicked')
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Avatar
            component="a"
            onClick={handleAvatar}
            sx={{ height: 100, width: 100, boxShadow: 2, '&:hover': { backgroundColor: 'primary.main' } }}
          ></Avatar>
        </Box>
        <List>
          {drawerPrimaryElements.map((element) => (
            <ListItem key={element.name} sx={{ color: 'primary.main' }} disablePadding>
              <ListItemButton onClick={element.func ? element.func : undefined}>
                {element.Icon ? (
                  <ListItemIcon sx={{ color: theme.palette.primary.main }}>{element.Icon}</ListItemIcon>
                ) : null}
                <ListItemText primary={element.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <NoFeatureDialog open={openDialog} handleClose={handleDialog} />
      <Box>
        <List>
          {drawerSecondaryElements.map((element) => (
            <ListItem key={element.name} sx={{ color: 'secondary.main' }} disablePadding>
              <ListItemButton onClick={element.func ? element.func : undefined}>
                {element.Icon ? (
                  <ListItemIcon sx={{ color: theme.palette.secondary.main }}>{element.Icon}</ListItemIcon>
                ) : null}
                <ListItemText primary={element.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

const DrawerComponent = ({ open, handleDrawer }: { open: boolean; handleDrawer: () => void }): JSX.Element => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleDrawer}
      PaperProps={{ sx: { position: ' absolute', width: 250 } }}
      BackdropProps={{ sx: { position: 'absolute' } }}
      ModalProps={{ container: document.getElementById('drawer-container'), sx: { position: 'absolute' } }}
    >
      <DrawerContent />
    </Drawer>
  )
}

export default DrawerComponent
