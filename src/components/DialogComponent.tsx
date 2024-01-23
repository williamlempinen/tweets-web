import * as React from 'react'
import { Box, TextField, InputAdornment, Dialog, DialogTitle } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import TitleIcon from '@mui/icons-material/Title'
import theme from '../theme'
import LargeActionButton from './LargeActionButton'
import LinearLoadingProgress from './LinearLoadingProgress'
import { usePostTweet } from '../querys'
import { AppContext } from '../AppContext'
import ErrorBox from './ErrorBox'

const DialogComponent = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: (arg: boolean) => void
}): JSX.Element => {
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')
  const [textFieldError, setTextFieldError] = React.useState<{ title: boolean; content: boolean }>({
    title: false,
    content: false,
  })

  const { user } = React.useContext(AppContext)

  const { mutate: postTweet, isError, isLoading } = usePostTweet(user?.name)

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setContent(event.target.value)
  }

  const handleTweetPost = () => {
    const textFieldError = {
      title: title === '',
      content: content === '',
    }
    setTextFieldError(textFieldError)

    if (!textFieldError.title && !textFieldError.content) {
      const tweetPayload = {
        userId: user?.id,
        title: title,
        content: content,
      }
      postTweet(tweetPayload, {
        onSuccess: () => {
          setTitle('')
          setContent('')
          handleClose(!open)
        },
      })
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle color={theme.palette.secondary.main} variant="h4">
        Post a Tweet
      </DialogTitle>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, gap: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon color="primary" />
              </InputAdornment>
            ),
          }}
          variant="standard"
          label="Title"
          focused
          inputProps={{ maxLength: 30 }}
          sx={{ width: '60%', '& input': { textAlign: 'center' } }}
          value={title}
          onChange={handleTitle}
          error={textFieldError.title}
          helperText={textFieldError.title ? 'Title can not be empty' : ''}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Content"
          focused
          multiline
          inputProps={{ maxLength: 255 }}
          value={content}
          onChange={handleContent}
          error={textFieldError.content}
          helperText={textFieldError.content ? 'Content can not be empty' : ''}
        />
        <LargeActionButton Icon={SendIcon} onClick={handleTweetPost} buttonText="Tweet" />
        {isError ? <ErrorBox isLoading={isLoading} message="Something went wrong during tweeting :(" /> : null}
        {isLoading ? <LinearLoadingProgress /> : null}
      </Box>
    </Dialog>
  )
}

export default DialogComponent
