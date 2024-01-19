import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

type JavaTweetsApiClientReturnType = {
  postUserLogin: (userCredentials: UserLoginDTO) => Promise<User>
  getFindAllTweets: () => Promise<Tweet[]>
}

export const javaTweetsApiClient = (): JavaTweetsApiClientReturnType => {
  const postUserLogin = (userCredentials: UserLoginDTO) =>
    axios.post(`${URL}/user/login`, userCredentials).then((response) => response.data)

  const getFindAllTweets = () => axios.get(`${URL}/tweet/find-all`).then((response) => response.data)

  return {
    postUserLogin,
    getFindAllTweets,
  }
}
