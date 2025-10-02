import { Search, ShoppingBag, User, Heart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItemsCount: number;
}

export function Navbar({ currentPage, onNavigate, cartItemsCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl text-[#FF3F6C] cursor-pointer hover:opacity-80 font-normal"
            >
              StyleHub
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('category')}
              className="text-gray-900 hover:text-[#FF3F6C] transition-colors"
            >
              Men
            </button>
            <button
              onClick={() => onNavigate('category')}
              className="text-gray-900 hover:text-[#FF3F6C] transition-colors"
            >
              Women
            </button>
            <button
              onClick={() => onNavigate('category')}
              className="text-gray-900 hover:text-[#FF3F6C] transition-colors"
            >
              Kids
            </button>
            <button
              onClick={() => onNavigate('category')}
              className="text-gray-900 hover:text-[#FF3F6C] transition-colors"
            >
              Home & Living
            </button>
            <button
              onClick={() => onNavigate('category')}
              className="text-gray-900 hover:text-[#FF3F6C] transition-colors"
            >
              Beauty
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-1 focus:ring-[#FF3F6C]"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('profile')}
              className="hidden md:flex items-center space-x-1 text-gray-900 hover:text-[#FF3F6C]"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('profile')}
              className="hidden md:flex items-center space-x-1 text-gray-900 hover:text-[#FF3F6C]"
            >
              <Heart className="h-4 w-4" />
              <span>Wishlist</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('cart')}
              className="relative flex items-center space-x-1 text-gray-900 hover:text-[#FF3F6C]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">Bag</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF3F6C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for products, brands and more"
              className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-1 focus:ring-[#FF3F6C]"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}