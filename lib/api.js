const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export { STRAPI_URL };

async function fetchAPI(path, options = {}) {
  const url = `${API_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Le serveur ne répond pas. Vérifiez que Strapi est démarré.');
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

// Annonces
export async function getAnnonces(params = '') {
  const { data } = await fetchAPI(`/annonces?populate=voiture,parking,images${params ? '&' + params : ''}`);
  return data ?? [];
}

export async function getAnnonce(id) {
  const { data } = await fetchAPI(`/annonces/${id}?populate=voiture,parking,images`);
  return data;
}

export async function createAnnonce(body, token) {
  return fetchAPI('/annonces?status=published', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });
}

export async function updateAnnonce(id, body, token) {
  return fetchAPI(`/annonces/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });
}

export async function deleteAnnonce(id, token) {
  return fetchAPI(`/annonces/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Voitures
export async function getVoitures(params = '') {
  const { data } = await fetchAPI(`/voitures?populate=images,location_voitures${params ? '&' + params : ''}`);
  return data ?? [];
}

export async function getVoiture(id) {
  const { data } = await fetchAPI(`/voitures/${id}?populate=images,location_voitures`);
  return data;
}

export async function createVoiture(body, token) {
  return fetchAPI('/voitures?status=published', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });
}

// Parkings
export async function getParkings(params = '') {
  const { data } = await fetchAPI(`/parkings?populate=images${params ? '&' + params : ''}`);
  return data ?? [];
}

export async function getParking(id) {
  const { data } = await fetchAPI(`/parkings/${id}?populate=images`);
  return data;
}

export async function createParking(body, token) {
  return fetchAPI('/parkings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });
}

export async function updateParking(id, body, token) {
  return fetchAPI(`/parkings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });
}

export async function deleteParking(id, token) {
  return fetchAPI(`/parkings/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}

// Location voitures
export async function getLocations(params = '') {
  const { data } = await fetchAPI(`/location-voitures?populate=voiture${params ? '&' + params : ''}`);
  return data ?? [];
}

export async function createLocation(body, token) {
  return fetchAPI('/location-voitures', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: body }),
  });
}

// Upload
export async function uploadImages(files, token) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file, file.name));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
      signal: controller.signal,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Upload échoué (${res.status})`);
    }
    return res.json();
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Upload trop long. Vérifiez que Strapi est démarré.');
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

// Auth
export async function login(identifier, password) {
  const res = await fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  return res.json();
}

export async function register(username, email, password) {
  const res = await fetch(`${API_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return res.json();
}
