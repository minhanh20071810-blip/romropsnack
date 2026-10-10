import React, { useState } from 'react';
import { 
  Heart, 
  PhoneCall, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  Send, 
  Check, 
  Share2, 
  Instagram, 
  Youtube, 
  Music2 
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';

interface FooterProps {
  onNavigate: (page: string) => void;
  showToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, showToast }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }
    setIsSubscribed(true);
    showToast('🎉 Đăng ký thành công! Mã giảm 15% GIOMOTTIENG đã được gửi đến bạn.');
  };

  return (
    <footer className="bg-[#111827] text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-amber-400 to-rose-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                <img 
                  src={ASSET_IMAGES.brandLogo} 
                  alt="Rôm Rốp Logo" 
                  className="w-full h-full object-cover rounded-xl bg-[#FAF5DE]"
                />
              </div>
              <div>
                <span className="text-2xl font-black font-heading tracking-tight text-white">
                  Rôm Rốp
                </span>
                <p className="text-xs text-amber-400 font-semibold">
                  Cắn một miếng – Giòn một tiếng
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-400 max-w-sm">
              Hành trình tôn vinh vị ngon giòn rụm từ nguyên liệu thuần nông sản bản địa. Mỗi mẻ snack Rôm Rốp là kết tinh của công nghệ rang nướng hiện đại và gia vị tinh hoa thiên nhiên.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#share" onClick={(e) => { e.preventDefault(); showToast('Đã sao chép liên kết Rôm Rốp!'); }} className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors" title="Chia sẻ">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#instagram" onClick={(e) => { e.preventDefault(); showToast('Đang chuyển tới Instagram @romropsnack'); }} className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" onClick={(e) => { e.preventDefault(); showToast('Đang chuyển tới kênh YouTube Rôm Rốp Official'); }} className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#tiktok" onClick={(e) => { e.preventDefault(); showToast('Đang chuyển tới TikTok @romropsnack.vn'); }} className="w-9 h-9 rounded-full bg-stone-800 hover:bg-rose-600 flex items-center justify-center text-stone-300 hover:text-white transition-colors" title="TikTok">
                <Music2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links: Khám Phá */}
          <div>
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4">
              Khám Phá
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-400 transition-colors">
                  Khoai Tây Sấy Giòn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-400 transition-colors">
                  Snack Đậu Phộng Cay
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-400 transition-colors">
                  Rong Biển Nướng Muối
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-400 transition-colors">
                  Bắp Rang Bơ Mật Ong
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-amber-400 transition-colors">
                  Hộp Quà Snack Box
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Thông Tin */}
          <div>
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4">
              Thông Tin
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  Về Thương Hiệu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                  Hệ Thống Phân Phối
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('policies')} className="hover:text-amber-400 transition-colors">
                  Chính Sách & Chế Độ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-amber-400 transition-colors">
                  Cơ Hội Nghề Nghiệp
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">
                  Hợp Tác B2B & Đại Lý
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 className="text-sm font-bold font-heading text-white uppercase tracking-wider mb-4">
              Đăng Ký Nhận Tin & Ưu Đãi
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Nhận ngay mã giảm 15% cho đơn hàng đầu tiên cùng thông tin các vị snack mới giới hạn mỗi tháng.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="w-full bg-stone-800/90 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-amber-400 pr-20"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-linear-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition-all"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5" /> : 'Đăng Ký'}
                </button>
              </div>
            </form>

            {/* Certifications */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>HACCP Certified</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ISO 22000:2018</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Hotline, Email, Hours, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-200 font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
              Hotline: <span className="text-white font-extrabold text-sm">1900-5678</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              Email: Romropsnack.offical@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              08:00 – 21:00 (Thứ 2 – CN)
            </span>
          </div>

          <div className="text-stone-400 text-center md:text-right">
            © 2026 Rôm Rốp Snack Co., Ltd. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </div>
    </footer>
  );
};
