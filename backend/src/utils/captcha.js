export const verifyCaptcha = (input, hash) => {
  if (!input || !hash) return false;

  const normalized = input.toUpperCase().trim();
  const calculated = Buffer.from(normalized + "mango-cargo-salt").toString(
    "base64",
  );

  return calculated === hash;
};
