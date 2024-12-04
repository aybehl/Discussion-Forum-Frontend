import { Button, Typography } from "@mui/material";

const CustomButton = ({
  variant,
  textColor,
  bgColor,
  content,
  padding,
  borderRadius,
  size,
  onClick,
  textVariant,
  type
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      sx={{
        padding,
        borderRadius,
        backgroundColor: bgColor,
        color: textColor,
        '&:hover': {
          backgroundColor: `${bgColor}CC`,
        }
      }}
      onClick={() => {
        console.log("Button clicked");
        onClick();
      }}
      type={type}
    >
      <Typography variant={textVariant}>{content}</Typography>
    </Button>
  );
};

export default CustomButton;
