import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteComment } from "../../../api/comments";
import CustomButton from "../../../components/CustomButton";

const DeleteCommentModal = ({
  open,
  onClose,
  onEdit,
  commentId,
  onCommentDeleted,
}) => {
  const handleDelete = async () => {
    try {
      await deleteComment(commentId); // Call the delete API function
      onCommentDeleted(); // Trigger refresh or update in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ padding: 0 }}>
        {/* Close Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0.5rem",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              color: "gray.dark",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Dialog Heading */}
        <Box sx={{ textAlign: "center", padding: "0 1rem 1rem 1rem" }}>
          <Typography variant="h5">
            Are You Sure You Want to Delete This Comment?
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ color: "gray.dark", marginBottom: "1rem", width: "75%" }}
          >
            Consider editing your comment instead to improve it for the
            community.
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              color: "gray.dark",
              marginBottom: "2rem",
              width: "80%",
              fontWeight: "bold",
            }}
          >
            Deleting this comment will remove it permanently from the forum,
            along with any votes associated with it. This action cannot be
            undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* Action Buttons */}
        <Box
          display="flex"
          justifyContent="center"
          gap="1.5rem"
          width="100%"
          marginBottom={"2rem"}
          marginTop={"1rem"}
        >
          <CustomButton
            variant="contained"
            bgColor="primary"
            textColor="common.white"
            size="medium"
            padding={"0.5rem 1rem"}
            borderRadius={"1rem"}
            content={"Edit Comment"}
            onClick={onEdit} // Trigger the edit functionality
            textVariant="body2"
          />
          <CustomButton
            variant="outlined"
            bgColor="primary"
            textColor="primary"
            size="medium"
            padding={"0.5rem 1rem"}
            borderRadius={"1rem"}
            content={"Delete Comment"}
            onClick={handleDelete} // Trigger the delete functionality
            textVariant="body2"
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCommentModal;
