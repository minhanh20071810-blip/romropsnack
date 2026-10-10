import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Sparkles, Gift } from 'lucide-react';
import { CartItem } from '../types';
import { SnackBagArt } from './SnackBagArt';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  playCrunch: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  playCrunch,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShipThreshold = 100000;
  const freeShipRemaining = Math.max(0, freeShipThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-base text-stone-900 dark:text-white">
                  Giỏ Hàng Giòn Rụm
                </h3>
                <p className="text-xs text-stone-500">
                  {totalItems} gói snack đang chờ bạn
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Freeship Progress Indicator */}
          <div className="bg-amber-50 dark:bg-amber-950/40 px-5 py-3 border-b border-amber-200/60 dark:border-amber-900/40 text-xs">
            {freeShipRemaining > 0 ? (
              <p className="text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Thêm <span className="font-black text-rose-600 dark:text-rose-400">{freeShipRemaining.toLocaleString('vi-VN')}đ</span> để được Freeship nội thành!
              </p>
            ) : (
              <p className="text-emerald-700 dark:text-emerald-400 mb-1.5 flex items-center gap-1 font-bold">
                🎉 Bạn đã đủ điều kiện nhận MIỄN PHÍ VẬN CHUYỂN!
              </p>
            )}
            <div className="w-full bg-amber-200/80 dark:bg-amber-900/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-linear-to-r from-amber-500 to-rose-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-20 h-20 bg-rose-50 dark:bg-stone-800 rounded-full flex items-center justify-center text-3xl">
                  🍟
                </div>
                <h4 className="font-heading font-bold text-stone-800 dark:text-stone-200 text-sm">
                  Giỏ hàng của bạn đang trống
                </h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Hãy thêm vài gói snack giòn tan để nhâm nhi cùng bạn bè ngay hôm nay nhé!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-center gap-3 bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-700/60"
                >
                  {/* Miniature pack visual */}
                  <div className="w-16 h-20 bg-white dark:bg-stone-900 rounded-xl p-1 flex items-center justify-center shrink-0 border border-stone-200 dark:border-stone-700">
                    <SnackBagArt product={item.product} size="sm" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-heading font-extrabold text-xs text-stone-900 dark:text-white truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-[10px] text-stone-500 truncate">
                      {item.product.flavorNotes.split(',')[0]}
                    </p>
                    <div className="text-xs font-black text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>

                  {/* Qty controls */}
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 px-1 py-0.5 text-xs">
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="p-0.5 hover:text-rose-600 text-stone-500"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          playCrunch();
                          onUpdateQty(item.product.id, 1);
                        }}
                        className="p-0.5 hover:text-rose-600 text-stone-500"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Gift Perk Note */}
            {cart.length > 0 && (
              <div className="p-3 bg-rose-50/70 dark:bg-rose-950/40 rounded-xl border border-rose-200/60 dark:border-rose-900/40 text-xs flex items-center gap-2 text-rose-800 dark:text-rose-300">
                <Gift className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  Đơn hàng được tặng kèm <strong>01 Bộ Sticker Mascot Rôm Rốp</strong> và thiệp viết tay!
                </span>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Tạm tính ({totalItems} món):</span>
                  <span className="font-bold tabular-nums text-stone-900 dark:text-white">
                    {subtotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Ưu đãi áp dụng:</span>
                  <span className="text-emerald-600 font-bold">Tặng 1 gói Nguyên Bản (0đ)</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span>Tổng cộng:</span>
                  <span className="text-base font-black text-rose-600 dark:text-rose-400 tabular-nums">
                    {subtotal.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-heading font-black text-sm rounded-2xl shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
