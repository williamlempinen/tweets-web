import * as React from 'react'
import { Box, Card, IconButton, Toolbar, TextField, InputAdornment } from '@mui/material'
import DiamondIcon from '@mui/icons-material/Diamond'
import SearchIcon from '@mui/icons-material/Search'
import theme from '../theme'
import DrawerComponent from './DrawerComponent'
import LargeActionButton from './LargeActionButton'
import RateReviewIcon from '@mui/icons-material/RateReview'

const ContentPaper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [searchParam, setSearchParam] = React.useState<string>('')

  const handleDrawer = () => {
    setOpen(!open)
  }

  const handleSearchParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setSearchParam(event?.target.value)
  }

  const handleSearch = () => {
    console.log('search icon clicked')
  }

  const handleBlogPost = () => {
    console.log('post a blog button')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        id="drawer-container"
        sx={{
          height: '100vh',
          minWidth: '90%',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'start',
          m: 1,
          position: 'relative',
        }}
      >
        <DrawerComponent open={open} handleDrawer={handleDrawer} />
        <Toolbar sx={{ width: '100%', display: 'felx', justifyContent: 'space-around', mb: 3 }}>
          <IconButton onClick={handleDrawer} sx={{ mr: 2 }}>
            <DiamondIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />
          </IconButton>
          <TextField
            value={searchParam}
            onChange={handleSearchParamChange}
            variant="standard"
            fullWidth
            placeholder="Search"
            sx={{ '&:hover': { color: 'secondary.main' } }}
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
          <LargeActionButton buttonText="post a blog" onClick={handleBlogPost} Icon={RateReviewIcon} />
        </Toolbar>
        {children}
      </Card>
    </Box>
  )
}

export default ContentPaper
