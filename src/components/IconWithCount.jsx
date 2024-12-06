import { Box, Typography } from "@mui/material";
import { useState } from "react";

const IconWithCount = ({
  icon: Icon,
  hoverIcon: HoverIcon,
  count,
  onClick,
  label,
  iconColor,
  hoverColor,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={disabled ? null : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        cursor: disabled ? "not-allowed" : "pointer",
        color: disabled
          ? "gray.main" // Apply disabled color
          : iconColor || "gray.light",
        "&:hover": {
          color: !disabled && (hoverColor || "primary.main"), // Only apply hover styles if not disabled
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
          color: disabled ? "gray.main" : "inherit",
        }}
      >
        {count} {label}
      </Typography>
    </Box>
  );
};

export default IconWithCount;
