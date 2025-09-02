export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();
    
    return data;
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Network error',
    };
  }
}
