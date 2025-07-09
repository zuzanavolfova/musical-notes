export async function registerUser({
  newUserName,
  newPassword,
}: {
  newUserName: string;
  newPassword: string;
}) {
  const response = await fetch(
    "https://musical-notes-backend.onrender.com/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUserName,
        password: newPassword,
      }),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error("Registration failed: " + errorMessage);
  }

  return response.json();
}

export async function checkLogIn(
  userName: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(
      "https://musical-notes-backend.onrender.com/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password }),
      }
    );
    if (response.ok) {
      return true;
    } else {
      const data = await response.json();

      console.error("Login failed:", data.message);
      return false;
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    return false;
  }
}
