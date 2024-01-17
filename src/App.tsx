import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Background from './components/Background'
import UserContent from './pages/UserContent'
import UserProfile from './pages/UserProfile'

const App = (): JSX.Element => {
  return (
    <Background>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-content" element={<UserContent />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Background>
  )
}

export default App
