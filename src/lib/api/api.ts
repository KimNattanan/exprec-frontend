const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || '').replace(/\/+$/,'');

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  credentials?: RequestCredentials;
};

export async function fetchApi(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body,
    credentials,
  } = options;

  let res = await fetch(url, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    },
    body: body,
    credentials,
  });

  if (res.status === 401) {
    const refresh = await fetch(`${BACKEND_URL}/api/v2/auth/refresh`, { method: 'POST', credentials: 'include' });
    if (!refresh.ok) throw new Error('Session expired');

    const data = await refresh.json();
    sessionStorage.setItem('access_token', data.access_token);

    res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
      },
      body: body,
      credentials,
    });
  }

  return res;
}