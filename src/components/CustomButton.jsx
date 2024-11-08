import { Button } from "@mui/material";

const CustomButton = ({ variant, color, content, padding, borderRadius, size}) => {
  return (
    <Button variant={variant} color={color} size={size} sx={{
      padding,
      borderRadius
    }}>
      {content}
    </Button>
  );
};

export default CustomButton;