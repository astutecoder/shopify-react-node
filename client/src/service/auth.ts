import {
  APP_URL,
  NONCE_KEY,
  SERVER_URL,
  SHOPIFY_CLIENT_ID,
  SHOPIFY_SCOPES,
} from '../utils/constants/global';

export const getIsAuthenticated = async (shop: string) => {
  const data = await fetch(`${SERVER_URL}/auth/check-me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shop }),
  });

  return await data.json();
};

export const getAuthorized = async (shop: string) => {
  const redirect_uri = `${APP_URL}/authenticate`;
  const nonce = Math.random() * Date.now();
  const url = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${SHOPIFY_SCOPES}&redirect_uri=${redirect_uri}&state=${nonce}`;

  localStorage.setItem(NONCE_KEY, String(nonce));
  window.location.replace(url);
};

export const getAuthToken = async (shop: string, code: string) => {
  const tokenUrl = `${SERVER_URL}/auth/retrive-token`;

  const data = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shop, code }),
  });

  return await data.json();
};
