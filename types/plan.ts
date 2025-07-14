export interface Plan {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    durationType?: string;
    features: Record<string, {
      enabled: boolean;
      value: number;
      description: string;
      interval: 'month' | 'week' | 'day' | 'one_time' | 'unlimited' | 'every_15_days' | 'every_30_days';
    }>;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  }