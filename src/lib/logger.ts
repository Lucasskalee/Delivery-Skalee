const REDACTED_KEYS = new Set([
  "password",
  "token",
  "accesstoken",
  "access_token",
  "refreshtoken",
  "refresh_token",
  "secret",
  "authorization",
  "cookie",
  "apikey",
  "api_key",
]);

function redactValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => redactValue(entry));
  }
  if (value !== null && typeof value === "object") {
    const nested: Record<string, unknown> = {};
    for (const [key, nestedVal] of Object.entries(value)) {
      nested[key] = REDACTED_KEYS.has(key.toLowerCase())
        ? "[REDACTED]"
        : redactValue(nestedVal);
    }
    return nested;
  }
  return value;
}

export function redactMetadata(
  meta?: Record<string, unknown>
): Record<string, unknown> | undefined {
  if (!meta) return undefined;
  return redactValue(meta) as Record<string, unknown>;
}

export const logger = {
  info(message: string, meta?: Record<string, unknown>): void {
    const payload = redactMetadata(meta);
    if (payload) {
      console.info(`[Skalee] ${message}`, payload);
      return;
    }
    console.info(`[Skalee] ${message}`);
  },
  warn(message: string, meta?: Record<string, unknown>): void {
    const payload = redactMetadata(meta);
    if (payload) {
      console.warn(`[Skalee] ${message}`, payload);
      return;
    }
    console.warn(`[Skalee] ${message}`);
  },
  error(message: string, meta?: Record<string, unknown>): void {
    const payload = redactMetadata(meta);
    if (payload) {
      console.error(`[Skalee] ${message}`, payload);
      return;
    }
    console.error(`[Skalee] ${message}`);
  },
};
