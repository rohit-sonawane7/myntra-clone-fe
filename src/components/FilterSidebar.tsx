import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";

interface FilterGroup {
  id: string;
  label: string;
  options: Array<{ id: string; label: string; count?: number }>;
}

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
}

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'brand', 'price', 'discount', 'color', 'size'
  ]);
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      
      if (checked) {
        newFilters[category] = [...newFilters[category], value];
      } else {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      }
      
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
      
      onFiltersChange(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange([500, 5000]);
    onFiltersChange({});
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'brand',
      label: 'Brand',
      options: [
        { id: 'nike', label: 'Nike', count: 156 },
        { id: 'adidas', label: 'Adidas', count: 134 },
        { id: 'puma', label: 'Puma', count: 98 },
        { id: 'hm', label: 'H&M', count: 87 },
        { id: 'zara', label: 'Zara', count: 76 },
        { id: 'levis', label: 'Levi\'s', count: 65 }
      ]
    },
    {
      id: 'color',
      label: 'Color',
      options: [
        { id: 'black', label: 'Black', count: 245 },
        { id: 'white', label: 'White', count: 198 },
        { id: 'blue', label: 'Blue', count: 167 },
        { id: 'red', label: 'Red', count: 134 },
        { id: 'gray', label: 'Gray', count: 112 },
        { id: 'green', label: 'Green', count: 89 }
      ]
    },
    {
      id: 'size',
      label: 'Size',
      options: [
        { id: 'xs', label: 'XS', count: 45 },
        { id: 's', label: 'S', count: 78 },
        { id: 'm', label: 'M', count: 156 },
        { id: 'l', label: 'L', count: 134 },
        { id: 'xl', label: 'XL', count: 98 },
        { id: 'xxl', label: 'XXL', count: 67 }
      ]
    },
    {
      id: 'discount',
      label: 'Discount Range',
      options: [
        { id: '10', label: '10% and above', count: 234 },
        { id: '20', label: '20% and above', count: 189 },
        { id: '30', label: '30% and above', count: 145 },
        { id: '40', label: '40% and above', count: 98 },
        { id: '50', label: '50% and above', count: 67 }
      ]
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-[#FF3F6C] hover:text-[#FF3F6C] hover:bg-pink-50"
          >
            Clear All
          </Button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full py-2"
          >
            <span className="font-medium">Price</span>
            {expandedSections.includes('price') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.includes('price') && (
            <div className="mt-3">
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10000}
                  min={100}
                  step={100}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        {/* Filter Groups */}
        {filterGroups.map(group => (
          <div key={group.id} className="mb-6">
            <button
              onClick={() => toggleSection(group.id)}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">{group.label}</span>
              {expandedSections.includes(group.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSections.includes(group.id) && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {group.options.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${group.id}-${option.id}`}
                      checked={selectedFilters[group.id]?.includes(option.id) || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(group.id, option.id, !!checked)
                      }
                    />
                    <label
                      htmlFor={`${group.id}-${option.id}`}
                      className="text-sm text-gray-700 cursor-pointer flex-1 flex justify-between"
                    >
                      <span>{option.label}</span>
                      {option.count && (
                        <span className="text-gray-400">({option.count})</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            <Separator className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
}