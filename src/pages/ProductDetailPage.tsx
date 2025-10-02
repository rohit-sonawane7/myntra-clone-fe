import { useState } from "react";
import { Heart, Star, ShoppingBag, Shield, Truck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { mockProducts } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string) => void;
  onAddToCart: (productId: string, size: string, color: string) => void;
  onWishlistClick: (productId: string) => void;
  wishlistedItems: string[];
}

export function ProductDetailPage({ 
  productId, 
  onNavigate, 
  onAddToCart, 
  onWishlistClick, 
  wishlistedItems 
}: ProductDetailPageProps) {
  const product = mockProducts.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Button onClick={() => onNavigate('home')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlistedItems.includes(productId);
  const canAddToCart = selectedSize && selectedColor;

  const handleAddToCart = () => {
    if (canAddToCart) {
      onAddToCart(productId, selectedSize, selectedColor);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <button onClick={() => onNavigate('home')} className="hover:text-[#FF3F6C]">
              Home
            </button>
            <span className="mx-2">/</span>
            <button onClick={() => onNavigate('category')} className="hover:text-[#FF3F6C]">
              {product.category}
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-[#FF3F6C]' : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl lg:text-3xl text-gray-900">{product.title}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWishlistClick(productId)}
                  className="hover:bg-pink-50"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#FF3F6C] text-[#FF3F6C]' : 'text-gray-600'}`} />
                </Button>
              </div>
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-green-600 text-green-600" />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl text-[#212121]">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                  <Badge className="bg-[#FF3F6C] text-white">
                    {product.discount}% OFF
                  </Badge>
                </>
              )}
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <Label className="text-base mb-3 block">Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={`color-${color}`} />
                      <Label htmlFor={`color-${color}`} className="cursor-pointer">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div>
              <Label className="text-base mb-3 block">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`size-${size}`} />
                      <Label htmlFor={`size-${size}`} className="cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="w-full bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white py-3 text-lg disabled:bg-gray-300"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Bag
              </Button>
              
              {!canAddToCart && (
                <p className="text-sm text-gray-500 text-center">
                  Please select size and color to add to bag
                </p>
              )}
            </div>

            <Separator />

            {/* Product Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Free delivery on orders above ₹999</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700">Easy 30 days return & exchange</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">100% authentic products</span>
              </div>
            </div>

            <Separator />

            {/* Product Description */}
            <div>
              <h3 className="text-lg mb-3">Product Details</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl mb-8 text-gray-900">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.id !== productId && p.category === product.category)
              .slice(0, 4)
              .map(similarProduct => (
                <div
                  key={similarProduct.id}
                  className="cursor-pointer group"
                  onClick={() => onNavigate('product', { productId: similarProduct.id })}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-3">
                    <ImageWithFallback
                      src={similarProduct.image}
                      alt={similarProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-medium text-sm text-gray-900 truncate">{similarProduct.brand}</h4>
                  <p className="text-xs text-gray-600 truncate">{similarProduct.title}</p>
                  <p className="text-sm text-[#212121] mt-1">₹{similarProduct.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}