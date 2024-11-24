import { Box, Typography } from "@mui/material";
import { useState } from "react";

const IconWithCount = ({
  icon: Icon,
  hoverIcon: HoverIcon,
  count,
  onClick,
  label,
  iconColor,
  hoverColor
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        cursor: "pointer",
        color: iconColor != null ? iconColor: "gray.light",
        "&:hover": {
          color: hoverColor != null ? hoverColor: "primary.main",
        },
      }}
    >
      {!isHovered ? (
        <Icon sx={{ fontSize: "1.25rem" }} />
      ) : HoverIcon ? (
        <HoverIcon sx={{ fontSize: "1.5rem" }} />
      ) : (
        <Icon sx={{ fontSize: "1.5rem" }} />
      )}

      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "normal",
        }}
      >
        {count} {label}
      </Typography>
    </Box>
  );
};

export default IconWithCount;
