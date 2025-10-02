import { Heart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  id: string;
  image: string;
  brand: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  onProductClick: (id: string) => void;
  onWishlistClick?: (id: string) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  id,
  image,
  brand,
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviewCount,
  onProductClick,
  onWishlistClick,
  isWishlisted = false
}: ProductCardProps) {
  return (
    <div className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => onProductClick(id)}
        />
        
        {discount && (
          <Badge className="absolute top-2 left-2 bg-[#FF3F6C] text-white px-2 py-1">
            {discount}% OFF
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onWishlistClick?.(id);
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#FF3F6C] text-[#FF3F6C]' : 'text-gray-600'}`} />
        </Button>
      </div>
      
      <div className="p-3" onClick={() => onProductClick(id)}>
        <div className="mb-1">
          <h3 className="font-medium text-sm text-gray-900 truncate">{brand}</h3>
          <p className="text-xs text-gray-600 truncate">{title}</p>
        </div>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-[#212121]">₹{price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-green-600 text-green-600" />
            <span className="text-xs text-gray-700">{rating}</span>
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
}