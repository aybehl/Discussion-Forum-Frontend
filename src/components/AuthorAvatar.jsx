import { Avatar } from "@mui/material";

const AuthorAvatar = ({ content, width, height }) => {
  return (
    <Avatar
      {...(content.author?.profilePic?.mediaUrl
        ? { src: content.author?.profilePic?.mediaUrl }
        : {
            children: content.author?.username?.charAt(0).toUpperCase(),
          })}
      sx={{
        width: {width},
        height: {height},
        backgroundColor: !content.author.profilePic
          ? "primary.main"
          : "transparent",
      }}
    />
  );
};

export default AuthorAvatar;
