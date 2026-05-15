import { refreshAuthSession } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function sendSupportReport({ category, title, message, screenshot, currentPath, userAgent }) {
  const formData = new FormData();
  formData.append("category", category || "BUG_REPORT");
  formData.append("title", title || "");
  formData.append("message", message || "");
  formData.append("currentPath", currentPath || window.location.pathname || "");
  formData.append("userAgent", userAgent || navigator.userAgent || "");
  if (screenshot) {
    formData.append("screenshot", screenshot);
  }

  const doRequest = () => fetch(`${API_BASE_URL}/api/support/reports`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  let response = await doRequest();
  if (response.status === 401) {
    const refreshed = await refreshAuthSession();
    if (refreshed) {
      response = await doRequest();
    }
  }

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "전송에 실패했습니다.");
  }

  return data;
}
