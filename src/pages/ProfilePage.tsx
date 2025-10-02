import { useState } from "react";
import { User, Heart, Package, RotateCcw, MapPin, Bell } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { mockProducts } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface ProfilePageProps {
  onNavigate: (page: string, data?: any) => void;
  onProductClick: (productId: string) => void;
  wishlistedItems: string[];
  onWishlistClick: (productId: string) => void;
}

export function ProfilePage({ onNavigate, onProductClick, wishlistedItems, onWishlistClick }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("orders");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
    memberSince: "2022"
  };

  // Mock orders data
  const orders = [
    {
      id: "ORD123456",
      date: "2023-12-15",
      status: "delivered",
      total: 2999,
      items: [
        { productId: "1", quantity: 1, size: "M", color: "Black" },
        { productId: "2", quantity: 2, size: "L", color: "Blue" }
      ]
    },
    {
      id: "ORD123457",
      date: "2023-12-10",
      status: "shipped",
      total: 4999,
      items: [
        { productId: "3", quantity: 1, size: "S", color: "Red" }
      ]
    },
    {
      id: "ORD123458",
      date: "2023-12-05",
      status: "pending",
      total: 1799,
      items: [
        { productId: "4", quantity: 1, size: "XL", color: "White" }
      ]
    }
  ];

  // Mock addresses
  const addresses = [
    {
      id: "1",
      name: "John Doe",
      phone: "+1 234 567 8900",
      addressLine1: "123 Main Street, Apartment 4B",
      city: "New York",
      state: "NY",
      pincode: "10001",
      isDefault: true
    },
    {
      id: "2",
      name: "John Doe",
      phone: "+1 234 567 8900",
      addressLine1: "456 Office Boulevard, Suite 200",
      city: "New York",
      state: "NY",
      pincode: "10002",
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const wishlistedProducts = mockProducts.filter(product => 
    wishlistedItems.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-[#FF3F6C] rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {user.memberSince}</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>Returns</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="text-lg mt-1">₹{order.total}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => {
                        const product = mockProducts.find(p => p.id === item.productId);
                        if (!product) return null;

                        return (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="w-16 h-20 flex-shrink-0">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{product.brand}</h4>
                              <p className="text-sm text-gray-600">{product.title}</p>
                              <p className="text-xs text-gray-500">
                                Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">₹{product.price * item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Return Items
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="mt-6">
            {wishlistedProducts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">Save items you love for later</p>
                  <Button
                    onClick={() => onNavigate('category')}
                    className="bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white"
                  >
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => onProductClick(product.id)}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{product.brand}</h3>
                      <p className="text-sm text-gray-600 mb-2 truncate">{product.title}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-900">₹{product.price}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onWishlistClick(product.id)}
                          className="text-[#FF3F6C] hover:bg-pink-50"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="mt-6">
            <div className="space-y-4">
              {addresses.map(address => (
                <Card key={address.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">{address.name}</h3>
                          {address.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">
                          {address.addressLine1}
                        </p>
                        <p className="text-gray-600 mb-1">
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p className="text-gray-600">
                          Phone: {address.phone}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full border-dashed border-2 border-gray-300 py-8">
                + Add New Address
              </Button>
            </div>
          </TabsContent>

          {/* Returns Tab */}
          <TabsContent value="returns" className="mt-6">
            <Card>
              <CardContent className="text-center py-12">
                <RotateCcw className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">No returns yet</h3>
                <p className="text-gray-600">
                  When you return items, they'll appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}