
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer';
import { Eye, Download, Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';

// Sample orders data
const orders = [
  {
    id: "ORD-001234",
    date: "15/05/2023",
    total: 129.99,
    status: "delivered",
    items: [
      { id: 1, name: "Camiseta Básica", price: 29.99, quantity: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 2, name: "Jeans Slim Fit", price: 69.99, quantity: 1, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 3, name: "Gafas de Sol", price: 29.99, quantity: 1, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
    ],
    tracking: "ESP123456789",
    address: "Calle Principal 123, Madrid, España"
  },
  {
    id: "ORD-001235",
    date: "03/06/2023",
    total: 89.99,
    status: "shipped",
    items: [
      { id: 4, name: "Sudadera con Capucha", price: 59.99, quantity: 1, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
      { id: 5, name: "Zapatillas Deportivas", price: 79.99, quantity: 1, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
    ],
    tracking: "ESP987654321",
    address: "Avenida Secundaria 456, Barcelona, España"
  },
  {
    id: "ORD-001236",
    date: "22/06/2023",
    total: 59.99,
    status: "processing",
    items: [
      { id: 6, name: "Chaqueta de Cuero", price: 159.99, quantity: 1, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
    ],
    tracking: null,
    address: "Plaza Central 789, Valencia, España"
  }
];

// Status mapping for visual elements
const statusConfig = {
  delivered: { 
    label: "Entregado", 
    color: "bg-green-100 text-green-800", 
    icon: CheckCircle 
  },
  shipped: { 
    label: "Enviado", 
    color: "bg-blue-100 text-blue-800", 
    icon: Truck 
  },
  processing: { 
    label: "En proceso", 
    color: "bg-yellow-100 text-yellow-800", 
    icon: Clock 
  }
};

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageLayout>
      <section className="pt-12 pb-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mis Pedidos</h1>
            <p className="text-lg text-gray-600">Consulta y gestiona todos tus pedidos</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Historial de pedidos</CardTitle>
                  <CardDescription>Visualiza todos tus pedidos recientes</CardDescription>
                </div>
                <div className="mt-4 md:mt-0 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar pedidos..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-avatar-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número de pedido</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => {
                        const StatusIcon = statusConfig[order.status].icon;
                        return (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.total.toFixed(2)} €</TableCell>
                            <TableCell>
                              <Badge className={`${statusConfig[order.status].color}`}>
                                <StatusIcon className="h-3.5 w-3.5 mr-1" />
                                {statusConfig[order.status].label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Detalles
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No se encontraron pedidos que coincidan con tu búsqueda.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Order Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[90vh] overflow-auto">
          <DrawerHeader>
            <DrawerTitle>Detalles del pedido {selectedOrder?.id}</DrawerTitle>
            <DrawerDescription>
              Realizado el {selectedOrder?.date}
            </DrawerDescription>
          </DrawerHeader>
          {selectedOrder && (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <Badge className={`${statusConfig[selectedOrder.status].color}`}>
                  <StatusIcon className="h-3.5 w-3.5 mr-1" />
                  {statusConfig[selectedOrder.status].label}
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Factura
                </Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-500">PRODUCTOS</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.price.toFixed(2)} €
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{(selectedOrder.total * 0.79).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">IVA (21%)</span>
                  <span>{(selectedOrder.total * 0.21).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm font-medium mt-2">
                  <span className="text-gray-900">Total</span>
                  <span>{selectedOrder.total.toFixed(2)} €</span>
                </div>
              </div>
              
              {selectedOrder.status !== 'processing' && (
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <h4 className="text-sm font-medium text-gray-500">INFORMACIÓN DE ENVÍO</h4>
                  <div className="flex items-start space-x-2">
                    <Package className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-900">Número de seguimiento: <span className="font-medium">{selectedOrder.tracking}</span></p>
                      <p className="text-sm text-gray-500 mt-1">{selectedOrder.address}</p>
                    </div>
                  </div>
                  
                  {selectedOrder.status === 'shipped' && (
                    <Button className="w-full bg-avatar-600 hover:bg-avatar-700">
                      <Truck className="h-4 w-4 mr-2" />
                      Seguir envío
                    </Button>
                  )}
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <Button variant="outline" className="w-full" onClick={() => setIsDrawerOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </PageLayout>
  );
};

export default Orders;
