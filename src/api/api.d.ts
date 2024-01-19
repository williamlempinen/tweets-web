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
  commentOwner: User | string //option for string during development
  onTweet: Tweet
  content: string
  likes: number
  timeStamp: Date
}

type Tweet = {
  id: number
  title: string
  content: string
  tweetComments: CommentType[] | []
  likes: number
  ownerName: string
  timeStamp: Date
} | null
