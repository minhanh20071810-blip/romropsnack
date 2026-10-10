import React from 'react';
import { Sparkles, Flame, Heart, Zap, Leaf, Ghost, UtensilsCrossed } from 'lucide-react';
import { Product } from '../types';

interface SnackBagArtProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

export const SnackBagArt: React.FC<SnackBagArtProps> = ({ product, size = 'md' }) => {
  const getFlavorIcon = () => {
    switch (product.id) {
      case 'basic-cheese-egg':
        return <Flame className="w-6 h-6 text-amber-500 fill-amber-400" />;
      case 'basic-seaweed':
        return <Leaf className="w-6 h-6 text-emerald-500 fill-emerald-400" />;
      case 'basic-salted-plum':
        return <Heart className="w-6 h-6 text-rose-500 fill-rose-400" />;
      case 'halloween-dark-shadow':
      case 'halloween-pumpkin':
        return <Ghost className="w-6 h-6 text-purple-600 fill-purple-500" />;
      case 'regional-bun-dau':
      case 'regional-bun-bo':
      case 'regional-com-tam':
        return <UtensilsCrossed className="w-6 h-6 text-orange-500" />;
      default:
        return <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400" />;
    }
  };

  const heights = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
  };

  return (
    <div className={`relative w-full ${heights[size]} flex items-center justify-center p-4 overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105`}>
      {/* Background glow matching theme */}
      <div 
        className="absolute inset-2 rounded-2xl opacity-40 blur-xl transition-opacity group-hover:opacity-70"
        style={{ backgroundColor: product.packagingTheme.accent }}
      />

      {/* Bag Container with jagged crimped edges top & bottom */}
      <div 
        className="relative w-44 sm:w-48 h-full rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden border-2"
        style={{
          backgroundColor: product.packagingTheme.bg,
          borderColor: product.packagingTheme.border,
        }}
      >
        {/* Top crimped seal */}
        <div className="w-full h-3 bg-linear-to-r from-stone-300 via-white to-stone-300 opacity-60 flex justify-between px-1 border-b border-black/10">
          <div className="w-full h-full repeating-linear-gradient-stripes" />
        </div>

        {/* Brand Banner on Bag */}
        <div className="px-3 pt-2 text-center">
          <div className="inline-block bg-rose-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs tracking-wider transform -rotate-1">
            RÔM RỐP!
          </div>
          <div className="text-[10px] font-bold text-stone-600 tracking-tight mt-0.5">
            Cắn Một Miếng · Giòn Một Tiếng
          </div>
        </div>

        {/* Center Illustration Zone */}
        <div className="relative my-auto flex flex-col items-center justify-center p-2">
          {/* Circular badge */}
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-inner relative border-2 border-white/80"
            style={{ backgroundColor: `${product.packagingTheme.accent}20` }}
          >
            {getFlavorIcon()}
            {/* Mascot smile chip preview */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-400 rounded-full border border-amber-600 flex items-center justify-center text-[10px] font-black text-amber-950 shadow-md">
              🍟
            </div>
          </div>

          {/* Flavor Name on pack */}
          <div className="text-center mt-2">
            <span 
              className="text-xs sm:text-sm font-black font-heading block leading-tight px-1"
              style={{ color: product.packagingTheme.tagText }}
            >
              {product.name}
            </span>
            <span className="text-[10px] font-medium text-stone-500 block truncate max-w-[130px]">
              {product.tag}
            </span>
          </div>
        </div>

        {/* Bottom Tag & Seal */}
        <div className="px-2 pb-2">
          <div className="flex items-center justify-between text-[9px] font-bold px-2 py-1 bg-white/70 backdrop-blur-xs rounded-lg border border-stone-200/50">
            <span className="text-stone-600">{product.spec.split('/')[0]}</span>
            <span className="text-rose-600 font-extrabold">{product.price.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        {/* Bottom crimped seal */}
        <div className="w-full h-3 bg-linear-to-r from-stone-300 via-white to-stone-300 opacity-60 border-t border-black/10" />
      </div>
    </div>
  );
};
