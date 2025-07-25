"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {getSession} from "next-auth/react";
import type {Session as NextAuthSession} from 'next-auth';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Phone, User, CheckCircle, AlertCircle} from "lucide-react";
import {toast} from "sonner";
import {jwtDecode} from 'jwt-decode';
import axiosInstance from '@/lib/axios';

// Type guard for axios error
function isAxiosError(error: unknown): error is { response: { data: { message?: string } } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: unknown }).response === 'object' &&
    (error as { response: { data?: unknown } }).response !== null &&
    'data' in (error as { response: { data?: unknown } }).response
  );
}

export default function ProfileUpdate() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [referralLoading, setReferralLoading] = useState(false);
    const [referralError, setReferralError] = useState("");
    const [referralSuccess, setReferralSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const session = await getSession() as unknown as NextAuthSession & { access_token?: string };
            if (!session?.access_token) {
                setError("No se pudo obtener la sesión de usuario.");
                setLoading(false);
                return;
            }
            // Decode userId from access token
            const decoded: Record<string, unknown> = jwtDecode(session.access_token);
            let userId: string | undefined;
            if (typeof decoded.user === 'object' && decoded.user !== null && '_id' in decoded.user && typeof (decoded.user as Record<string, unknown>)._id === 'string') {
                userId = String((decoded.user as Record<string, unknown>)._id);
            } else if (typeof decoded._id === 'string') {
                userId = String(decoded._id);
            } else if (typeof decoded.sub === 'string') {
                userId = String(decoded.sub);
            }
            if (!userId) {
                setError("No se pudo obtener el ID de usuario.");
                setLoading(false);
                return;
            }
            // Prepare phone number payload
            const phonePayload = {
                number: phone,
                label: "Personal",
                isPrimary: true,
                isVerified: false
            };
            await axiosInstance.post(
                `/client/users/${userId}/phone-numbers`,
                phonePayload,
                {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success("Número de teléfono guardado exitosamente");
            router.push("/");
        } catch (err: unknown) {
            let message = "Error de conexión. Verifica tu internet e intenta de nuevo.";
            if (isAxiosError(err) && err.response.data?.message) {
                message = err.response.data.message;
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleReferralSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setReferralLoading(true);
        setReferralError("");
        setReferralSuccess(false);
        try {
            const session = await getSession() as unknown as NextAuthSession & { access_token?: string };
            const res = await fetch("/api/referrals/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.access_token}`,
                },
                body: JSON.stringify({referralCode}),
            });
            if (res.ok) {
                setReferralSuccess(true);
                setReferralCode("");
                toast.success("Código de referido guardado exitosamente");
            } else {
                const errorData = await res.json().catch(() => ({}));
                setReferralError(errorData.message || "No se pudo aplicar el código. Intenta de nuevo.");
            }
        } catch {
            setReferralError("Error de conexión. Intenta de nuevo.");
        } finally {
            setReferralLoading(false);
        }
    };

    const formatPhoneNumber = (value: string) => {
        // Remove all non-digits
        const phoneNumber = value.replace(/\D/g, '');

        // Format as +XX XXX XXX XXXX
        if (phoneNumber.length <= 2) {
            return `+${phoneNumber}`;
        } else if (phoneNumber.length <= 5) {
            return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
        } else if (phoneNumber.length <= 8) {
            return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5)}`;
        } else {
            return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 8)} ${phoneNumber.slice(8, 12)}`;
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
    };

    return (
        <div
            className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
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
                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                            name="phone"
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            placeholder="+53 5XX XXX XXXX"
                                            className="pl-10 h-12 text-lg"
                                            maxLength={17}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Formato: +53 5XX XXX XXXX (Cuba)
                                    </p>
                                </div>
                                {/* Error Alert */}
                                {error && (
                                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                                        <AlertCircle className="h-4 w-4"/>
                                        <AlertDescription className="text-red-700">
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {/* Success Info */}
                                <Alert className="border-teal-200 bg-teal-50">
                                    <CheckCircle className="h-4 w-4 text-teal-600"/>
                                    <AlertDescription className="text-teal-700">
                                        Esta información nos ayudará a conectarte con los propietarios de las
                                        propiedades que te interesen
                                    </AlertDescription>
                                </Alert>
                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading || !phone.trim()}
                                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                            Guardando...
                                        </div>
                                    ) : (
                                        "Completar perfil"
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
                            <form onSubmit={handleReferralSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="referralCode" className="text-sm font-medium text-gray-700">
                                        Código de referido (opcional)
                                    </Label>
                                    <Input
                                        id="referralCode"
                                        name="referralCode"
                                        type="text"
                                        value={referralCode}
                                        onChange={e => setReferralCode(e.target.value)}
                                        placeholder="Ingresa tu código de referido"
                                        className="h-12 text-lg"
                                        maxLength={32}
                                    />
                                </div>
                                {referralError && (
                                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                                        <AlertCircle className="h-4 w-4"/>
                                        <AlertDescription className="text-red-700">
                                            {referralError}
                                        </AlertDescription>
                                    </Alert>
                                )}
                                {referralSuccess && (
                                    <Alert className="border-green-200 bg-green-50">
                                        <CheckCircle className="h-4 w-4 text-green-600"/>
                                        <AlertDescription className="text-green-700">
                                            ¡Código de referido guardado exitosamente!
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <Button
                                    type="submit"
                                    disabled={referralLoading || !referralCode.trim()}
                                    className="w-full h-12 text-lg font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
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