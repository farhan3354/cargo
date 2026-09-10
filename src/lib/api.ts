export function getBackendBaseUrl(): string {
  const clientUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  const serverUrl = process.env.BACKEND_URL?.trim();
  let url = clientUrl || serverUrl || "";
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      console.error("[Backend URL] Environment variable for backend URL is missing in production.");
      throw new Error("Backend URL not configured. Set NEXT_PUBLIC_BACKEND_URL or BACKEND_URL.");
    }
    // Default to localhost for development
    url = "http://127.0.0.1:4000";
  }
  url = url.replace(/\/+$/, "");
  if (url.endsWith("/api")) {
    url = url.slice(0, -4);
  }
  console.log("[Backend URL] Using base URL:", url);
  return url;
}

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export interface Office {
  id: string;
  name: string;
  email: string;
  phone?: string;
  phones?: string[];
  description?: string;
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

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  company: string;
  logoUrl?: string;
  logoCloudinaryId?: string;
  hoverColor?: string;
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
  console.log('[API Fetch] Requesting', { method: fetchOptions.method || "GET", url: targetUrl });

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
    console.log('[API Fetch] Response', { status: res.status, ok: res.ok });
  } catch {
    console.error('[API Fetch] Network error reaching', targetUrl);
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
    // Redirect to login if unauthorized or forbidden
    if (admin && (res.status === 401 || res.status === 403)) {
      console.log(`[API Fetch] Redirecting to login due to ${res.status} response from backend`);
      const { redirect } = await import('next/navigation');
      redirect('/admin/login');
    }

    console.error('[API Fetch] Error response', { status: res.status, error: json.error, body: json });
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

  // Admin login helper – posts credentials to backend admin login endpoint
  login: async (email: string, password: string) => {
    try {
      console.log('Attempting admin login with email:', email);
      const res = await fetch(`${getBackendBaseUrl()}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // ensure cookies are set
      });
      const data = await res.json();
      console.log('Login response status:', res.status, 'data:', data);
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      return data; // contains token and admin info
    } catch (err) {
      console.error('Admin login error:', err);
      throw err;
    }
  },
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

  getTestimonials: () => apiFetch<Testimonial[]>("/api/testimonials"),
  createTestimonial: (data: Partial<Testimonial>) =>
    apiFetch<Testimonial>("/api/testimonials", { method: "POST", body: JSON.stringify(data), admin: true }),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    apiFetch<Testimonial>(`/api/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data), admin: true }),
  deleteTestimonial: (id: string) =>
    apiFetch<{ message: string }>(`/api/testimonials/${id}`, { method: "DELETE", admin: true }),
};
