import * as React from 'react'
import { Card, Box, Typography, Tooltip, IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import theme from '../theme'
import LikeButton from './LikeButton'
import { format } from 'date-fns'

//card is not responsive

const TweetCard = ({ tweet }: { tweet: Tweet }): JSX.Element => {
  const [openComments, setOpenComments] = React.useState<{ [key: string]: boolean }>({})

  const handleToggleTweetComments = (tweetId: number) => {
    if (tweetId !== undefined) {
      setOpenComments((prev) => ({ ...prev, [tweetId.toString()]: !prev[tweetId.toString()] }))
    }
  }

  return (
    <>
      <Card key={`${tweet?.id}-${tweet?.timeStamp}`} elevation={4} sx={{ width: '95%', my: 2, p: 1, minHeight: 150 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mx: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption" color="text.secondary">
              {format(new Date(tweet?.timeStamp), 'H:m')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(tweet?.timeStamp), 'dd/MM/yyyy')}
            </Typography>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LikeButton id={tweet?.id} />
            <Typography variant="caption" color="text.secondary">
              {`${tweet?.likes} likes`}
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
                fullWidth
                placeholder="Add a comment"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Send">
                      <IconButton>
                        <SendIcon sx={{ color: theme.palette.secondary.main }} />
                      </IconButton>
                    </Tooltip>
                  ),
                }}
              ></TextField>
            </Card>
            {tweet?.tweetComments?.map((comment) => (
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
                <Box sx={{ flexWrap: 'wrap', maxWidth: 900 }}>
                  <Typography variant="caption" color="text.secondary" key={comment.id}>
                    {`${comment.commentOwner} - ${comment.timeStamp.toISOString().substring(0, 10)}`}
                  </Typography>
                  <Typography key={comment.id}>{comment.content}</Typography>
                </Box>
                <Box>
                  <LikeButton id={comment?.id} />
                  <Typography variant="caption" color="text.secondary" key={comment.id}>
                    {`${comment.likes} likes`}
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
