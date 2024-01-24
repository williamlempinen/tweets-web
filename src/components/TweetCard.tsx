import * as React from 'react'
import { Card, Box, Typography, Tooltip, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import theme from '../theme'
import LikeButton from './LikeButton'
import { format } from 'date-fns'
import { AppContext } from '../AppContext'
import { usePostAddComment, usePostLikeComment, usePostLikeTweet } from '../querys'
import ErrorDialog from './ErrorDialog'

const TweetCard = ({ tweet }: { tweet: Tweet }): JSX.Element => {
  const [openComments, setOpenComments] = React.useState<{ [key: string]: boolean }>({})
  const [comment, setComment] = React.useState<string>('')
  const [openErrorDialog, setOpenErrorDialog] = React.useState<boolean>(false)

  const { user } = React.useContext(AppContext)

  const { mutate: likeTweet } = usePostLikeTweet(user.id)

  const { mutate: addComment } = usePostAddComment(user.name)

  const { mutate: likeComment } = usePostLikeComment(user.id)

  const handleLikeTweet = (tweetId: number) => {
    if (user.id && tweetId) {
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
    if (user.id && commentId) {
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

  return (
    <>
      <Card key={`${tweet?.id}-${tweet?.timeStamp}`} elevation={4} sx={{ width: '95%', my: 2, p: 1, minHeight: 150 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mx: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {tweet?.timeStamp ? (
              <>
                <Typography variant="caption" color="text.secondary">
                  {format(new Date(tweet.timeStamp), 'HH:mm')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {format(new Date(tweet.timeStamp), 'dd/MM/yyyy')}
                </Typography>
              </>
            ) : (
              <Typography variant="caption">No timestamp</Typography>
            )}
            <Typography variant="subtitle2" color="text.primary">
              {tweet?.ownerName}
            </Typography>
          </Box>
          <Typography variant="h4" color="text.primary">
            {tweet?.title}
          </Typography>
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
            <LikeButton isLiked={tweet?.likes.includes(user.id)} onClick={() => handleLikeTweet(tweet.id)} />
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
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                placeholder="Add a comment"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Send">
                      <IconButton onClick={() => handleAddNewComment(tweet.id)}>
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
                  <Typography variant="caption" color="text.secondary">
                    {`${comment.ownerName} - ${format(new Date(tweet?.timeStamp), 'dd/MM/yyyy')}`}
                  </Typography>
                  <Typography>{comment.content}</Typography>
                </Box>
                <Box>
                  <LikeButton
                    isLiked={comment?.likes.includes(user.id)}
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
