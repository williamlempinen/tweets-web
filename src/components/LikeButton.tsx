import { Tooltip, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import theme from '../theme'

const LikeButton = ({ onClick, isLiked }: { onClick: () => void; isLiked: boolean }): JSX.Element => {
  return (
    <>
      <Tooltip title="Like">
        <IconButton onClick={onClick}>
          <FavoriteIcon fontSize="small" sx={{ color: isLiked ? theme.palette.secondary.main : '' }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default LikeButton
