import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});
import { Radio, ConfigProvider } from "antd";
import { AxisOptions } from "react-charts";
import { Series } from "react-charts/types/types";
import { NextPage } from "next";

interface DataPoint {
  date: Date;
  count: number;
}
// Function to aggregate daily data into weekly data
function aggregateDataWeekly(dailyData: DataPoint[]): DataPoint[] {
  const weeklyData: DataPoint[] = [];
  let currentWeek: DataPoint[] = [];
  let currentWeekStartDate: Date | null = null;

  // Sort daily data by date
  dailyData.sort((a, b) => a.date.getTime() - b.date.getTime());

  dailyData.forEach((dataPoint) => {
    const dataDate = dataPoint.date;

    // Initialize the current week on the first data point
    if (!currentWeekStartDate) {
      currentWeekStartDate = new Date(dataDate);
    }

    // If the data point falls within the current week, add it to the current week's data
    if (
      currentWeekStartDate &&
      dataDate.getTime() >= currentWeekStartDate.getTime() &&
      dataDate.getTime() <
        new Date(currentWeekStartDate).setDate(
          currentWeekStartDate.getDate() + 7
        )
    ) {
      currentWeek.push(dataPoint);
    } else {
      // If the data point falls into the next week, push the current week's data and start a new week
      weeklyData.push({
        date: currentWeekStartDate || new Date(), // Use the start date of the current week or a default date
        count: currentWeek.reduce((total, item) => total + item.count, 0), // Calculate the sum of reach for the week
      });

      // Start a new week with the current data point
      currentWeek = [dataPoint];
      currentWeekStartDate = new Date(dataDate);
    }
  });

  // Push the last week if it's not complete
  if (currentWeekStartDate) {
    weeklyData.push({
      date: currentWeekStartDate, // Use the start date of the last week
      count: currentWeek.reduce((total, item) => total + item.count, 0), // Calculate the sum of reach for the last week
    });
  }

  return weeklyData;
}

// Function to aggregate daily data into monthly data
function aggregateDataMonthly(dailyData: DataPoint[]): DataPoint[] {
  const monthlyData: DataPoint[] = [];
  let currentMonth: DataPoint[] = [];
  let currentMonthStartDate: Date | null = null;

  // Sort daily data by date
  dailyData.sort((a, b) => a.date.getTime() - b.date.getTime());

  dailyData.forEach((dataPoint) => {
    const dataDate = dataPoint.date;

    // Initialize the current month on the first data point
    if (!currentMonthStartDate) {
      currentMonthStartDate = new Date(dataDate);
    }

    // If the data point falls within the current month, add it to the current month's data
    if (
      currentMonthStartDate &&
      dataDate.getTime() >= currentMonthStartDate.getTime() &&
      dataDate.getTime() <
        new Date(currentMonthStartDate).setMonth(
          currentMonthStartDate.getMonth() + 1
        )
    ) {
      currentMonth.push(dataPoint);
    } else {
      // If the data point falls into the next month, push the current month's data and start a new month
      monthlyData.push({
        date: currentMonthStartDate || new Date(), // Use the start date of the current month or a default date
        count: currentMonth.reduce((total, item) => total + item.count, 0), // Calculate the sum of reach for the month
      });

      // Start a new month with the current data point
      currentMonth = [dataPoint];
      currentMonthStartDate = new Date(dataDate);
    }
  });

  // Push the last month if it's not complete
  if (currentMonthStartDate) {
    monthlyData.push({
      date: currentMonthStartDate, // Use the start date of the last month
      count: currentMonth.reduce((total, item) => total + item.count, 0), // Calculate the sum of reach for the last month
    });
  }

  return monthlyData;
}

type MyDatum = { date: Date; count: number };

type Props = {
  analytics: any;
};

const AreaChart: NextPage<Props> = ({ analytics }) => {
  const [checked, setChecked] = React.useState("daily");

  // Visualization data can come in practically any shape and size, so memoization of data into this shape is almost always necessary.

  let data = [
    {
      label: "Reach",
      data: analytics,
    },
  ];

  if (checked === "weekly") {
    // Aggregate daily data into weekly format
    const weeklyData = aggregateDataWeekly(analytics);
    data = [
      {
        label: "Reach",
        data: weeklyData,
      },
    ];
  } else if (checked === "monthly") {
    // Aggregate daily data into monthly format
    const monthlyData = aggregateDataMonthly(analytics);
    data = [
      {
        label: "Reach",
        data: monthlyData,
      },
    ];
  }

  const primaryAxis: any = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: (datum) =>
        datum.date.toLocaleString(undefined, {
          month: "short",
          day: "numeric",
        }),
    }),
    []
  );

  const secondaryAxes: any = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: (datum) => datum?.count,
        elementType: "area",
      },
    ],
    []
  );

  const getSeriesStyle = React.useCallback((series: Series<unknown>) => {
    return {
      fill: "#fcf8ff",
      stroke: "#efe2ed",
    };
  }, []);

  return (
    <>
      <div className="flex justify-between lg:flex-row flex-col items-center">
        <div>
          <h1 className="font-extrabold text-lg">Reach</h1>
          <p className="font-medium text-sm">
            Unique devices that caused an impression
          </p>
        </div>
        <div className="lg:mt-0 mt-7">
          <ConfigProvider
            theme={{
              components: {
                Radio: { buttonCheckedBg: "black", colorPrimary: "white" },
              },
            }}>
            <Radio.Group>
              <Radio.Button
                onClick={() => setChecked("daily")}
                className={`${checked == "daily" ? "bg-black text-white" : ""}`}
                value="daily">
                Daily
              </Radio.Button>
              <Radio.Button
                onClick={() => setChecked("weekly")}
                className={`${
                  checked == "weekly" ? "bg-black text-white" : ""
                }`}
                value="weekly">
                Weekly
              </Radio.Button>
              <Radio.Button
                onClick={() => setChecked("monthly")}
                className={`${
                  checked == "monthly" ? "bg-black text-white" : ""
                }`}
                value="monthly">
                Monthly
              </Radio.Button>
            </Radio.Group>
          </ConfigProvider>
        </div>
      </div>
      <Chart
        className="mt-6"
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          getSeriesStyle: getSeriesStyle,
        }}
      />
    </>
  );
};

export default AreaChart;
