export const isHttpUrl = (s) => /^https?:\/\//.test(s || "");

export const isLikelyEmail = (email) =>
  typeof email === "string" && email.includes("@") && email.includes(".");


