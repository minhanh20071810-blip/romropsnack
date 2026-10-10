import React, { useState } from 'react';
import { 
  Sparkles, 
  Gift, 
  Tag, 
  CheckCircle2, 
  ArrowRight, 
  QrCode, 
  Crown, 
  Star, 
  Trophy, 
  Smile,
  ShoppingBag
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, COMBOS, ASSET_IMAGES } from '../data/mockData';
import { SnackBagArt } from '../components/SnackBagArt';
import { playCelebrationSound } from '../utils/audio';

interface OffersPageProps {
  onAddToCart: (product: Product, quantity: number) => void;
  playCrunch: () => void;
  showToast: (msg: string) => void;
  onNavigate: (page: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  onAddToCart,
  playCrunch,
  showToast,
  onNavigate,
}) => {
  const [scratchCode, setScratchCode] = useState('');
  const [redeemResult, setRedeemResult] = useState<{
    success: boolean;
    title: string;
    description: string;
  } | null>(null);

  const handleRedeemCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = scratchCode.trim().toUpperCase();
    if (!code) {
      showToast('Vui lòng nhập mã cào may mắn!');
      return;
    }

    playCelebrationSound();

    if (code.includes('ROP') || code.includes('GAU') || code.includes('BEAR')) {
      setRedeemResult({
        success: true,
        title: '🎉 CHÚC MỪNG BẠN TRÚNG GIẢI ĐẶC BIỆT!',
        description: 'Bạn đã trúng 01 Gấu Bông Rôm Rốp Má Phính phiên bản giới hạn! Bộ phận CSKH sẽ liên hệ gửi quà đến bạn.',
      });
      showToast('🎁 Chúc mừng! Bạn đã trúng Gấu Bông Rôm Rốp Má Phính!');
    } else {
      setRedeemResult({
        success: true,
        title: '🎉 TRÚNG VOUCHER 50.000Đ CỰC ĐỈNH!',
        description: 'Mã giảm giá [ROMROP50K] đã được kích hoạt và tự động áp dụng vào giỏ hàng của bạn.',
      });
      showToast('🎁 Chúc mừng! Bạn nhận được Voucher 50.000đ!');
    }
  };

  const handleAddBuy2Get1 = () => {
    playCrunch();
    // Add 2 packs (e.g. Cheese & Seaweed) + 1 original for free
    const cheese = PRODUCTS.find((p) => p.id === 'basic-cheese-egg');
    const seaweed = PRODUCTS.find((p) => p.id === 'basic-seaweed');
    if (cheese) onAddToCart(cheese, 1);
    if (seaweed) onAddToCart(seaweed, 1);
    showToast('🎁 Đã thêm 2 gói snack vào giỏ! Bạn được tặng kèm 01 gói Vị Nguyên Bản (0đ).');
  };

  const handleBuyCombo = (comboId: string) => {
    playCrunch();
    if (comboId === 'combo-movie') {
      const basicProds = PRODUCTS.filter((p) => p.line === 'basic');
      basicProds.forEach((p) => onAddToCart(p, 1));
      showToast('🍿 Đã thêm Set "Chiến Thần Cày Phim" vào giỏ hàng (Giảm 15%)!');
    } else {
      const regProds = PRODUCTS.filter((p) => p.line === 'regional');
      regProds.forEach((p) => onAddToCart(p, 1));
      const hallo = PRODUCTS.find((p) => p.id === 'halloween-pumpkin');
      if (hallo) onAddToCart(hallo, 1);
      showToast('🚀 Đã thêm Set "Trải Nghiệm Độc Lạ" vào giỏ hàng (Giảm 20%)!');
    }
  };

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      
      {/* 1. HERO PROGRAM 1: MUA 2 TẶNG 1 */}
      <section className="bg-linear-to-b from-amber-50/90 via-orange-50/40 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 pt-10 pb-14 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-wider">
                  CHƯƠNG TRÌNH 1: MUA 2 TẶNG 1
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  🎉 Tiệc tùng cùng hội bạn
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-heading text-stone-900 dark:text-white leading-tight">
                Mua 2 Tặng 1: <br />
                <span className="text-rose-600">
                  Tặng Ngay Gói Vị Nguyên Bản Siêu Cuốn!
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                Tiệc tùng cùng hội bạn thân làm sao thiếu Rôm Rốp? Chỉ cần bỏ giỏ hàng <strong>02 gói snack size lớn bất kỳ</strong>, bạn sẽ được <strong>TẶNG NGAY 01 gói vị Nguyên Bản</strong> siêu cuốn để tha hồ cày phim, tụ tập.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAddBuy2Get1}
                  className="px-7 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-heading font-extrabold text-sm rounded-full shadow-lg flex items-center gap-2 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Bỏ Giỏ 2 Gói Nhận Quà Ngay</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Tự động áp dụng tại giỏ hàng</span>
                </div>
              </div>
            </div>

            {/* Right Pack Gift Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 bg-white dark:bg-stone-800 rounded-3xl border-2 border-amber-300/80 dark:border-stone-700 shadow-2xl text-center max-w-sm w-full">
                <span className="absolute -top-3 right-6 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                  QUÀ TẶNG 0Đ
                </span>

                <div className="my-4">
                  <SnackBagArt product={PRODUCTS[0]} size="lg" />
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-2xl border border-amber-200 dark:border-amber-900/60 text-xs">
                  <p className="font-bold text-amber-900 dark:text-amber-200">
                    Tặng Gói Vị Nguyên Bản
                  </p>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                    Áp dụng khi mua 2 gói lớn bất kỳ
                  </p>
                  <span className="inline-block mt-2 font-black text-rose-600 text-sm">
                    MIỄN PHÍ
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROGRAM 2: COMBOS (Tiết Kiệm Hơn Với Các Combo Độc Quyền) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            CHƯƠNG TRÌNH 2: GIẢM GIÁ THEO SET
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
            Tiết Kiệm Hơn Với Các Combo Độc Quyền
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Trải nghiệm trọn vẹn hương vị với mức giá ưu đãi nhất cho hội bạn thân.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 px-3 py-1 rounded-full uppercase">
                    {combo.tag}
                  </span>
                  <span className="text-xs font-bold text-stone-400">
                    {combo.badgeText}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-heading text-stone-900 dark:text-white mt-4">
                  {combo.name}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                  {combo.description}
                </p>

                <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl flex justify-between text-xs">
                  <span className="text-stone-500">Quy cách:</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{combo.spec}</span>
                </div>

                {/* Flavor items preview */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {combo.items.map((item, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] font-semibold bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-lg border border-amber-200/50"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-rose-600 dark:text-rose-400 tabular-nums">
                    {combo.price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="ml-2 text-xs text-stone-400 line-through tabular-nums">
                    {combo.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <p className="text-[10px] text-stone-400 mt-0.5">Ưu đãi website độc quyền</p>
                </div>

                <button
                  onClick={() => handleBuyCombo(combo.id)}
                  className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-heading font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Halloween Banner Strip */}
        <div className="rounded-3xl overflow-hidden relative shadow-2xl border-2 border-purple-500/30">
          <img 
            src={ASSET_IMAGES.halloweenBanner} 
            alt="Halloween Special Combo" 
            className="w-full h-48 sm:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 sm:p-10">
            <div className="max-w-md space-y-3">
              <span className="text-xs font-black uppercase tracking-wider bg-purple-600 text-white px-3 py-1 rounded-full">
                SỰ KIỆN ĐẶC BIỆT
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Combo Halloween Giới Hạn: Rinh Ngay Ưu Đãi!
              </h3>
              <p className="text-xs text-stone-300">
                Thưởng thức vị Bí Ngô Nướng & Vị Bóng Đêm Than Tre huyền bí trước khi mùa lễ hội kết thúc.
              </p>
              <button
                onClick={() => onNavigate('products')}
                className="mt-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-heading font-black text-xs rounded-full shadow-lg transition-all"
              >
                Khám Phá Combo Ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM 3: SCRATCH CARD (Lật Mặt Sau Gói Bánh: Quét QR & Cào Mã) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-linear-to-b from-orange-50/60 to-white dark:from-stone-900 dark:to-stone-950 p-8 sm:p-12 rounded-3xl border border-amber-200/80 dark:border-stone-800 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Introduction & Scratch Input */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                CHƯƠNG TRÌNH 3: CÀO MÃ TRÚNG THƯỞNG
              </span>

              <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white leading-tight">
                Lật Mặt Sau Gói Bánh <br />
                <span className="text-amber-600">Quét QR & Cào Mã</span> Rinh Quà Cực Đỉnh!
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Lật mặt sau gói bánh, quét mã QR và nhập mã cào may mắn trên website để rinh ngay hàng ngàn phần quà siêu cấp đáng yêu, từ gấu bông Rôm Rốp má phính limited đến voucher 50k cực đỉnh!
              </p>

              {/* Code Redemption Input Form */}
              <form onSubmit={handleRedeemCode} className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                  🎟️ Nhập mã cào QR trúng thưởng tiện lợi (Ví dụ: ROP8899X, CRUNCH2026):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={scratchCode}
                    onChange={(e) => setScratchCode(e.target.value)}
                    placeholder="NHẬP MÃ CÀO (VD: ROP8899X)"
                    className="flex-1 bg-white dark:bg-stone-800 border-2 border-amber-300 dark:border-stone-700 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-heading font-black text-xs rounded-2xl shadow-md transition-all shrink-0 active:scale-95"
                  >
                    Quét & Đổi Quà 🎁
                  </button>
                </div>
              </form>

              {/* Redeem result display */}
              {redeemResult && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 rounded-2xl animate-in zoom-in-95">
                  <h4 className="font-heading font-black text-sm text-emerald-800 dark:text-emerald-300">
                    {redeemResult.title}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                    {redeemResult.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Prize Showcase Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Prize 1: Gấu bông */}
              <div className="p-5 bg-white dark:bg-stone-800 rounded-2xl border border-amber-200 dark:border-stone-700 shadow-md flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl shrink-0">
                  🧸
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                      Giải Đặc Biệt
                    </h4>
                    <span className="text-[9px] font-black uppercase bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                      LIMITED
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-600 mt-0.5">
                    Gấu Bông Rôm Rốp Má Phính
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Gấu bông phiên bản giới hạn mềm mịn siêu cấp đáng yêu dành tặng các tín đồ ăn vặt may mắn.
                  </p>
                </div>
              </div>

              {/* Prize 2: Voucher */}
              <div className="p-5 bg-white dark:bg-stone-800 rounded-2xl border border-emerald-200 dark:border-stone-700 shadow-md flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl shrink-0">
                  🎟️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                      10.000+ Giải
                    </h4>
                    <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      HOT
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 mt-0.5">
                    Voucher 50.000đ Cực Đỉnh
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Mã giảm ngay 50.000đ trừ trực tiếp vào đơn hàng snack tiếp theo tại website Rôm Rốp.
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-amber-100/60 dark:bg-amber-950/40 rounded-2xl text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
                <span className="font-bold block">💡 Cách thức tham gia cực kỳ đơn giản:</span>
                <p>1. Mua gói snack Rôm Rốp bất kỳ → 2. Lật mặt sau & cào nhẹ lớp nhũ bạc → 3. Nhập mã 8 ký tự vào ô bên cạnh để rinh quà tức thì!</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. RÔM RỐP MEMBER CLUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-stone-100/80 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              CÂU LẠC BỘ ĂN VẶT ĐỘC QUYỀN
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
              Rôm Rốp Member Club: Tích Điểm Giòn Giã, Đổi Quà Thả Ga
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
              Mỗi 10.000đ chi tiêu = 1 Hạt Bắp Giòn. Tích luỹ hạt giòn để thăng hạng thành viên và nhận các đặc quyền không đâu có được!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                Đổi Quà Độc Quyền
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Đổi điểm nhận áo phông oversize, túi tote canvas và ly giữ nhiệt phong cách retro.
              </p>
              <span className="text-[11px] font-bold text-emerald-600 block">
                Từ 50 Hạt Bắp →
              </span>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                Quà Tặng Sinh Nhật
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Hộp quà Snack Box bí mật gửi tận nhà cùng voucher giảm 30% nguyên tháng sinh nhật.
              </p>
              <span className="text-[11px] font-bold text-amber-600 block">
                Hạng Bạc Trở Lên →
              </span>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                Thử Vị Mới Đầu Tiên
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Trở thành Giám khảo Hương Vị: nhận mẫu nếm thử các dòng snack mới trước khi mở bán.
              </p>
              <span className="text-[11px] font-bold text-rose-600 block">
                Hạng Vàng & Kim Cương →
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => showToast('🎉 Đăng ký thành viên thành công! Bạn nhận được 10 Hạt Bắp Giòn khởi đầu.')}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-heading font-extrabold text-xs rounded-full shadow-md transition-all active:scale-95"
            >
              Đăng Ký Thành Viên Ngay
            </button>
            <span className="text-xs text-stone-500">
              Hoàn toàn miễn phí · Nhận ngay 10 hạt bắp
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
