import { child, get, getDatabase, ref } from "firebase/database";
import {
  getGroupedData,
  groupByDate,
  groupByMonth,
  groupByWeek,
} from "./helpers";

const EVENTS_DB_INSTANCE = "events";
const EVENTS_DB_TRACKING_SUBKEY = "tracking";

export const fetchStoreEvents = async (storeID: string) => {
  const db = getDatabase();
  const eventsRef = ref(db, EVENTS_DB_INSTANCE);
  const storeRef = child(eventsRef, storeID);

  try {
    const snapshot = await get(storeRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const transformPageViews = (
  data: any[],
  filters: {
    traffic: string;
    groupBy: string;
  }
) => {
  const EVENT = "pageView";

  let groupedData = getGroupedData(filters.groupBy, EVENT, data);
  const transformedData = groupedData.reduce(
    (
      result: {
        pageView: number;
        day?: string;
        week?: string;
        month?: string;
      }[],
      obj
    ) => {
      const { day, week, month } = obj;

      const existingItem = result.find((item: any) => {
        return (
          item[filters.groupBy] ===
          (filters.groupBy === "day"
            ? day
            : filters.groupBy === "week"
            ? week
            : month)
        );
      });

      if (existingItem) {
        existingItem.pageView++;
      } else {
        result.push({
          pageView: 1,
          [filters.groupBy]:
            filters.groupBy === "day"
              ? day
              : filters.groupBy === "week"
              ? week
              : month,
        });
      }
      return result;
    },
    []
  );

  return transformedData;
};

const _getDataOnKey = (key: string, day: any, week: any, month: any) => {
  return key === "day" ? day : key === "week" ? week : month;
};

export const transformComponentInteractions = (
  data: any[],
  filters: {
    traffic: string;
    groupBy: string;
  }
) => {
  const EVENT = "interaction";
  let groupedData = getGroupedData(filters.groupBy, EVENT, data);

  const ratios = Object.entries(
    groupedData.reduce((acc, obj) => {
      const { interaction, day, week, month } = obj;
      if (interaction === "reels_init") {
        acc[_getDataOnKey(filters.groupBy, day, week, month)] = acc[day] || {
          initCount: 0,
          interactedCount: 0,
        };
        acc[_getDataOnKey(filters.groupBy, day, week, month)].initCount++;
      } else if (
        interaction === "reels_interacted" &&
        acc[_getDataOnKey(filters.groupBy, day, week, month)]
      ) {
        acc[_getDataOnKey(filters.groupBy, day, week, month)].interactedCount++;
      }
      return acc;
    }, {} as Record<string, { initCount: number; interactedCount: number }>)
  );

  const groupedRatios = ratios.map(([label, counts]) => ({
    [filters.groupBy]: label,
    // @ts-ignore
    ...counts,
  }));

  const interactedData = groupedRatios.map(
    //@ts-ignore
    ({ day, week, month, initCount, interactedCount }) => ({
      day,
      week,
      month,
      ratio: interactedCount / initCount,
    })
  );

  return interactedData;
};

export const transformAverageStoryViews = (
  data: any[],
  filters: {
    traffic: string;
    groupBy: string;
  }
) => {
  const EVENT = "event";
  const groupedData = getGroupedData(filters.groupBy, EVENT, data);

  const transformedData = groupedData.reduce((result: any, obj) => {
    const { event, day, week, month } = obj;
    const existingItem = result.find(
      (item: any) =>
        item[filters.groupBy].toString() ===
        _getDataOnKey(filters.groupBy, day, week, month).toString()
    );

    if (existingItem) {
      event === "reels_opened" && existingItem.opened++;
      event === "reels_story_viewed" && existingItem.storiesViewed++;
    } else {
      result.push({ opened: 0, storiesViewed: 0, day, month, week });
    }
    return result;
  }, []);

  const averagedData = transformedData.map((obj: any) => ({
    day: obj.day,
    week: obj.week,
    month: obj.month,
    average: obj.opened ? obj.storiesViewed / obj.opened : 0,
  }));

  return averagedData;
};

export const transformStoryViews = (
  data: any[],
  filters: {
    traffic: string;
    groupBy: string;
  }
) => {
  const EVENT = "interaction";
  let groupedData = getGroupedData(filters.groupBy, EVENT, data);

  const transformedData = groupedData.reduce(
    (
      result: {
        interaction: number;
        day?: string;
        week?: string;
        month?: string;
      }[],
      obj
    ) => {
      const { day, week, month } = obj;
      const existingItem = result.find(
        (item: any) =>
          item[filters.groupBy].toString() ===
          _getDataOnKey(filters.groupBy, day, week, month).toString()
      );

      if (existingItem) {
        existingItem.interaction++;
      } else {
        result.push({ interaction: 1, day, week, month });
      }
      return result;
    },
    []
  );

  return transformedData;
};
