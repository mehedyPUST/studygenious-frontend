const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RequestOptions extends RequestInit {
    token?: string | null;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Something went wrong' }));
        throw new Error(error.error?.message || error.message || 'Request failed');
    }

    return res.json();
}

// Client-side requests: auto-attach token from localStorage
export function apiClient<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    return request<T>(endpoint, { ...options, token });
}

// Public requests (no token needed)
export function publicApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return request<T>(endpoint, options);
}