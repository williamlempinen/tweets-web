import * as React from 'react'
import { Box, Card, IconButton, Toolbar, TextField, InputAdornment, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import theme from '../theme'
import DrawerComponent from './DrawerComponent'
import DialogComponent from './DialogComponent'
import LargeActionButton from './LargeActionButton'
import ScrollToTopButton from './ScrollToTopButton'
import RateReviewIcon from '@mui/icons-material/RateReview'
import NoFeatureDialog from './NoFeatureDialog'

const ContentPaper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [openNoFeatureDialog, setOpenNoFeatureDialog] = React.useState<boolean>(false)
  const [searchParam, setSearchParam] = React.useState<string>('')

  const handleDrawer = () => {
    setOpenDrawer((prev) => !prev)
  }

  const handleDialog = () => {
    setOpenDialog((prev) => !prev)
  }

  const handleSearchParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchParam(event?.target.value)
  }

  const handleSearch = () => {
    setOpenNoFeatureDialog((prev) => !prev)
    setSearchParam('')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        id="drawer-container"
        sx={{
          height: '100%',
          minHeight: '100vh',
          minWidth: '95%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          m: 1,
          position: 'relative',
        }}
      >
        <DrawerComponent open={openDrawer} handleDrawer={handleDrawer} />
        <Toolbar sx={{ width: '100%', display: 'felx', justifyContent: 'space-around', mb: 3 }}>
          <Tooltip title="More">
            <IconButton onClick={handleDrawer} sx={{ mx: 1 }}>
              <MenuIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Tooltip>
          <TextField
            value={searchParam}
            onChange={handleSearchParamChange}
            variant="standard"
            fullWidth
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon sx={{ color: theme.palette.secondary.main }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <DialogComponent open={openDialog} handleClose={handleDialog} />
          <NoFeatureDialog open={openNoFeatureDialog} handleClose={handleSearch} />
          <LargeActionButton buttonText="tweet about it!" onClick={handleDialog} Icon={RateReviewIcon} />
        </Toolbar>
        {children}
        <ScrollToTopButton />
      </Card>
    </Box>
  )
}

export default ContentPaper
