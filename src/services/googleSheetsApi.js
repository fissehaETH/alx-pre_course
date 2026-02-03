const DEFAULT_TIMEOUT = 15000;

const timeout = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );

const request = async (url, options = {}) => {
  const response = await Promise.race([fetch(url, options), timeout(DEFAULT_TIMEOUT)]);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export const fetchSheetData = async (baseUrl, sheetName) => {
  const url = new URL(baseUrl);
  url.searchParams.set("sheet", sheetName);
  url.searchParams.set("action", "list");
  return request(url.toString());
};

export const createSheetRecord = async (baseUrl, sheetName, payload) => {
  const url = new URL(baseUrl);
  url.searchParams.set("sheet", sheetName);
  url.searchParams.set("action", "create");
  return request(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const updateSheetRecord = async (baseUrl, sheetName, payload) => {
  const url = new URL(baseUrl);
  url.searchParams.set("sheet", sheetName);
  url.searchParams.set("action", "update");
  return request(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const deleteSheetRecord = async (baseUrl, sheetName, payload) => {
  const url = new URL(baseUrl);
  url.searchParams.set("sheet", sheetName);
  url.searchParams.set("action", "delete");
  return request(url.toString(), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};
