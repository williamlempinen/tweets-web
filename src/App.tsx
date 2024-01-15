import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './Layout'
import UserContent from './pages/UserContent'

const App = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-content" element={<UserContent />} />
      </Routes>
    </Layout>
  )
}

export default App
