export interface IAuth {
  uuid: string;
}

export function setAuth(auth: IAuth) {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
}

export function getAuth(): IAuth | null {
  if (typeof window !== "undefined") {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  }

  return null;
}

export function removeAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth");
  }
}
