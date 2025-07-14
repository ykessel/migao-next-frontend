import {useState} from 'react';
import {propertyReportService} from '@/services/api-client';
import type {PropertyReport, CreatePropertyReport} from '@/types/property-report';

export function useCreatePropertyReport() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createReport = async (data: CreatePropertyReport) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await propertyReportService.createReport(data);
            setSuccess(true);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message || 'Error al enviar el reporte');
            }
        } finally {
            setLoading(false);
        }
    };

    return {createReport, loading, error, success};
}

export function useGetReportsByProperty(propertyId: string) {
    const [reports, setReports] = useState<PropertyReport[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await propertyReportService.getReportsByProperty(propertyId);
            setReports(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err?.message || 'Error al obtener los reportes');
            }
        } finally {
            setLoading(false);
        }
    };

    return {reports, fetchReports, loading, error};
}

export function useGetUserReports() {
    const [reports, setReports] = useState<PropertyReport[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await propertyReportService.getUserReports();
            setReports(data);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Error al obtener los reportes');
            }
        } finally {
            setLoading(false);
        }
    };

    return {reports, fetchReports, loading, error};
} 