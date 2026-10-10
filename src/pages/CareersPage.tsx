import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Coffee, 
  Smile, 
  FileText, 
  Award, 
  Compass 
} from 'lucide-react';
import { JobOpening } from '../types';
import { JOB_OPENINGS, ASSET_IMAGES } from '../data/mockData';

interface CareersPageProps {
  showToast: (msg: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ showToast }) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpening | null>(null);

  // Application form state
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantRole, setApplicantRole] = useState('ecommerce');
  const [applicantCvUrl, setApplicantCvUrl] = useState('');
  const [applicantIntro, setApplicantIntro] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const depts = [
    { id: 'all', label: 'Tất Cả', count: 5 },
    { id: 'ecommerce', label: 'TMĐT', count: 1 },
    { id: 'production', label: 'Sản Xuất & Đóng Gói', count: 1 },
    { id: 'sales', label: 'Bán Hàng', count: 1 },
    { id: 'design', label: 'Sáng Tạo & Thiết Kế', count: 1 },
    { id: 'finance', label: 'Kiểm Toán', count: 1 },
  ];

  const filteredJobs = JOB_OPENINGS.filter((j) => {
    if (selectedDept !== 'all' && j.department !== selectedDept) return false;
    return true;
  });

  const handleApplyClick = (job: JobOpening) => {
    setApplicantRole(job.department);
    const formEl = document.getElementById('application-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Đã chọn ứng tuyển vị trí: ${job.title}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !applicantEmail || !applicantCvUrl) {
      showToast('Vui lòng điền đủ các thông tin bắt buộc (*)');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('🎉 Nộp hồ sơ thành công! Đội ngũ HR Rôm Rốp sẽ phản hồi trong 24-48 giờ làm việc.');
      setApplicantName('');
      setApplicantPhone('');
      setApplicantEmail('');
      setApplicantCvUrl('');
      setApplicantIntro('');
    }, 600);
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="bg-linear-to-b from-emerald-50/80 via-teal-50/30 to-white dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 pt-10 pb-16 border-b border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                GIA NHẬP ĐỘI NGŨ TIÊN PHONG 2026
              </div>

              <h1 className="text-4xl sm:text-5xl font-black font-heading text-stone-900 dark:text-white leading-tight">
                Nơi Mỗi Ngày Đi Làm <br />
                <span className="text-emerald-600 dark:text-emerald-400">
                  Đều Giòn Rã Niềm Vui!
                </span>
              </h1>

              <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                Chúng tôi tìm kiếm những tâm hồn sáng tạo, say mê ẩm thực bản địa và luôn ngập tràn nhiệt huyết. Cùng Rôm Rốp kiến tạo làn sóng snack chuẩn vị, giòn rụm và tôn vinh nông sản Việt trên từng chặng đường.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#job-listings"
                  className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-heading font-black text-xs rounded-full shadow-lg transition-all"
                >
                  Khám Phá Vị Trí Tuyển Dụng ↓
                </a>
                <a
                  href="#culture"
                  className="px-6 py-3.5 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 font-heading font-bold text-xs rounded-full transition-all"
                >
                  Văn Hóa Đội Ngũ
                </a>
              </div>

              {/* 3 Impressive stats */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3 bg-white/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700 text-center">
                  <span className="text-2xl font-black text-emerald-600">98%</span>
                  <p className="text-[10px] text-stone-500 mt-0.5">Hài lòng văn hóa công ty</p>
                </div>
                <div className="p-3 bg-white/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700 text-center">
                  <span className="text-2xl font-black text-amber-500">100%</span>
                  <p className="text-[10px] text-stone-500 mt-0.5">Snack nạp năng lượng 0đ</p>
                </div>
                <div className="p-3 bg-white/90 dark:bg-stone-800/90 rounded-2xl border border-stone-200/80 dark:border-stone-700 text-center">
                  <span className="text-2xl font-black text-rose-600">Top 1</span>
                  <p className="text-[10px] text-stone-500 mt-0.5">Snack trẻ Việt yêu thích</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 bg-white dark:bg-stone-800 rounded-3xl shadow-2xl border-4 border-emerald-100 dark:border-stone-700 max-w-sm w-full text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-linear-to-tr from-amber-400 to-emerald-400 p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={ASSET_IMAGES.rombotMascot}
                    alt="Rôm Bot HR Mascot"
                    className="w-full h-full object-cover bg-white rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-black text-lg text-stone-900 dark:text-white">
                    Chào Đón Bạn Về Đội!
                  </h4>
                  <p className="text-xs text-stone-500 mt-1">
                    Số 1 chưa tìm thấy chính là bạn! Hãy cùng 7 nhà sáng lập tạo nên những kỳ tích mới.
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  ✨ Welcome Kit: Áo phông Rôm Rốp + Bình giữ nhiệt + Full set 9 vị bánh!
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CULTURE & VALUES (Văn Hóa Giòn Tan & Giá Trị Độc Bản) */}
      <section id="culture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              ĐẶC QUYỀN RÔM RỐP
            </span>
            <h2 className="text-3xl font-black font-heading text-stone-900 dark:text-white">
              Văn Hóa Giòn Tan & Giá Trị Độc Bản
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Môi trường nuôi dưỡng năng lượng sáng tạo tích cực, nơi tiếng nhai rôm rốp đánh thức hàng ngàn ý tưởng bứt phá.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs space-y-1">
                <span className="text-xs font-black text-rose-600">01. Tự do sáng tạo</span>
                <p className="text-xs text-stone-500">Mọi ý kiến của bạn đều được lắng nghe và thử nghiệm tại Flavor Lab.</p>
              </div>
              <div className="p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-2xs space-y-1">
                <span className="text-xs font-black text-amber-600">02. Hybrid linh hoạt</span>
                <p className="text-xs text-stone-500">2 ngày làm việc từ xa mỗi tuần để bạn cân bằng cảm hứng cuộc sống.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-amber-50/80 dark:bg-stone-800 p-6 rounded-3xl border-2 border-dashed border-amber-300 dark:border-stone-700 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-xs uppercase tracking-wider">
              <span>☕ NỘI QUY ĐỘC BẢN RÔM RỐP</span>
            </div>
            <div className="space-y-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <p className="p-2.5 bg-white dark:bg-stone-900 rounded-xl shadow-2xs">
                • <strong>Điều 1:</strong> 7 Leaders luôn đúng.
              </p>
              <p className="p-2.5 bg-white dark:bg-stone-900 rounded-xl shadow-2xs">
                • <strong>Điều 2:</strong> Nếu leaders sai thì xem lại điều 1 😄
              </p>
              <p className="p-2.5 bg-white dark:bg-stone-900 rounded-xl shadow-2xs">
                • <strong>Điều 3:</strong> Ăn snack trong giờ làm việc là bắt buộc, không bị trừ điểm KPI!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. JOB VACANCIES (Vị Trí Tuyển Dụng) */}
      <section id="job-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">
            CƠ HỘI NGHỀ NGHIỆP ĐANG MỞ
          </span>
          <h2 className="text-3xl font-black font-heading text-stone-900 dark:text-white">
            Vị Trí Tuyển Dụng
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Chọn bộ phận phù hợp với thế mạnh của bạn để cùng Rôm Rốp tạo nên những bước đột phá trong ngành công nghiệp snack hiện đại.
          </p>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {depts.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDept(d.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedDept === d.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50'
              }`}
            >
              {d.label} ({d.count})
            </button>
          ))}
        </div>

        {/* Job Listings List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-0.5 rounded-full">
                    {job.deptLabel}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {job.type}
                  </span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                    {job.salary}
                  </span>
                </div>

                <h3 className="text-xl font-black font-heading text-stone-900 dark:text-white">
                  {job.title}
                </h3>

                <p className="text-xs text-stone-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{job.location}</span>
                </p>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                  {job.summary}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => handleApplyClick(job)}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-heading font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Ứng Tuyển Ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HIRING PROCESS (4 Bước Tinh Gọn Để Trở Thành "Rôm Rôper") */}
      <section className="bg-stone-50 dark:bg-stone-900/60 py-16 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
              TRẢI NGHIỆM ỨNG TUYỂN KHÁC BIỆT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 dark:text-white">
              4 Bước Tinh Gọn Để Trở Thành &quot;Rôm Rôper&quot;
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Quy trình nhanh chóng, minh bạch và tràn ngập tiếng cười trong vòng 7 - 10 ngày làm việc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Nộp Hồ Sơ Online
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Gửi CV kèm profile ngắn qua website hoặc email. Đội ngũ HR phản hồi trạng thái hồ sơ trong vòng 24 - 48 giờ.
              </p>
              <span className="text-[10px] font-bold text-amber-600 block pt-2 border-t border-stone-100 dark:border-stone-700">
                Thời gian: 1 – 2 ngày
              </span>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Phỏng Vấn Văn Hóa & Chuyên Môn
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Trò chuyện cởi mở cùng Trưởng nhóm chuyên môn và HR về định hướng, năng lực và mức độ tương thích văn hóa vui nhộn.
              </p>
              <span className="text-[10px] font-bold text-emerald-600 block pt-2 border-t border-stone-100 dark:border-stone-700">
                Thời gian: 45 – 60 phút
              </span>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Thử Thách Vị Giác & Case Study
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Tham gia buổi thử vị mù (blind taste-test) và giải quyết tình huống thực tế cùng đồng đội tương lai tại Flavor Lab.
              </p>
              <span className="text-[10px] font-bold text-purple-600 block pt-2 border-t border-stone-100 dark:border-stone-700">
                Trải nghiệm tương tác 100%
              </span>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-rose-600 text-white font-black text-sm flex items-center justify-center">
                4
              </div>
              <h4 className="font-heading font-black text-base text-stone-900 dark:text-white">
                Nhận Offer & Welcome Kit
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Nhận thư mời làm việc chính thức cùng chiếc Welcome Box Rôm Rốp siêu cool: áo thun, bình giữ nhiệt, tai nghe và full set snack cao cấp.
              </p>
              <span className="text-[10px] font-bold text-rose-600 block pt-2 border-t border-stone-100 dark:border-stone-700">
                Chào mừng lên tàu! 🎉
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TALENT POOL CV SUBMISSION FORM (Đồng Hành Cùng Rôm Rốp) */}
      <section id="application-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-200/80 dark:border-stone-800 space-y-8">
          
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              HỒ SƠ MỞ – TALENT POOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 dark:text-white">
              Đồng Hành Cùng Rôm Rốp
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic bg-amber-50 dark:bg-stone-800/80 p-4 rounded-2xl border border-amber-200/60">
              &quot;Nếu bạn chia sẻ cùng tầm nhìn và mong muốn phát triển cùng Rôm Rốp, hãy gửi hồ sơ ngay hôm nay. Rôm Rốp luôn sẵn sàng chào đón những cộng sự phù hợp đồng hành trên chặng đường sắp tới.&quot;
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Họ và Tên *
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Nguyễn Văn A"
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
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="0901 234 567"
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Địa Chỉ Email *
                </label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Lĩnh Vực Quan Tâm *
                </label>
                <select
                  value={applicantRole}
                  onChange={(e) => setApplicantRole(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
                >
                  <option value="ecommerce">Nhân Viên Thương Mại Điện Tử</option>
                  <option value="production">Nhân Viên Sản Xuất & Đóng Gói</option>
                  <option value="sales">Nhân Viên Bán Hàng</option>
                  <option value="design">Nhân Viên Sáng Tạo & Thiết Kế</option>
                  <option value="finance">Nhân Viên Kiểm Toán</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Đường Dẫn CV / Portfolio (Google Drive / LinkedIn / Behance) *
              </label>
              <input
                type="url"
                value={applicantCvUrl}
                onChange={(e) => setApplicantCvUrl(e.target.value)}
                placeholder="https://drive.google.com/your-cv-link..."
                required
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Giới Thiệu Đôi Nét Về Bản Thân & Vị Snack Bạn Thích Rôm Rốp?
              </label>
              <textarea
                rows={3}
                value={applicantIntro}
                onChange={(e) => setApplicantIntro(e.target.value)}
                placeholder="Chia sẻ với chúng tôi về vị snack yêu thích hoặc dự án bạn tự hào nhất..."
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded-sm border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="terms" className="text-xs text-stone-500">
                Tôi đồng ý chia sẻ thông tin ứng tuyển theo chính sách bảo mật của Rôm Rốp.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !agreeTerms}
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-heading font-black text-sm rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Đang nộp...' : 'Gửi Hồ Sơ Ứng Tuyển Nhanh 🚀'}</span>
            </button>
          </form>

          {/* Official work premises info */}
          <div className="p-4 bg-stone-50 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
            <span className="font-bold text-stone-800 dark:text-stone-200 block">
              🏢 CƠ SỞ LÀM VIỆC CHÍNH THỨC
            </span>
            <p className="text-stone-600 dark:text-stone-400">
              📍 <strong>Cơ sở TP.HCM:</strong> Hoàng Diệu 2, Phường Linh Chiểu, TP. Thủ Đức, TP.HCM
            </p>
            <p className="text-stone-600 dark:text-stone-400">
              📍 <strong>Cơ sở Hà Nội:</strong> Phố Đại Linh, Phường Trung Văn, Quận Nam Từ Liêm, Hà Nội
            </p>
            <p className="text-stone-500 text-[11px] pt-1 border-t border-stone-200 dark:border-stone-700">
              ✉️ Email tiếp nhận hồ sơ: <strong>tuyendung@romropsnack.vn</strong>
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
