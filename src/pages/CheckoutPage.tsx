import { useState } from "react";
import { CreditCard, MapPin, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { mockProducts, CartItem } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface CheckoutPageProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onPlaceOrder: () => void;
}

export function CheckoutPage({ cartItems, onNavigate, onPlaceOrder }: CheckoutPageProps) {
  const [selectedAddress, setSelectedAddress] = useState('new');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const product = mockProducts.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const discount = subtotal * 0.1;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const handleInputChange = (field: string, value: string) => {
    setAddressForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Here you would validate the form and process the order
    onPlaceOrder();
    onNavigate('profile'); // Redirect to profile to show order
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl mb-8 text-gray-900">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="saved" id="saved-address" />
                    <Label htmlFor="saved-address" className="flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-600">
                          123 Main Street, Apartment 4B<br />
                          New York, NY 10001<br />
                          Phone: +1 234 567 8900
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="new" id="new-address" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="new-address" className="cursor-pointer font-medium mb-3 block">
                        Add New Address
                      </Label>
                      
                      {selectedAddress === 'new' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={addressForm.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={addressForm.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Label htmlFor="address1">Address Line 1</Label>
                            <Input
                              id="address1"
                              value={addressForm.addressLine1}
                              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                            <Input
                              id="address2"
                              value={addressForm.addressLine2}
                              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={addressForm.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={addressForm.state}
                              onChange={(e) => handleInputChange('state', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="pincode">PIN Code</Label>
                            <Input
                              id="pincode"
                              value={addressForm.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card-payment" />
                    <Label htmlFor="card-payment" className="cursor-pointer">
                      Credit/Debit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi-payment" />
                    <Label htmlFor="upi-payment" className="cursor-pointer">
                      UPI Payment
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod-payment" />
                    <Label htmlFor="cod-payment" className="cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === 'card' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardholder">Cardholder Name</Label>
                      <Input
                        id="cardholder"
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => {
                    const product = mockProducts.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.id} className="flex space-x-3">
                        <div className="w-12 h-16 flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.brand}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.selectedSize} | {item.selectedColor} | Qty: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-900">
                            ₹{product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator />
                
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white py-3"
                >
                  Place Order
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our Terms & Conditions
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}