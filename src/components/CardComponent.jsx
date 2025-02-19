import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CardComponent = ({ item, onEdit, onDelete }) => {
  const [iconVisible, setIconVisible] = useState(false);
  return (
    <Card
      sx={{ position: "relative", height: 360 }}
      onMouseEnter={() => setIconVisible(true)}
      onMouseLeave={() => setIconVisible(false)}
      // more specific borders
      elevation={5}
    >
      <CardHeader
        title={item.name}
        sx={{ color: "dodgerblue", textAlign: "center" }}
      />
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        title={item.name}
        sx={{ height: 250, width: 250, objectFit: "contain", mx: "auto", p: 2 }}
      />

      {item?.phone && (
        <CardContent>
          <Typography>{item.phone}</Typography>
        </CardContent>
      )}

      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          display: "flex",
          gap: 1,
          // It is wanted to has this Box visible only when iconVisible is true
          // There are 2 different ways to do it:
          // Way-1: using visibility or opacity to show or not the icons
          // visibility: iconVisible ? 'visible' : 'hidden',
          // transition: 'all 0.3s ease',
          // Way-2:
          opacity: iconVisible ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <EditIcon
          sx={{ color: "goldenrod", cursor: "pointer" }}
          onClick={() => onEdit(item)}
        />
        <DeleteOutlineIcon
          sx={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(item._id)}
        />
      </Box>
    </Card>
  );
};

CardComponent.propTypes = {
  item: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardComponent;
