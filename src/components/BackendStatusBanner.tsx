import { AlertTriangle } from "lucide-react";
import { getBackendBaseUrl } from "@/lib/api";

async function isBackendHealthy() {
  try {
    const baseUrl = getBackendBaseUrl();
    const res = await fetch(`${baseUrl}/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function BackendStatusBanner() {
  const healthy = await isBackendHealthy();
  if (healthy) return null;

  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
      <div>
        <p className="font-semibold">Backend API is offline</p>
        <p className="mt-1 text-sm text-amber-800">
          The site is using fallback data. Start the backend with{" "}
          <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">cd cargo/backend && npm run dev</code>{" "}
          and ensure MongoDB is running at{" "}
          <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">{getBackendBaseUrl()}</code>.
        </p>
      </div>
    </div>
  );
}
