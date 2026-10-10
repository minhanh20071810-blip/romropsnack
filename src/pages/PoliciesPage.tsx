import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Award, 
  Coffee, 
  Laptop, 
  Plane, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  TrendingUp,
  Clock,
  Heart
} from 'lucide-react';
import { ASSET_IMAGES } from '../data/mockData';

interface PoliciesPageProps {
  onNavigate: (page: string) => void;
  showToast: (msg: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ onNavigate, showToast }) => {
  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="bg-linear-to-b from-amber-50/80 via-orange-50/40 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 pt-10 pb-16 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                CHẾ ĐỘ & ĐÃI NGỘ GEN Z 2026
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-heading text-stone-900 dark:text-white leading-tight">
                Làm Giòn Tan – Nhận Xứng Tầm: <br />
                <span className="text-rose-600 dark:text-rose-400">
                  Chính Sách Lương Thưởng & Môi Trường Rôm Rốp
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                Tại Rôm Rốp, chúng tôi tin rằng sự sáng tạo bùng nổ bắt nguồn từ một hậu phương vững chắc. Chính sách đãi ngộ minh bạch, lộ trình thăng tiến rõ ràng và môi trường làm việc linh hoạt tối đa cho thế hệ trẻ.
              </p>

              {/* 3 Key Trust Elements */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-stone-600 dark:text-stone-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  100% Minh Bạch Hợp Đồng
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Giờ Giấc Linh Hoạt Flex-Time
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Snack & Pantry Miễn Phí 24/7
                </span>
              </div>
            </div>

            {/* Right Mascot Visual */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 bg-white dark:bg-stone-800 rounded-3xl shadow-xl border border-stone-200 dark:border-stone-700 text-center space-y-3 max-w-xs w-full">
                <div className="w-28 h-28 mx-auto rounded-2xl bg-amber-100 p-1 overflow-hidden">
                  <img
                    src={ASSET_IMAGES.rombotMascot}
                    alt="Rôm Bot Policy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-heading font-black text-sm text-stone-900 dark:text-white">
                  Phúc Lợi Đỉnh Chóp
                </h4>
                <p className="text-[11px] text-stone-500">
                  Làm việc hết mình – Thưởng lớn xứng tầm cùng gia đình Rôm Rốp!
                </p>
              </div>
            </div>

          </div>

          {/* 3 Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-amber-200 dark:border-stone-700 shadow-md space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
                ĐÃI NGỘ 100%
              </span>
              <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
                100% Lương Thử Việc
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Hưởng trọn vẹn 100% lương ngay trong thời gian thử việc 2 tháng, không cắt giảm bất kỳ phúc lợi cơ bản nào.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-emerald-200 dark:border-stone-700 shadow-md space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                2 - 4 THÁNG LƯƠNG
              </span>
              <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
                Thưởng Tháng 13 + KPI
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Thưởng hiệu quả kinh doanh lên tới 2 – 4 tháng lương mỗi năm theo đóng góp của cá nhân và phòng ban.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-purple-200 dark:border-stone-700 shadow-md space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 dark:bg-purple-950 px-2.5 py-0.5 rounded-full">
                THÁNG 4 & THÁNG 10
              </span>
              <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
                Review Lương 2 Lần/Năm
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Đánh giá năng lực định kỳ với bộ tiêu chí minh bạch, chủ động đề xuất mức tăng theo thành tích thực tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INCOME & REWARDS SYSTEM (Hệ Thống Thu Nhập & Khen Thưởng Đa Tầng) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-rose-600">
            MINH BẠCH & CÔNG BẰNG
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
            Hệ Thống Thu Nhập & Khen Thưởng Đa Tầng
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Không chỉ dừng lại ở mức lương cạnh tranh, Rôm Rốp xây dựng gói thu nhập đa tầng bao phủ trọn vẹn từ chi phí sinh hoạt đến phần thưởng giá trị lâu dài.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full uppercase">
                CỐ ĐỊNH & ỔN ĐỊNH
              </span>
              <span className="text-xs text-stone-400">Chi trả đúng ngày 05</span>
            </div>
            <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
              Lương Cứng & Phụ Cấp Thực Tế
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Mức lương cơ bản cạnh tranh top 15% ngành FMCG & Snack tại Việt Nam. Không bao giờ trễ lương dù chỉ 1 ngày.
            </p>
            <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Phụ cấp ăn trưa 1.200.000đ/tháng nạp thẳng vào tài khoản.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Phụ cấp xăng xe & cước điện thoại theo đặc thù từng vị trí.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Hỗ trợ 100% vé gửi xe tòa nhà văn phòng trung tâm hàng tháng.</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase">
                HIỆU SUẤT VƯỢT TRỘI
              </span>
              <span className="text-xs text-stone-400">Xét theo Quý & Campaign</span>
            </div>
            <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
              Thưởng Hiệu Suất & Doanh Số (KPIs)
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Tôn vinh nỗ lực bứt phá và đóng góp sáng tạo then chốt với các chương trình thưởng nóng ngay khi đạt cột mốc.
            </p>
            <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Thưởng nóng chiến dịch: Trao ngay khi mở vị snack mới đạt mốc triệu gói.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Hoa hồng kinh doanh và đối tác bán lẻ lũy tiến tỷ lệ chưa từng có.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Giải thưởng &quot;Crunch Squad of the Quarter&quot; lên tới 1.5 tháng lương.</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black bg-rose-100 text-rose-800 px-3 py-1 rounded-full uppercase">
                LỄ TẾT & GẮN KẾT
              </span>
              <span className="text-xs text-stone-400">Phúc lợi ấm áp</span>
            </div>
            <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
              Thưởng Lễ Tết & Dự Án Vượt Tiến Độ
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Đồng hành cùng nhân sự qua mọi cột mốc ngày lễ lớn của đất nước và tôn vinh những người bạn đồng hành dài lâu.
            </p>
            <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Thưởng các ngày Lễ Tết (30/4, 2/9, Tết Dương lịch, Trung Thu) kèm giỏ quà Snack giới hạn.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Lì xì may mắn đầu xuân từ Ban Lãnh Đạo cùng tiệc tất niên Year-End Gala.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Chương trình cổ phần ưu đãi ESOP: Dành cho nhân sự gắn bó từ 2 năm.</span>
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full uppercase">
                CHĂM SÓC Y TẾ VIP
              </span>
              <span className="text-xs text-stone-400">Bảo vệ toàn diện</span>
            </div>
            <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
              Bảo Hiểm & Sức Khỏe Cao Cấp
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Sức khỏe của bạn là tài sản quý giá nhất của Rôm Rốp. Chúng tôi bảo lãnh viện phí cao cấp giúp bạn an tâm tỏa sáng.
            </p>
            <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>100% đóng BHXH/BHYT/BHTN trên mức lương thực tế.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Gói bảo hiểm sức khỏe thương mại cao cấp (PVI / Bảo Việt Care) nội & ngoại trú.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Khám sức khỏe tổng quát định kỳ hàng năm tại bệnh viện quốc tế Vinmec/FV.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. MODERN WORK ENVIRONMENT (Chế Độ Làm Việc Hiện Đại) */}
      <section className="bg-stone-50 dark:bg-stone-900/40 py-16 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              WORK-LIFE CRUNCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
              Chế Độ Làm Việc Hiện Đại Cho Người Trẻ
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Chúng tôi không quản lý bằng việc soi camera hay tiếng còi chấm công. Rôm Rốp vận hành dựa trên sự tin tưởng, cam kết đầu ra (OKRs) và nhịp sống cân bằng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Mô Hình Hybrid Linh Hoạt
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                2 ngày làm việc từ xa (Work From Home) tự do mỗi tuần. Khung giờ làm việc mở từ 08:30 – 09:00 sáng, không chấm công vân tay khắt khe, đánh giá hoàn toàn dựa trên chất lượng sản phẩm hoàn thành.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Nghỉ Phép Thảnh Thơi (15+ Ngày/Năm)
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                12 ngày phép năm tiêu chuẩn + 1 ngày nghỉ sinh nhật nguyên lương + <strong>3 ngày Creative Mental Reset Day</strong> để bạn xả stress, du lịch lấy cảm hứng bất kỳ lúc nào thấy mỏi mệt.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Trang Thiết Bị Hiện Đại
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Trang bị ngay <strong>MacBook Pro/Laptop đồ họa cấu hình cao</strong>, màn hình ngoài 4K chống mỏi mắt và ngân sách 3.000.000đ hỗ trợ setup góc làm việc tiện nghi tại nhà.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SNACK BAR & EXPERIENCES (Đặc Quyền Ăn Vặt & Trải Nghiệm Độc Bản) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">
            ĐỘC QUYỀN RÔM RỐP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
            Đặc Quyền Ăn Vặt & Trải Nghiệm Độc Bản
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Làm việc tại công ty sản xuất snack thì ăn vặt là một phong cách sống! Khám phá những trải nghiệm chỉ thành viên Rôm Rốp mới được tận hưởng mỗi ngày.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-amber-50/70 dark:bg-stone-800 rounded-3xl border border-amber-200 dark:border-stone-700 space-y-3">
            <span className="text-[10px] font-black text-amber-700 uppercase">01 · FREE UNLIMITED PANTRY</span>
            <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
              Snack Bar & Pantry Vô Hạn 0đ
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Tủ snack Rôm Rốp luôn đầy ắp tất cả 9 vị đặc trưng: Bún Đậu, Mắm Tôm, Bò Huế, Sườn Bì, Trứng Muối... Kèm trà sữa, cà phê specialty và detox mát lạnh.
            </p>
            <div className="text-[11px] font-bold text-amber-700 pt-2 border-t border-amber-200/60">
              9+ Vị Snack Sẵn Có · 0 VNĐ
            </div>
          </div>

          <div className="p-6 bg-emerald-50/70 dark:bg-stone-800 rounded-3xl border border-emerald-200 dark:border-stone-700 space-y-3">
            <span className="text-[10px] font-black text-emerald-700 uppercase">02 · NGHIÊN CỨU VỊ MỚI</span>
            <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
              Flavor Tasting Friday
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Chiều thứ 6 hàng tuần, toàn thể nhân viên cùng đội ngũ R&D &quot;thử vị mù&quot; để chấm điểm snack mới. Nếu vị do bạn đề xuất được sản xuất, bạn nhận thưởng nóng 5.000.000đ!
            </p>
            <div className="text-[11px] font-bold text-emerald-700 pt-2 border-t border-emerald-200/60">
              Đóng góp hương vị mới · Thưởng 5M
            </div>
          </div>

          <div className="p-6 bg-purple-50/70 dark:bg-stone-800 rounded-3xl border border-purple-200 dark:border-stone-700 space-y-3">
            <span className="text-[10px] font-black text-purple-700 uppercase">03 · DU LỊCH 4-5 SAO</span>
            <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
              Team Building & Nghỉ Dưỡng
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Nghỉ dưỡng định kỳ 2 lần mỗi năm tại các bãi biển đẹp nhất Việt Nam (Phú Quốc, Nha Trang, Quy Nhơn...). Trải nghiệm resort cao cấp, tiệc nướng BBQ hoàng hôn bãi biển.
            </p>
            <div className="text-[11px] font-bold text-purple-700 pt-2 border-t border-purple-200/60">
              100% công ty tài trợ toàn bộ chi phí
            </div>
          </div>

          <div className="p-6 bg-rose-50/70 dark:bg-stone-800 rounded-3xl border border-rose-200 dark:border-stone-700 space-y-3">
            <span className="text-[10px] font-black text-rose-700 uppercase">04 · PHÁT TRIỂN CÁ NHÂN</span>
            <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
              Ngân Sách Học Tập 15 Triệu/Năm
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Rôm Rốp tài trợ học phí trực tiếp cho các khóa học nâng cao nghiệp vụ: chứng chỉ quản lý quốc tế, khóa đào tạo Marketing xu hướng, Data Analytics, Công nghệ thực phẩm.
            </p>
            <div className="text-[11px] font-bold text-rose-700 pt-2 border-t border-rose-200/60">
              15.000.000đ/Năm · Không ràng buộc
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEGAL COMMITMENT & WHISTLEBLOWER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              CHUẨN MỰC & ĐẠO ĐỨC
            </span>
            <h3 className="text-2xl font-black font-heading text-stone-900 dark:text-white">
              Cam Kết Pháp Lý & Văn Hóa Minh Bạch
            </h3>
            <p className="text-xs text-stone-500">
              Chúng tôi đặt quyền lợi người lao động làm nền móng bền vững cho mọi kế hoạch mở rộng thị trường snack. Mọi cam kết đều được hiện thực hóa bằng văn bản và quy chuẩn giám sát chặt chẽ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <FileText className="w-5 h-5 text-amber-600 mb-2" />
              <h5 className="font-bold text-xs text-stone-900 dark:text-white">Hợp Đồng Lao Động Rõ Ràng</h5>
              <p className="text-[11px] text-stone-500 mt-1">Ký hợp đồng chính thức ngay sau khi kết thúc 60 ngày thử việc.</p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
              <h5 className="font-bold text-xs text-stone-900 dark:text-white">Đóng Bảo Hiểm 100% Đầy Đủ</h5>
              <p className="text-[11px] text-stone-500 mt-1">Không bao giờ trốn đóng hay khai giảm mức lương bảo hiểm.</p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <Clock className="w-5 h-5 text-rose-600 mb-2" />
              <h5 className="font-bold text-xs text-stone-900 dark:text-white">Cam Kết &quot;No Overtime&quot; Bất Hợp Lý</h5>
              <p className="text-[11px] text-stone-500 mt-1">Khuyến khích hoàn thành việc trong 8h. Mọi phát sinh OT đều tính lương 150% - 200%.</p>
            </div>

            <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <Heart className="w-5 h-5 text-purple-600 mb-2" />
              <h5 className="font-bold text-xs text-stone-900 dark:text-white">Hòm Thư Ẩn Danh 24/7</h5>
              <p className="text-[11px] text-stone-500 mt-1">Kênh góp ý trực tiếp tới Ban Giám Đốc hoàn toàn bảo mật danh tính.</p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="p-6 bg-linear-to-r from-amber-500 to-rose-600 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                GIA NHẬP ĐỘI NGŨ
              </span>
              <h4 className="text-lg font-black font-heading mt-1">
                Sẵn Sàng Gia Nhập Ngôi Nhà Rôm Rốp Rộn Rã Niềm Vui?
              </h4>
              <p className="text-xs text-white/90">
                Xem ngay các vị trí đang mở tuyển hoặc gửi CV để cùng bắt đầu hành trình snack của bạn!
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('careers')}
                className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Khám Phá Cơ Hội Việc Làm
              </button>
              <button
                onClick={() => showToast('📥 Đang tải Sổ tay Phúc lợi & Chế độ Rôm Rốp 2026 (PDF)...')}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Sổ Tay (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
