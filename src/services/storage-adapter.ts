const memoryStore = new Map<string, string>();

function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

export const storageAdapter = {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      if (isLocalStorageAvailable()) {
        const raw = window.localStorage.getItem(key);
        if (raw === null) {
          return defaultValue;
        }
        return JSON.parse(raw) as T;
      }
      const memRaw = memoryStore.get(key);
      if (memRaw === undefined) {
        return defaultValue;
      }
      return JSON.parse(memRaw) as T;
    } catch {
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      if (isLocalStorageAvailable()) {
        window.localStorage.setItem(key, serialized);
      } else {
        memoryStore.set(key, serialized);
      }
    } catch {
      // Falhas silenciosas de quota ou JSON não quebram o app
    }
  },

  removeItem(key: string): void {
    try {
      if (isLocalStorageAvailable()) {
        window.localStorage.removeItem(key);
      } else {
        memoryStore.delete(key);
      }
    } catch {
      // Ignora falhas de ambiente
    }
  },

  clearMemoryForTests(): void {
    memoryStore.clear();
  },
};

