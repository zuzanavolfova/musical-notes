import { getUsers } from "./services/authService";

async function checkPassword(password: string): Promise<boolean> {
  return true;
}

async function checkUser(userName: string): Promise<boolean> {
  const usersData = await getUsers();
  console.log("Users data:", usersData);
  if (usersData.includes(userName)) {
    return true;
  } else {
    console.error("User not found:", userName);
    return false;
  }
}

export async function checkLogIn(
  userName: string,
  password: string
): Promise<boolean> {
  const userExists = await checkUser(userName);
  const passwordValid = await checkPassword(password);

  if (userExists && passwordValid) {
    return true;
  } else {
    return false;
  }
}
