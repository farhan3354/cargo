export function parseAllowedOrigins(value) {
  if (!value || value === "*") return "*";
  return value.split(",").map((o) => o.trim()).filter(Boolean);
}

export function resolveCorsOrigin(origin, allowedOrigins) {
  if (allowedOrigins === "*") return true;
  if (!origin) return allowedOrigins[0] || true;
  return allowedOrigins.includes(origin) ? origin : false;
}

export function createCorsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": typeof origin === "string" ? origin : "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-api-key",
  };
}
