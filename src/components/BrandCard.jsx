import { Box, Card, CardHeader, CardMedia, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBrand } from "../store/mybrands";

const BrandCard = ({ brand, handleEdit }) => {
  const [iconsVisible, setIconsVisible] = useState(false);

  const dispatch = useDispatch();

  // Hover and unhover the card to show/hide the icons
  const handleHover = () => {
    setIconsVisible(true);
  };

  const handleUnhover = () => {
    setIconsVisible(false);
  };

  return (
    <Box>
      <Card
        variant="outlined"
        sx={{ position: "relative", p: "1rem" }}
        onMouseOver={handleHover}
        onMouseLeave={handleUnhover}
      >
        {iconsVisible && (
          <Box>
            <Stack
              direction="row"
              justifyContent="end"
              sx={{ position: "absolute", p: 1, right: 0 }}
            >
              <EditIcon
                sx={{ color: "goldenrod", cursor: "pointer", mx: 0.25 }}
                onClick={() => handleEdit(brand)}
              />
              <DeleteOutlineIcon
                sx={{ color: "red", cursor: "pointer", mx: 0.25 }}
                onClick={() => dispatch(deleteBrand(brand._id))}
              />
            </Stack>
          </Box>
        )}
        <CardHeader
          title={brand.name}
          sx={{ color: "dodgerblue", textAlign: "center" }}
        />
        <CardMedia
          sx={{ height: 140 }}
          image={brand.image}
          title={brand.name}
        />
      </Card>
    </Box>
  );
};

export default BrandCard;
