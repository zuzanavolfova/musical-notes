import type { Statistics } from "../types";

export function formatDataStatistics(statistics: Statistics[]): Statistics[] {
  return statistics.map((item) => {
    return {
      ...item,
      timeStamp: item.timeStamp
        ? new Date(item.timeStamp).toLocaleString()
        : "",
    };
  });
}
