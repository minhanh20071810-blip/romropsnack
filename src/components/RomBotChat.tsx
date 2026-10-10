import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Headphones, 
  Plus, 
  Check, 
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import { Product, ChatMessage } from '../types';
import { PRODUCTS, ASSET_IMAGES } from '../data/mockData';

interface RomBotChatProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (page: string) => void;
  playCrunch: () => void;
}

export const RomBotChat: React.FC<RomBotChatProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onNavigate,
  playCrunch,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Chào bạn! Mình là Rôm Bot 🤖✨ Trợ lý thông minh độc quyền của Rôm Rốp Snack. Bạn cần tìm hương vị giòn rụm hợp tâm trạng, kiểm tra đơn hàng hay hỏi thông tin khuyến mãi cứ nhắn mình ngay nhé!',
      timestamp: 'Vừa xong',
    },
    {
      id: '2',
      sender: 'user',
      text: 'Mình thích ăn cay vừa và xem phim khuya thì ăn vị nào hợp bạn ơi? 🍿',
      timestamp: '14:02',
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Gu xem phim đêm cày series mà thích cay vừa thì đúng bài luôn nè! Rôm Bot gợi ý bạn 2 lựa chọn giòn bùi cực cuốn:',
      timestamp: '14:03',
      suggestedProductIds: ['basic-cheese-egg', 'halloween-pumpkin'],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickChips = [
    { label: 'Gặp tư vấn viên 🎧', action: 'human_support' },
    { label: 'Gợi ý snack xem phim 🎬', action: 'movie_snack' },
    { label: 'Tra cứu đơn hàng 📦', action: 'order_status' },
    { label: 'Tìm điểm bán gần nhất 📍', action: 'find_store' },
    { label: 'Chính sách đổi trả 🛡️', action: 'return_policy' },
  ];

  const handleSelectChip = (chip: { label: string; action: string }) => {
    handleSendMessage(chip.label, chip.action);
  };

  const handleSendMessage = (textToSend?: string, specialAction?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: ChatMessage;

      if (specialAction === 'human_support' || text.toLowerCase().includes('tư vấn viên') || text.toLowerCase().includes('người thật') || text.toLowerCase().includes('cskh')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          agentName: 'Mai Phương',
          text: 'Dạ em chào anh/chị ạ! Em là Phương từ đội ngũ Chăm sóc khách hàng Rôm Rốp Snack. Em đã xem qua thông tin tư vấn từ Rôm Bot, em có thể hỗ trợ kiểm tra đơn hàng hoặc gợi ý gói combo ưu đãi Mua 2 Tặng 1 cho mình ngay nhé! 💛',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (specialAction === 'find_store' || text.toLowerCase().includes('điểm bán') || text.toLowerCase().includes('ở đâu')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Hiện Rôm Rốp có mặt tại các chi nhánh Flagship ở Thủ Đức (Hoàng Diệu 2), Hà Nội (Đại Linh - Trung Văn), Đà Nẵng và Cần Thơ, cùng hơn 2,000 cửa hàng tiện lợi trên toàn quốc! Bạn muốn ghé điểm nào để thử vị trực tiếp nè?',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (specialAction === 'order_status' || text.toLowerCase().includes('đơn hàng')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Để tra cứu đơn hàng, bạn chỉ cần nhập Mã đơn hàng (ví dụ: #RR-88924) hoặc số điện thoại đặt hàng. Đơn nội thành HCM & Hà Nội thường được giao siêu tốc chỉ trong 2 Giờ thôi nha!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (text.toLowerCase().includes('khuyến mãi') || text.toLowerCase().includes('ưu đãi') || text.toLowerCase().includes('mã')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Tin hot giòn tan! Rôm Rốp đang có chương trình: Mua 2 Tặng 1 (Tặng gói Nguyên Bản), Combo Chiến Thần Cày Phim giảm 15%, và mã GIOMOTTIENG giảm ngay 10.000đ + Freeship đó nha!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          suggestedProductIds: ['basic-original', 'regional-com-tam'],
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: `Dạ Rôm Bot đã nghe rõ gu của bạn! Nếu bạn thích trải nghiệm hương vị bùng nổ, mình rất recommend dòng Bộ Sưu Tập Vùng Miền (Bún Đậu Mắm Tôm, Bún Bò Huế, Cơm Tấm) hoặc siêu phẩm Halloween huyền bí đó ạ!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          suggestedProductIds: ['regional-bun-dau', 'halloween-dark-shadow'],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 700);
  };

  const handleAddSuggested = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      playCrunch();
      onAddToCart(prod, 1);
      setAddedIds((prev) => [...prev, productId]);
      setTimeout(() => {
        setAddedIds((prev) => prev.filter((id) => id !== productId));
      }, 1500);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: 'Chào bạn! Mình là Rôm Bot 🤖✨ Trợ lý thông minh độc quyền của Rôm Rốp Snack. Bạn cần tìm hương vị giòn rụm hợp tâm trạng, kiểm tra đơn hàng hay hỏi thông tin khuyến mãi cứ nhắn mình ngay nhé!',
        timestamp: 'Vừa xong',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Chat Window Container */}
      <div className="relative w-full sm:max-w-xl h-[92vh] sm:h-[680px] bg-white dark:bg-stone-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom duration-300">
        
        {/* Header Bar */}
        <div className="p-4 bg-linear-to-r from-amber-500 via-rose-500 to-rose-600 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-white p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={ASSET_IMAGES.rombotMascot} 
                alt="Rôm Bot AI" 
                className="w-full h-full object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-base text-white flex items-center gap-1.5">
                  Rôm Bot
                </h3>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full text-white">
                  AI SNACK HELPER
                </span>
              </div>
              <p className="text-[11px] text-amber-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Trực tuyến 24/7 · Sẵn sàng gợi ý vị giòn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSendMessage('Mình muốn gặp nhân viên CSKH hỗ trợ trực tiếp', 'human_support')}
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1.5 rounded-xl transition-colors"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Gặp CSKH</span>
            </button>
            <button
              onClick={handleResetChat}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
              title="Đoạn chat mới"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/70 dark:bg-stone-950/40">
          
          <div className="text-center my-1">
            <span className="text-[10px] font-bold text-stone-400 bg-white dark:bg-stone-800 px-3 py-1 rounded-full border border-stone-200/60 dark:border-stone-700 shadow-2xs">
              Hôm nay
            </span>
          </div>

          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end items-end gap-2">
                  <div className="max-w-[80%]">
                    <div className="bg-amber-600 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md text-xs sm:text-sm font-medium leading-relaxed">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-stone-400 block text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    BẠN
                  </div>
                </div>
              );
            }

            if (msg.sender === 'agent') {
              return (
                <div key={msg.id} className="space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 py-1.5 px-3 rounded-full border border-emerald-200 mx-auto w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Đã chuyển tiếp: Nhân viên {msg.agentName} (CSKH) đang sẵn sàng hỗ trợ
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      MP
                    </div>
                    <div className="max-w-[85%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-stone-800 dark:text-stone-200">
                          {msg.agentName}
                        </span>
                        <span className="text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 px-1.5 py-0.5 rounded-sm uppercase">
                          Tư vấn viên
                        </span>
                      </div>
                      <div className="bg-white dark:bg-stone-800 p-3.5 rounded-2xl rounded-tl-xs shadow-sm border border-stone-200/80 dark:border-stone-700 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard Bot message
            return (
              <div key={msg.id} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-rose-500 p-0.5 shrink-0 shadow-sm overflow-hidden">
                  <img 
                    src={ASSET_IMAGES.rombotMascot} 
                    alt="Rôm Bot" 
                    className="w-full h-full object-cover bg-white rounded-full" 
                  />
                </div>

                <div className="max-w-[85%] space-y-2">
                  <div className="bg-white dark:bg-stone-800 p-3.5 rounded-2xl rounded-tl-xs shadow-sm border border-stone-200/80 dark:border-stone-700 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                    {msg.text}

                    {/* Suggested product cards inside bot bubble */}
                    {msg.suggestedProductIds && msg.suggestedProductIds.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-stone-700">
                        {msg.suggestedProductIds.map((pId) => {
                          const p = PRODUCTS.find((item) => item.id === pId);
                          if (!p) return null;
                          const isAdded = addedIds.includes(p.id);

                          return (
                            <div 
                              key={p.id}
                              className="p-2.5 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 block">
                                  {p.tag}
                                </span>
                                <h6 className="font-heading font-black text-xs text-stone-900 dark:text-white truncate">
                                  {p.name}
                                </h6>
                                <p className="text-[11px] font-bold text-rose-600 tabular-nums">
                                  {p.price.toLocaleString('vi-VN')}đ
                                </p>
                              </div>

                              <button
                                onClick={() => handleAddSuggested(p.id)}
                                className={`mt-2 w-full py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
                                  isAdded
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Đã Thêm!</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3" />
                                    <span>+ Chọn Vị</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-stone-400 block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs italic">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
              <span>Rôm Bot đang soạn câu trả lời giòn tan...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[10px] font-bold text-stone-400 shrink-0">Gợi ý:</span>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectChip(chip)}
              className="text-[11px] font-bold whitespace-nowrap px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-rose-50 hover:text-rose-600 border border-stone-200/60 dark:border-stone-700 transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Hỏi Rôm Bot về vị snack, đặt hàng, mã giảm giá..."
              className="flex-1 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 dark:text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-2xl transition-all shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-center text-stone-400 mt-2">
            Rôm Bot có thể đưa ra gợi ý dựa trên sở thích snack của bạn. Thông tin chỉ mang tính tham khảo.
          </p>
        </div>
      </div>
    </div>
  );
};
