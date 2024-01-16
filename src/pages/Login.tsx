import * as React from 'react'
import {
  Card,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  LinearProgress,
} from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password'
import MailIcon from '@mui/icons-material/Mail'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import LoginIcon from '@mui/icons-material/Login'
import { usePostUserCredentials } from '../querys'
import { useNavigate } from 'react-router-dom'
import ErrorBox from '../components/ErrorBox'
import LargeActionButton from '../components/LargeActionButton'

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

const LoadingProgress = (): JSX.Element => {
  return (
    <Stack sx={{ width: '90%', color: 'grey.500', gap: 1, position: 'absolute', top: '90%' }}>
      <LinearProgress color="primary" />
      <LinearProgress color="secondary" />
    </Stack>
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
          minHeight: 300,
          maxHeight: 500,
          maxWidth: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography variant="h3" color="primary.main">
          LOGIN
        </Typography>
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
                  <MailIcon color="primary" />
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
                  <PasswordIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <VisibilityOff color="primary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
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
        <LargeActionButton
          onClick={handleUserLogin}
          buttonText="LOGIN"
          Icon={LoginIcon}
          isLoading={isLoading}
        />
        {isLoginError ? (
          <ErrorBox
            isLoading={isLoading}
            message="Error during login, check your email and password."
          />
        ) : null}
        {isLoading ? <LoadingProgress /> : null}
        {/**tänne footer, jossa oma oma nimi */}
      </Card>
    </Root>
  )
}

export default Login
