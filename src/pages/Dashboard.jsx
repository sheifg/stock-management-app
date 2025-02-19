import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { salesActions } from "../store/sales";
import { purchasesActions } from "../store/purchases";
import { brandsActions } from "../store/brands";
import { firmsActions } from "../store/firms";
import { productsActions } from "../store/products";
import { categoriesActions } from "../store/categories";
import { useSelector } from "react-redux";
import DashboardTable from "../components/DashboardTable";
import Chart from "../components/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();

  // First page of the web and here it will be fetched all the datas, but it is not mandatory. Here it would only be needed the purchases and sales to show the info in the charts
  useEffect(() => {
    dispatch(salesActions.getData());
    dispatch(purchasesActions.getData());
    // Here following dispatches it not really needed/mandatory
    // Whenever any page is visited, it is also made useEffect to fetch data in those pages
    // What is the benefit? The states are not empty array anymore. The pages will be faster, load faster
    dispatch(brandsActions.getData());
    dispatch(firmsActions.getData());
    dispatch(productsActions.getData());
    dispatch(categoriesActions.getData());
  }, []);

  //! If it is just fetched all the data here in the main/entry page, it is not a good practice, because in case that the data needed for that page is updated, it won't be had the latest version
  //! So always use the useEffect fetching data for the data that it is needed in every page

  const purchases = useSelector((state) => state.purchases.data);
  const sales = useSelector((state) => state.sales.data);

  console.log(purchases);

  // It is wanted to sum total amount of every purchase
  // There are many ways to do this
  // let totalPurchases = 0;

  // Way-1: using for loop
  // for (let item of purchases) {
  //   totalPurchases += item.amount;
  // }

  // Way-2: using forEach
  // purchases.forEach((item) => {
  //   totalPurchases += item.amount;
  // });

  // Way-3: using reduce
  const totalPurchases = purchases.reduce((acc, item) => item.amount + acc, 0);

  const totalSales = sales.reduce((acc, item) => item.amount + acc, 0);

  const totalProfit = totalSales - totalPurchases;

  const pieData = [
    { id: 0, value: totalPurchases, label: "Purchases", color: "#02B2AF" },
    { id: 1, value: totalSales, label: "Sales", color: "#1976d2" },
  ];

  const converDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = dateObj.getUTCDate();
    //  In case it is wanted to use the year:
    // const year = dateObj.getUTCFullYear();

    return `${months[month]} ${day}`;
    // return `${months[month]} / ${day}`;
  };

  const salesData = sales.map((item) => ({
    time: item.createdAt.slice(0, 10),
    // To see just the year, month and date
    price: item.amount,
  }));

  const purchasesData = purchases.map((item) => ({
    time: converDate(item.createdAt),
    price: item.amount,
  }));

  const salesTableHeader = [
    "#",
    "Product",
    "Brand",
    "Category",
    "Qty", // quantity
    "Price",
    "Total",
  ];

  const purchasesTableHeader = [
    "#",
    "Product",
    "Brand",
    "Firm",
    "Category",
    "Qty",
    "Price",
    "Total",
  ];

  return (
    <Box p={5}>
      <Container maxWidth="lg">
        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <PieChart
                  // series must have a data property containing an array of objects
                  // Those objects should contain a property value. They can also have a label property
                  // pieData defining above with these properties
                  series={[{ data: pieData }]}
                  width={400}
                  height={200}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent sx={{ textAlign: "center" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={"center"}
                  p={2}
                >
                  <Typography variant="h5">Sales</Typography>
                  <Typography variant="h5" color="green">
                    {totalSales.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ",")}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={"center"}
                  p={2}
                >
                  <Typography variant="h5">Purchases</Typography>
                  <Typography variant="h5" color="red">
                    {totalPurchases
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, ",")}
                  </Typography>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={"center"}
                  p={2}
                >
                  <Typography variant="h5">Profit</Typography>
                  <Typography
                    variant="h5"
                    color={totalProfit > 0 ? "green" : "red"}
                  >
                    {totalProfit.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ",")}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Day 6 */}
        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Chart name="Sales" data={salesData} />
          </Grid>

          <Grid item xs={12} lg={6}>
            <DashboardTable
              title="Recent Sales"
              header={salesTableHeader}
              data={sales}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5} mb={5}>
          <Grid item xs={12} lg={6}>
            <Chart name="Purchases" data={purchasesData} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DashboardTable
              title="Recent Purchases"
              header={purchasesTableHeader}
              data={purchases}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
