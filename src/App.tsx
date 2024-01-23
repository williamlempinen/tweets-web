import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Background from './components/Background'
import UserContent from './pages/UserContent'
import UserProfile from './pages/UserProfile'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem('user')

  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/login" />
}

const App = (): JSX.Element => {
  return (
    <Background>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-content"
          element={
            <PrivateRoute>
              <UserContent />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Background>
  )
}

export default App
