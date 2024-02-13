import * as React from 'react'
import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { javaTweetsApiClient } from './api/javaTweetsApiClient'
import { AppContext } from './AppContext'

export const usePostUserCredentials = () => {
  const { postUserLogin } = javaTweetsApiClient()

  return useMutation((payload: UserLoginDTO) => postUserLogin(payload))
}

export const useFindAllTweets = () => {
  const { getFindAllTweets } = javaTweetsApiClient()

  return useInfiniteQuery<TweetFindAllResponse>(
    ['find-all-tweets'],
    ({ pageParam = 0 }) => getFindAllTweets(pageParam, 10),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (!lastPage.last) {
          return lastPage.number + 1
        }
        return undefined
      },
    }
  )
}

//TODO ##########################################################
export const useFindAllTweetsFriends = (userId: number) => {
  const { getFindAllTweetsFriends } = javaTweetsApiClient()

  return useQuery<Tweet[]>(['find-all-tweets-friends', userId], () => getFindAllTweetsFriends(userId), {
    refetchOnWindowFocus: false,
  })
}
//TODO ##########################################################

export const usePostTweet = (username: string) => {
  const { postNewTweet } = javaTweetsApiClient()

  const { user } = React.useContext(AppContext)

  const queryClient = useQueryClient()

  return useMutation((tweet: PostTweet) => postNewTweet(tweet), {
    onMutate: async (tweet) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<{ pages: { content: Tweet[] }[] }>(['find-all-tweets'])

      if (previousTweets) {
        const newTweet = {
          ...tweet,
          id: Math.random(),
          ownerId: user?.id,
          ownerEmail: user?.email,
          tweetComments: [],
          likes: [],
          ownerName: username,
          timeStamp: new Date(),
          likesCount: 0,
        }
        const updatedPages = [...previousTweets.pages]

        if (updatedPages.length > 0) {
          updatedPages[0].content = [newTweet, ...updatedPages[0].content]
        } else {
          updatedPages.push({ content: [newTweet] })
        }
        queryClient.setQueryData(['find-all-tweets'], { ...previousTweets, pages: updatedPages })
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

  return useMutation((tweetId: number) => postLikeTweet({ tweetId, userId }), {
    onMutate: async (tweetId) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<{ pages: { content: Tweet[] }[] }>(['find-all-tweets'])

      if (previousTweets) {
        const updatedPages = previousTweets.pages.map((page) => ({
          ...page,
          content: page.content.map((tweet) => {
            if (tweet?.id === tweetId) {
              const isLiked = tweet.likes.includes(userId)
              const newLikes = isLiked ? tweet.likes.filter((id) => id !== userId) : [...tweet.likes, userId]
              return {
                ...tweet,
                likes: newLikes,
                likesCount: isLiked ? tweet.likesCount - 1 : tweet.likesCount + 1,
              }
            }
            return tweet
          }),
        }))
        queryClient.setQueryData(['find-all-tweets'], { ...previousTweets, pages: updatedPages })
      }
      return { previousTweets }
    },
    onError: (err, tweetId, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData(['find-all-tweets'], context.previousTweets)
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
      const previousTweets = queryClient.getQueryData<{ pages: { content: Tweet[] }[] }>(['find-all-tweets'])

      if (previousTweets) {
        const updatedPages = previousTweets.pages.map((page) => ({
          ...page,
          content: page.content.map((tweet) => {
            if (tweet?.id === newComment.tweetId) {
              return {
                ...tweet,
                tweetComments: [
                  ...tweet?.tweetComments,
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
          }),
        }))
        queryClient.setQueryData(['find-all-tweets'], { ...previousTweets, pages: updatedPages })
        return { previousTweets }
      }
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

  return useMutation((commentId: number) => postLikeComment({ commentId, userId }), {
    onMutate: async (commentId) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<{ pages: { content: Tweet[] }[] }>(['find-all-tweets'])

      if (previousTweets) {
        const updatedPages = previousTweets.pages.map((page) => ({
          ...page,
          content: page.content.map((tweet) => ({
            ...tweet,
            tweetComments: tweet?.tweetComments.map((comment) => {
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
            }),
          })),
        }))
        queryClient.setQueryData(['find-all-tweets'], { ...previousTweets, pages: updatedPages })
      }
      return { previousTweets }
    },
    onError: (err, commentId, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData(['find-all-tweets'], context.previousTweets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['find-all-tweets'])
    },
  })
}

export const useDeleteTweet = () => {
  const { deleteTweet } = javaTweetsApiClient()

  const queryClient = useQueryClient()

  return useMutation((tweetId: number) => deleteTweet(tweetId), {
    onMutate: async (tweetId) => {
      await queryClient.cancelQueries(['find-all-tweets'])
      const previousTweets = queryClient.getQueryData<{ pages: { content: Tweet[] }[] }>(['find-all-tweets'])

      if (previousTweets) {
        const updatedPages = previousTweets?.pages.map((page) => ({
          ...page,
          content: page.content.filter((tweet?) => tweet?.id !== tweetId),
        }))

        queryClient.setQueryData(['find-all-tweets'], { ...previousTweets, pages: updatedPages })
      }
      return { previousTweets }
    },
    onError: (err, commentId, context) => {
      if (context?.previousTweets) {
        queryClient.setQueryData(['find-all-tweets'], context.previousTweets)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['find-all-tweets'])
    },
  })
}

export const useAddUserFriend = () => {
  const { postAddFriend } = javaTweetsApiClient()

  const { user } = React.useContext(AppContext)

  return useMutation((userFriendEvent: UserFriendStatus) => postAddFriend(userFriendEvent), {
    onMutate: (userFriendEvent) => {
      if (user) {
        const newFriend: UserFriend = {
          id: userFriendEvent.friendUserId,
          name: userFriendEvent.friendUserName,
          email: userFriendEvent.friendUserEmail,
        }
        const updatedFriends = [...user.friendsList, newFriend]

        return { ...user, friendsList: updatedFriends }
      }
    },
  })
}

export const useDeleteFriendUser = () => {
  const { deleteRemoveFriend } = javaTweetsApiClient()

  const { user } = React.useContext(AppContext)

  return useMutation((userFriendEvent: UserFriendStatus) => deleteRemoveFriend(userFriendEvent), {
    onMutate: (userFriendEvent) => {
      if (user) {
        const updatedFriends = user.friendsList.filter(
          (friend: UserFriend) => friend.name !== userFriendEvent.friendUserName
        )

        return { ...user, friendsList: updatedFriends }
      }
    },
  })
}
