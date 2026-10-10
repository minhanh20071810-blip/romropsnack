import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Gift, 
  Award, 
  TrendingUp, 
  Send, 
  Check, 
  Store, 
  Flame 
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, COMBOS, ASSET_IMAGES } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickView: (product: Product) => void;
  playCrunch: () => void;
  showToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onQuickView,
  playCrunch,
  showToast,
}) => {
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPurpose, setContactPurpose] = useState('Góp ý');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basicProducts = PRODUCTS.filter((p) => p.line === 'basic');
  const regionalProducts = PRODUCTS.filter((p) => p.line === 'regional');
  const halloweenProducts = PRODUCTS.filter((p) => p.line === 'halloween');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      showToast('Vui lòng điền họ tên và số điện thoại!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('🎉 Cảm ơn bạn! Thông tin đã được gửi đến ban quản trị Rôm Rốp.');
      setContactName('');
      setContactPhone('');
      setContactEmail('');
      setContactMessage('');
    }, 600);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-amber-50/80 via-white to-rose-50/40 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>SNACK KHOAI TÂY GIÒN ĐỘC BẢN</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-stone-900 dark:text-white leading-[1.12] tracking-tight">
                Cắn Một Miếng, <br />
                <span className="text-rose-600 dark:text-rose-500 underline decoration-amber-400 decoration-wavy decoration-2">
                  Giòn Một Tiếng!
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed">
                Được sáng lập bởi nhóm <strong>7 thành viên trẻ đầy hoài bão</strong>. Rôm Rốp gói trọn niềm say mê ẩm thực đường phố và tinh hoa thiên nhiên vào từng lát khoai tây sấy giòn rụm với 3 dòng sản phẩm chuyên biệt.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-7 py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-heading font-extrabold text-sm rounded-full shadow-lg shadow-rose-600/30 flex items-center gap-2 transition-all"
                >
                  <span>Khám Phá 9 Vị Bánh</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('policies')}
                  className="px-6 py-3.5 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700 font-heading font-bold text-sm rounded-full transition-all shadow-xs"
                >
                  Xem chính sách
                </button>
              </div>

              {/* 3 Core Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-3 bg-white/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Cam kết</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-100">Không Bột Ngọt</span>
                  </div>
                </div>

                <div className="p-3 bg-white/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">Tự nhiên</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-100">Không Phẩm Màu</span>
                  </div>
                </div>

                <div className="p-3 bg-white/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 block uppercase">An toàn</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-100">Không Chất Độn</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Art Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 bg-emerald-600 relative group">
                  <img
                    src={ASSET_IMAGES.heroWorld}
                    alt="Thế giới Rôm Rốp Snack"
                    className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                  />
                  
                  {/* Floating mascot callout */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200/80 dark:border-stone-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 p-1 shrink-0 overflow-hidden">
                      <img 
                        src={ASSET_IMAGES.rombotMascot} 
                        alt="Rôm Bot" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-xs font-black font-heading text-stone-900 dark:text-white">
                        Rôm Bot AI mách nước:
                      </p>
                      <p className="text-[11px] text-stone-600 dark:text-stone-300">
                        Mua từ 2 gói trở lên để nhận ngay 1 gói Nguyên Bản 0đ nhé!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THREE SPECIALIZED PRODUCT LINES (3 Dòng Sản Phẩm Chuyên Biệt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
            MENU SNACK ĐỘC ĐÁO
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
            3 Dòng Sản Phẩm Chuyên Biệt
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            Mỗi lát bánh là sự giao thoa hoàn hảo giữa nét thân quen đời thường và sự mới mẻ đầy cảm hứng.
          </p>
        </div>

        {/* LINE 1: Dòng Cơ Bản */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-amber-300 dark:border-amber-900 gap-2">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                DÒNG 1
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-stone-900 dark:text-white">
                Dòng Cơ Bản
              </h3>
              <p className="text-xs text-stone-500">Áp dụng trọn vẹn cả ngày</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-full w-fit">
              Đồng giá: 10.000đ / gói
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {basicProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                playCrunch={playCrunch}
              />
            ))}
          </div>
        </div>

        {/* LINE 2: Bộ Sưu Tập Vùng Miền */}
        <div className="space-y-5 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-emerald-400 dark:border-emerald-900 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                DÒNG 2
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-stone-900 dark:text-white">
                Bộ Sưu Tập Vùng Miền
              </h3>
              <p className="text-xs text-stone-500">Giao thoa ẩm thực đường phố 3 miền Bắc – Trung – Nam</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-full w-fit">
              Giá: 15.000đ / gói
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {regionalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                playCrunch={playCrunch}
              />
            ))}
          </div>
        </div>

        {/* LINE 3: Dòng Giới Hạn Halloween */}
        <div className="space-y-5 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-purple-400 dark:border-purple-900 gap-2">
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                DÒNG 3
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-stone-900 dark:text-white">
                Dòng Giới Hạn Halloween
              </h3>
              <p className="text-xs text-stone-500">Phiên bản đặc biệt mùa lễ hội – Trick or treat hay say mê?</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 rounded-full w-fit">
              Giá: 15.000đ / gói
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {halloweenProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                playCrunch={playCrunch}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT BRAND STORY (Về Thương Hiệu Snack Rôm Rốp) */}
      <section className="bg-amber-50/70 dark:bg-stone-900/60 py-16 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400">
                KHÁT VỌNG TRẺ VIỆT NAM
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
                Về Thương Hiệu Snack Rôm Rốp
              </h2>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                Thương hiệu snack <strong>Rôm Rốp</strong> được thành lập bởi một <strong>nhóm 7 thành viên trẻ đầy hoài bão</strong>, với mục tiêu đem ẩm thực đường phố và cảm xúc đời sống của người trẻ Việt vào từng miếng bánh, biến những khoảnh khắc ăn vặt bình thường thành trải nghiệm vui vẻ, thú vị cho Gen Z.
              </p>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                Bột trọn &quot;gu&quot; ăn vặt quen thuộc của thế hệ trẻ, từng nốt vị ra đời là sự giao thoa hoàn hảo giữa nét thân quen đời thường và sự mới mẻ đầy cảm hứng. Ngoài ra, Rôm Rốp sở hữu hệ thống website thương mại điện tử chuyên nghiệp cùng thiết kế bao bì bắt mắt dễ check-in, đồng thời cam kết năng lượng không dùng bột ngọt, chất phẩm màu nhân tạo.
              </p>

              {/* 3 Red Bullet Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 mb-2" />
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">Không Bột Ngọt</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Nguyên liệu thuần tự nhiên từ rau củ và nông sản sạch.</p>
                </div>
                <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mb-2" />
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">Không Màu Nhân Tạo</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Màu sắc vàng óng tự nhiên từ củ nghệ và ớt bột mịn màng.</p>
                </div>
                <div className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-2" />
                  <h4 className="text-xs font-bold text-stone-900 dark:text-white">Không Chất Bảo Quản</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Thiết kế màng bọc chân không ép khí nitơ khử ẩm tuyệt đối.</p>
                </div>
              </div>
            </div>

            {/* Stats Card Box */}
            <div className="lg:col-span-5 bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-xl border border-rose-200/80 dark:border-stone-700 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center text-3xl">
                🍟
              </div>
              <div>
                <h3 className="text-2xl font-black font-heading text-rose-600">
                  7 Nhà Sáng Lập Trẻ
                </h3>
                <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider mt-1">
                  Tinh thần dũng cảm đón đầu
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100 dark:border-stone-700">
                <div className="p-4 bg-stone-50 dark:bg-stone-900/60 rounded-2xl">
                  <span className="text-3xl font-black text-amber-500">3 Dòng</span>
                  <p className="text-[11px] text-stone-500 mt-1 font-medium">Sản phẩm chính</p>
                </div>
                <div className="p-4 bg-stone-50 dark:bg-stone-900/60 rounded-2xl">
                  <span className="text-3xl font-black text-emerald-500">100%</span>
                  <p className="text-[11px] text-stone-500 mt-1 font-medium">Nông sản sạch</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROMOTIONS & COMBOS (Ưu Đãi Rôm Rốp Độc Quyền) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600">
            CHƯƠNG TRÌNH KHUYẾN MÃI
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
            Ưu Đãi Rôm Rốp Độc Quyền
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Thưởng thức trọn vẹn hương vị với hàng ngàn quà tặng và combo giá hời.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mua 2 Tang 1 */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-rose-200 dark:border-stone-800 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full">
                HOT PROMO
              </span>
              <h3 className="text-lg font-black font-heading text-stone-900 dark:text-white mt-3">
                Mua 2 Tặng 1
              </h3>
              <p className="text-xs text-rose-600 font-bold mt-0.5">
                Tặng ngay gói vị Nguyên Bản siêu cuốn
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
                Tiệc tùng cùng hội bạn thân làm sao thiếu Rôm Rốp? Chỉ cần bỏ giỏ hàng <strong>02 gói snack size lớn bất kỳ</strong>, bạn sẽ được <strong>TẶNG NGAY 01 gói vị Nguyên Bản</strong> để tha hồ cày phim, tụ tập.
              </p>
            </div>
            <div>
              <button
                onClick={() => onNavigate('offers')}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Bỏ Giỏ 2 Gói Nhận Quà Ngay
              </button>
            </div>
          </div>

          {/* Card 2: Giam gia combo */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-emerald-200 dark:border-stone-800 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full">
                TIẾT KIỆM 20%
              </span>
              <h3 className="text-lg font-black font-heading text-stone-900 dark:text-white mt-3">
                Giảm Giá Theo Set
              </h3>
              <p className="text-xs text-emerald-600 font-bold mt-0.5">
                Combo độc quyền chỉ có trên Website
              </p>
              
              <div className="space-y-2 mt-3 text-xs">
                <div className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded-xl flex justify-between items-center">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Set Chiến Thần Cày Phim</span>
                  <span className="text-rose-600 font-bold">-15%</span>
                </div>
                <div className="p-2.5 bg-stone-50 dark:bg-stone-800 rounded-xl flex justify-between items-center">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Set Trải Nghiệm Độc Lạ</span>
                  <span className="text-emerald-600 font-bold">-20%</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('offers')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                Xem Combo
              </button>
            </div>
          </div>

          {/* Card 3: Cao ma may man */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-amber-200 dark:border-stone-800 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white px-2.5 py-1 rounded-full">
                TRÚNG QUÀ CỰC ĐỈNH
              </span>
              <h3 className="text-lg font-black font-heading text-stone-900 dark:text-white mt-3">
                Cào Mã Trúng Thưởng
              </h3>
              <p className="text-xs text-amber-600 font-bold mt-0.5">
                Gấu bông Rôm Rốp & Voucher 50K
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 leading-relaxed">
                Lật mặt sau gói bánh, quét mã QR và nhập mã cào may mắn trên website để rinh ngay hàng ngàn phần quà siêu cấp đáng yêu!
              </p>
            </div>

            <div>
              <button
                onClick={() => onNavigate('offers')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all"
              >
                Cào Thưởng Ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAREERS PREVIEW (Tuyển Dụng Nhân Tài Trẻ) */}
      <section className="bg-stone-100/70 dark:bg-stone-900/40 py-16 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Company Policies & Culture */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-rose-600">
                  GIA NHẬP RÔM RỐP
                </span>
                <h2 className="text-3xl font-black font-heading text-stone-900 dark:text-white mt-1">
                  Tuyển Dụng Nhân Tài Trẻ
                </h2>
              </div>

              {/* Policy note card */}
              <div className="p-5 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm space-y-3">
                <h3 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                  Chính Sách Công Ty
                </h3>
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 rounded-xl text-xs space-y-1 text-rose-900 dark:text-rose-200 font-medium">
                  <p>• Điều 1: 7 Leaders luôn đúng</p>
                  <p>• Điều 2: Nếu leaders sai thì xem lại điều 1 😄</p>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Nếu bạn trẻ và cùng tôn vinh sự sáng tạo, thích trải nghiệm những điều mới mẻ, hãy gia nhập Rôm Rốp ngay hôm nay!
                </p>
              </div>

              {/* Locations */}
              <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                <span className="font-bold text-stone-700 dark:text-stone-300 block">
                  Cơ Sở Làm Việc Chính Thức
                </span>
                <p className="text-stone-500">
                  📍 <strong>Cơ sở TP.HCM:</strong> Hoàng Diệu 2, P. Linh Chiểu, TP. Thủ Đức
                </p>
                <p className="text-stone-500">
                  📍 <strong>Cơ sở Hà Nội:</strong> Phố Đại Linh, P. Trung Văn, Q. Nam Từ Liêm
                </p>
              </div>
            </div>

            {/* Right: Quick Job List */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-black text-lg text-stone-900 dark:text-white">
                  5 Vị Trí Tuyển Dụng Mới Nhất
                </h3>
                <button
                  onClick={() => onNavigate('careers')}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                  Xem tất cả →
                </button>
              </div>

              {[
                { title: 'Nhân Viên Thương Mại Điện Tử', salary: '12M – 18M VND', dept: 'Thương Mại Điện Tử' },
                { title: 'Nhân Viên Sản Xuất & Đóng Gói Bao Bì', salary: '10M – 15M VND', dept: 'Sản Xuất' },
                { title: 'Nhân Viên Bán Hàng', salary: '11M – 20M VND + Thưởng DS', dept: 'Kinh Doanh' },
                { title: 'Nhân Viên Sáng Tạo & Thiết Kế', salary: '14M – 22M VND', dept: 'Creative & Design' },
                { title: 'Nhân Viên Kiểm Toán', salary: '15M – 22M VND', dept: 'Tài Chính & Kiểm Soát' },
              ].map((job, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs flex items-center justify-between gap-4 hover:border-amber-400 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">
                      {job.dept}
                    </span>
                    <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                      {job.title}
                    </h4>
                    <span className="text-xs font-extrabold text-emerald-600">
                      {job.salary}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('careers')}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shrink-0"
                  >
                    Ứng Tuyển
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. CONTACT & CONNECT FORM (Kết Nối Cùng Rôm Rốp) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-rose-200/80 dark:border-stone-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-rose-600">
              CHĂM SÓC KHÁCH HÀNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 dark:text-white">
              Kết Nối Cùng Rôm Rốp
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Mọi thông tin đóng góp ý kiến hoặc hỗ trợ sử dụng sản phẩm, mời bạn để lại thông tin để Rôm Rốp có thể liên hệ trực tiếp qua các kênh chăm sóc khách hàng nhé!
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Họ Tên *
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Số Điện Thoại *
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="0912 345 678"
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Mục Đích
                </label>
                <select
                  value={contactPurpose}
                  onChange={(e) => setContactPurpose(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-rose-500"
                >
                  <option value="Góp ý">Góp ý hương vị & chất lượng</option>
                  <option value="Đại lý">Đăng ký làm Đại lý phân phối</option>
                  <option value="Sự kiện">Đặt snack cho sự kiện / Trường học</option>
                  <option value="Khác">Vấn đề khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Tin Nhắn
              </label>
              <textarea
                rows={3}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Hãy chia sẻ suy nghĩ, cảm nhận hoặc ý kiến đóng góp của bạn cùng Rôm Rốp..."
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-heading font-extrabold text-sm rounded-xl shadow-lg transition-all"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi Thông Tin Cho Rôm Rốp'}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
