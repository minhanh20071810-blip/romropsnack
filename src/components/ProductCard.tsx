import React, { useState } from 'react';
import { Star, Plus, Minus, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { SnackBagArt } from './SnackBagArt';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  playCrunch: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  playCrunch,
}) => {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    playCrunch();
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQty((prev) => Math.min(prev + 1, 99));
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQty((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div 
      className="group relative bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Header Tag & Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span 
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 truncate"
          >
            {product.tag}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular-nums">{product.rating}</span>
            <span className="text-[10px] text-stone-600 dark:text-stone-300 font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Snack Bag Graphic Area */}
        <div 
          onClick={() => onQuickView(product)}
          className="cursor-pointer relative overflow-hidden rounded-2xl bg-linear-to-b from-stone-50 to-stone-100/50 dark:from-stone-800/40 dark:to-stone-800/80 p-2 flex items-center justify-center group-hover:bg-amber-50/50 dark:group-hover:bg-amber-950/20 transition-colors"
        >
          <SnackBagArt product={product} size="md" />

          {/* Quick view button overlay */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-3 right-3 bg-white/90 dark:bg-stone-800/90 hover:bg-white text-stone-700 dark:text-stone-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Xem chi tiết"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Flavor description */}
        <div className="mt-4">
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-extrabold font-heading text-stone-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specs & Độ Giòn Indicator */}
        <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
            <span className="text-[11px] font-semibold">Độ Giòn:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <span
                  key={lvl}
                  className={`w-2.5 h-2.5 rounded-full ${
                    lvl <= product.crispiness
                      ? 'bg-rose-500 shadow-xs'
                      : 'bg-stone-200 dark:bg-stone-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-stone-400">Hương vị:</span>
            <span className="text-stone-700 dark:text-stone-300 font-medium truncate max-w-[140px]">
              {product.flavorNotes.split(',')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Controls */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-lg font-black text-rose-600 dark:text-rose-400 tabular-nums">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice && (
              <span className="ml-1.5 text-xs text-stone-400 line-through tabular-nums">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {product.badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${product.badgeColor || 'bg-amber-100 text-amber-800'}`}>
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Quantity selector */}
          <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 px-1 py-0.5">
            <button
              onClick={decrement}
              className="p-1 hover:text-rose-600 dark:hover:text-rose-400 text-stone-500 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-xs font-bold tabular-nums text-stone-800 dark:text-stone-200">
              {qty}
            </span>
            <button
              onClick={increment}
              className="p-1 hover:text-rose-600 dark:hover:text-rose-400 text-stone-500 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Đã Thêm!</span>
              </>
            ) : (
              <span>Chọn Mua</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
