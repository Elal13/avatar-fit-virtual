
import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { User, Wallet, Edit, Key, Mail, MapPin, Shield, Save, X } from 'lucide-react';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState({
    name: 'Usuario Avatar',
    email: 'usuario@avatar.com',
    phone: '+34 123 456 789',
    address: 'Calle Principal 123, Madrid',
    walletAddress: '0x1234...5678',
    joined: 'Enero 2023'
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [errors, setErrors] = useState({});

  // Reset form data when toggling edit mode
  useEffect(() => {
    if (editing) {
      setFormData({...userData});
    }
  }, [editing, userData]);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\+?[0-9\s]{8,15}$/;
    return re.test(String(phone));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
    let newErrors = {...errors};
    
    if (name === 'email' && !validateEmail(value)) {
      newErrors.email = 'Email inválido';
    } else if (name === 'email') {
      delete newErrors.email;
    }
    
    if (name === 'phone' && !validatePhone(value)) {
      newErrors.phone = 'Número de teléfono inválido';
    } else if (name === 'phone') {
      delete newErrors.phone;
    }
    
    if (name === 'name' && value.trim() === '') {
      newErrors.name = 'El nombre no puede estar vacío';
    } else if (name === 'name') {
      delete newErrors.name;
    }
    
    setErrors(newErrors);
  };

  const handleCancel = () => {
    setEditing(false);
    setErrors({});
  };

  const handleSave = () => {
    // Validate all fields before saving
    let newErrors = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Número de teléfono inválido';
    }
    
    if (formData.name.trim() === '') {
      newErrors.name = 'El nombre no puede estar vacío';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Por favor, corrija los errores antes de guardar');
      return;
    }
    
    setUserData({...formData});
    setEditing(false);
    setErrors({});
    toast.success('Perfil actualizado correctamente', {
      position: 'bottom-right'
    });
  };

  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
            <p className="text-lg text-gray-600">Gestiona tu información personal y configuración</p>
          </div>

          <div className="grid grid-cols-12 gap-4 lg:gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=avatar" alt="Usuario Avatar" />
                      <AvatarFallback className="bg-avatar-100 text-avatar-800 text-xl">
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-900">{userData.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{userData.email}</p>
                    <Badge className="mt-3 bg-avatar-100 text-avatar-800 hover:bg-avatar-200">Cliente Premium</Badge>
                    
                    <div className="mt-6 w-full">
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Miembro desde</span>
                          <span className="font-medium text-gray-900">{userData.joined}</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <div className="flex items-center text-sm">
                          <Wallet className="h-4 w-4 mr-2 text-avatar-600" />
                          <span className="text-gray-500">Wallet</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-1">{userData.walletAddress}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Acceso Rápido</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/orders">Mis Pedidos</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/history">Historial de Compras</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/closet">Mi Armario</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <a href="/payment">Métodos de Pago</a>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-6">
                  <TabsTrigger value="info">Información Personal</TabsTrigger>
                  <TabsTrigger value="avatar">Mi Avatar</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center flex-wrap gap-4">
                        <CardTitle>Datos Personales</CardTitle>
                        <div className="flex space-x-2">
                          {editing ? (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={handleCancel}
                                className="flex items-center"
                              >
                                <X className="mr-1 h-4 w-4" />
                                Cancelar
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={handleSave}
                                className="bg-avatar-600 hover:bg-avatar-700 flex items-center"
                                disabled={Object.keys(errors).length > 0}
                              >
                                <Save className="mr-1 h-4 w-4" />
                                Guardar
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setEditing(true)}
                              className="flex items-center"
                            >
                              <Edit className="mr-1 h-4 w-4" />
                              Editar
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardDescription>Actualiza tu información personal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              name="name"
                              value={editing ? formData.name : userData.name} 
                              onChange={handleInputChange}
                              disabled={!editing}
                              className={`pl-10 ${editing ? (errors.name ? 'border-red-500 focus:ring-red-500' : 'border-avatar-300') : ''}`}
                              placeholder="Nombre completo"
                            />
                            {errors.name && (
                              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              name="email"
                              value={editing ? formData.email : userData.email} 
                              onChange={handleInputChange}
                              disabled={!editing}
                              className={`pl-10 ${editing ? (errors.email ? 'border-red-500 focus:ring-red-500' : 'border-avatar-300') : ''}`}
                              placeholder="correo@ejemplo.com"
                            />
                            {errors.email && (
                              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Teléfono</label>
                          <Input 
                            name="phone"
                            value={editing ? formData.phone : userData.phone} 
                            onChange={handleInputChange}
                            disabled={!editing}
                            className={`${editing ? (errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-avatar-300') : ''}`}
                            placeholder="+34 123 456 789"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Dirección</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input 
                              name="address"
                              value={editing ? formData.address : userData.address} 
                              onChange={handleInputChange}
                              disabled={!editing}
                              className={`pl-10 ${editing ? 'border-avatar-300' : ''}`}
                              placeholder="Dirección completa"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 border-t border-gray-100 pt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Configuración de seguridad</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Contraseña</label>
                            <div className="flex items-center space-x-3">
                              <Input 
                                type="password" 
                                value="••••••••" 
                                disabled 
                                className="bg-gray-50"
                              />
                              {editing && (
                                <Button size="sm" variant="outline">
                                  <Key className="h-4 w-4 mr-1" />
                                  Cambiar
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="text-sm font-medium text-gray-700">Autenticación de dos factores</label>
                              {editing && (
                                <Button size="sm" variant="outline">
                                  <Shield className="h-4 w-4 mr-1" />
                                  Activar
                                </Button>
                              )}
                            </div>
                            <div className="bg-gray-50 h-10 rounded-md border border-gray-200 px-3 flex items-center">
                              <span className="text-gray-500 text-sm">Desactivado</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Preferencias</CardTitle>
                        <CardDescription>Controla tus notificaciones y privacidad</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Notificaciones por email</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              Recibe notificaciones sobre tus pedidos y ofertas
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="email-notifications"
                              className="h-4 w-4 rounded border-gray-300 text-avatar-600 focus:ring-avatar-600"
                              defaultChecked
                            />
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Recomendaciones personalizadas</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              Permite que usemos tus datos para recomendarte productos
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="recommendations"
                              className="h-4 w-4 rounded border-gray-300 text-avatar-600 focus:ring-avatar-600"
                              defaultChecked
                            />
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Compartir datos anónimos</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              Ayúdanos a mejorar compartiendo datos de uso anónimos
                            </p>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="share-data"
                              className="h-4 w-4 rounded border-gray-300 text-avatar-600 focus:ring-avatar-600"
                              defaultChecked
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="avatar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mi Avatar Digital</CardTitle>
                      <CardDescription>Personaliza tu avatar 3D para probar prendas virtualmente</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AvatarCustomizer />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Profile;
