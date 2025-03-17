import { encrypt, decrypt } from "../lib/utils";

describe("Test our encrpty", () => {
  it("should return a valid encrypted string when given a simple text and secret", () => {
    const text = "Hello, World!";
    const secret = "mySecret";
    const result = encrypt(text, secret);
    expect(result).toMatch(/^[a-f0-9]{32}:[a-f0-9]{32}:[a-f0-9]+$/);
  });
});
describe("Test our dencrpty Error", () => {
  it("should throw an error when provided with an incorrect secret", () => {
    const secret = "incorrectSecret";
    const text = "salt:iv:encryptedText"; // Replace with actual values for a valid test

    expect(() => decrypt(text, secret)).toThrow();
  });
});
describe("Test our dencrpty Correct", () => {
  it("should correctly decrypt text when provided with a valid secret", () => {
    const secret = "mySecret";
    const text = "salt:iv:encryptedText"; // Replace with actual values for a valid test
    const expectedDecryptedText = "decryptedText"; // Replace with actual expected decrypted text

    const result = decrypt(text, secret);

    expect(result).toBe(expectedDecryptedText);
  });
});
