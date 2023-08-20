export const transformDomain = (domain: string) => {
  if (domain.startsWith("www.")) {
    domain = domain.substring(4);
  }

  return domain.replace(/\./g, "-");
};

export const groupByDate = (data: any[], yColumn: string) => {
  return sortByDate(data).map((obj) => ({
    [yColumn]: obj.name,
    device: obj.device,
    day: new Date(obj.time).toLocaleDateString(),
  }));
};

function getWeekNumber(date: Date) {
  // Copy date so don't modify original
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(
    ((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
  );
  // Return week number
  return weekNo;
}

export const groupByWeek = (data: any[], yColumn: string) => {
  return sortByDate(data).map((obj) => {
    const date = new Date(obj.time);
    const year = date.getFullYear();
    const week = getWeekNumber(date);
    return {
      [yColumn]: obj.name,
      week: `${year}-W${week}`,
    };
  });
};

export const groupByMonth = (data: any[], yColumn: string) => {
  return data.map((obj) => {
    const date = new Date(obj.time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 since getMonth() is zero-based
    return {
      [yColumn]: obj.name,
      month: `${year}-${month.toString().padStart(2, "0")}`,
    };
  });
};

const sortByDate = (data: any[]) => {
  return data.sort((a, b) => a.time - b.time);
};

export const getGroupedData = (key: string, event: string, data: any) => {
  let groupedData = groupByDate(data, event);

  switch (key) {
    case "week":
      // @ts-ignore
      groupedData = groupByWeek(data, event);
      break;
    case "month":
      // @ts-ignore
      groupedData = groupByMonth(data, event);
      break;
  }

  return groupedData;
};

export const getSummaryObject = (data: any, label: string) => {
  return {
    label,
    quantity: data[data.length - 1]?.[label],
    percentChange: getPercentChange(
      data[data.length - 1]?.[label],
      data[data.length - 2]?.[label]
    ),
  };
};

export const getPercentChange = (
  currentValue: number,
  previousValue: number
) => {
  const difference = currentValue - previousValue;
  const percentChange = (
    difference ? (difference / previousValue) * 100 : 0
  ).toFixed(2);

  if (Number(percentChange) > 1000) {
    return 1000;
  }
  return percentChange;
};

export const checkIfWithinSubscriptionThreshold = (
  type: string,
  newStoreTotal: number
) => {
  if (type === "basic") {
    if (newStoreTotal >= 1) {
      return false;
    }
    return true;
  }
  return false;
};
