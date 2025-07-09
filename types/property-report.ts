import { REPORT_REASON } from '@/constants/report-reason.enum';

export interface CreatePropertyReport {
  propertyId: string;
  reason: REPORT_REASON;
  description: string;
}

export interface PropertyReport extends CreatePropertyReport {
  _id: string;
  createdAt: string;
  updatedAt: string;
  reporterId?: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
} 