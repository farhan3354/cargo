"use server";

import { revalidatePath } from "next/cache";
import { api, BackendUnavailableError } from "@/lib/api";

async function safeRead<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof BackendUnavailableError) {
      console.warn("[admin]", error.message);
      return fallback;
    }
    throw error;
  }
}

export async function getOffices() {
  return safeRead([], () => api.getOffices());
}

export async function createOffice(data: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  imageUrl?: string;
  order?: number;
}) {
  const newOffice = await api.createOffice(data);
  revalidatePath("/");
  revalidatePath("/admin/offices");
  return newOffice;
}

export async function updateOffice(
  id: string,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
    address: string;
    imageUrl: string;
    order: number;
  }>,
) {
  const updated = await api.updateOffice(id, data);
  revalidatePath("/");
  revalidatePath("/admin/offices");
  return updated;
}

export async function deleteOffice(id: string) {
  await api.deleteOffice(id);
  revalidatePath("/");
  revalidatePath("/admin/offices");
  return true;
}

export async function hardDeleteOffice(id: string) {
  await api.hardDeleteOffice(id);
  revalidatePath("/");
  revalidatePath("/admin/offices");
  return true;
}

export async function getSiteContent(section?: string) {
  return safeRead([], () => api.getSiteContent(section));
}

export async function getSiteContentMap() {
  return safeRead({}, () => api.getSiteContentMap());
}

export async function updateSiteContent(
  key: string,
  value: string,
  section: string,
  type: string = "text",
  description?: string,
) {
  const updated = await api.updateSiteContent({ key, value, section, type, description });
  revalidatePath("/");
  revalidatePath("/admin/content");
  return updated;
}

export async function bulkUpdateSiteContent(
  items: { key: string; value: string; section: string; type?: string; description?: string }[],
) {
  const updated = await api.bulkUpdateSiteContent(items);
  revalidatePath("/");
  revalidatePath("/admin/content");
  return updated;
}

export async function getContactSubmissions(status?: string) {
  return safeRead([], () => api.getContactSubmissions(status));
}

export async function updateContactSubmissionStatus(id: string, status: string) {
  const updated = await api.updateContactSubmissionStatus(id, status);
  revalidatePath("/admin/emails");
  revalidatePath("/admin");
  return updated;
}

export async function deleteContactSubmission(id: string) {
  await api.deleteContactSubmission(id);
  revalidatePath("/admin/emails");
  revalidatePath("/admin");
  return true;
}

// Services
export async function getServices() {
  return safeRead([], () => api.getServices());
}

export async function createService(data: any) {
  const newService = await api.createService(data);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return newService;
}

export async function updateService(id: string, data: any) {
  const updated = await api.updateService(id, data);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return updated;
}

export async function deleteService(id: string) {
  await api.deleteService(id);
  revalidatePath("/");
  revalidatePath("/admin/services");
  return true;
}

// Videos
export async function getVideos() {
  return safeRead([], () => api.getVideos());
}

export async function createVideo(data: any) {
  const newVideo = await api.createVideo(data);
  revalidatePath("/");
  revalidatePath("/admin/videos");
  return newVideo;
}

export async function updateVideo(id: string, data: any) {
  const updated = await api.updateVideo(id, data);
  revalidatePath("/");
  revalidatePath("/admin/videos");
  return updated;
}

export async function deleteVideo(id: string) {
  await api.deleteVideo(id);
  revalidatePath("/");
  revalidatePath("/admin/videos");
  return true;
}

// About
export async function getAbout() {
  return safeRead(null, () => api.getAbout());
}

export async function updateAbout(data: any) {
  const updated = await api.updateAbout(data);
  revalidatePath("/");
  revalidatePath("/admin/about");
  return updated;
}

// Email Templates
export async function getEmailTemplates() {
  return safeRead([], () => api.getEmailTemplates());
}

export async function upsertEmailTemplate(data: any) {
  const result = await api.upsertEmailTemplate(data);
  revalidatePath("/admin/settings");
  return result;
}

export async function deleteEmailTemplate(templateId: string) {
  await api.deleteEmailTemplate(templateId);
  revalidatePath("/admin/settings");
  return true;
}
