import { useMutation, useQuery } from '@tanstack/react-query'
import { javaTweetsApiClient } from './api/javaTweetsApiClient'

export const usePostUserCredentials = () => {
  const { postUserLogin } = javaTweetsApiClient()

  return useMutation((payload: UserLoginDTO) => postUserLogin(payload))
}

export const useFindAllTweets = () => {
  const { getFindAllTweets } = javaTweetsApiClient()

  return useQuery<Tweet[]>(['find-all-tweets'], () => getFindAllTweets(), { refetchOnWindowFocus: false })
}
