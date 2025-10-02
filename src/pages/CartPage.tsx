import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { mockProducts, CartItem } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface CartPageProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function CartPage({ cartItems, onNavigate, onUpdateQuantity, onRemoveItem }: CartPageProps) {
  const [promoCode, setPromoCode] = useState('');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const product = mockProducts.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const discount = subtotal * 0.1; // 10% discount for demo
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl mb-8">Shopping Bag</h1>
          
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl text-gray-900 mb-4">Your bag is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your bag yet.</p>
            <Button
              onClick={() => onNavigate('home')}
              className="bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white px-8 py-3"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl mb-8">Shopping Bag ({cartItems.length} items)</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const product = mockProducts.find(p => p.id === item.productId);
              if (!product) return null;

              return (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="w-24 h-32 flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{product.brand}</h3>
                          <p className="text-sm text-gray-600">{product.title}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Size: {item.selectedSize}</span>
                        <span>Color: {item.selectedColor}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg text-gray-900">₹{product.price * item.quantity}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice * item.quantity}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#FF3F6C] focus:border-[#FF3F6C]"
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => onNavigate('checkout')}
                className="w-full mt-6 bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white py-3"
              >
                Proceed to Checkout
              </Button>

              {/* Additional Info */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p>✓ Free delivery on orders above ₹999</p>
                <p>✓ Easy 30 days return & exchange</p>
                <p>✓ 100% authentic products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            onClick={() => onNavigate('category')}
            className="border-[#FF3F6C] text-[#FF3F6C] hover:bg-[#FF3F6C] hover:text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}