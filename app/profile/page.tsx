"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Mail, CheckCircle, AlertCircle, Settings, Home, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { UserPropertiesList } from '@/components/profile/UserPropertiesList';

export default function Profile() {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileData, setProfileData] = useState<{ name: string; email: string; phone: string }>({
    name: user?.name || '',
    email: user?.email || '',
    phone: (user && 'phone' in user && typeof user.phone === 'string' ? user.phone : ''),
  });

  // Referral code state
  const [referralCode, setReferralCode] = useState("");
  const [referralLoading, setReferralLoading] = useState(false);
  const [referralError, setReferralError] = useState("");
  const [referralSuccess, setReferralSuccess] = useState(false);

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReferralLoading(true);
    setReferralError("");
    setReferralSuccess(false);
    try {
      const res = await fetch("/api/profile/referral-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referralCode }),
      });
      if (res.ok) {
        setReferralSuccess(true);
        setReferralCode("");
        toast.success("Código de referido guardado exitosamente");
      } else {
        const errorData = await res.json().catch(() => ({}));
        setReferralError(errorData.message || "No se pudo guardar el código. Intenta de nuevo.");
      }
    } catch {
      setReferralError("Error de conexión. Intenta de nuevo.");
    } finally {
      setReferralLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: ('phone' in user && typeof user.phone === 'string' ? user.phone : ''),
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      // Implement profile update logic here if needed
      setSuccess('Perfil actualizado correctamente');
      toast.success('Perfil actualizado exitosamente');
    } catch {
      setError('Error al actualizar el perfil');
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 py-6 px-2 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <User className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Mi Perfil</h1>
          <p className="text-gray-600 text-base sm:text-lg">Gestiona tu información personal y tus propiedades</p>
        </div>

        {/* Profile Info Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-teal-100">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Settings className="w-5 h-5 text-teal-600" />
              Información del perfil
            </CardTitle>
            <CardDescription>
              Actualiza tu información personal y datos de contacto
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleProfileSubmit}>
            <CardContent className="space-y-6 pt-6">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}
              {/* Success Alert */}
              {success && (
                <Alert className="border-teal-200 bg-teal-50">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  <AlertDescription className="text-teal-700">{success}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="name" value={profileData.name} disabled className="pl-10 h-12 bg-gray-50" placeholder="Tu nombre completo" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="email" value={profileData.email} disabled className="pl-10 h-12 bg-gray-50" />
                  </div>
                  <p className="text-xs text-gray-500">El correo electrónico no se puede modificar</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input id="phone" value={profileData.phone || ''} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} className="pl-10 h-12" placeholder="Tu número de teléfono" type="tel" maxLength={17} />
                  </div>
                  <p className="text-xs text-gray-500">Formato: +53 5XX XXX XXXX (Cuba)</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </div>
                ) : (
                  'Guardar cambios'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Referral Code Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">Código de referido</CardTitle>
            <CardDescription>Si tienes un código de referido, ingrésalo aquí para recibir beneficios.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReferralSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="referralCode" className="text-sm font-medium text-gray-700">Código de referido (opcional)</Label>
                <Input id="referralCode" name="referralCode" type="text" value={referralCode} onChange={e => setReferralCode(e.target.value)} placeholder="Ingresa tu código de referido" className="h-12 text-lg" maxLength={32} />
              </div>
              {referralError && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">{referralError}</AlertDescription>
                </Alert>
              )}
              {referralSuccess && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">¡Código de referido guardado exitosamente!</AlertDescription>
                </Alert>
              )}
              <Button type="submit" disabled={referralLoading || !referralCode.trim()} className="w-full h-12 text-base font-medium bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                {referralLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </div>
                ) : (
                  "Guardar código de referido"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Properties Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-teal-100">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Home className="w-5 h-5 text-teal-600" />
              Mis Propiedades
            </CardTitle>
            <CardDescription>Visualiza y gestiona tus propiedades publicadas</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 max-h-[500px] overflow-y-auto">
            <UserPropertiesList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 