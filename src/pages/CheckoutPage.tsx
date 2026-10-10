import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  QrCode, 
  CreditCard, 
  Wallet, 
  Gift, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Check, 
  PartyPopper 
} from 'lucide-react';
import { CartItem } from '../types';
import { SnackBagArt } from '../components/SnackBagArt';
import { playCelebrationSound } from '../utils/audio';

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
  onNavigate: (page: string) => void;
  showToast: (msg: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  onClearCart,
  onNavigate,
  showToast,
}) => {
  const [step, setStep] = useState<2 | 3>(2);

  // Form states
  const [customerName, setCustomerName] = useState('Nguyễn Hoàng Nam');
  const [customerPhone, setCustomerPhone] = useState('0987 654 321');
  const [customerEmail, setCustomerEmail] = useState('hoangnam.snacklover@gmail.com');
  const [selectedCity, setSelectedCity] = useState('hcm');
  const [selectedDistrict, setSelectedDistrict] = useState('quan1');
  const [selectedWard, setSelectedWard] = useState('bennghe');
  const [addressDetail, setAddressDetail] = useState('Tầng 8, Tòa nhà Bitexco, số 2 Hải Triều');
  const [shippingNote, setShippingNote] = useState('Giao giờ hành chính, gọi trước 10 phút, gói bánh chống sốc cẩn thận giúp em');
  const [saveInfo, setSaveInfo] = useState(true);
  const [contactless, setContactless] = useState(false);

  // Shipping & Payment selection
  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'momo' | 'cod' | 'card'>('qr');
  const [voucherCode, setVoucherCode] = useState('GIOMOTTIENG');
  const [isVoucherApplied, setIsVoucherApplied] = useState(true);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 50000;
  const shippingFee = shippingMethod === 'express' ? 25000 : 15000;
  const voucherDiscount = isVoucherApplied ? 10000 : 0;
  const shippingDiscount = isVoucherApplied ? 15000 : 0;
  const finalTotal = Math.max(0, subtotal + shippingFee - voucherDiscount - shippingDiscount);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === 'GIOMOTTIENG' || voucherCode.trim().toUpperCase() === 'ROMROP50K') {
      setIsVoucherApplied(true);
      showToast('🎉 Đã áp dụng mã giảm giá thành công!');
    } else {
      showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handlePlaceOrder = () => {
    setIsSubmittingOrder(true);
    setTimeout(() => {
      setIsSubmittingOrder(false);
      setStep(3);
      playCelebrationSound();
      onClearCart();
      showToast('🎉 Đặt hàng thành công! Đơn hàng của bạn đang được chuẩn bị.');
    }, 800);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-4xl shadow-lg animate-bounce">
          🎉
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
            ĐẶT HÀNG THÀNH CÔNG · MÃ: #RR-88924
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
            Đơn Hàng Của Bạn Đang Được Nướng Giòn!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto leading-relaxed">
            Cảm ơn <strong>{customerName}</strong>! Rôm Rốp đã nhận được thông tin đơn hàng. Nhân viên giao hàng sẽ liên hệ với bạn qua SĐT <strong>{customerPhone}</strong>.
          </p>
        </div>

        {/* VietQR Bank Payment Preview (If QR was chosen) */}
        {paymentMethod === 'qr' && (
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border-2 border-emerald-300 dark:border-stone-700 shadow-xl max-w-md mx-auto space-y-4">
            <span className="text-xs font-black text-sky-600 uppercase tracking-wider block">
              MÃ VIETQR THANH TOÁN TỨC THÌ (NAPAS 247)
            </span>
            <div className="w-48 h-48 mx-auto bg-stone-50 p-3 rounded-2xl border border-stone-200 flex flex-col items-center justify-center">
              <QrCode className="w-36 h-36 text-stone-800" />
              <span className="text-[10px] font-bold text-stone-500 mt-1">Quét bằng mọi App Ngân Hàng</span>
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p>Số tiền: <strong className="text-rose-600">{finalTotal.toLocaleString('vi-VN')}đ</strong></p>
              <p>Nội dung chuyển khoản: <strong className="text-emerald-700">RR88924 {customerPhone}</strong></p>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-heading font-black text-xs rounded-full shadow-md"
          >
            Quay Về Trang Chủ
          </button>
          <button
            onClick={() => onNavigate('products')}
            className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200 text-xs font-bold rounded-full"
          >
            Xem Thêm Vị Snack Khác
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      
      {/* Top Header Stepper */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-sky-600">
              THANH TOÁN AN TOÀN
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 dark:text-white">
              Xác Nhận Đơn Hàng Giòn Rụm <span className="text-xs font-normal text-stone-400">Mã: #RR-88924</span>
            </h1>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              1. Giỏ hàng
            </span>
            <span className="text-stone-300">——</span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 rounded-full font-extrabold shadow-2xs">
              2. Giao hàng & Thanh toán
            </span>
            <span className="text-stone-300">——</span>
            <span className="text-stone-400 font-medium">
              3. Hoàn tất
            </span>
          </div>
        </div>

        {/* Promo Notification Strip */}
        <div className="p-3.5 bg-sky-50 dark:bg-sky-950/60 rounded-2xl border border-sky-200/80 dark:border-sky-800 flex items-center justify-between text-xs text-sky-900 dark:text-sky-200 font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              🎉 Chúc mừng! Đơn hàng được áp dụng mã <strong>GIOMOTTIENG</strong> – Miễn phí vận chuyển nội thành & Giảm 10.000đ
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-rose-600">
            Hạn ưu đãi: 14:59s
          </span>
        </div>
      </div>

      {/* Main Grid: Form Left (7 cols) + Cart Summary Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Shipping & Payment Modules */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Module 1: Customer Info */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-black flex items-center justify-center">
                  1
                </span>
                <h3 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                  Thông Tin Người Nhận
                </h3>
              </div>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-full">
                ⚡ Giao Hỏa Tốc
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Họ và tên người nhận *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                Email (Nhận hóa đơn điện tử & Mã quà tặng)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Tỉnh / Thành phố *
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                >
                  <option value="hcm">Hồ Chí Minh</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="danang">Đà Nẵng</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Quận / Huyện *
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                >
                  <option value="quan1">Quận 1</option>
                  <option value="thuduc">TP. Thủ Đức</option>
                  <option value="quan3">Quận 3</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                Địa chỉ cụ thể (Số nhà, tòa nhà, tên đường) *
              </label>
              <input
                type="text"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 mb-1">
                Ghi chú cho Shipper Rôm Rốp
              </label>
              <input
                type="text"
                value={shippingNote}
                onChange={(e) => setShippingNote(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="rounded-sm border-stone-300 text-sky-600"
                />
                <span>Lưu thông tin giao hàng cho lần đặt snack sau</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contactless}
                  onChange={(e) => setContactless(e.target.checked)}
                  className="rounded-sm border-stone-300 text-sky-600"
                />
                <span>Giao không tiếp xúc</span>
              </label>
            </div>
          </div>

          {/* Module 2: Shipping Options */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-black flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                Phương Thức Giao Hàng
              </h3>
            </div>

            <div className="space-y-3">
              {/* Option 1: Hỏa tốc 2h */}
              <div
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  shippingMethod === 'express'
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="mt-1 text-sky-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-xs text-stone-900 dark:text-white">
                        Giao Siêu Tốc Giòn Tan (2 Giờ)
                      </span>
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Khuyên Dùng
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Bọc hộp carton khí đặc biệt · Giữ trọn độ rôm rốp của từng lát khoai
                    </p>
                    <span className="text-[10px] text-sky-600 font-bold block mt-1">
                      Dự kiến giao: 11:30 hôm nay
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-stone-900 dark:text-white tabular-nums">
                    25.000đ
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-bold">
                    Miễn phí với mã ưu đãi
                  </span>
                </div>
              </div>

              {/* Option 2: Tiêu chuẩn */}
              <div
                onClick={() => setShippingMethod('standard')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  shippingMethod === 'standard'
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="mt-1 text-sky-600"
                  />
                  <div>
                    <span className="font-heading font-black text-xs text-stone-900 dark:text-white">
                      Giao Tiêu Chuẩn Toàn Quốc (2–3 Ngày)
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Phù hợp mọi tỉnh thành, đóng gói cẩn thận 3 lớp bọt khí
                    </p>
                  </div>
                </div>

                <div>
                  <span className="font-black text-sm text-stone-900 dark:text-white tabular-nums">
                    15.000đ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 3: Payment Options */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <h3 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                  Phương Thức Thanh Toán
                </h3>
              </div>
              <span className="text-[11px] text-stone-400">
                Mã hóa chuẩn SSL an toàn
              </span>
            </div>

            <div className="space-y-2.5">
              {/* QR VietQR */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'qr'
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                    className="text-sky-600"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-xs text-stone-900 dark:text-white">
                        Chuyển Khoản QR Tức Thì
                      </span>
                      <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                        Khuyên Dùng · Quét là xong
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Hỗ trợ tất cả ngân hàng Việt Nam qua VietQR / Napas247
                    </p>
                  </div>
                </div>
                <QrCode className="w-5 h-5 text-sky-600 shrink-0" />
              </label>

              {/* MoMo */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'momo'
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="text-sky-600"
                  />
                  <div>
                    <span className="font-heading font-black text-xs text-stone-900 dark:text-white">
                      Ví Điện Tử MoMo / ZaloPay / ShopeePay
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Thanh toán 1 chạm qua ứng dụng ví điện tử liên kết
                    </p>
                  </div>
                </div>
                <Wallet className="w-5 h-5 text-pink-600 shrink-0" />
              </label>

              {/* COD */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-sky-600"
                  />
                  <div>
                    <span className="font-heading font-black text-xs text-stone-900 dark:text-white">
                      Thanh Toán Khi Nhận Hàng (COD)
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Kiểm tra thùng bánh nguyên seal rồi mới thanh toán tiền mặt
                    </p>
                  </div>
                </div>
                <Truck className="w-5 h-5 text-amber-600 shrink-0" />
              </label>

              {/* Card */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-sky-600"
                  />
                  <div>
                    <span className="font-heading font-black text-xs text-stone-900 dark:text-white">
                      Thẻ Quốc Tế / Thẻ ATM Nội Địa
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Hỗ trợ Visa, MasterCard, JCB và thẻ ATM 36 ngân hàng nội địa
                    </p>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-stone-600 shrink-0" />
              </label>
            </div>
          </div>

        </div>

        {/* Right: Cart Summary Column */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                Giỏ Hàng Của Bạn
              </h3>
              <span className="text-xs text-stone-400">
                {cart.length > 0 ? `${cart.length} món` : '3 món · 5 gói'}
              </span>
            </div>

            {/* List preview */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-stone-900 dark:text-white">
                        {item.product.name} <span className="text-stone-400 font-normal">x{item.quantity}</span>
                      </h5>
                      <span className="text-[10px] text-stone-500">{item.product.flavorNotes.split(',')[0]}</span>
                    </div>
                    <span className="font-bold text-stone-800 dark:text-stone-200 tabular-nums">
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-stone-900 dark:text-white">
                        Vị Phô Mai Trứng Muối <span className="text-stone-400 font-normal">x2</span>
                      </h5>
                      <span className="text-[10px] text-stone-500">Béo ngậy đậm đà · Gói lớn 75g</span>
                    </div>
                    <span className="font-bold tabular-nums">20.000đ</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-stone-900 dark:text-white">
                        Vị Bún Đậu Mắm Tôm <span className="text-stone-400 font-normal">x2</span>
                      </h5>
                      <span className="text-[10px] text-stone-500">Phiên bản Hà Nội phố · Cay nhẹ 85g</span>
                    </div>
                    <span className="font-bold tabular-nums">30.000đ</span>
                  </div>
                </>
              )}

              {/* Free gift pack item */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full">
                    QUÀ TẶNG
                  </span>
                  <h5 className="font-black mt-1">Vị Khoai Tây Nguyên Bản (x1)</h5>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300">Ưu đãi Mua 2 Tặng 1 Giòn Tan</p>
                </div>
                <span className="font-black text-rose-600 text-xs">0đ (Miễn phí)</span>
              </div>

              {/* Sticker bonus */}
              <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                <Gift className="w-3.5 h-3.5 text-rose-500" />
                <span>Tặng kèm: 01 Bộ Mascot Sticker Rôm Rốp & Thiệp cảm ơn viết tay</span>
              </div>
            </div>

            {/* Voucher Coupon Form */}
            <form onSubmit={handleApplyVoucher} className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-300">
                Mã Giảm Giá / Voucher Ưu Đãi
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  placeholder="Nhập mã voucher..."
                  className="flex-1 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition-all shrink-0"
                >
                  {isVoucherApplied ? 'Đã Áp Dụng' : 'Áp Dụng'}
                </button>
              </div>
              {isVoucherApplied && (
                <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Mã GIOMOTTIENG: Giảm ngay 10.000đ + Giảm 15.000đ phí ship!
                </p>
              )}
            </form>

            {/* Calculation summary */}
            <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Tạm tính (4 gói tính tiền):</span>
                <span className="font-bold text-stone-900 dark:text-white tabular-nums">
                  {subtotal.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="flex justify-between">
                <span>Phí giao hàng dự kiến ({shippingMethod === 'express' ? 'Hỏa tốc 2h' : 'Tiêu chuẩn'}):</span>
                <span className="font-bold text-stone-900 dark:text-white tabular-nums">
                  {shippingFee.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {isVoucherApplied && (
                <>
                  <div className="flex justify-between text-emerald-600">
                    <span>Voucher [GIOMOTTIENG]:</span>
                    <span className="font-bold tabular-nums">-10.000đ</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Trợ giá vận chuyển thân thiết:</span>
                    <span className="font-bold tabular-nums">-15.000đ</span>
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-baseline justify-between text-stone-900 dark:text-white">
                <div>
                  <span className="font-extrabold text-sm block">Tổng Thanh Toán:</span>
                  <span className="text-[10px] text-stone-400">(Đã bao gồm VAT & Phí bảo quản giòn)</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-sky-600 dark:text-sky-400 tabular-nums block">
                    {finalTotal.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-[10px] font-bold text-rose-600">
                    Tiết kiệm 25.000đ hôm nay
                  </span>
                </div>
              </div>
            </div>

            {/* Main Checkout CTA button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmittingOrder}
              className="w-full py-4 bg-sky-500 hover:bg-sky-600 active:scale-98 text-white font-heading font-black text-sm rounded-2xl shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmittingOrder ? 'Đang Xử Lý...' : `ĐẶT HÀNG & THANH TOÁN (${finalTotal.toLocaleString('vi-VN')}đ)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust check bullets */}
            <div className="space-y-1.5 text-[11px] text-stone-500 pt-1 text-center">
              <p>• 100% đổi trả miễn phí nếu snack bị ỉu hoặc vỡ nát</p>
              <p>✓ Kiểm hàng trước khi nhận · ✓ Bao bì tráng nhôm khử ẩm</p>
              <p className="text-rose-600 font-bold pt-1">
                Cần đổi vị gấp hoặc giao hẹn giờ? Gọi <strong>1900-5678</strong>
              </p>
            </div>

          </div>

          {/* Social Proof badge */}
          <div className="p-4 bg-amber-50 dark:bg-stone-800/80 rounded-2xl border border-amber-200/80 dark:border-stone-700 flex items-center gap-3">
            <span className="font-black text-amber-600 text-sm">4.9★</span>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
              Hơn <strong>45.000 gói snack</strong> đã được giao giòn rụm trong tháng này tại Hà Nội & Sài Gòn.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
