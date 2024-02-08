import * as React from 'react'
import { Card, Box, Typography, Tooltip, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import theme from '../theme'
import LikeButton from './buttons/LikeButton'
import { format } from 'date-fns'
import { AppContext } from '../AppContext'
import {
  useAddUserFriend,
  useDeleteFriendUser,
  useDeleteTweet,
  usePostAddComment,
  usePostLikeComment,
  usePostLikeTweet,
} from '../querys'
import ErrorDialog from './error/ErrorDialog'
import AddFriendButton from './buttons/AddFriendButton'

const TweetCard = ({ tweet }: { tweet: Tweet }): JSX.Element => {
  const [openComments, setOpenComments] = React.useState<{ [key: string]: boolean }>({})
  const [comment, setComment] = React.useState<string>('')
  const [openErrorDialog, setOpenErrorDialog] = React.useState<boolean>(false)
  const [isCommentEmpty, setIsCommentEmpty] = React.useState<boolean>(false)

  const { user, setUser } = React.useContext(AppContext)

  const { mutate: likeTweet } = usePostLikeTweet(user?.id ?? 0)

  const { mutate: addComment } = usePostAddComment(user?.name ?? '')

  const { mutate: likeComment } = usePostLikeComment(user?.id ?? 0)

  const { mutate: deleteTweet } = useDeleteTweet()

  const { mutate: addAsFriend } = useAddUserFriend()

  const { mutate: removeAsFriend } = useDeleteFriendUser()

  const handleLikeTweet = (tweetId: number) => {
    if (user?.id && tweetId) {
      likeTweet(tweetId, {
        onError: () => {
          setOpenErrorDialog(true)
          setTimeout(() => {
            setOpenErrorDialog(false)
          }, 3000)
        },
      })
    }
  }

  const handleLikeComment = (commentId: number) => {
    if (user?.id && commentId) {
      likeComment(commentId, {
        onError: () => {
          setOpenErrorDialog(true)
          setTimeout(() => {
            setOpenErrorDialog(false)
          }, 3000)
        },
      })
    }
  }

  const handleToggleTweetComments = (tweetId: number) => {
    if (tweetId !== undefined) {
      setOpenComments((prev) => ({ ...prev, [tweetId.toString()]: !prev[tweetId.toString()] }))
    }
  }

  const handleAddNewComment = (tweetId: number) => {
    if (comment.trim() === '') {
      setIsCommentEmpty(true)
      return
    }
    setIsCommentEmpty(false)

    const newComment = {
      tweetId: tweetId,
      userId: user?.id,
      content: comment,
    }
    setComment('')
    addComment(newComment, {
      onError: () => {
        setOpenErrorDialog(true)
        setTimeout(() => {
          setOpenErrorDialog(false)
        }, 3000)
      },
    })
  }

  const handleDeleteTweet = (tweetId: number) => {
    deleteTweet(tweetId, {
      onError: () => {
        setOpenErrorDialog(true)
        setTimeout(() => {
          setOpenErrorDialog(false)
        }, 3000)
      },
    })
  }

  const checkFriendship = (tweet: Tweet) => {
    return user?.friendsList?.some((friend) => friend.name === tweet?.ownerName)
  }

  const handleUserFriendship = (tweet: Tweet) => {
    const isFriend = checkFriendship(tweet)
    if (user?.id && tweet?.ownerId) {
      const userFriendStatusUpdate = {
        userId: user?.id,
        friendUserId: tweet?.ownerId,
        friendUserName: tweet?.ownerName ?? '',
        friendUserEmail: tweet?.ownerEmail ?? '',
      }

      if (isFriend) {
        removeAsFriend(userFriendStatusUpdate, {
          onSuccess: (user) => {
            setUser(user)
            sessionStorage.setItem('user', JSON.stringify(user))
          },
          onError: () => {
            setOpenErrorDialog(true)
            setTimeout(() => {
              setOpenErrorDialog(false)
            }, 3000)
          },
        })
        return
      }
      addAsFriend(userFriendStatusUpdate, {
        onSuccess: (user) => {
          setUser(user)
          sessionStorage.setItem('user', JSON.stringify(user))
        },
        onError: () => {
          setOpenErrorDialog(true)
          setTimeout(() => {
            setOpenErrorDialog(false)
          }, 3000)
        },
      })
    }
  }

  return (
    <>
      <Card
        key={`${tweet?.id}-${tweet?.timeStamp}`}
        elevation={4}
        sx={{ width: '95%', minWidth: 700, my: 2, p: 1, minHeight: 150 }}
      >
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mx: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {tweet?.timeStamp ? (
              <>
                <Typography variant="caption" color="text.secondary">
                  {format(tweet.timeStamp, 'HH:mm')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {format(tweet.timeStamp, 'dd/MM/yyyy')}
                </Typography>
              </>
            ) : (
              <Typography variant="caption">No timestamp</Typography>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="subtitle2"
                color={user?.name === tweet?.ownerName ? theme.palette.primary.main : 'text.primary'}
              >
                {tweet?.ownerName}
              </Typography>
              {user?.name !== tweet?.ownerName && (
                <AddFriendButton
                  isFriend={checkFriendship(tweet) ?? false}
                  onClick={() => handleUserFriendship(tweet)}
                />
              )}
            </Box>
          </Box>
          <Typography variant="h4" color="text.primary">
            {tweet?.title}
          </Typography>
          {user?.name === tweet?.ownerName && (
            <Tooltip title="Delete tweet">
              <IconButton onClick={() => tweet?.id && handleDeleteTweet(tweet.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box
          sx={{
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1rem',
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 1,
            px: 1,
            py: 2,
            m: 1,
            color: 'text.primary',
          }}
        >
          {tweet?.content}
        </Box>
        <ErrorDialog open={openErrorDialog} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LikeButton
              isLiked={tweet?.likes.includes(user?.id ?? 0)}
              onClick={() => handleLikeTweet(tweet?.id ?? 0)}
            />
            <Typography variant="caption" color="text.secondary">
              {`${tweet?.likesCount} likes`}
            </Typography>
            <Box>
              <Tooltip title="Add a comment">
                <IconButton onClick={() => tweet?.id && handleToggleTweetComments(tweet?.id)}>
                  <ExpandMoreIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography variant="caption" color="text.secondary">
                {`${tweet?.tweetComments?.length} comments`}
              </Typography>
            </Box>
          </Box>
        </Box>
        {tweet?.id && openComments[tweet?.id] ? (
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Card
              elevation={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                m: 1,
                p: 1,
              }}
            >
              <TextField
                variant="standard"
                value={comment}
                multiline
                inputProps={{ maxLength: 255 }}
                error={isCommentEmpty}
                helperText={isCommentEmpty ? "Comment can't be empty" : ''}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                placeholder="Add a comment"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Send">
                      <IconButton onClick={() => handleAddNewComment(tweet?.id ?? 0)}>
                        <SendIcon sx={{ color: theme.palette.secondary.main }} />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              />
            </Card>
            {tweet?.tweetComments?.map((comment) => (
              <Card
                key={`${tweet.id}-${comment.timeStamp}-${comment.id}`}
                elevation={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  m: 1,
                  p: 1,
                }}
              >
                <Box sx={{ flexWrap: 'wrap', maxWidth: 900 }}>
                  <Typography
                    variant="caption"
                    color={user?.name === comment.ownerName ? theme.palette.primary.main : 'text.secondary'}
                  >
                    {`${comment.ownerName} - ${format(new Date(tweet?.timeStamp), 'dd/MM/yyyy')}`}
                  </Typography>
                  <Typography>{comment.content}</Typography>
                </Box>
                <Box>
                  <LikeButton
                    isLiked={comment?.likes.includes(user?.id ?? 0)}
                    onClick={() => handleLikeComment(comment.id)}
                  />
                  <Typography variant="caption" color="text.secondary" key={comment.id}>
                    {`${comment.likesCount} likes`}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Card>
        ) : null}
      </Card>
    </>
  )
}

export default TweetCard
