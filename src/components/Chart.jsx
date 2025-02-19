import React from "react";
import { PropTypes } from "prop-types";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// https://recharts.org/en-US/guide/getting-started
// https://recharts.org/en-US/api/LineChart
// https://mui.com/x/react-charts/lines/

const Chart = ({ name, data }) => {
  // Creating state to give the option to the user to select what type of chart want to see
  const [chartType, setChartType] = useState("line");

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
        >
          <Typography variant="h4">{name}</Typography>
          <FormControl sx={{ width: "120px" }}>
            <InputLabel>Chart type</InputLabel>
            {/* control input */}
            <Select
              label="Chart Type"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <MenuItem value="line">Line</MenuItem>
              <MenuItem value="bar">Bar</MenuItem>
              <MenuItem value="area">Area</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {chartType === "line" && (
          <LineChart
            width={700}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />{" "}
            {/* Tooltip show info about the line and the points in the line */}
            <Line
              dataKey="price"
              type="monotone" // type="monotone" gives some curves to the line chart
              stroke="#8884d8"
              activeDot={{ r: 10 }} // activeDot: next to include before the Line, Tootlip component, we can see bigger the info of tooltip
            />
          </LineChart>
        )}
        {chartType === "bar" && (
          <BarChart
            width={700}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        )}
        {chartType === "area" && (
          <AreaChart
            width={700}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              dataKey="price"
              type="monotone"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        )}
      </CardContent>
    </Card>
  );
};

Chart.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Chart;
