import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { mockProducts, categories } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
  onProductClick: (productId: string) => void;
  onWishlistClick: (productId: string) => void;
  wishlistedItems: string[];
}

export function HomePage({ onNavigate, onProductClick, onWishlistClick, wishlistedItems }: HomePageProps) {
  const trendingProducts = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-96 md:h-[500px] bg-gradient-to-r from-pink-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl mb-4 text-gray-900">
              Fashion That Defines You
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Discover the latest trends and timeless classics
            </p>
            <Button
              onClick={() => onNavigate('category')}
              className="bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white px-8 py-3 text-lg"
            >
              Shop Now
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1609858685040-f762e05b7c7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjB3b21hbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc1OTExMzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Fashion model"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Category Tiles */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl text-center mb-12 text-gray-900">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => onNavigate('category', { category: category.id })}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center font-medium text-gray-900 group-hover:text-[#FF3F6C] transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl text-gray-900">Trending Now</h2>
            <Button
              variant="outline"
              onClick={() => onNavigate('category')}
              className="border-[#FF3F6C] text-[#FF3F6C] hover:bg-[#FF3F6C] hover:text-white"
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                brand={product.brand}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                rating={product.rating}
                reviewCount={product.reviewCount}
                onProductClick={onProductClick}
                onWishlistClick={onWishlistClick}
                isWishlisted={wishlistedItems.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl mb-2">Up to 70% Off</h3>
                <p className="text-lg mb-4">On Premium Brands</p>
                <Button
                  variant="secondary"
                  onClick={() => onNavigate('category')}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Shop Sale
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-r from-green-500 to-teal-600">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl mb-2">New Arrivals</h3>
                <p className="text-lg mb-4">Fresh Fashion Daily</p>
                <Button
                  variant="secondary"
                  onClick={() => onNavigate('category')}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Explore New
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-[#FF3F6C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="text-xl mb-2 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">On orders above ₹999</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-[#FF3F6C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">↩️</span>
              </div>
              <h3 className="text-xl mb-2 text-gray-900">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-[#FF3F6C] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏷️</span>
              </div>
              <h3 className="text-xl mb-2 text-gray-900">Best Prices</h3>
              <p className="text-gray-600">Guaranteed lowest prices</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}