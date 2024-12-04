import { Avatar } from "@mui/material";

const AuthorAvatar = ({ width, height, profilePicUrl, username, margin }) => {
  return (
    <Avatar
      {...(profilePicUrl
        ? { src: profilePicUrl }
        : {
            children: username?.charAt(0).toUpperCase(),
          })}
      sx={{
        width: { width },
        height: { height },
        backgroundColor: !profilePicUrl ? "primary.main" : "transparent",
        margin
      }}
    />
  );
};

export default AuthorAvatar;
