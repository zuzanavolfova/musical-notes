export const getUserData = async (): Promise<any> => {
  try {
    const response: Response = await fetch(
      "https://raw.githubusercontent.com/zuzanavolfova/data/refs/heads/main/musica-notes-users.json",
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`Data could not be loaded: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return [];
    } else {
      console.error("An unexpected error occurred:", error);
      return [];
    }
  }
};
