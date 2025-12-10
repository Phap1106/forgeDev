//src/api/toolsApi.ts
export type RentalPackage = {
  id?: number;
  code: string;
  label: string;
  durationHours: number;
  priceVnd: number;
  isDefault?: boolean;
};

export type ToolDto = {
  id?: number;
  name: string;
  slug?: string;
  category?: string;
  priceVnd: number;
  billingMode: 'one_time' | 'rental';
  deliveryType: 'online' | 'download';
  hourlyPrice?: number;
  rentalStrategy?: 'fixed_packages' | 'user_choose';

  description?: string;
  priceLabel?: string;
  heroImageUrl?: string;
  liveBadgeText?: string;
  difficulty?: string;
  environment?: string;
  updatePolicy?: string | null;
  suitedFor?: string | null;
  visibility?: string;
  status?: string;

  rentalPackages?: RentalPackage[];
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('forgevault_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function fetchTools(): Promise<ToolDto[]> {
  const res = await fetch(`${API_BASE}/admin/tools`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    cache: 'no-store',
  });
  return handle<ToolDto[]>(res);
}

export async function createTool(payload: ToolDto): Promise<ToolDto> {
  const res = await fetch(`${API_BASE}/admin/tools`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handle<ToolDto>(res);
}

export async function updateTool(
  id: number,
  payload: ToolDto,
): Promise<ToolDto> {
  const res = await fetch(`${API_BASE}/admin/tools/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });
  return handle<ToolDto>(res);
}

export async function deleteTool(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/tools/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
  await handle(res);
}

// Upload ảnh từ PC
export async function uploadToolImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/admin/tools/upload-image`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    body: formData,
  });

  const data = await handle<{ url: string }>(res);
  return data.url; // /uploads/tools/xxx.png
}
