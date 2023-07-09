import { child, get, getDatabase, ref } from "firebase/database";

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
  const modifiedData = data.map((obj) => ({
    pageView: obj.name,
    day: new Date(obj.time).toLocaleDateString(),
  }));

  const groupedData = modifiedData.reduce(
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

  return groupedData;
};

export const transformComponentInteractions = (data: any[]) => {
  // Data is an array of objects with the following structure:
  // {
  //   name: "reels_interacted" | "reels_init",
  //   time: 1634176800000,
  // }

  // We want to group the data by day
  // We want to count the number of interactions per day

  const modifiedData = data.map((obj) => ({
    interaction: obj.name,
    day: new Date(obj.time).toLocaleDateString(),
  }));

  const ratios = Object.entries(
    modifiedData.reduce((acc, obj) => {
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
    day: new Date(
      2000,
      // @ts-ignore
      ...day.split("/").map((part) => parseInt(part) - 1)
    ).toLocaleDateString("default", { day: "numeric", month: "long" }),
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

export const transformStoryViews = (data: any[]) => {
  const modifiedData = data.map((obj) => ({
    interaction: obj.name,
    day: new Date(obj.time).toLocaleDateString(),
  }));

  const groupedData = modifiedData.reduce(
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

  // Sort by date
  groupedData.sort((a, b) => {
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

  return groupedData;
};
