export interface IUser {
  uuid: string;
  name: string;
  email: string;
  photo_url: string;
}

export function setUser(user: IUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function getUser(): IUser | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  return null;
}

export function removeUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}
