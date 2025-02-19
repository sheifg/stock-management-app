import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiActions } from "../store/ui";
import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CardComponent from "../components/CardComponent";
import { firmsActions } from "../store/firms";
import FirmModal from "../components/Modals/FirmModal";

import {
  ViewCarousel as ViewCarouselIcon,
  Map as MapIcon,
} from "@mui/icons-material";
import MapComponent from "../components/MapComponent";

const Firms = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const firms = useSelector((state) => state.firms.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firmsActions.getData());
  }, []);

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleEdit = (data) => {
    setEdit(true);
    setOpen(true);

    console.log(data);

    dispatch(uiActions.setModalData(data));
  };

  const handleDelete = (id) => {
    dispatch(firmsActions.deleteData(id));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Firms
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Firm
        </Button>
      </Stack>
      <Container maxWidth="xl">
        <Stack direction="row" justifyContent="space-between">
          <Box flexGrow={1} />
          <ToggleButtonGroup
            exclusive //	exclusive: boolean value, if true, only allow one of the child ToggleButton values to be selected
            size="small"
            value={isMapView}
            onChange={(e, value) => setIsMapView(value)}
          >
            <ToggleButton value={false}>
              <ViewCarouselIcon />
            </ToggleButton>
            <ToggleButton value={true}>
              <MapIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {isMapView ? (
          <MapComponent />
        ) : (
          <Grid container spacing={5}>
            {firms.map((item) => (
              <Grid item key={item._id} xs={12} md={6} lg={3}>
                <CardComponent
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <FirmModal open={open} closeModal={closeModal} edit={edit} />
      </Container>
    </Box>
  );
};

export default Firms;
