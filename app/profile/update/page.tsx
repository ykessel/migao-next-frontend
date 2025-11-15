'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Phone, User, CheckCircle} from 'lucide-react';
import {useProfileForms} from '@/hooks/use-profile';

/**
 * ProfileUpdate Page Component
 *
 * Allows users to complete their profile by adding:
 * - Phone number (required)
 * - Referral code (optional)
 *
 * Uses custom hook for form logic and validation.
 */

export default function ProfileUpdate() {
    const router = useRouter();
    const {
        phoneForm,
        referralForm,
        onPhoneSubmit,
        onReferralSubmit,
        handlePhoneChange,
        isAddingPhone,
        phoneAdded,
        isApplyingReferral,
        referralApplied,
    } = useProfileForms();

    // Handle phone form success
    if (phoneAdded) {
        router.push('/');
    }

    return (
        <div
            className="flex justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                        <User className="w-8 h-8 text-teal-600"/>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Completa tu perfil
                    </h1>
                    <p className="text-gray-600">
                        Necesitamos algunos datos adicionales para personalizar tu experiencia
                    </p>
                </div>

                {/* Cards Side by Side on Desktop */}
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                    {/* Form Card */}
                    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm flex-1">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Phone className="w-5 h-5 text-teal-600"/>
                                Información de contacto
                            </CardTitle>
                            <CardDescription>
                                Tu número de teléfono nos ayudará a contactarte sobre las propiedades que te interesen
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                                {/* Phone Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Número de teléfono
                                    </Label>
                                    <div className="relative">
                                        <Phone
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            {...phoneForm.register('phone')}
                                            onChange={handlePhoneChange}
                                            placeholder="+53 5555 5555"
                                            className="pl-10 h-12 text-lg"
                                            maxLength={14}
                                        />
                                    </div>
                                    {phoneForm.formState.errors.phone && (
                                        <p className="text-sm text-red-600">
                                            {phoneForm.formState.errors.phone.message}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Formato: +53 xxxx xxxx o xxxx xxxx
                                    </p>
                                </div>
                                {/* Success Info */}
                                {phoneAdded ? (
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600"/>
                                        <AlertDescription className="text-green-700">
                                            ¡Perfil completado! Redirigiendo...
                                        </AlertDescription>
                                    </Alert>
                                ) : (
                                    <Alert className="border-teal-200 bg-teal-50">
                                        <CheckCircle className="h-4 w-4 text-teal-600"/>
                                        <AlertDescription className="text-teal-700">
                                            Esta información nos ayudará a conectarte con los propietarios de las
                                            propiedades que te interesen
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={isAddingPhone || !phoneForm.watch('phone')?.trim()}
                                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {isAddingPhone ? (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                            Guardando...
                                        </div>
                                    ) : (
                                        'Completar perfil'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    {/* Referral Code Card */}
                    <Card className="h-fit shadow-xl border-0 bg-white/80 backdrop-blur-sm lg:w-1/2">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                Código de referido
                            </CardTitle>
                            <CardDescription>
                                Si tienes un código de referido, ingrésalo aquí para recibir beneficios.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={referralForm.handleSubmit(onReferralSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="referralCode" className="text-sm font-medium text-gray-700">
                                        Código de referido (opcional)
                                    </Label>
                                    <Input
                                        id="referralCode"
                                        type="text"
                                        {...referralForm.register('referralCode')}
                                        placeholder="Ingresa tu código de referido"
                                        className="h-12 text-lg"
                                        maxLength={32}
                                    />
                                    {referralForm.formState.errors.referralCode && (
                                        <p className="text-sm text-red-600">
                                            {referralForm.formState.errors.referralCode.message}
                                        </p>
                                    )}
                                </div>
                                {referralApplied && (
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600"/>
                                        <AlertDescription className="text-green-700">
                                            ¡Código de referido guardado exitosamente!
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button
                                    type="submit"
                                    disabled={isApplyingReferral || !referralForm.watch('referralCode')?.trim()}
                                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {isApplyingReferral ? (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                            Guardando...
                                        </div>
                                    ) : (
                                        'Guardar código de referido'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                        Al completar tu perfil, aceptas nuestros{" "}
                        <a href="/terms" className="text-teal-600 hover:text-teal-700 underline">
                            términos y condiciones
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
} 