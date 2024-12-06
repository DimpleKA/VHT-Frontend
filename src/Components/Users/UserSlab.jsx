import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

// Styled Badge for Green Dot
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const UserSlab = (props) => {
  const navigate = useNavigate();

  // Function to navigate to the chat page
  const gotoChatPage = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div
      className="flex items-center justify-between p-4 bg-transparent hover:bg-[#333333] hover:shadow-lg rounded-lg mb-4 transition-all duration-300 ease-in-out"
      onClick={() => gotoChatPage(props.userId)} // Pass as a callback
    >
      {/* First Section: Avatar with Status */}
      <div className="flex items-center">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant={props.status === 'online' ? 'dot' : undefined}
        >
          <Avatar alt={props.name} src={props.imgUrl} />
        </StyledBadge>
        <div className="ml-3">
          <span className="text-white font-semibold">{props.name}</span>
          {props.isTyping ? (
            <div className="text-green-400">Typing...</div>
          ) : (
            <div className="text-gray-400">{props.lastMessage}</div>
          )}
        </div>
      </div>

      {/* Third Section: Timestamp and Highlight Dot */}
      <div className="flex flex-col items-end">
        <div className="text-gray-400 text-sm">{props.lastSeen}</div>
        {props.unreadMessage && (
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full mt-1"></div>
        )}
      </div>
    </div>
  );
};

export default UserSlab;
