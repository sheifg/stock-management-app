import { PropTypes } from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// This table s sed two times: for sales and purchases
const DashboardTable = ({ title, header, data }) => {
  return (
    <TableContainer component={Paper} sx={{ height: 350 }}>
      <Typography variant="h6" align="center" p={2}>
        {title}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((item, index) => (
              <TableCell key={index} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            // It is wanted to displaythe last tree ones, not all of them
            // To show just 3 of them, it can be used filter, but here it is easier to use slice and take the last 3
            // .filter((item, index) => index > data.length - 4)
            .slice(-3)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.productId.name}</TableCell>
                <TableCell>{item.brandId.name}</TableCell>
                {item.firmId && <TableCell>{item.firmId.name}</TableCell>}
                <TableCell>{item.productId.categoryId.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DashboardTable.propTypes = {
  title: PropTypes.string,
  header: PropTypes.array,
  data: PropTypes.array,
};

export default DashboardTable;
