import { child, get, getDatabase, ref } from "firebase/database";
import { groupByDate, sortByDate } from "./helpers";

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

export const transformPageViews = (data: any[]) => {
  const groupedData = sortByDate(groupByDate(data, "pageView"));

  const transformedData = groupedData.reduce(
    (
      result: {
        pageView: number;
        day: string;
      }[],
      obj
    ) => {
      const { day } = obj;
      const existingItem = result.find(
        (item: any) => item.day.toString() === day.toString()
      );

      if (existingItem) {
        existingItem.pageView++;
      } else {
        result.push({ pageView: 1, day: day });
      }
      return result;
    },
    []
  );

  return transformedData;
};

export const transformComponentInteractions = (data: any[]) => {
  const groupedData = sortByDate(groupByDate(data, "interaction"));

  const ratios = Object.entries(
    groupedData.reduce((acc, obj) => {
      const { interaction, day } = obj;
      if (interaction === "reels_init") {
        acc[day] = acc[day] || { initCount: 0, interactedCount: 0 };
        acc[day].initCount++;
      } else if (interaction === "reels_interacted" && acc[day]) {
        acc[day].interactedCount++;
      }
      return acc;
    }, {} as Record<string, { initCount: number; interactedCount: number }>)
  ).map(([day, counts]) => ({
    day,
    // @ts-ignore
    ...counts,
  }));

  const interactedData = ratios.map(({ day, initCount, interactedCount }) => ({
    day,
    ratio: interactedCount / initCount,
  }));

  // Sort by date
  interactedData.sort((a, b) => {
    const dateA = new Date(a.day);
    const dateB = new Date(b.day);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  });

  return interactedData;
};

export const transformAverageStoryViews = (data: any[]) => {
  const groupedData = sortByDate(groupByDate(data, "event"));

  const transformedData = groupedData
    .reduce((result: any, obj) => {
      const { event, day } = obj;
      const existingItem = result.find(
        (item: any) => item.day.toString() === day.toString()
      );

      if (existingItem) {
        event === "reels_opened" && existingItem.opened++;
        event === "reels_story_viewed" && existingItem.storiesViewed++;
      } else {
        result.push({ opened: 0, storiesViewed: 0, day: day });
      }
      return result;
    }, [])
    .map((obj: any) => ({
      day: obj.day,
      average: obj.opened ? obj.storiesViewed / obj.opened : 0,
    }));

  return transformedData;
};

export const transformStoryViews = (data: any[]) => {
  const groupedData = sortByDate(groupByDate(data, "interaction"));

  const transformedData = groupedData.reduce(
    (
      result: {
        interaction: number;
        day: string;
      }[],
      obj
    ) => {
      const { day } = obj;
      const existingItem = result.find(
        (item: any) => item.day.toString() === day.toString()
      );

      if (existingItem) {
        existingItem.interaction++;
      } else {
        result.push({ interaction: 1, day: day });
      }
      return result;
    },
    []
  );

  return transformedData;
};
