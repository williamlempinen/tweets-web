type UserLoginDTO = {
  email: string
  password: string
}

type User = {
  id: number
  name: string
  email: string
  tweetList: Tweet[] | []
  commentList: CommentType[] | []
  friends: string[] | []
}

type CommentType = {
  id: number
  ownerName: string 
  onTweet: Tweet
  content: string
  likes: number[]
  likesCount: number
  timeStamp: Date
}

type Tweet = {
  id: number
  title: string
  content: string
  tweetComments: CommentType[] | []
  likes: number[]
  ownerName: string
  timeStamp: Date
  likesCount: number
} | null

type PostTweet = {
  userId: number
  title: string
  content: string
}

type PostComment = {
  tweetId: number
  userId: number | undefined
  content: string
}
