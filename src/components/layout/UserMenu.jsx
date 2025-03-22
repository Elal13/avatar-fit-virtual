
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, LogOut, ShoppingBag, History, Settings, CreditCard,
  Wallet, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Simulate authentication state
const useAuth = () => {
  // In a real app, this would check localStorage, cookies, or a context
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Establecemos isLoggedIn como true por defecto
  
  const login = () => {
    setIsLoggedIn(true);
    toast.success("Inicio de sesión exitoso");
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    toast.info("Has cerrado sesión");
  };
  
  return { isLoggedIn, login, logout };
};

export function UserMenu() {
  const { isLoggedIn, login, logout } = useAuth();
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleWeb2Login = () => {
    login();
    setShowLoginOptions(false);
  };

  const handleWeb3Login = () => {
    toast.info("Conectando con wallet...");
    // Simulated Web3 login
    setTimeout(() => {
      login();
      setShowLoginOptions(false);
      toast.success("Wallet conectada correctamente");
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div className="relative">
        <Button 
          className="bg-avatar-600 hover:bg-avatar-700"
          onClick={() => setShowLoginOptions(!showLoginOptions)}
        >
          Iniciar Sesión
        </Button>
        
        {showLoginOptions && (
          <div className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Elige método de acceso</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleWeb2Login}
                >
                  <User className="h-4 w-4 mr-2" />
                  Email y Contraseña
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleWeb3Login}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Conectar Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src="/avatar-placeholder.png" alt="Usuario" />
            <AvatarFallback className="bg-avatar-100 text-avatar-800">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/orders" className="cursor-pointer">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Mis Pedidos</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/history" className="cursor-pointer">
              <History className="mr-2 h-4 w-4" />
              <span>Historial</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/payment" className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Métodos de Pago</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
