import { describe, expect, it } from "vitest";

import { redactMetadata } from "./logger";

describe("logger metadata redaction", () => {
  it("redacts sensitive keys case-insensitively and recursively in nested objects", () => {
    const sanitized = redactMetadata({
      orderId: "PED-1042",
      Authorization: "Bearer secret-jwt",
      nested: {
        access_token: "tok_123",
        safeField: "ok",
      },
    });

    expect(sanitized).toEqual({
      orderId: "PED-1042",
      Authorization: "[REDACTED]",
      nested: {
        access_token: "[REDACTED]",
        safeField: "ok",
      },
    });
  });
});

