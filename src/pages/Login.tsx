import * as React from 'react'
import { Card, Box, Typography, TextField, InputAdornment, IconButton, Button } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password'
import MailIcon from '@mui/icons-material/Mail'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { usePostUserCredentials } from '../querys'
import { useNavigate } from 'react-router-dom'
import ErrorBox from '../components/ErrorBox'

const Root = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  )
}

const Login = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  const navigate = useNavigate()

  const { mutate: userLogin, isError: isLoginError, isLoading } = usePostUserCredentials()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const handleUserLogin = () => {
    const userPayload = {
      email,
      password,
    }
    userLogin(userPayload, {
      onSuccess: () => {
        navigate('/user-content')
      },
    })
  }

  return (
    <Root>
      <Card
        sx={{
          height: '60%',
          width: '70%',
          maxHeight: 500,
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography variant="h3">LOGIN</Typography>
        <Box
          sx={{
            m: 2,
            width: '50%',
          }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            label="Email"
            value={email}
            onChange={handleEmail}
          />
        </Box>
        <Box
          sx={{
            m: 2,
            width: '50%',
          }}
        >
          <TextField
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="standard"
            label="Password"
            value={password}
            onChange={handlePassword}
          />
        </Box>
        {/**tähän se largeactionbutton tai smallactionbutton */}
        <Button onClick={handleUserLogin}>LOGIN</Button>
        {isLoginError ? (
          <ErrorBox
            isLoading={isLoading}
            message="Error accured during login, please check your email and password."
          />
        ) : null}
        <ErrorBox
          isLoading={isLoading}
          message="Error accured during login, please check your email and password."
        />
      </Card>
    </Root>
  )
}

export default Login
