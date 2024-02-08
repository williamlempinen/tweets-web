type UserLoginDTO = {
  email: string
  password: string
}

type UserFriend = {
  id: number
  name: string
  email: string
  tweetList: null
  commentList: null
  friends: null
}

type UserDTO = {
  id: number
  name: string
  email: string
  tweetList: Tweet[] | []
  commentList: CommentType[] | []
  friendsList: UserFriend[] | []
}

type Pagination = {
  pageNumber: number
  pageSize: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

type TweetFindAllResponse = {
  content: Tweet[] | []
  pageable: Pagination
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
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
  ownerId: number | undefined
  ownerEmail: string | undefined
  title: string
  content: string
  tweetComments: CommentType[] | []
  likes: number[]
  ownerName: string
  timeStamp: Date | string
  likesCount: number
} | null

type PostTweet = {
  userId: number
  userEmail: string
  title: string
  content: string
}

type PostComment = {
  tweetId: number
  userId: number | undefined
  content: string
}

type PostLikeTweet = {
  tweetId: number
  userId: number
}

type PostLikeComment = {
  commentId: number
  userId: number
}

type UserFriendStatus = {
  userId: number
  friendUserId: number
  friendUserName: string
  friendUserEmail: string
}
