// App.test.js
import BijectiveHash from "./pages/business/utils";

describe("Encode", () => {
  it("should output 2", () => {
    expect(BijectiveHash.encode(1)).toBe("2");
  });
});

describe("Decode", () => {
  it("should output 1", () => {
    expect(BijectiveHash.decode("2")).toBe(1);
  });
});

describe("High Encode", () => {
  it("should output TfDM", () => {
    expect(BijectiveHash.encode(99999999999)).toBe("3CmE942");
  });
});

describe("High Decode", () => {
  test("should output 9999999", () => {
    expect(BijectiveHash.decode("3CmE942")).toBe(99999999999);
  });
});
