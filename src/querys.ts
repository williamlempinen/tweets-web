import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { javaTweetsApiClient } from './api/javaTweetsApiClient'

export const usePostUserCredentials = () => {
  const { postUserLogin } = javaTweetsApiClient()

  return useMutation((payload: UserLoginDTO) => postUserLogin(payload))
}

export const useFindAllTweets = () => {
  const { getFindAllTweets } = javaTweetsApiClient()

  return useQuery<Tweet[]>(['find-all-tweets'], () => getFindAllTweets(), { refetchOnWindowFocus: false })
}

export const useFindAllTweetsFriends = (userId: number) => {
  const { getFindAllTweetsFriends } = javaTweetsApiClient()

  return useQuery<Tweet[]>(['find-all-tweets-friends', userId], () => getFindAllTweetsFriends(userId), {
    refetchOnWindowFocus: false,
  })
}

export const usePostTweet = (username: string) => {
  const { postNewTweet } = javaTweetsApiClient()

  const queryClient = useQueryClient()

  return useMutation((tweet: PostTweet) => postNewTweet(tweet), {
    onMutate: async (tweet) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<Tweet[]>(['find-all-tweets'])

      if (previousTweets) {
        queryClient.setQueryData<Tweet[]>(
          ['find-all-tweets'],
          [
            ...previousTweets,
            {
              ...tweet,
              id: Math.random(),
              tweetComments: [],
              likes: [],
              ownerName: username,
              timeStamp: new Date(),
              likesCount: 0,
            },
          ]
        )
      }
      return { previousTweets }
    },
    onError: (err, newTweet, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData(['find-all-tweets'], context.previousTweets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['find-all-tweets'])
    },
  })
}

export const usePostLikeTweet = (userId: number) => {
  const { postLikeTweet } = javaTweetsApiClient()

  const queryClient = useQueryClient()

  return useMutation((tweetId: number) => postLikeTweet(tweetId, userId), {
    onMutate: async (tweetId) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<Tweet[]>(['find-all-tweets'])

      if (previousTweets) {
        queryClient.setQueryData<Tweet[]>(
          ['find-all-tweets'],
          previousTweets.map((tweet) => {
            if (tweet?.id === tweetId) {
              const isLiked = tweet.likes.includes(userId)
              const newLikes = isLiked ? tweet.likes.filter((id) => id !== userId) : [...tweet.likes, userId]
              return { ...tweet, likes: newLikes, likesCount: isLiked ? tweet.likesCount - 1 : tweet.likesCount + 1 }
            }
            return tweet
          })
        )
      }

      return { previousTweets }
    },
    onError: (err, tweetId, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData<Tweet[]>(['find-all-tweets'], context.previousTweets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['find-all-tweets'])
    },
  })
}

export const usePostAddComment = (username: string) => {
  const { postAddComment } = javaTweetsApiClient()
  const queryClient = useQueryClient()

  return useMutation((comment: PostComment) => postAddComment(comment), {
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<Tweet[]>(['find-all-tweets'])

      if (previousTweets) {
        queryClient.setQueryData<Tweet[]>(
          ['find-all-tweets'],
          previousTweets.map((tweet) => {
            if (tweet?.id === newComment.tweetId) {
              return {
                ...tweet,
                tweetComments: [
                  ...tweet.tweetComments,
                  {
                    id: Math.random(),
                    onTweet: tweet,
                    ownerName: username,
                    content: newComment.content,
                    likesCount: 0,
                    likes: [],
                    timeStamp: new Date(),
                  },
                ],
              }
            }
            return tweet
          })
        )
      }
      return { previousTweets }
    },
    onError: (err, newComment, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData(['find-all-tweets'], context.previousTweets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['find-all-tweets'])
    },
  })
}

export const usePostLikeComment = (userId: number) => {
  const { postLikeComment } = javaTweetsApiClient()

  const queryClient = useQueryClient()

  return useMutation((commentId: number) => postLikeComment(commentId, userId), {
    onMutate: async (commentId) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<Tweet[]>(['find-all-tweets'])

      if (previousTweets) {
        queryClient.setQueryData<Tweet[]>(
          ['find-all-tweets'],
          previousTweets.map((tweet) => {
            if (!tweet) {
              return null
            }
            const updatedComments = tweet?.tweetComments.map((comment) => {
              if (comment.id === commentId) {
                const isLiked = comment.likes.includes(userId)
                const newLikes = isLiked ? comment.likes.filter((id) => id !== userId) : [...comment.likes, userId]
                return {
                  ...comment,
                  likes: newLikes,
                  likesCount: isLiked ? comment.likesCount - 1 : comment.likesCount + 1,
                }
              }
              return comment
            })
            return { ...tweet, tweetComments: updatedComments }
          })
        )
      }
      return { previousTweets }
    },
    onError: (err, commentId, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData<Tweet[]>(['find-all-tweets'], context.previousTweets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['find-all-tweets'])
    },
  })
}
