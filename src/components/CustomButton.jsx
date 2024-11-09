import { Button } from "@mui/material";

const CustomButton = ({
  variant,
  color,
  content,
  padding,
  borderRadius,
  size,
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      sx={{
        padding,
        borderRadius,
      }}
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default CustomButton;
