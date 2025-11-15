'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {profileService} from '@/services/api-client';
import {toast} from 'sonner';

// Validation schemas
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, 'El número de teléfono es requerido')
    .regex(/^(\+53\s?\d{4}\s?\d{4}|\d{4}\s?\d{4})$/, 'Formato inválido. Use +53 xxxx xxxx o xxxx xxxx')
});

const referralSchema = z.object({
  referralCode: z
    .string()
    .min(1, 'El código de referido es requerido')
    .max(32, 'El código no puede exceder 32 caracteres')
    .regex(/^[A-Za-z0-9]+$/, 'Solo se permiten letras y números')
});

export type PhoneFormData = z.infer<typeof phoneSchema>;
export type ReferralFormData = z.infer<typeof referralSchema>;

interface AddPhoneNumberParams {
    number: string;
    label?: string;
    isPrimary?: boolean;
    isVerified?: boolean;
}

interface UpdatePhoneNumberParams {
    phoneId: string;
    number: string;
    label?: string;
    isPrimary?: boolean;
}

interface ApplyReferralCodeParams {
    referralCode: string;
}

/**
 * useAddPhoneNumber Hook
 *
 * Custom hook to handle adding a phone number to user profile.
 * Uses React Query's useMutation for optimistic updates and error handling.
 *
 * @returns Mutation object with mutate function, loading state, and error
 */
export function useAddPhoneNumber() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({number, label = 'Personal', isPrimary = true, isVerified = false}: AddPhoneNumberParams) =>
            profileService.addPhoneNumber({
                number,
                label,
                isPrimary,
                isVerified,
            }),
        onSuccess: () => {
            toast.success('Número de teléfono guardado exitosamente');
            queryClient.invalidateQueries({queryKey: ['user']});
        },
        onError: (error: Error & { response?: { data?: { message?: string } } }) => {
            console.error('Error adding phone number:', error);
            const errorMessage =
                error.response?.data?.message ||
                'Error de conexión. Verifica tu internet e intenta de nuevo.';
            toast.error(errorMessage);
        },
    });
}

/**
 * useUpdatePhoneNumber Hook
 *
 * Custom hook to handle updating an existing phone number in user profile.
 * Uses React Query's useMutation for optimistic updates and error handling.
 *
 * @returns Mutation object with mutate function, loading state, and error
 */
export function useUpdatePhoneNumber() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({phoneId, number, label, isPrimary}: UpdatePhoneNumberParams) =>
            profileService.updatePhoneNumber(phoneId, {
                number,
                label,
                isPrimary,
            }),
        onSuccess: () => {
            toast.success('Número de teléfono actualizado exitosamente');
            queryClient.invalidateQueries({queryKey: ['user']});
        },
        onError: (error: Error & { response?: { data?: { message?: string } } }) => {
            console.error('Error updating phone number:', error);
            const errorMessage =
                error.response?.data?.message ||
                'Error al actualizar el número de teléfono. Intenta de nuevo.';
            toast.error(errorMessage);
        },
    });
}

/**
 * useApplyReferralCode Hook
 *
 * Custom hook to handle applying a referral code.
 * Uses React Query's useMutation for optimistic updates and error handling.
 *
 * @returns Mutation object with mutate function, loading state, and error
 */
export function useApplyReferralCode() {
    return useMutation({
        mutationFn: ({referralCode}: ApplyReferralCodeParams) =>
            profileService.applyReferralCode(referralCode),
        onSuccess: () => {
            toast.success('Código de referido guardado exitosamente');
        },
        onError: (error: Error & { response?: { data?: { message?: string } } }) => {
            console.error('Error applying referral code:', error);
            const errorMessage =
                error.response?.data?.message ||
                'No se pudo aplicar el código. Intenta de nuevo.';
            toast.error(errorMessage);
        },
    });
}

/**
 * useProfileForms Hook
 *
 * Custom hook that provides form logic for profile update page.
 * Includes phone and referral forms with validation.
 *
 * @returns Object with form instances and handlers
 */
export function useProfileForms() {
    const addPhoneMutation = useAddPhoneNumber();
    const applyReferralMutation = useApplyReferralCode();

    // Phone form
    const phoneForm = useForm<PhoneFormData>({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone: ''
        }
    });

    // Referral form
    const referralForm = useForm<ReferralFormData>({
        resolver: zodResolver(referralSchema),
        defaultValues: {
            referralCode: ''
        }
    });

    const onPhoneSubmit = (data: PhoneFormData) => {
        addPhoneMutation.mutate({
            number: data.phone,
            label: 'Personal',
            isPrimary: true,
            isVerified: false,
        });
    };

    const onReferralSubmit = (data: ReferralFormData) => {
        applyReferralMutation.mutate(
            {referralCode: data.referralCode},
            {
                onSuccess: () => {
                    referralForm.reset();
                },
            }
        );
    };

    const formatPhoneNumber = (value: string) => {
        const phoneNumber = value.replace(/\D/g, '');

        if (phoneNumber.length === 0) {
            return '';
        }
        
        if (phoneNumber.startsWith('53')) {
            if (phoneNumber.length <= 2) {
                return `+${phoneNumber}`;
            } else if (phoneNumber.length <= 6) {
                return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
            } else {
                return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 6)} ${phoneNumber.slice(6, 10)}`;
            }
        }
        
        if (phoneNumber.length <= 4) {
            return phoneNumber;
        } else {
            return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 8)}`;
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        phoneForm.setValue('phone', formatted);
    };

    return {
        phoneForm,
        referralForm,
        onPhoneSubmit,
        onReferralSubmit,
        handlePhoneChange,
        isAddingPhone: addPhoneMutation.isPending,
        phoneAdded: addPhoneMutation.isSuccess,
        isApplyingReferral: applyReferralMutation.isPending,
        referralApplied: applyReferralMutation.isSuccess,
    };
}

