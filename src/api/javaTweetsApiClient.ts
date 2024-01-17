import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

type JavaTweetsApiClientReturnType = {
  userLogin: (userCredentials: UserLoginDTO) => Promise<void>
}

export const javaTweetsApiClient = (): JavaTweetsApiClientReturnType => {
  const userLogin = (userCredentials: UserLoginDTO) =>
    axios.post(`${URL}/api/user/login`, userCredentials).then((response) => response.data)

  return {
    userLogin,
  }
}
