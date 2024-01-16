import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Background from './components/Background'
import UserContent from './pages/UserContent'

const App = (): JSX.Element => {
  return (
    <Background>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-content" element={<UserContent />} />
      </Routes>
    </Background>
  )
}

export default App
