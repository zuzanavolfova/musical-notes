export const setUserData = async (data: any): Promise<void> => {
  try {
    const response: Response = await fetch("...", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Data could not be saved: ${response.status}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};
