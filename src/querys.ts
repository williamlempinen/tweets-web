import { useMutation } from '@tanstack/react-query'
import { javaTweetsApiClient } from './api/javaTweetsApiClient'

export const usePostUserCredentials = () => {
  const { userLogin } = javaTweetsApiClient()

  return useMutation((payload: UserLoginDTO) => userLogin(payload))
}
