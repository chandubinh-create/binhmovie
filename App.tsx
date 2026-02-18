
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, History, Bookmark, Menu, X, Play, Info, 
  ChevronRight, ChevronLeft, Star, Facebook, Twitter, 
  Send as SendIcon, Globe, ShieldCheck, Mail, ChevronDown, ArrowLeft,
  Home as HomeIcon, Library as LibraryIcon, Film, Clapperboard, Tv,
  Download, Smartphone, Apple, Chrome, Share, CheckCircle2, ShieldAlert,
  Instagram, Youtube, MessageSquare, Zap, Shield, Heart, ZapOff, Activity
} from 'lucide-react';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Watch from './pages/Watch';
import SearchResults from './pages/SearchResults';
import Library from './pages/Library';

// Logo Component - Stylized to match the provided image
export const Logo = ({ className = "scale-100" }: { className?: string }) => (
  <div className={`flex flex-col items-start select-none transition-transform active:scale-95 duration-300 relative ${className}`}>
    <div className="flex items-end gap-0.5 relative z-10">
      <span className="text-2xl md:text-5xl font-black italic text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tighter" style={{ fontFamily: 'system-ui' }}>Bình</span>
      <div className="flex flex-col items-start -ml-1">
        <div className="flex items-center gap-1">
          <span className="text-2xl md:text-5xl font-extrabold text-[#FFD700] uppercase tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'system-ui' }}>VietSub</span>
          <span className="bg-white text-black text-[8px] md:text-[12px] px-1.5 py-0.5 font-black rounded border-2 border-black mb-1 md:mb-2">CC</span>
        </div>
      </div>
      <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-transparent opacity-80 rounded-full"></div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 pt-20 md:pt-32 pb-28 md:pb-12 mt-20 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent"></div>
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
      <div className="space-y-8">
        <Logo className="scale-[0.8] origin-left" />
        <p className="text-gray-500 text-[10px] md:text-xs font-medium leading-relaxed uppercase tracking-tighter">
          BÌNH VIETSUB CC - Ứng dụng xem phim giải trí đa nền tảng chất lượng 4K. Chúng tôi cam kết mang đến trải nghiệm điện ảnh đỉnh cao hoàn toàn miễn phí cho người Việt.
        </p>
        <div className="flex items-center gap-3">
          <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-[#FFD700] hover:text-black transition-all group"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-[#FFD700] hover:text-black transition-all group"><SendIcon className="w-4 h-4" /></a>
          <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-[#FFD700] hover:text-black transition-all group"><Youtube className="w-4 h-4" /></a>
          <a href="#" className="p-2.5 bg-white/5 rounded-xl hover:bg-[#FFD700] hover:text-black transition-all group"><Instagram className="w-4 h-4" /></a>
        </div>
      </div>
      <div className="space-y-6">
        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2 border-l-2 border-[#FFD700] pl-3">Khám phá</h4>
        <ul className="space-y-3 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
          <li><Link to="/tim-kiem?type=phim-bo" className="hover:text-[#FFD700] transition-colors">● Phim Bộ Mới</Link></li>
          <li><Link to="/tim-kiem?type=phim-le" className="hover:text-[#FFD700] transition-colors">● Phim Lẻ Chiếu Rạp</Link></li>
          <li><Link to="/tim-kiem?type=hoat-hinh" className="hover:text-[#FFD700] transition-colors">● Anime Vietsub HD</Link></li>
          <li><Link to="/thu-vien" className="hover:text-[#FFD700] transition-colors">● Thư Viện</Link></li>
        </ul>
      </div>
      <div className="space-y-6">
        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2 border-l-2 border-[#FFD700] pl-3">Pháp lý</h4>
        <ul className="space-y-3 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
          <li><a href="#" className="hover:text-[#FFD700] transition-colors">Điều khoản</a></li>
          <li><a href="#" className="hover:text-[#FFD700] transition-colors">Bảo mật</a></li>
          <li><a href="#" className="hover:text-[#FFD700] transition-colors">Bản quyền</a></li>
          <li><a href="#" className="hover:text-[#FFD700] transition-colors">Liên hệ</a></li>
        </ul>
      </div>
      <div className="space-y-8">
        <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2 border-l-2 border-[#FFD700] pl-3">App Chính Thức</h4>
        <div className="space-y-3">
          <a href="https://play.google.com" target="_blank" className="block active:scale-95 transition-transform">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-11 md:h-14" alt="Play Store" />
          </a>
          <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/10 rounded-2xl">
             <ShieldCheck className="w-6 h-6 text-green-500" />
             <div className="flex flex-col leading-none">
                <span className="text-[9px] font-black text-white uppercase">Verified Secure</span>
                <span className="text-[7px] font-bold text-gray-500 uppercase">Google Play Protect</span>
             </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="px-2.5 py-1 border border-white/10 rounded-lg text-[8px] font-black text-gray-500 uppercase">DMCA PROTECTED</div>
          <div className="px-2.5 py-1 border border-white/10 rounded-lg text-[8px] font-black text-gray-500 uppercase">SSL SECURE</div>
          <div className="px-2.5 py-1 border border-[#FFD700]/30 rounded-lg text-[8px] font-black text-[#FFD700]/60 uppercase">FAMILY SAFE</div>
        </div>
      </div>
    </div>
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
       <div className="flex items-center gap-4">
          <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">© 2024 BINHVIETSUB.CC</span>
       </div>
       <div className="bg-[#FFD700]/10 border border-[#FFD700]/20 px-4 py-1.5 rounded-full">
          <span className="text-[9px] font-black text-[#FFD700] uppercase tracking-[0.2em]">App Version 2.2.0 (Stable)</span>
       </div>
    </div>
  </footer>
);

const FloatingDownloadButton = ({ onClick }: { onClick: () => void }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={onClick} className="fixed bottom-20 md:bottom-10 right-4 md:right-12 z-[55] bg-[#FFD700] text-black p-4 rounded-2xl shadow-[0_15px_45px_rgba(255,215,0,0.4)] flex items-center gap-3 hover:scale-110 active:scale-95 transition-all animate-in slide-in-from-right">
      <div className="bg-black text-white p-1.5 rounded-xl"><Download className="w-5 h-5" /></div>
      <div className="hidden md:flex flex-col items-start leading-none">
         <span className="text-[8px] font-black uppercase opacity-60">Install now</span>
         <span className="text-xs font-black uppercase tracking-tighter">Bình VietSub CC</span>
      </div>
    </button>
  );
};

const SplashScreen = () => (
  <div className="fixed inset-0 bg-[#050505] z-[9999] flex flex-col items-center justify-center gap-10 animate-out fade-out fill-mode-forwards duration-1000 delay-1500">
    <Logo className="scale-[1.4] md:scale-[2.2] animate-pulse" />
    <div className="flex flex-col items-center gap-4">
      <div className="w-56 h-1 bg-white/5 rounded-full overflow-hidden relative">
        <div className="absolute inset-0 bg-[#FFD700] animate-[shimmer_1.5s_infinite_linear] bg-[length:200%_100%] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
      </div>
      <p className="text-[11px] font-black text-[#FFD700] uppercase tracking-[0.6em] animate-pulse">CINEMA PLATFORM</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    
    // Logic xử lý nút Back trên Android cho Native App
    const handleBackButton = () => {
      if (window.location.hash === '#/') {
        // Nếu ở trang chủ, có thể hiển thị thông báo "Bấm lần nữa để thoát" 
        // hoặc gọi phương thức native của Capacitor
        console.log("Back at home");
      } else {
        window.history.back();
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      {showSplash && <SplashScreen />}
      <FloatingDownloadButton onClick={() => setIsDownloadOpen(true)} />
      
      <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#FFD700]/40 selection:text-white">
        <Navbar openDownload={() => setIsDownloadOpen(true)} />
        <main className="flex-grow pt-0 md:pt-4">
          <Routes>
            <Route path="/" element={<Home openDownload={() => setIsDownloadOpen(true)} />} />
            <Route path="/phim/:slug" element={<MovieDetails />} />
            <Route path="/xem-phim/:slug/:episodeSlug" element={<Watch />} />
            <Route path="/tim-kiem" element={<SearchResults />} />
            <Route path="/thu-vien" element={<Library />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav openDownload={() => setIsDownloadOpen(true)} />
      </div>
    </HashRouter>
  );
};

const Navbar = ({ openDownload }: { openDownload: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-[#050505]/98 backdrop-blur-3xl border-b border-white/5 py-1.5 md:py-3' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-3 md:py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
        <Link to="/"><Logo className="scale-[0.5] md:scale-[0.9] origin-left" /></Link>
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em] ml-16">
          <Link to="/" className={`transition-all hover:text-[#FFD700] ${location.pathname === '/' ? 'text-[#FFD700]' : 'text-gray-400'}`}>TRANG CHỦ</Link>
          <Link to="/tim-kiem?type=phim-bo" className="text-gray-400 hover:text-[#FFD700]">PHIM BỘ</Link>
          <Link to="/tim-kiem?type=phim-le" className="text-gray-400 hover:text-[#FFD700]">PHIM LẺ</Link>
          <button onClick={openDownload} className="bg-[#FFD700] text-black px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-all">
            <Download className="w-3.5 h-3.5" /> TẢI APP
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/tim-kiem" className="p-3 bg-white/5 border border-white/10 rounded-2xl"><Search className="w-5.5 h-5.5" /></Link>
          <Link to="/thu-vien" className="p-3 bg-white/5 border border-white/10 rounded-2xl"><History className="w-5.5 h-5.5" /></Link>
        </div>
      </div>
    </nav>
  );
};

const BottomNav = ({ openDownload }: { openDownload: () => void }) => {
  const location = useLocation();
  return (
    <div className="lg:hidden fixed bottom-0 w-full z-[60] bg-[#050505]/98 backdrop-blur-3xl border-t border-white/5 pb-safe">
      <div className="flex items-center justify-around h-18">
        <Link to="/" className={`flex flex-col items-center gap-1.5 w-1/4 ${location.pathname === '/' ? 'text-[#FFD700]' : 'text-gray-500'}`}><HomeIcon className="w-5.5 h-5.5" /><span className="text-[9px] font-black uppercase">Trang chủ</span></Link>
        <Link to="/tim-kiem?type=phim-bo" className="flex flex-col items-center gap-1.5 w-1/4 text-gray-500"><Tv className="w-5.5 h-5.5" /><span className="text-[9px] font-black uppercase">Phim Bộ</span></Link>
        <button onClick={openDownload} className="flex flex-col items-center gap-1.5 w-1/4 text-[#FFD700]"><Download className="w-5.5 h-5.5" /><span className="text-[9px] font-black uppercase">Tải App</span></button>
        <Link to="/thu-vien" className="flex flex-col items-center gap-1.5 w-1/4 text-gray-500"><LibraryIcon className="w-5.5 h-5.5" /><span className="text-[9px] font-black uppercase">Tủ Phim</span></Link>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

export default App;
