export interface IUserConfig {
  defaultPlaylist?: string;
}

const USER_CONFIG_KEY = "userConfig";

export function getUserConfig(): IUserConfig | null {
  if (typeof window !== "undefined") {
    const config = localStorage.getItem(USER_CONFIG_KEY);
    return config ? JSON.parse(config) : null;
  }
  return null;
}

export function setItemValue<K extends keyof IUserConfig>(
  key: K,
  value: IUserConfig[K],
) {
  if (typeof window !== "undefined") {
    const current = getUserConfig() || {};
    const updated = { ...current, [key]: value };
    setUserConfig(updated);
  }
}

export function removeUserConfig() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_CONFIG_KEY);
  }
}

function setUserConfig(config: IUserConfig) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_CONFIG_KEY, JSON.stringify(config));
  }
}
