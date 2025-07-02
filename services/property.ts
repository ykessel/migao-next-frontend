import { Property } from "@/types/property";

export interface CreatePropertyRequest {
  title: string;
  description: string;
  rentPricePerMonth: number;
  currency: string;
  rooms: number;
  bathrooms: number;
  area: number;
  location: {
    address: string;
    coordinates: [number, number];
  };
  propertyType: string;
  isAvailable: boolean;
  isFurnished: boolean;
  deposit: number;
  utilities: string;
  owner: {
    whatsapp?: string;
    telegram?: string;
    phone?: string;
  };
  amenities: string[];
  images: string[];
}

export const propertyService = {
  async createProperty(data: CreatePropertyRequest): Promise<Property> {
    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error creating property');
    }

    return response.json();
  },

  async uploadImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch('/api/properties/upload-images', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error uploading images');
    }

    return response.json();
  }
}; 