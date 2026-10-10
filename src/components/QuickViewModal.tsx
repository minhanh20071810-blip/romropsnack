import React, { useState } from 'react';
import { X, Star, Plus, Minus, Check, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { SnackBagArt } from './SnackBagArt';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  playCrunch: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  playCrunch,
}) => {
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    playCrunch();
    onAddToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full bg-white/80 dark:bg-stone-800/80 shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Packaging Illustration Area */}
          <div className="p-8 bg-linear-to-b from-amber-50 to-orange-50/50 dark:from-stone-800/50 dark:to-stone-900 flex items-center justify-center relative">
            <SnackBagArt product={product} size="lg" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300/40">
                100% Nông sản Việt · Không chất bảo quản
              </span>
            </div>
          </div>

          {/* Details Area */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  {product.lineLabel}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} nhận xét)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black font-heading text-stone-900 dark:text-white">
                {product.name}
              </h2>

              {/* Tag & Description */}
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                Gu vị: {product.tag}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Attributes & Crispiness */}
              <div className="mt-4 p-3.5 bg-stone-50 dark:bg-stone-800/60 rounded-2xl space-y-2 text-xs border border-stone-200/60 dark:border-stone-700">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Độ Giòn Tan:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-3 h-3 rounded-full ${
                          s <= product.crispiness
                            ? 'bg-rose-500'
                            : 'bg-stone-200 dark:bg-stone-700'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-[11px] font-bold text-rose-600">
                      {product.crispiness}/5
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">Quy cách:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{product.spec}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-500">Hạn sử dụng:</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200">6 tháng kể từ NSX</span>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-stone-50 dark:bg-stone-800 px-2 py-1.5">
                  <button
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="p-1 hover:text-rose-600 text-stone-500"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="p-1 hover:text-rose-600 text-stone-500"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl font-heading font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : (
                    <>
                      <span>Thêm Vào Giỏ</span>
                      <span className="tabular-nums font-bold">
                        · {(product.price * qty).toLocaleString('vi-VN')}đ
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
