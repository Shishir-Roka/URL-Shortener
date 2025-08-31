import apiClient from "./apiClient";

export async function shortenUrl(url, code) {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmMWMyNzRmLWUyZjUtNDZjNi05MzA5LTliY2M1ZTZkYWVjMyIsIm5hbWUiOiJtYXJjdXMiLCJlbWFpbCI6ImF1cmVsaXVzQGdtYWlsLmNvbSIsImlhdCI6MTc1NjU2NzE5N30.UxvA9Lh9jdOI0AYsBw6GBQNmywXRUCwUVIe4RwAZI0Y";
        
    const response = await apiClient.post(
      "/shorten",
      { url, code: code || undefined },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in shortenUrl", error);
  }
}
