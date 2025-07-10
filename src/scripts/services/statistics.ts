export async function saveStatistics({
  userName,
  goodAnswers,
  wrongAnswers,
  timeStamp,
}: {
  userName: string;
  goodAnswers: number;
  wrongAnswers: number;
  timeStamp?: string;
}): Promise<void> {
  try {
    const response = await fetch(
      "https://musical-notes-backend.onrender.com/save-statistics",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          goodAnswers,
          wrongAnswers,
          timeStamp: timeStamp || new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save statistics");
    }
  } catch (error) {
    console.error("Error saving statistics:", error);
  }
}

export async function getStatistics(userName: string): Promise<any> {
  try {
    const response = await fetch(
      `https://musical-notes-backend.onrender.com/get-statistics?userName=${userName}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return null;
  }
}
