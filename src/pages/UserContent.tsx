import * as React from 'react'
import { Box, Card, Skeleton, Typography } from '@mui/material'
import ContentPaper from '../components/ContentPaper'
import TweetCard from '../components/TweetCard'
import { useFindAllTweets } from '../querys'
import ErrorBox from '../components/ErrorBox'
import theme from '../theme'

const Root = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <ContentPaper>
      <Box
        sx={{
          width: '90%',
          height: '90%',
          display: ' flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </ContentPaper>
  )
}

const LoadingSkeleton = (): JSX.Element => {
  return (
    <Card sx={{ width: '95%', my: 2, p: 1 }}>
      <Skeleton width="100%" height={150} />
      <Skeleton width="100%" height={150} />
      <Skeleton width="100%" height={150} />
    </Card>
  )
}

const UserContent = (): JSX.Element => {
  const [isData, setIsData] = React.useState<boolean>(true)

  const { data = [], isError, isLoading, refetch } = useFindAllTweets()

  React.useEffect(() => {
    setIsData(!isLoading && (data.length !== 0 ? true : false))
  }, [data, isLoading])
  const tweets = [...data].reverse()

  if (isError) {
    return (
      <Root>
        <ErrorBox isLoading={isLoading} message="Error happened :(" onClick={refetch} buttonText="Try again" />
      </Root>
    )
  }

  if (isLoading) {
    return (
      <Root>
        <LoadingSkeleton />
      </Root>
    )
  }

  if (!isData) {
    return (
      <Root>
        <Box sx={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: 1, px: 1, py: 2 }}>
          <Typography variant="h6" color="text.primary">
            No tweets yet, be the first to tweet something!!
          </Typography>
        </Box>
      </Root>
    )
  }

  return (
    <Root>
      {tweets.map((tweet, index) => (
        <TweetCard key={`${tweet?.id}-${index}`} tweet={tweet} />
      ))}
    </Root>
  )
}

export default UserContent
