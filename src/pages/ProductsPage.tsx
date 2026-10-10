import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, ArrowRight, Utensils } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, ASSET_IMAGES } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  playCrunch: () => void;
  initialSearchQuery?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onAddToCart,
  onQuickView,
  playCrunch,
  initialSearchQuery = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTaste, setSelectedTaste] = useState('all');
  const [selectedPackSize, setSelectedPackSize] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Tất Cả', count: 9 },
    { id: 'basic', label: 'Dòng Cơ Bản', count: 4 },
    { id: 'halloween', label: 'Dòng Halloween', count: 2 },
    { id: 'regional', label: 'Bộ Sưu Tập Vùng Miền', count: 3 },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.line !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchTag = p.tag.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchFlavor = p.flavorNotes.toLowerCase().includes(query);
        if (!matchName && !matchTag && !matchDesc && !matchFlavor) return false;
      }
      // Taste filter
      if (selectedTaste !== 'all') {
        if (selectedTaste === 'fat' && !p.flavorNotes.toLowerCase().includes('béo')) return false;
        if (selectedTaste === 'spicy' && !p.flavorNotes.toLowerCase().includes('cay') && !p.tag.toLowerCase().includes('cay')) return false;
        if (selectedTaste === 'sweet-sour' && !p.flavorNotes.toLowerCase().includes('chua')) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [activeCategory, searchQuery, selectedTaste, sortBy]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Top Banner Header */}
      <section className="bg-linear-to-b from-sky-50 via-teal-50/40 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 pt-10 pb-12 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              BỘ SƯU TẬP GIÒN ĐỈNH CAO
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-stone-900 dark:text-white leading-tight">
              Thế Giới Bánh Bim Bim <span className="text-sky-600 dark:text-sky-400">Rôm Rốp</span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Mỗi miếng snack là một thanh âm giòn rụm bùng nổ, tẩm ướp tinh tế với gia vị nguyên bản từ trứng muối béo ngậy, sa tế ớt hiểm đến thảo mộc Tây Bắc.
            </p>

            {/* Smart Search Bar */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="relative">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm hương vị bạn yêu thích (ví dụ: bún đậu, trứng muối, rong biển...)"
                  className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-full pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:border-sky-500 shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 border border-stone-200/80 dark:border-stone-700'
                  }`}
                >
                  {cat.label} ({cat.count} vị)
                </button>
              );
            })}
          </div>

          {/* Banner Promo: Combo Đặc Biệt 3 Miền */}
          <div className="mt-8 rounded-3xl overflow-hidden bg-linear-to-r from-emerald-600 via-teal-600 to-sky-700 text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                COMBO ĐẶC BIỆT 3 MIỀN
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                Bún Đậu Hà Nội • Bún Bò Huế • Cơm Tấm Sài Gòn
              </h3>
              <p className="text-xs text-white/90 max-w-xl">
                Trọn vẹn phong vị ba miền tụ họp trong set quà snack độc bản. Tiết kiệm 20% khi mua trọn bộ!
              </p>
            </div>

            <button
              onClick={() => setActiveCategory('regional')}
              className="px-6 py-3 bg-white hover:bg-amber-50 text-emerald-800 font-heading font-black text-xs rounded-full shadow-lg flex items-center gap-2 shrink-0 transition-all"
            >
              <span>Khám Phá Hương Vị</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Filter and Sort Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-bold">
              <Filter className="w-3.5 h-3.5" />
              <span>BỘ LỌC:</span>
            </div>

            {/* Taste dropdown */}
            <select
              value={selectedTaste}
              onChange={(e) => setSelectedTaste(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-hidden"
            >
              <option value="all">Gu Vị (Tất cả)</option>
              <option value="fat">Béo ngậy & Bùi bùi</option>
              <option value="spicy">Cay nồng & Đậm đà</option>
              <option value="sweet-sour">Chua ngọt hài hòa</option>
            </select>

            {/* Pack Size dropdown */}
            <select
              value={selectedPackSize}
              onChange={(e) => setSelectedPackSize(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-hidden"
            >
              <option value="all">Kích Cỡ Bao Bì</option>
              <option value="basic">Gói Tiêu Chuẩn 75g</option>
              <option value="large">Gói Cao Cấp 85g</option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <span className="text-stone-500">
              Hiển thị <strong className="text-rose-600 dark:text-rose-400">{filteredProducts.length}</strong> sản phẩm
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-stone-400">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-hidden"
              >
                <option value="popular">Bán Chạy Nhất</option>
                <option value="rating">Đánh Giá Cao</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
              <p className="text-stone-500 text-sm">
                Không tìm thấy hương vị nào phù hợp với từ khóa &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setSelectedTaste('all');
                }}
                className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
              >
                Xem tất cả 9 vị snack
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  playCrunch={playCrunch}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
