import {apiClient} from "./api"
import type {Property, CreatePropertyRequest, SearchPropertyRequest, SearchResponse} from "@/types/property"
import axiosInstance from '@/lib/axios';

export class PropertyService {
    private static readonly ENDPOINT = "/property"

    static async createProperty(data: CreatePropertyRequest): Promise<Property> {
        return apiClient.post<Property>("/property", data)
    }

    static async getPropertyById(id: string): Promise<Property> {
        return apiClient.get<Property>(`${this.ENDPOINT}/${id}`)
    }

    static async searchProperties(searchParams: SearchPropertyRequest = {}): Promise<SearchResponse<Property>> {
        return apiClient.post<SearchResponse<Property>>(`${this.ENDPOINT}/search`, searchParams)
    }

    static async updateProperty(id: string, data: Partial<CreatePropertyRequest>): Promise<Property> {
        return apiClient.put<Property>(`${this.ENDPOINT}/${id}`, data)
    }

    static async deleteProperty(id: string): Promise<void> {
        return apiClient.delete<void>(`${this.ENDPOINT}/${id}`)
    }

    static async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
        return apiClient.get<Property[]>(`${this.ENDPOINT}/owner/${ownerId}`)
    }
}

export const favoritesService = {
  async getFavorites(token?: string) {
    const response = await axiosInstance.get(
      '/property/favorites/me',
      token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined
    );
    return response.data;
  },
  
  async addFavorite(propertyId: string, token?: string) {
    const response = await axiosInstance.post(
      `/property/${propertyId}/favorite/me`,
      {},
      token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined
    );
    return response.data;
  },
  async removeFavorite(propertyId: string) {
    const response = await axiosInstance.delete(`/property/${propertyId}/favorite/me`);
    return response.data;
  },
};
