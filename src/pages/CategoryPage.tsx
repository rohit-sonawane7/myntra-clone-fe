import { useState, useMemo } from "react";
import { ChevronDown, Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { FilterSidebar } from "../components/FilterSidebar";
import { ProductCard } from "../components/ProductCard";
import { mockProducts } from "../data/mockData";

interface CategoryPageProps {
  onProductClick: (productId: string) => void;
  onWishlistClick: (productId: string) => void;
  wishlistedItems: string[];
  categoryFilter?: string;
}

export function CategoryPage({ onProductClick, onWishlistClick, wishlistedItems, categoryFilter }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string[]>>({});

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...mockProducts];

    // Apply category filter if provided
    if (categoryFilter) {
      products = products.filter(product => product.category === categoryFilter);
    }

    // Apply filters
    Object.entries(appliedFilters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        switch (filterType) {
          case 'brand':
            products = products.filter(product => 
              values.some(value => product.brand.toLowerCase().includes(value))
            );
            break;
          case 'color':
            products = products.filter(product => 
              values.some(value => 
                product.colors.some(color => color.toLowerCase().includes(value))
              )
            );
            break;
          case 'size':
            products = products.filter(product => 
              values.some(value => 
                product.sizes.some(size => size.toLowerCase().includes(value))
              )
            );
            break;
        }
      }
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        products.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        products.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "newest":
        // Keep original order for newest
        break;
      default:
        // Popularity - keep original order
        break;
    }

    return products;
  }, [appliedFilters, sortBy, categoryFilter]);

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    setAppliedFilters(filters);
  };

  const activeFiltersCount = Object.values(appliedFilters).reduce((count, values) => count + values.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar onFiltersChange={handleFiltersChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:pl-6">
            {/* Header */}
            <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-4 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl text-gray-900">
                    {categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Collection` : 'All Products'}
                  </h1>
                  <span className="text-sm text-gray-500">
                    ({filteredAndSortedProducts.length} items)
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden relative">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filter
                        {activeFiltersCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-[#FF3F6C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {activeFiltersCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 p-0">
                      <SheetHeader className="p-4 border-b">
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <FilterSidebar onFiltersChange={handleFiltersChange} />
                    </SheetContent>
                  </Sheet>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="newest">What's New</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Customer Rating</SelectItem>
                      <SelectItem value="discount">Better Discount</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="hidden md:flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="p-4">
              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 mb-4">No products found matching your criteria</p>
                  <Button
                    onClick={() => setAppliedFilters({})}
                    variant="outline"
                    className="border-[#FF3F6C] text-[#FF3F6C] hover:bg-[#FF3F6C] hover:text-white"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1 md:grid-cols-2"
                }`}>
                  {filteredAndSortedProducts.map(product => (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}