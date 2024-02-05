import * as React from 'react'
import { Card, Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password'
import MailIcon from '@mui/icons-material/Mail'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import LoginIcon from '@mui/icons-material/Login'
import { usePostUserCredentials } from '../querys'
import { useNavigate } from 'react-router-dom'
import ErrorBox from '../components/ErrorBox'
import LargeActionButton from '../components/LargeActionButton'
import LinearLoadingProgress from '../components/LinearLoadingProgress'
import { AppContext } from '../AppContext'

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
        {children}
      </Card>
    </Box>
  )
}

const Login = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [textFieldError, setTextFieldError] = React.useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  })

  const { setUser } = React.useContext(AppContext)

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
    const textFieldError = {
      email: email === '',
      password: password === '',
    }
    setTextFieldError(textFieldError)

    if (!textFieldError.email && !textFieldError.password) {
      const userPayload = {
        email,
        password,
      }
      userLogin(userPayload, {
        onSuccess: (user) => {
          if (user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            navigate('/user-content')
            setUser(user)
          }
        },
      })
    }
  }

  return (
    <Root>
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
          error={textFieldError.email}
          helperText={textFieldError.email ? 'Email can not be empty' : ''}
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
                  {showPassword ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          variant="standard"
          label="Password"
          value={password}
          onChange={handlePassword}
          error={textFieldError.password}
          helperText={textFieldError.password ? 'Password can not be empty' : ''}
        />
      </Box>
      <LargeActionButton onClick={handleUserLogin} buttonText="LOGIN" Icon={LoginIcon} isLoading={isLoading} />
      {isLoginError ? (
        <ErrorBox isLoading={isLoading} message="Error during login, check your email and password." />
      ) : null}
      {isLoading ? <LinearLoadingProgress absolute={true} /> : null}
    </Root>
  )
}

export default Login
