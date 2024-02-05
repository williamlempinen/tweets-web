import axios from 'axios'

//const URL = import.meta.env.VITE_API_URL
const URL = import.meta.env.VITE_API_URL_LOCAL

type JavaTweetsApiClientReturnType = {
  postUserLogin: (userCredentials: UserLoginDTO) => Promise<User>
  getFindAllTweets: (page: number, size: number) => Promise<TweetFindAllResponse>
  getFindAllTweetsFriends: (userId: number) => Promise<Tweet[]>
  postNewTweet: (tweet: PostTweet) => Promise<void>
  postLikeTweet: (userLike: PostLikeTweet) => Promise<void>
  postAddComment: (comment: PostComment) => Promise<void>
  postLikeComment: (userLike: PostLikeComment) => Promise<void>
  deleteTweet: (tweetId: number) => Promise<void>
}

export const javaTweetsApiClient = (): JavaTweetsApiClientReturnType => {
  const postUserLogin = (userCredentials: UserLoginDTO) =>
    axios.post(`${URL}/user/login`, userCredentials).then((response) => response.data)

  const getFindAllTweets = (page: number, size: number) =>
    axios.get(`${URL}/tweet/find-all`, { params: { page, size } }).then((response) => response.data)

  const getFindAllTweetsFriends = (userId: number) =>
    axios.get(`${URL}/tweet/find-by-friends`, { params: { userId } }).then((response) => response.data)

  const postNewTweet = (tweet: PostTweet) =>
    axios.post(`${URL}/tweet/post-tweet`, tweet).then((response) => response.data)

  const postLikeTweet = (userLike: PostLikeTweet) =>
    axios.post(`${URL}/tweet`, userLike).then((response) => response.data)

  const postAddComment = (comment: PostComment) =>
    axios.post(`${URL}/tweet/comments`, comment).then((response) => response.data)

  const postLikeComment = (userLike: PostLikeComment) =>
    axios.post(`${URL}/comment`, userLike).then((response) => response.data)

  const deleteTweet = (tweetId: number) =>
    axios.delete(`${URL}/tweet`, { params: { tweetId } }).then((response) => response.data)

  return {
    postUserLogin,
    getFindAllTweets,
    getFindAllTweetsFriends,
    postNewTweet,
    postLikeTweet,
    postAddComment,
    postLikeComment,
    deleteTweet,
  }
}
