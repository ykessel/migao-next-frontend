"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authService } from '@/services/auth';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [phones, setPhones] = useState<string[]>(user?.phones || []);
  const [primaryPhone, setPrimaryPhone] = useState<string>(user?.primaryPhone || '');

  // const params = useParams();
  // const propertyId = params.id;

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      setPhones(user.phones || []);
      setPrimaryPhone(user.primaryPhone || '');
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authService.updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phones,
        primaryPhone,
      });
      setSuccess('Perfil actualizado correctamente');
    } catch {
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await authService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      setSuccess('Contraseña actualizada correctamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      setError('Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAddPhone = () => {
    if (phones.length < 2) setPhones([...phones, '']);
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = phones.filter((_, i) => i !== index);
    setPhones(newPhones);
    if (primaryPhone === phones[index]) setPrimaryPhone(newPhones[0] || '');
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = phones.map((p, i) => (i === index ? value : p));
    setPhones(newPhones);
  };

  const handleSetPrimary = (phone: string) => {
    setPrimaryPhone(phone);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Información del perfil</CardTitle>
                <CardDescription>
                  Actualiza tu información personal
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleProfileSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm">
                      {success}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                    />
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfonos</Label>
                    {phones.map((phone, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2">
                        <Input
                          type="tel"
                          value={phone}
                          onChange={e => handlePhoneChange(idx, e.target.value)}
                          placeholder="Número de teléfono"
                        />
                        <Button type="button" variant="outline" onClick={() => handleRemovePhone(idx)} disabled={phones.length === 1}>
                          Eliminar
                        </Button>
                        <Button type="button" variant={primaryPhone === phone ? 'default' : 'outline'} onClick={() => handleSetPrimary(phone)}>
                          {primaryPhone === phone ? 'Principal' : 'Hacer principal'}
                        </Button>
                      </div>
                    ))}
                    {phones.length < 2 && (
                      <Button type="button" variant="secondary" onClick={handleAddPhone}>
                        Agregar teléfono
                      </Button>
                    )}
                  </div>
                  {!primaryPhone && (
                    <div className="bg-yellow-50 text-yellow-700 p-3 rounded-md text-sm mt-2">
                      Debes configurar al menos un número de teléfono principal para completar tu perfil.
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar contraseña</CardTitle>
                <CardDescription>
                  Actualiza tu contraseña para mantener tu cuenta segura
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm">
                      {success}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña actual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva contraseña</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 