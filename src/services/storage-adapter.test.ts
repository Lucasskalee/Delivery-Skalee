import { beforeEach, describe, expect, it } from "vitest";

import { storageAdapter } from "./storage-adapter";

describe("storageAdapter", () => {
  beforeEach(() => {
    storageAdapter.clearMemoryForTests();
  });

  it("stores and retrieves typed values with fallback", () => {
    const fallback = { test: true };
    expect(storageAdapter.getItem("non-existent-key", fallback)).toEqual(fallback);

    storageAdapter.setItem("demo-key", { count: 42 });
    expect(storageAdapter.getItem("demo-key", { count: 0 })).toEqual({ count: 42 });

    storageAdapter.removeItem("demo-key");
    expect(storageAdapter.getItem("demo-key", { count: 0 })).toEqual({ count: 0 });
  });
});

