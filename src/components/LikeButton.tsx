import { Tooltip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

const LikeButton = ({onClick}: {onClick: () => void}): JSX.Element => {
  return (
    <>
      <Tooltip title="Like">
        <IconButton onClick={onClick}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default LikeButton
