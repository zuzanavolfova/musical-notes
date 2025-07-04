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

export async function getUsers() {
  const response = await fetch(
    "https://musical-notes-backend.onrender.com/users"
  );
  if (!response.ok) throw new Error("Error loading users");
  return response.json();
}
