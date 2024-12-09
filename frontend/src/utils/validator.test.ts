import { describe, it, expect } from "vitest";
import { validateEmail, validatePassword } from "./validator";

describe("validateEmail", () => {
  it("should return true for valid email addresses", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name+tag+sorting@example.com")).toBe(true);
    expect(validateEmail("x@x.co")).toBe(true);
  });

  it("should return false for invalid email addresses", () => {
    expect(validateEmail("plainaddress")).toBe(false);
    expect(validateEmail("plainaddress@")).toBe(false);
    expect(validateEmail("@no-local-part.com")).toBe(false);
    expect(validateEmail("user@.com")).toBe(false);
    expect(validateEmail("user@domain,com")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("should return true for valid passwords", () => {
    expect(validatePassword("Password1@")).toBe(true);
    expect(validatePassword("strongPass!9")).toBe(true);
    expect(validatePassword("Test123$")).toBe(true);
  });

  it("should return false for invalid passwords", () => {
    expect(validatePassword("P@1")).toBe(false);
    expect(validatePassword("password1@")).toBe(false);
    expect(validatePassword("Password@")).toBe(false);
    expect(validatePassword("Password1")).toBe(false);
    expect(validatePassword("PASSWORD1@")).toBe(false);
  });
});
