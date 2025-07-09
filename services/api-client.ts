import axiosInstance from '@/lib/axios';
import type {CreatePropertyRequest, Property} from '@/types/property';
import type {SearchPropertyRequest, SearchResponse} from '@/types/filter';
import type {CreatePropertyReport, PropertyReport} from '@/types/property-report';

// --- Property Service ---
export const propertyService = {
  async createProperty(data: CreatePropertyRequest): Promise<Property> {
    const response = await axiosInstance.post('/property', data);
    return response.data;
  },
  async getPropertyById(id: string): Promise<Property> {
    const response = await axiosInstance.get(`/property/${id}`);
    return response.data;
  },
  async searchProperties(searchParams: SearchPropertyRequest = {}): Promise<SearchResponse<Property>> {
    const response = await axiosInstance.post('/property/search', searchParams);
    return response.data;
  },
  async updateProperty(id: string, data: Partial<CreatePropertyRequest>): Promise<Property> {
    const response = await axiosInstance.put(`/property/${id}`, data);
    return response.data;
  },
  async deleteProperty(id: string): Promise<void> {
    await axiosInstance.delete(`/property/${id}`);
  },
  async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    const response = await axiosInstance.get(`/property/owner/${ownerId}`);
    return response.data;
  },
  async uploadImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    const response = await axiosInstance.post('/property/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

// --- Favorites Service ---
export const favoritesService = {
  async getFavorites(token?: string) {
    const response = await axiosInstance.get('/property/favorites/me',
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  },
  async addFavorite(propertyId: string, token?: string) {
    const response = await axiosInstance.post(
      `/property/${propertyId}/favorite/me`,
      {},
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  },
  async removeFavorite(propertyId: string, token?: string) {
    const response = await axiosInstance.delete(
      `/property/${propertyId}/favorite/me`,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    return response.data;
  },
};

// --- User Properties Service ---
export const userPropertiesService = {
  async getUserProperties(): Promise<Property[]> {
    const response = await axiosInstance.get('/properties/user');
    return response.data;
  },
  async updateProperty(propertyId: string, propertyData: Partial<Property>): Promise<Property> {
    const response = await axiosInstance.put(`/properties/${propertyId}`, propertyData);
    return response.data;
  },
  async deleteProperty(propertyId: string): Promise<void> {
    await axiosInstance.delete(`/properties/${propertyId}`);
  },
};

// --- Property Report Service ---
export const propertyReportService = {
  async createReport(report: CreatePropertyReport): Promise<PropertyReport> {
    const response = await axiosInstance.post('/property-reports', report);
    return response.data;
  },
  async getReportsByProperty(propertyId: string): Promise<PropertyReport[]> {
    const response = await axiosInstance.get(`/property-reports/property/${propertyId}`);
    return response.data;
  },
  async getUserReports(): Promise<PropertyReport[]> {
    const response = await axiosInstance.get('/property-reports/user');
    return response.data;
  },
};

// --- Utility for SSR/Server Functions ---
export async function getInitialProperties(searchParams: SearchPropertyRequest = {}) {
  try {
    return await propertyService.searchProperties({
      page: 1,
      size: 9,
      ...searchParams,
    });
  } catch (error) {
    console.error('Failed to fetch initial properties:', error);
    return { data: [], total: 0 };
  }
}

export async function getPropertyById(id: string) {
  try {
    return await propertyService.getPropertyById(id);
  } catch (error) {
    console.error('Failed to fetch property:', error);
    return null;
  }
} 