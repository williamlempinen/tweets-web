import axios from 'axios'
const URL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: URL,
})

apiClient.interceptors.request.use(
  (config) => {
    const user = sessionStorage.getItem('user')
    if (user) {
      const token = JSON.parse(user).token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)

type JavaTweetsApiClientReturnType = {
  postUserLogin: (userCredentials: UserLoginDTO) => Promise<UserDTO>
  getFindAllTweets: (page: number, size: number) => Promise<TweetFindAllResponse>
  getFindAllTweetsFriends: (userId: number) => Promise<Tweet[]>
  postNewTweet: (tweet: PostTweet) => Promise<void>
  postLikeTweet: (userLike: PostLikeTweet) => Promise<void>
  postAddComment: (comment: PostComment) => Promise<void>
  postLikeComment: (userLike: PostLikeComment) => Promise<void>
  deleteTweet: (tweetId: number) => Promise<void>
  postAddFriend: (userFriendEvent: UserFriendStatus) => Promise<UserDTO>
  deleteRemoveFriend: (userFriendEvent: UserFriendStatus) => Promise<UserDTO>
  getUpdatedUserFriends: (userId: number) => Promise<void>
  getSearchUsers: (queryParams: string, page: number, size: number) => Promise<UserSearch>
}

export const javaTweetsApiClient = (): JavaTweetsApiClientReturnType => {
  const postUserLogin = (userCredentials: UserLoginDTO) =>
    apiClient.post(`/user/login`, userCredentials).then((response) => response.data)

  const getFindAllTweets = (page: number, size: number) =>
    apiClient.get(`/tweet/find-all`, { params: { page, size } }).then((response) => response.data)

  const getFindAllTweetsFriends = (userId: number) =>
    apiClient.get(`/tweet/find-by-friends`, { params: { userId } }).then((response) => response.data)

  const postNewTweet = (tweet: PostTweet) =>
    apiClient.post(`/tweet/post-tweet`, tweet).then((response) => response.data)

  const postLikeTweet = (userLike: PostLikeTweet) =>
    apiClient.post(`/tweet`, userLike).then((response) => response.data)

  const postAddComment = (comment: PostComment) =>
    apiClient.post(`/tweet/comments`, comment).then((response) => response.data)

  const postLikeComment = (userLike: PostLikeComment) =>
    apiClient.post(`/comment`, userLike).then((response) => response.data)

  const deleteTweet = (tweetId: number) =>
    apiClient.delete(`/tweet`, { params: { tweetId } }).then((response) => response.data)

  const postAddFriend = (userFriendEvent: UserFriendStatus) =>
    apiClient.post(`/user`, userFriendEvent).then((response) => response.data)

  const deleteRemoveFriend = (userFriendEvent: UserFriendStatus) =>
    apiClient.delete(`/user`, { data: userFriendEvent }).then((response) => response.data)

  const getUpdatedUserFriends = (userId: number) =>
    apiClient.get(`/user/friends`, { params: { userId } }).then((response) => response.data)

  const getSearchUsers = (queryParams: string, page: number, size: number) =>
    apiClient.get('user/search', { params: { queryParams, page, size } }).then((response) => response.data)

  return {
    postUserLogin,
    getFindAllTweets,
    getFindAllTweetsFriends,
    postNewTweet,
    postLikeTweet,
    postAddComment,
    postLikeComment,
    deleteTweet,
    postAddFriend,
    deleteRemoveFriend,
    getUpdatedUserFriends,
    getSearchUsers,
  }
}
