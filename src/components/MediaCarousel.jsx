import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const MediaCarousel = ({ media }) => {
  if (!media || media.length === 0) return null;

  const settings = {
    dots: true,
    infinite: media.length > 1, // Disable infinite loop if there's only one item
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true, // Adjusts slider height to fit content
  };

  return (
    <Box sx={{ mt: 2, width: "20%" }}>
      <Slider {...settings}>
        {media.map((file) => (
          <Box
            key={file.mediaId}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "common.white", // Add background for better visibility
              borderRadius: "8px",
            }}
          >
            <img
              src={file.mediaUrl}
              alt={`Media-${file.mediaId}`}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MediaCarousel;
