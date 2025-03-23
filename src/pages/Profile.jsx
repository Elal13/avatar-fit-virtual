
import { useState, useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { User, Edit, Mail, MapPin, Save, X, Phone, UserCircle } from 'lucide-react';
import { AvatarCustomizer } from '@/components/avatar/AvatarCustomizer';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [userData, setUserData] = useState({
    firstName: 'Usuario',
    lastName: 'Avatar',
    email: 'usuario@avatar.com',
    phone: '+34 123 456 789',
    address: 'Calle Principal 123, Madrid'
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
    
    if (name === 'firstName' && value.trim() === '') {
      newErrors.firstName = 'El nombre no puede estar vacío';
    } else if (name === 'firstName') {
      delete newErrors.firstName;
    }

    if (name === 'lastName' && value.trim() === '') {
      newErrors.lastName = 'El apellido no puede estar vacío';
    } else if (name === 'lastName') {
      delete newErrors.lastName;
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
    
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'El nombre no puede estar vacío';
    }

    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'El apellido no puede estar vacío';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Por favor, corrija los errores antes de guardar');
      return;
    }
    
    setUserData({...formData});
    setEditing(false);
    setErrors({});
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
            <p className="text-lg text-gray-600">Gestiona tu información personal y configuración</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar / User Card */}
            <div className="lg:col-span-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=avatar" alt="Usuario Avatar" />
                      <AvatarFallback className="bg-avatar-100 text-avatar-800 text-xl">
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-900">{userData.firstName} {userData.lastName}</h3>
                    <p className="text-sm text-gray-500 mt-1">{userData.email}</p>
                    <Badge className="mt-3 bg-avatar-100 text-avatar-800 hover:bg-avatar-200">Cliente Premium</Badge>
                    
                    <div className="w-full mt-6 border-t border-gray-100 pt-4">
                      <div className="flex items-center text-sm mb-2">
                        <Phone className="h-4 w-4 mr-2 text-avatar-600" />
                        <span className="text-gray-500">Teléfono</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{userData.phone}</p>
                    </div>
                    
                    <div className="w-full mt-3 border-t border-gray-100 pt-4">
                      <div className="flex items-center text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-2 text-avatar-600" />
                        <span className="text-gray-500">Dirección</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{userData.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full max-w-md mx-auto mb-6 grid grid-cols-2">
                  <TabsTrigger value="info" className="flex items-center justify-center gap-1">
                    <UserCircle className="h-4 w-4" />
                    <span>Información Personal</span>
                  </TabsTrigger>
                  <TabsTrigger value="avatar" className="flex items-center justify-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Mi Avatar</span>
                  </TabsTrigger>
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
                          <label className="text-sm font-medium text-gray-700">Nombre</label>
                          <div className="relative">
                            <Input 
                              name="firstName"
                              value={editing ? formData.firstName : userData.firstName} 
                              onChange={handleInputChange}
                              disabled={!editing}
                              className={`${editing ? (errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-avatar-300') : ''}`}
                              placeholder="Nombre"
                            />
                            {errors.firstName && (
                              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Apellido</label>
                          <div className="relative">
                            <Input 
                              name="lastName"
                              value={editing ? formData.lastName : userData.lastName} 
                              onChange={handleInputChange}
                              disabled={!editing}
                              className={`${editing ? (errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-avatar-300') : ''}`}
                              placeholder="Apellido"
                            />
                            {errors.lastName && (
                              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
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
                        
                        <div className="md:col-span-2 space-y-2">
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
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="avatar">
                  <Card className="border-avatar-200">
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
