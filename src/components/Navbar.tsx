import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Bot, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  openCart: () => void;
  openRomBot: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onSearchOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  openCart,
  openRomBot,
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  onSearchOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'products', label: 'Sản Phẩm' },
    { id: 'offers', label: 'Ưu Đãi' },
    { id: 'careers', label: 'Tuyển Dụng' },
    { id: 'policies', label: 'Chính Sách & Chế Độ' },
    { id: 'contact', label: 'Liên Hệ' },
  ];

  const handleNav = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#FFF4E5] dark:bg-stone-800/80 text-amber-900 dark:text-amber-200 text-xs py-1.5 px-4 border-b border-amber-200/50 dark:border-stone-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              Snack Rôm Rốp:
            </span>
            <span className="hidden sm:inline">Cam kết 100% Nông sản Việt</span>
            <span className="hidden sm:inline text-amber-400">·</span>
            <span className="hidden sm:inline">Không Bột Ngọt (Mì Chính)</span>
            <span className="hidden sm:inline text-amber-400">·</span>
            <span>Không Phẩm Màu Nhân Tạo</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            <span className="hidden md:inline font-bold text-rose-600 dark:text-rose-400">
              Hotline: 1900-5678
            </span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Tắt âm thanh giòn rụm' : 'Bật âm thanh giòn rụm'}
              className="p-1 hover:text-amber-600 dark:hover:text-amber-300 transition-colors rounded-full"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Chế độ sáng' : 'Chế độ tối'}
              className="p-1 hover:text-amber-600 dark:hover:text-amber-300 transition-colors rounded-full"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo Zone */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-rose-500 p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src={ASSET_IMAGES.brandLogo} 
                alt="Rôm Rốp Logo" 
                className="w-full h-full object-cover rounded-xl bg-[#FAF5DE]"
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-heading tracking-tight text-rose-600 dark:text-rose-500 group-hover:text-rose-700 transition-colors">
                  Rôm Rốp
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400 px-1.5 py-0.5 rounded-sm">
                  Snack
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 tracking-normal hidden sm:block">
                Cắn một miếng – Giòn một tiếng
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold shadow-xs'
                      : 'text-stone-700 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: Search, Store locator, Rôm Bot, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search trigger */}
            <button
              onClick={onSearchOpen}
              className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-stone-800 rounded-full transition-all"
              title="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Rôm Bot AI */}
            <button
              onClick={openRomBot}
              className="relative hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute -top-0.5 -right-0.5" />
              <Bot className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Rôm Bot AI</span>
            </button>

            {/* Điểm Bán Store locator button */}
            <button
              onClick={() => handleNav('contact')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all"
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Tìm Điểm Bán</span>
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={openCart}
              className="relative p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/80 dark:border-rose-800/80 rounded-full transition-all shadow-xs group"
              title="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                    isActive
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                      : 'text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openRomBot();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 rounded-xl border border-amber-200"
            >
              <Bot className="w-4 h-4 text-amber-600" />
              Chat cùng Rôm Bot AI 24/7
            </button>

            <button
              onClick={() => handleNav('contact')}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              Tìm Điểm Bán Gần Nhất
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
