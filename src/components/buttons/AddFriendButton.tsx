import { IconButton, Tooltip } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import theme from '../../theme'

const AddFriendButton = ({ isFriend, onClick }: { isFriend: boolean; onClick: () => void }): JSX.Element => {
  return (
    <Tooltip title={isFriend ? 'Remove from friends' : 'Add as friend'}>
      <IconButton onClick={onClick}>
        <GroupIcon fontSize="small" sx={{ color: isFriend ? theme.palette.secondary.main : '' }} />
      </IconButton>
    </Tooltip>
  )
}

export default AddFriendButton
