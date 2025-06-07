export function setAuth(auth) {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth", JSON.stringify(auth));
  }
}

export function getAuth() {
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
