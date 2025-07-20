'use client'
import { useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';

export interface ContactFormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormState>({ 
    fullName: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/property/contact-us', form);
      toast.success('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
      setForm({ fullName: '', email: '', phone: '', message: '' });
    } catch (error: unknown) {
      let message = 'No se pudo enviar el mensaje. Intenta de nuevo.';
      if (typeof error === 'object' && error !== null && 'response' in error && 
          typeof (error as { response?: unknown }).response === 'object' && 
          (error as { response: { data?: { message?: string } } }).response?.data?.message) {
        message = (error as { response: { data: { message: string } } }).response.data.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
    setForm,
  };
} 