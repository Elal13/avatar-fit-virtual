
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { User, Wallet, Edit, Key, Mail, MapPin, Shield } from 'lucide-react';

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

  const handleSave = () => {
    setEditing(false);
    toast.success('Perfil actualizado correctamente');
  };

  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
            <p className="text-lg text-gray-600">Gestiona tu información personal y configuración</p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4 space-y-6">
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
                <CardFooter className="flex justify-center">
                  <Button className="bg-avatar-600 hover:bg-avatar-700 w-full">Editar Avatar</Button>
                </CardFooter>
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
            <div className="col-span-12 md:col-span-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Información de la Cuenta</CardTitle>
                    <Button 
                      variant={editing ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => editing ? handleSave() : setEditing(true)}
                      className={editing ? "bg-avatar-600 hover:bg-avatar-700" : ""}
                    >
                      {editing ? "Guardar" : "Editar"}
                      {!editing && <Edit className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                  <CardDescription>Actualiza tu información personal y preferencias</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="address">Dirección</TabsTrigger>
                      <TabsTrigger value="security">Seguridad</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <Input 
                              value={userData.name} 
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              disabled={!editing}
                              className={editing ? "border-avatar-300" : ""}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <Input 
                              value={userData.email} 
                              onChange={(e) => setUserData({...userData, email: e.target.value})}
                              disabled={!editing}
                              className={editing ? "border-avatar-300" : ""}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Teléfono</label>
                          <Input 
                            value={userData.phone} 
                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                            disabled={!editing}
                            className={editing ? "border-avatar-300" : ""}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="address" className="mt-6 space-y-4">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">Dirección de envío</label>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <Input 
                            value={userData.address} 
                            onChange={(e) => setUserData({...userData, address: e.target.value})}
                            disabled={!editing}
                            className={editing ? "border-avatar-300" : ""}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="mt-6 space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium text-gray-700">Contraseña</label>
                          {editing && (
                            <Button size="sm" variant="outline">
                              <Key className="h-4 w-4 mr-2" />
                              Cambiar
                            </Button>
                          )}
                        </div>
                        <Input type="password" value="••••••••" disabled className="bg-gray-50" />
                      </div>
                      
                      <div className="space-y-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Autenticación de dos factores</h4>
                            <p className="text-xs text-gray-500 mt-1">
                              Añade una capa extra de seguridad a tu cuenta
                            </p>
                          </div>
                          {editing && (
                            <Button size="sm" variant="outline">
                              <Shield className="h-4 w-4 mr-2" />
                              Configurar
                            </Button>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
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
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Profile;
