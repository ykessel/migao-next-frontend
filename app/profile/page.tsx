'use client';

import {useEffect, useState, useMemo} from 'react';
import {useSession} from 'next-auth/react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {CheckCircle, Mail, Phone, Plus, Settings, User} from 'lucide-react';
import {UserPropertiesList} from '@/components/profile/UserPropertiesList';
import {UserStatistics} from '@/components/profile/UserStatistics';
import {useRouter} from 'next/navigation';
import {useApplyReferralCode, useUpdatePhoneNumber, useAddPhoneNumber} from '@/hooks/use-profile';
import {jwtDecode} from 'jwt-decode';

export default function Profile() {
    const {data: session} = useSession();
    const user = session?.user;
    const router = useRouter();

    // Extract userId from session token
    const userId = useMemo(() => {
        const accessToken = (session as { access_token?: string } | null)?.access_token;
        if (!accessToken) return undefined;

        try {
            type DecodedJwt = { user?: { _id?: string }, _id?: string, sub?: string };
            const decoded = jwtDecode<DecodedJwt>(accessToken);
            return decoded.user?._id || decoded._id || decoded.sub;
        } catch {
            return undefined;
        }
    }, [session]);

    // Extract phone info from user
    const userPhone = useMemo(() => {
        if (user && 'phone' in user) {
            const phoneData = user.phone as { _id?: string; number?: string } | string;
            if (typeof phoneData === 'object' && phoneData !== null) {
                return {
                    id: phoneData._id || '',
                    number: phoneData.number || '',
                };
            }
            if (typeof phoneData === 'string') {
                return { id: '', number: phoneData };
            }
        }
        return { id: '', number: '' };
    }, [user]);

    const [profileData, setProfileData] = useState<{ name: string; email: string; phone: string }>({
        name: user?.name || '',
        email: user?.email || '',
        phone: userPhone.number,
    });

    // Referral code state
    const [referralCode, setReferralCode] = useState('');
    const {mutate: applyReferral, isPending: referralLoading, isSuccess: referralSuccess} = useApplyReferralCode();

    // Phone number mutations
    const {mutate: addPhone, isPending: isAddingPhone, isSuccess: phoneAdded} = useAddPhoneNumber();
    const {mutate: updatePhone, isPending: isUpdatingPhone, isSuccess: phoneUpdated} = useUpdatePhoneNumber();

    const isPhoneLoading = isAddingPhone || isUpdatingPhone;
    const isPhoneSuccess = phoneAdded || phoneUpdated;

    const handleReferralSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyReferral(
            {referralCode},
            {
                onSuccess: () => {
                    setReferralCode('');
                },
            }
        );
    };

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                phone: userPhone.number,
            });
        }
    }, [user, userPhone.number]);

    const formatPhoneNumber = (value: string) => {
        // Remove all non-digits
        const phoneNumber = value.replace(/\D/g, '');

        // Format as +53 xxxx xxxx (Cuba format)
        if (phoneNumber.length === 0) {
            return '';
        }
        
        // If starts with 53, format as +53 xxxx xxxx
        if (phoneNumber.startsWith('53')) {
            if (phoneNumber.length <= 2) {
                return `+${phoneNumber}`;
            } else if (phoneNumber.length <= 6) {
                return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
            } else {
                return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 6)} ${phoneNumber.slice(6, 10)}`;
            }
        }
        
        // Otherwise format as xxxx xxxx (8 digits)
        if (phoneNumber.length <= 4) {
            return phoneNumber;
        } else {
            return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 8)}`;
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setProfileData({...profileData, phone: formatted});
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !profileData.phone.trim()) return;

        // Decide whether to add or update based on whether user has a phone ID
        if (userPhone.id) {
            // Update existing phone
            updatePhone({
                userId,
                phoneId: userPhone.id,
                number: profileData.phone,
                label: 'Personal',
                isPrimary: true,
            });
        } else {
            // Add new phone
            addPhone({
                userId,
                number: profileData.phone,
                label: 'Personal',
                isPrimary: true,
                isVerified: false,
            });
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className="bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
                    <p className="text-gray-600">Gestiona tu información personal y tus propiedades</p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Profile Info Card - Takes 2 columns */}
                    <Card className="lg:col-span-2 h-fit">
                        <CardHeader className="border-gray-200">
                            <CardTitle className="text-xl font-semibold text-gray-900">
                                Información del perfil
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                                Actualiza tu información personal y datos de contacto
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleProfileSubmit}>
                            <CardContent className="space-y-4">
                                {/* Success Alert */}
                                {isPhoneSuccess && (
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600"/>
                                        <AlertDescription className="text-green-700">
                                            {userPhone.id ? 'Número de teléfono actualizado' : 'Número de teléfono agregado'}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-medium text-gray-900 uppercase">
                                        Nombre completo
                                    </Label>
                                    <div className="relative">
                                        <User
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                        <Input
                                            id="name"
                                            value={profileData.name}
                                            disabled
                                            className="pl-10 h-11 bg-gray-50 border-gray-300"
                                            placeholder="Nombre Apellido"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-medium text-gray-900 uppercase">
                                        Correo electrónico
                                    </Label>
                                    <div className="relative">
                                        <Mail
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                        <Input
                                            id="email"
                                            value={profileData.email}
                                            disabled
                                            className="pl-10 h-11 bg-gray-50 border-gray-300"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">El correo electrónico no se puede modificar</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-medium text-gray-900 uppercase">
                                        Teléfono
                                    </Label>
                                    <div className="relative">
                                        <Phone
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"/>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={profileData.phone || ''}
                                            onChange={handlePhoneChange}
                                            className="pl-10 h-11 border-gray-300"
                                            placeholder="+53 5555 5555"
                                            type="tel"
                                            maxLength={14}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Formato: +53 xxxx xxxx o xxxx xxxx</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full h-11 text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
                                    disabled={isPhoneLoading || !profileData.phone.trim() || !userId}
                                >
                                    {isPhoneLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                            Guardando...
                                        </div>
                                    ) : (
                                        userPhone.id ? 'Actualizar teléfono' : 'Agregar teléfono'
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* Right Column - Statistics and Referral Code */}
                    <div className="space-y-6">
                        {/* Statistics Card */}
                        <UserStatistics />

                        {/* Referral Code Card */}
                        <Card className="max-h-fit">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-teal-600"/>
                                Código de referido
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                                Si tienes un código de referido, ingrésalo aquí para recibir beneficios
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleReferralSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="referralCode"
                                           className="text-xs font-medium text-gray-900 uppercase">
                                        Código de referido (opcional)
                                    </Label>
                                    <Input
                                        id="referralCode"
                                        name="referralCode"
                                        type="text"
                                        value={referralCode}
                                        onChange={e => setReferralCode(e.target.value)}
                                        placeholder="Ingresa tu código de referido"
                                        className="h-11 border-gray-300"
                                    />
                                </div>
                                {referralSuccess && (
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600"/>
                                        <AlertDescription className="text-green-700 text-sm">
                                            ¡Código guardado exitosamente!
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button
                                    type="submit"
                                    disabled={referralLoading || !referralCode.trim()}
                                    className="w-full h-11 text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-200"
                                >
                                    {referralLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                            Guardando...
                                        </div>
                                    ) : (
                                        "Guardar código de referido"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    </div>
                </div>

                {/* Properties Section - Full width */}
                <Card>
                    <CardHeader className="border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-semibold text-gray-900">
                                    Mis Propiedades
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600">
                                    Gestiona las propiedades que has creado
                                </CardDescription>
                            </div>
                            <div className="flex items-center justify-end mb-2">
                                <Button
                                    onClick={() => router.push('/publish')}
                                    className="bg-teal-600 hover:bg-teal-700 text-white"
                                >
                                    <Plus className="w-4 h-4 mr-2"/>
                                    Crear Nueva
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="">
                        <UserPropertiesList/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 