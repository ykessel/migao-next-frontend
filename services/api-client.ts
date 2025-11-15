import axiosInstance from '@/lib/axios';
import type {CreatePropertyRequest, Property} from '@/types/property';
import type {SearchPropertyRequest, SearchResponse} from '@/types/filter';
import type {CreatePropertyReport, PropertyReport} from '@/types/property-report';
import type {Plan} from '@/types/plan';
import {IMapPropertyReduced} from "@/components/map";

// --- Property Service ---
export const propertyService = {
    async createProperty(data: CreatePropertyRequest): Promise<Property> {
        const response = await axiosInstance.post('/property', data);
        return response.data;
    },
    async getPropertyById(slug: string): Promise<Property> {
        // Public endpoint - no auth required
        const response = await axiosInstance.get(`/property/slug/${slug}`, {skipAuth: true});
        return response.data;
    },
    async searchProperties(searchParams: SearchPropertyRequest = {}): Promise<SearchResponse<Property>> {
        // Public endpoint - no auth required
        const response = await axiosInstance.post('/property/search', searchParams, {skipAuth: true});
        return response.data;
    },
    async searchMapProperties(searchParams: SearchPropertyRequest = {}): Promise<IMapPropertyReduced[]> {
        // Public endpoint - no auth required
        const response = await axiosInstance.post('/property/map-search', searchParams, {skipAuth: true});
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
            headers: {'Content-Type': 'multipart/form-data'},
        });
        return response.data;
    },
};

// --- Favorites Service ---
export const favoritesService = {
    async getFavorites() {
        const response = await axiosInstance.get('/property/favorites/me');
        return response.data;
    },
    async addFavorite(propertyId: string) {
        const response = await axiosInstance.post(`/property/${propertyId}/favorite/me`, {});
        return response.data;
    },
    async removeFavorite(propertyId: string) {
        const response = await axiosInstance.delete(`/property/${propertyId}/favorite/me`);
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

// --- Property Rating Service ---
export const propertyRatingService = {
    async rateProperty(slug: string, rating: number): Promise<{ message: string }> {
        const response = await axiosInstance.post(`/property/${slug}/rate`, { rating });
        return response.data;
    },
};

// --- Profile Service ---
export const profileService = {
    async addPhoneNumber(phoneData: {
        number: string;
        label: string;
        isPrimary: boolean;
        isVerified: boolean;
    }): Promise<{ message: string }> {
        const response = await axiosInstance.post(
            `/client/users/phone-numbers`,
            phoneData
        );
        return response.data;
    },
    async updatePhoneNumber(phoneId: string, phoneData: {
        number: string;
        label?: string;
        isPrimary?: boolean;
    }): Promise<{ message: string }> {
        const response = await axiosInstance.put(
            `/client/users/phone-numbers/${phoneId}`,
            phoneData
        );
        return response.data;
    },
    async applyReferralCode(referralCode: string): Promise<{ message: string }> {
        const response = await axiosInstance.post('/api/referrals/apply', { referralCode });
        return response.data;
    },
};

// --- Plans Service ---
export const plansService = {
    async searchPlans(): Promise<{ total: number; page: number; data: Plan[] }> {
        // Public endpoint - no auth required
        const response = await axiosInstance.post('/plans/search', {}, {skipAuth: true});
        return response.data;
    },
    async getPlanById(id: string): Promise<Plan> {
        // Public endpoint - no auth required
        const response = await axiosInstance.get(`/plans/${id}`, {skipAuth: true});
        return response.data;
    },
};

export async function getPropertyById(id: string) {
    try {
        return await propertyService.getPropertyById(id);
    } catch (error) {
        console.error('Failed to fetch property:', error);
        return null;
    }
}

export async function getPlans() {
    try {
        const response = await plansService.searchPlans();
        return response.data;
    } catch (error) {
        console.error('Failed to fetch plans:', error);
        return [];
    }
} 