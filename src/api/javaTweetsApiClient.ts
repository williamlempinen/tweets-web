import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

type JavaTweetsApiClientReturnType = {
  postUserLogin: (userCredentials: UserLoginDTO) => Promise<User>
  getFindAllTweets: () => Promise<Tweet[]>
  getFindAllTweetsFriends: (userId: number) => Promise<Tweet[]>
  postNewTweet: (tweet: PostTweet) => Promise<void>
  postLikeTweet: (tweetId: number, userId: number) => Promise<void>
  postAddComment: (comment: PostComment) => Promise<void>
  postLikeComment: (commentId: number, userId: number) => Promise<void>
}

export const javaTweetsApiClient = (): JavaTweetsApiClientReturnType => {
  const postUserLogin = (userCredentials: UserLoginDTO) =>
    axios.post(`${URL}/user/login`, userCredentials).then((response) => response.data)

  const getFindAllTweets = () => axios.get(`${URL}/tweet/find-all`).then((response) => response.data)

  const getFindAllTweetsFriends = (userId: number) =>
    axios.get(`${URL}/tweet/find-by-friends`, { params: { userId } }).then((response) => response.data)

  const postNewTweet = (tweet: PostTweet) =>
    axios.post(`${URL}/tweet/post-tweet`, null, { params: tweet }).then((response) => response.data)

  const postLikeTweet = (tweetId: number, userId: number) =>
    axios.post(`${URL}/tweet`, null, { params: { tweetId, userId } }).then((response) => response.data)

  const postAddComment = (comment: PostComment) =>
    axios.post(`${URL}/tweet/comments`, null, { params: comment }).then((response) => response.data)

  const postLikeComment = (commentId: number, userId: number) =>
    axios.post(`${URL}/comment`, null, { params: { commentId, userId } }).then((response) => response.data)

  return {
    postUserLogin,
    getFindAllTweets,
    getFindAllTweetsFriends,
    postNewTweet,
    postLikeTweet,
    postAddComment,
    postLikeComment
  }
}
