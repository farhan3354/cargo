export function getBackendBaseUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    process.env.BACKEND_URL?.trim() ||
    "http://127.0.0.1:4000";

  url = url.replace(/\/+$/, "");
  if (url.endsWith("/api")) {
    url = url.slice(0, -4);
  }
  return url;
}

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export interface Office {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  cloudinaryId: string;
  url: string;
  thumbnail?: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplate {
  id: string;
  templateId: string;
  name: string;
  subject: string;
  htmlContent: string;
  plainTextContent: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AboutPage {
  id: string;
  // Home About section
  title: string;
  content: string;
  imageUrl?: string;
  // Hero
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  // Company Story
  storyLabel?: string;
  storyHeading?: string;
  storyContent?: string;
  storyImageUrl?: string;
  // Mission/Vision
  mission?: string;
  vision?: string;
  // Stats
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;
  // Extra
  subtitle?: string;
  extraContent?: string;
  extraImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export class BackendUnavailableError extends Error {
  constructor(message = "Backend API is unavailable") {
    super(message);
    this.name = "BackendUnavailableError";
  }
}

import { cookies } from "next/headers";

async function apiFetch<T>(
  path: string,
  options: RequestInit & { admin?: boolean } = {},
): Promise<T> {
  const { admin = false, ...fetchOptions } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (admin) {
    // In Next.js Server Actions or Server Components, we can read cookies directly
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const baseUrl = getBackendBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const targetUrl = `${baseUrl}${normalizedPath}`;

  const isPublicGet = !admin && (!fetchOptions.method || fetchOptions.method === "GET");
  const fetchConfig: RequestInit = {
    ...fetchOptions,
    headers,
  };

  if (isPublicGet) {
    if (!fetchConfig.cache && !fetchConfig.next) {
      fetchConfig.next = { revalidate: 60 }; // Cache public data for 60 seconds
    }
  } else {
    fetchConfig.cache = "no-store"; // Always fetch fresh data for admin/mutations
  }

  let res: Response;
  try {
    res = await fetch(targetUrl, fetchConfig);
  } catch {
    throw new BackendUnavailableError(
      `Cannot reach backend at ${targetUrl}. Start the backend server on port 4000.`,
    );
  }

  let json: { data?: T; error?: string; success?: boolean };
  try {
    json = await res.json();
  } catch {
    throw new BackendUnavailableError("Backend returned an invalid response.");
  }

  if (!res.ok) {
    throw new Error(json.error || "API request failed");
  }

  return json.data ?? (json as T);
}

export const api = {
  getOffices: () => apiFetch<Office[]>("/api/offices"),
  createOffice: (data: Partial<Office>) =>
    apiFetch<Office>("/api/offices", { method: "POST", body: JSON.stringify(data), admin: true }),
  updateOffice: (id: string, data: Partial<Office>) =>
    apiFetch<Office>(`/api/offices/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true }),
  deleteOffice: (id: string) =>
    apiFetch<{ message: string }>(`/api/offices/${id}`, { method: "DELETE", admin: true }),
  hardDeleteOffice: (id: string) =>
    apiFetch<{ message: string }>(`/api/offices/${id}/hard`, { method: "DELETE", admin: true }),

  getSiteContent: (section?: string) =>
    apiFetch<SiteContent[]>(section ? `/api/content?section=${section}` : "/api/content"),
  getSiteContentMap: () => apiFetch<Record<string, string>>("/api/content/map"),
  updateSiteContent: (data: { key: string; value: string; section: string; type?: string; description?: string }) =>
    apiFetch<SiteContent>("/api/content", { method: "POST", body: JSON.stringify(data), admin: true }),
  bulkUpdateSiteContent: (items: { key: string; value: string; section: string; type?: string; description?: string }[]) =>
    apiFetch<SiteContent[]>("/api/content/bulk", { method: "POST", body: JSON.stringify({ items }), admin: true }),

  getContactSubmissions: (status?: string) =>
    apiFetch<ContactSubmission[]>(status ? `/api/contact/submissions?status=${status}` : "/api/contact/submissions", { admin: true }),
  updateContactSubmissionStatus: (id: string, status: string) =>
    apiFetch<ContactSubmission>(`/api/contact/submissions/${id}`, { method: "PATCH", body: JSON.stringify({ status }), admin: true }),
  deleteContactSubmission: (id: string) =>
    apiFetch<{ message: string }>(`/api/contact/submissions/${id}`, { method: "DELETE", admin: true }),

  getServices: () => apiFetch<Service[]>("/api/services"),
  createService: (data: Partial<Service>) =>
    apiFetch<Service>("/api/services", { method: "POST", body: JSON.stringify(data), admin: true }),
  updateService: (id: string, data: Partial<Service>) =>
    apiFetch<Service>(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true }),
  deleteService: (id: string) =>
    apiFetch<{ message: string }>(`/api/services/${id}`, { method: "DELETE", admin: true }),

  getVideos: () => apiFetch<Video[]>("/api/videos"),
  createVideo: (data: Partial<Video>) =>
    apiFetch<Video>("/api/videos", { method: "POST", body: JSON.stringify(data), admin: true }),
  updateVideo: (id: string, data: Partial<Video>) =>
    apiFetch<Video>(`/api/videos/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true }),
  deleteVideo: (id: string) =>
    apiFetch<{ message: string }>(`/api/videos/${id}`, { method: "DELETE", admin: true }),

  getAbout: () => apiFetch<AboutPage>("/api/about"),
  updateAbout: (data: Partial<AboutPage>) =>
    apiFetch<AboutPage>("/api/about", { method: "PUT", body: JSON.stringify(data), admin: true }),

  getEmailTemplates: () =>
    apiFetch<EmailTemplate[]>("/api/email-templates", { admin: true }),
  upsertEmailTemplate: (data: Partial<EmailTemplate>) =>
    apiFetch<EmailTemplate>("/api/email-templates", { method: "POST", body: JSON.stringify(data), admin: true }),
  deleteEmailTemplate: (templateId: string) =>
    apiFetch<{ message: string }>(`/api/email-templates/${templateId}`, { method: "DELETE", admin: true }),
};
