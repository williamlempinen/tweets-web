import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { javaTweetsApiClient } from './api/javaTweetsApiClient'

export const usePostUserCredentials = () => {
  const { userLogin } = javaTweetsApiClient()

  return useMutation((payload: User) => userLogin(payload))
}
