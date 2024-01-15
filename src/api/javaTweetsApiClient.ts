import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

type JavaTweetsApiClientReturnType = {
  userLogin: (userCredentials: User) => Promise<void>
}

export const javaTweetsApiClient = (): JavaTweetsApiClientReturnType => {
  const userLogin = (userCredentials: User) =>
    axios.post(`${URL}/api/user/login`, userCredentials).then((response) => response.data)

  return {
    userLogin,
  }
}
