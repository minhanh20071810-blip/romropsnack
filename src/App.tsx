/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { RomBotChat } from './components/RomBotChat';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { OffersPage } from './pages/OffersPage';
import { CareersPage } from './pages/CareersPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Product, CartItem } from './types';
import { PRODUCTS, ASSET_IMAGES } from './data/mockData';
import { playCrunchSound } from './utils/audio';
import { Bot, Sparkles, X, Search } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Cart state - initialized with 2 products (3 items total) to match screenshot cart badge "3"
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[1], quantity: 2 }, // Trứng Muối Phô Mai x2
    { product: PRODUCTS[4], quantity: 1 }, // Vị Bún Đậu Mắm Tôm x1
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRomBotOpen, setIsRomBotOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleCrunch = () => {
    if (soundEnabled) {
      playCrunchSound();
    }
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`🍟 Đã thêm ${quantity} gói "${product.name}" vào giỏ hàng!`);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa món khỏi giỏ hàng.');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchModalOpen(false);
      setCurrentPage('products');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-stone-900 text-white dark:bg-white dark:text-stone-900 px-4 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center justify-between gap-3 animate-in slide-in-from-top-4">
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)} 
            className="text-stone-400 hover:text-white dark:hover:text-stone-900 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartTotalCount}
        openCart={() => setIsCartOpen(true)}
        openRomBot={() => setIsRomBotOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onSearchOpen={() => setSearchModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            playCrunch={handleCrunch}
            showToast={showToast}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            playCrunch={handleCrunch}
            initialSearchQuery={searchQuery}
          />
        )}

        {currentPage === 'offers' && (
          <OffersPage
            onAddToCart={handleAddToCart}
            playCrunch={handleCrunch}
            showToast={showToast}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'careers' && (
          <CareersPage showToast={showToast} />
        )}

        {currentPage === 'policies' && (
          <PoliciesPage onNavigate={setCurrentPage} showToast={showToast} />
        )}

        {currentPage === 'contact' && (
          <ContactPage showToast={showToast} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            onClearCart={handleClearCart}
            onNavigate={setCurrentPage}
            showToast={showToast}
          />
        )}
      </main>

      {/* Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div 
            onClick={() => setSearchModalOpen(false)} 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                Tìm Kiếm Vị Snack Rôm Rốp
              </h3>
              <button 
                onClick={() => setSearchModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ví dụ: trứng muối, rong biển, bún đậu, bí ngô..."
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="text-stone-400 text-[11px] self-center">Gợi ý tìm kiếm:</span>
                {['Trứng Muối', 'Bún Đậu Mắm Tôm', 'Halloween Bí Ngô', 'Xí Muội'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setSearchModalOpen(false);
                      setCurrentPage('products');
                    }}
                    className="px-2.5 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 hover:text-rose-600 rounded-full text-stone-700 dark:text-stone-300 text-[11px] font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Rôm Bot Button in bottom-right corner (Matches Image 6 & 8) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsRomBotOpen(true)}
          className="group relative flex items-center gap-2 pl-3 pr-4 py-2 bg-white dark:bg-stone-800 text-stone-800 dark:text-white border-2 border-amber-300 dark:border-amber-600 rounded-full shadow-2xl hover:shadow-amber-400/40 hover:scale-105 active:scale-95 transition-all"
          title="Chat cùng Rôm Bot 24/7"
        >
          {/* Animated glow */}
          <span className="absolute -inset-1 rounded-full bg-linear-to-r from-amber-400 to-rose-400 opacity-20 blur-sm group-hover:opacity-50 transition-opacity" />
          
          <div className="relative w-9 h-9 rounded-full bg-amber-100 p-0.5 overflow-hidden shrink-0 border border-amber-400">
            <img 
              src={ASSET_IMAGES.rombotMascot} 
              alt="Rôm Bot Icon" 
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full" />
          </div>

          <div className="relative text-left">
            <span className="text-xs font-black font-heading text-rose-600 dark:text-rose-400 block leading-tight">
              Chat với Rôm Bot 24/7 ✨
            </span>
            <span className="text-[10px] text-stone-400 font-bold block">
              Cần mình múc gì ko nè?
            </span>
          </div>
        </button>
      </div>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setCurrentPage('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        playCrunch={handleCrunch}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        playCrunch={handleCrunch}
      />

      <RomBotChat
        isOpen={isRomBotOpen}
        onClose={() => setIsRomBotOpen(false)}
        onAddToCart={handleAddToCart}
        onNavigate={setCurrentPage}
        playCrunch={handleCrunch}
      />

      {/* Global Footer */}
      <Footer onNavigate={setCurrentPage} showToast={showToast} />
    </div>
  );
}
