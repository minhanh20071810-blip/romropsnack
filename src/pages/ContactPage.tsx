import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Search, 
  Navigation, 
  ShieldCheck, 
  Star, 
  Send, 
  Sparkles, 
  Check, 
  Truck, 
  RotateCcw, 
  Download,
  Building2
} from 'lucide-react';
import { StoreLocation } from '../types';
import { STORE_LOCATIONS } from '../data/mockData';

interface ContactPageProps {
  showToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ showToast }) => {
  const [selectedCity, setSelectedCity] = useState<'hcm' | 'hanoi' | 'danang' | 'cantho'>('hcm');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeStoreId, setActiveStoreId] = useState(STORE_LOCATIONS[0].id);

  // Form tab
  const [contactTab, setContactTab] = useState<'personal' | 'b2b'>('personal');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPurpose, setSenderPurpose] = useState('Góp ý chất lượng bánh');
  const [senderMessage, setSenderMessage] = useState('');
  const [agreeConnect, setAgreeConnect] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const filteredStores = STORE_LOCATIONS.filter((s) => {
    if (selectedCity && s.city !== selectedCity) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q) || s.district.toLowerCase().includes(q);
    }
    return true;
  });

  const activeStore = STORE_LOCATIONS.find((s) => s.id === activeStoreId) || STORE_LOCATIONS[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !senderEmail) {
      showToast('Vui lòng điền họ tên, số điện thoại và email!');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast('🎉 Rôm Rốp đã nhận thông tin! Chuyên viên hỗ trợ sẽ liên hệ trong vòng 12h.');
      setSenderName('');
      setSenderPhone('');
      setSenderEmail('');
      setSenderMessage('');
    }, 600);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* 1. HERO TOP BAR */}
      <section className="bg-linear-to-b from-amber-50/80 via-orange-50/40 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 pt-10 pb-14 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                MẠNG LƯỚI PHÂN PHỐI ĐA ĐIỂM
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-heading text-stone-900 dark:text-white leading-tight">
                Kết Nối Với Rôm Rốp – <br />
                <span className="text-amber-700 dark:text-amber-400">Chúng Tôi Luôn Lắng Nghe Bạn</span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Mọi thông tin đóng góp ý kiến hoặc hỗ trợ sử dụng sản phẩm, mời bạn để lại thông tin để Rôm Rốp có thể liên hệ trực tiếp qua các kênh chăm sóc khách hàng nhé!
              </p>
            </div>

            {/* Hotline Box */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl shadow-xl border border-amber-200 dark:border-stone-700 text-center shrink-0 min-w-[280px]">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                TỔNG ĐÀI PHỤC VỤ 24/7
              </span>
              <a 
                href="tel:19005678" 
                className="text-3xl font-black font-heading text-amber-700 dark:text-amber-400 block mt-1 hover:scale-105 transition-transform"
              >
                1900-5678
              </a>
              <span className="text-[11px] text-stone-400 block mt-1">
                Cước gọi tính theo quy định nhà mạng
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STORE LOCATOR (Tìm Điểm Bán Rôm Rốp Gần Bạn Nhất) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-black font-heading text-stone-900 dark:text-white">
            Tìm Điểm Bán Rôm Rốp Gần Bạn Nhất
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Mua trực tiếp tại hệ thống siêu thị, chuỗi cửa hàng tiện lợi hoặc các trạm phân phối ủy quyền.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Nhập tên đường, tòa nhà hoặc khu vực..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-900 dark:text-white focus:outline-hidden"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value as any)}
              className="px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-800 dark:text-stone-200 focus:outline-hidden"
            >
              <option value="hcm">TP. Hồ Chí Minh (1.850+ điểm)</option>
              <option value="hanoi">TP. Hà Nội (1.200+ điểm)</option>
              <option value="danang">Đà Nẵng (350+ điểm)</option>
              <option value="cantho">Cần Thơ (180+ điểm)</option>
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-hidden"
            >
              <option value="all">Tất cả Quận / Huyện</option>
              <option value="thuduc">TP. Thủ Đức</option>
              <option value="namtuliem">Quận Nam Từ Liêm</option>
              <option value="haichau">Quận Hải Châu</option>
            </select>

            <button
              onClick={() => showToast(`Đã lọc các điểm bán tại ${selectedCity.toUpperCase()}`)}
              className="px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-heading font-black text-xs rounded-xl shadow-md transition-all shrink-0"
            >
              Tìm Ngay
            </button>
          </div>
        </div>

        {/* Map and Store List Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Store List (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {filteredStores.map((store) => {
              const isActive = store.id === activeStoreId;
              return (
                <div
                  key={store.id}
                  onClick={() => setActiveStoreId(store.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-md ring-2 ring-amber-400/20'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                      {store.tag}
                    </span>
                    <span className="text-xs font-bold text-stone-400">
                      {store.district}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                    {store.name}
                  </h4>

                  <p className="text-xs text-stone-500 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </p>

                  <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-500" />
                      {store.hours.split('(')[0]}
                    </span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      📞 {store.phone}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {store.services.map((srv, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded-md">
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Visual Map Card (Right 7 cols) */}
          <div className="lg:col-span-7 bg-stone-100 dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-inner relative overflow-hidden min-h-[420px]">
            
            {/* SVG Visual Stylized Map */}
            <div className="absolute inset-0 bg-[#E8F0F8] dark:bg-[#1E293B] opacity-90 overflow-hidden">
              <svg className="w-full h-full object-cover" viewBox="0 0 600 400" preserveAspectRatio="none">
                {/* Simulated Roads & River */}
                <path d="M-50,220 C150,180 300,280 650,200" stroke="#CBD5E1" strokeWidth="24" fill="none" opacity="0.6" />
                <path d="M120,-50 C180,150 220,350 260,450" stroke="#CBD5E1" strokeWidth="18" fill="none" opacity="0.6" />
                <path d="M380,-50 C360,180 420,300 460,450" stroke="#CBD5E1" strokeWidth="14" fill="none" opacity="0.6" />
                <path d="M-50,90 C200,120 400,60 650,110" stroke="#BAE6FD" strokeWidth="16" fill="none" opacity="0.8" />
                
                {/* Store Pin Location Markers */}
                <g transform="translate(240, 170)">
                  <circle r="18" fill="#F43F5E" fillOpacity="0.2" className="animate-ping" />
                  <circle r="10" fill="#E11D48" />
                  <circle r="4" fill="#FFFFFF" />
                  <text x="16" y="4" fontSize="11" fontWeight="bold" fill="#0F172A">Rôm Rốp Hub (Thủ Đức)</text>
                </g>

                <g transform="translate(140, 110)">
                  <circle r="8" fill="#0284C7" />
                  <circle r="3" fill="#FFFFFF" />
                  <text x="14" y="4" fontSize="10" fontWeight="bold" fill="#334155">Hệ thống GS25 & Circle K</text>
                </g>

                <g transform="translate(390, 240)">
                  <circle r="8" fill="#059669" />
                  <circle r="3" fill="#FFFFFF" />
                  <text x="14" y="4" fontSize="10" fontWeight="bold" fill="#334155">Đại lý MiniMart GigaMall</text>
                </g>
              </svg>
            </div>

            {/* Map Overlay Controls */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-stone-200 dark:border-stone-700">
                <span className="text-[10px] font-bold text-stone-500 block uppercase">
                  Đang chọn chi nhánh:
                </span>
                <h5 className="font-heading font-black text-xs text-stone-900 dark:text-white">
                  {activeStore.name}
                </h5>
                <p className="text-[11px] text-stone-500">
                  {activeStore.address}
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeStore.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Chỉ Đường Google Maps</span>
              </a>
            </div>

            {/* Bottom commitments strip */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2 mt-auto pt-6">
              <div className="p-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-700 text-center">
                <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="font-bold text-xs block text-stone-900 dark:text-white">Giao Siêu Tốc 2H</span>
                <span className="text-[10px] text-stone-500">Nội thành HCM & Hà Nội</span>
              </div>
              <div className="p-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-700 text-center">
                <ShieldCheck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="font-bold text-xs block text-stone-900 dark:text-white">Tồn Kho Đảm Bảo</span>
                <span className="text-[10px] text-stone-500">HSD mới nhất dưới 30 ngày</span>
              </div>
              <div className="p-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-700 text-center">
                <RotateCcw className="w-4 h-4 text-rose-600 mx-auto mb-1" />
                <span className="font-bold text-xs block text-stone-900 dark:text-white">Đổi Trả Miễn Phí</span>
                <span className="text-[10px] text-stone-500">Nếu snack giảm độ giòn</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PARTNERSHIP & FEEDBACK FORM (Khởi Tạo Cơ Hội Hợp Tác) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: B2B Testimonial and Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                HỘP THƯ PHẢN HỒI TRỰC TIẾP
              </span>
              <h2 className="text-3xl font-black font-heading text-stone-900 dark:text-white mt-1">
                Khởi Tạo Cơ Hội Hợp Tác Hoặc Gửi Góp Ý Đến Chúng Tôi
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                Mọi thông tin đóng góp ý kiến hoặc hỗ trợ sử dụng sản phẩm, mời bạn để lại thông tin để Rôm Rốp có thể liên hệ trực tiếp qua các kênh chăm sóc khách hàng nhé!
              </p>
            </div>

            {/* Testimonial Box */}
            <div className="p-6 bg-amber-50/80 dark:bg-stone-800 rounded-3xl border border-amber-200 dark:border-stone-700 space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 italic leading-relaxed">
                &quot;Quy trình xử lý đơn đặt hàng sỉ của Rôm Rốp rất chuyên nghiệp. Snack bảo quản kín khí tuyệt vời, tỉ lệ bán lẻ rất cao ngay tuần đầu lên kệ siêu thị mini.&quot;
              </p>
              <div className="pt-2 border-t border-amber-200/60 dark:border-stone-700 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  HN
                </div>
                <div>
                  <h5 className="font-heading font-black text-xs text-stone-900 dark:text-white">
                    Hoàng Nhật Minh
                  </h5>
                  <p className="text-[10px] text-stone-500">
                    Giám đốc Chuỗi Cửa Hàng Tiện Lợi MiniFood Hải Phòng
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
              <p className="text-stone-600 dark:text-stone-400">
                📧 <strong>Kênh B2B:</strong> b2b@romrop.vn
              </p>
              <p className="text-stone-600 dark:text-stone-400">
                📧 <strong>Kênh Khách Hàng:</strong> contact@romrop.vn
              </p>
              <p className="text-stone-500 text-[11px] pt-1 border-t border-stone-100 dark:border-stone-700">
                🔒 Cam kết bảo mật dữ liệu doanh nghiệp và khách hàng 100%
              </p>
            </div>
          </div>

          {/* Right Column: Tabbed Form */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/80 dark:border-stone-800 space-y-6">
            
            {/* Tabs */}
            <div className="flex p-1 bg-stone-100 dark:bg-stone-800 rounded-2xl">
              <button
                onClick={() => setContactTab('personal')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  contactTab === 'personal'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                }`}
              >
                Hỗ Trợ Khách Hàng Cá Nhân
              </button>
              <button
                onClick={() => setContactTab('b2b')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  contactTab === 'b2b'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                }`}
              >
                Hợp Tác B2B / Mở Đại Lý
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Họ Tên *
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn..."
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Số Điện Thoại *
                  </label>
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="Ví dụ: 0912 345 678"
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Gmail / Email *
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    required
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Mục Đích *
                  </label>
                  <select
                    value={senderPurpose}
                    onChange={(e) => setSenderPurpose(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                  >
                    {contactTab === 'personal' ? (
                      <>
                        <option value="Feedback chất lượng">Góp ý chất lượng bánh snack</option>
                        <option value="Hỗ trợ đơn hàng">Hỗ trợ tra cứu đơn hàng</option>
                        <option value="Đổi trả gói bánh">Yêu cầu bảo hành / Đổi trả bánh</option>
                      </>
                    ) : (
                      <>
                        <option value="Mở đại lý sỉ">Đăng ký làm Đại lý phân phối sỉ</option>
                        <option value="Cung cấp quà tặng sự kiện">Đặt snack sự kiện / Trường học</option>
                        <option value="Hợp tác thương hiệu">Hợp tác tiếp thị / Co-branding</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Tin Nhắn *
                </label>
                <textarea
                  rows={4}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Gửi gắm ý kiến, thắc mắc hoặc lời nhắn của bạn đến Rôm Rốp nhé..."
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree-connect"
                  checked={agreeConnect}
                  onChange={(e) => setAgreeConnect(e.target.checked)}
                  className="rounded-sm border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="agree-connect" className="text-xs text-stone-500">
                  Tôi đồng ý để đội ngũ chăm sóc khách hàng Rôm Rốp kết nối trực tiếp qua SĐT/Gmail để hỗ trợ nhanh nhất.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-stone-400">
                  ⚡ Phản hồi nhanh trong vòng 12h
                </span>

                <button
                  type="submit"
                  disabled={isSending || !agreeConnect}
                  className="w-full sm:w-auto px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-heading font-black text-xs rounded-xl shadow-lg transition-all active:scale-95"
                >
                  {isSending ? 'Đang gửi...' : 'Gửi Tin Nhắn Đến Rôm Rốp ▶'}
                </button>
              </div>
            </form>

          </div>

        </div>
      </section>

      {/* 4. BOTTOM COMMITMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl text-white shadow-2xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              CAM KẾT 100% AN TOÀN VỆ SINH THỰC PHẨM
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading">
              Giòn Tan Nguyên Bản – Không Chất Bảo Quản Độc Hại
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Mỗi mẻ snack Rôm Rốp xuất xưởng đều trải qua 6 lớp kiểm định vi sinh, kiểm soát kim loại và kiểm tra độ ẩm chuẩn ngặt. Chúng tôi cam kết hoàn tiền 100% nếu phát hiện sản phẩm hư hỏng hoặc biến chất khi vận chuyển.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="tel:19005678"
              className="px-6 py-3 bg-white text-stone-900 font-heading font-black text-xs rounded-xl shadow-md hover:bg-amber-50 transition-all"
            >
              Hotline: 1900-5678
            </a>
            <button
              onClick={() => showToast('📥 Đang tải Hồ sơ năng lực Rôm Rốp Snack B2B (PDF)...')}
              className="px-6 py-3 bg-black/40 hover:bg-black/60 text-white font-heading font-black text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Tải Hồ Sơ Năng Lực (Profile B2B)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
