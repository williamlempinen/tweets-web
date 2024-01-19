import { Tooltip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const LikeButton = ({ id }: { id: number | undefined }): JSX.Element => {
  const handleLike = () => {
    console.log('liked')
  }
  return (
    <>
      <Tooltip title="Like">
        <IconButton id={`${id}`} onClick={handleLike}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default LikeButton
