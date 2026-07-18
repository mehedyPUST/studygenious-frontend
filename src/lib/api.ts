const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

interface RequestOptions extends RequestInit {
    token?: string | null;
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
    if (isRefreshing && refreshPromise) return refreshPromise;

    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const refreshTokenValue = localStorage.getItem('refreshToken');
            if (!refreshTokenValue) return false;

            const res = await fetch(`${API_BASE}/api/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken: refreshTokenValue }),
            });

            if (!res.ok) return false;

            const data = await res.json();
            if (data.success) {
                localStorage.setItem('token', data.data.tokens.accessToken);
                localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
                return true;
            }
            return false;
        } catch {
            return false;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers = new Headers(fetchOptions.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const baseUrl = API_BASE.replace(/\/+$/, '');
    const url = `${baseUrl}${endpoint}`;

    let res = await fetch(url, { ...fetchOptions, headers });

    if (res.status === 401 && token) {
        const refreshed = await refreshToken();
        if (refreshed) {
            const newToken = localStorage.getItem('token');
            headers.set('Authorization', `Bearer ${newToken}`);
            res = await fetch(url, { ...fetchOptions, headers });
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            throw new Error('Session expired. Please login again.');
        }
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Something went wrong' }));
        throw new Error(error.error?.message || error.message || 'Request failed');
    }

    return res.json();
}

export function apiClient<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return request<T>(endpoint, { ...options, token });
}

export function publicApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return request<T>(endpoint, options);
}