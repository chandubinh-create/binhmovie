
import React, { useEffect, useState, useCallback } from 'react';
import { fetchNewUpdates, fetchListByType, getImageUrl } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import SmartImage from '../components/SmartImage';
import { Play, Info, TrendingUp, Sparkles, Tv, Clapperboard, RotateCcw, Download, Apple, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroSkeleton, MovieCardSkeleton } from '../components/Skeleton';
import { Logo } from '../App';

const MovieSection = ({ title, movies, link, icon: Icon }: { title: string, movies: Movie[], link: string, icon: any }) => (
  <section className="space-y-4 md:space-y-8">
    <div className="flex items-center justify-between px-4 md:px-0">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-1 md:w-1.5 h-4 md:h-10 bg-[#FFD700] rounded-full shadow-[0_0_15px_rgba(255,215,0,0.4)]"></div>
        <h2 className="text-[14px] md:text-4xl font-black uppercase tracking-tighter flex items-center gap-2 md:gap-3">
          <Icon className="w-4 h-4 md:w-8 md:h-8 text-[#FFD700]" />
          {title}
        </h2>
      </div>
      <Link to={link} className="text-[8px] md:text-sm font-black text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20 px-3 py-1 md:px-5 md:py-2 rounded-full uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all active:scale-95">
        Xem hết
      </Link>
    </div>
    
    <div className="flex md:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 overflow-x-auto no-scrollbar gap-2.5 md:gap-6 px-4 md:px-0 scroll-smooth pb-4">
      {movies.map(movie => (
        <div key={movie._id} className="min-w-[100px] sm:min-w-[120px] md:min-w-0 flex-shrink-0">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  </section>
);

const Home: React.FC<{ openDownload?: () => void }> = ({ openDownload }) => {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [seriesMovies, setSeriesMovies] = useState<Movie[]>([]);
  const [singleMovies, setSingleMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(false);
    const loader = document.getElementById('loading-bar');
    if (loader) loader.style.width = '30%';

    try {
      const [recentData, seriesData, singlesData] = await Promise.all([
        fetchNewUpdates(1),
        fetchListByType('phim-bo', 1),
        fetchListByType('phim-le', 1),
      ]);
      
      const seenIds = new Set<string>();

      const recent = (recentData.items || []).slice(0, 14);
      recent.forEach((m: Movie) => seenIds.add(m._id));

      const series = (seriesData.data?.items || [])
        .filter((m: Movie) => !seenIds.has(m._id))
        .slice(0, 14);
      series.forEach((m: Movie) => seenIds.add(m._id));

      const singles = (singlesData.data?.items || [])
        .filter((m: Movie) => !seenIds.has(m._id))
        .slice(0, 14);

      if (loader) loader.style.width = '70%';
      
      setNewMovies(recent);
      setSeriesMovies(series);
      setSingleMovies(singles);
      
      if (loader) loader.style.width = '100%';
    } catch (error) {
      console.error("Error loading home data:", error);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => { if (loader) loader.style.width = '0%'; }, 500);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) {
    return (
      <div className="space-y-12 pb-20">
        <HeroSkeleton />
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6">
          {[...Array(12)].map((_, i) => <MovieCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6 gap-6">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-gray-500">
          <RotateCcw className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-black uppercase tracking-tighter">Lỗi tải dữ liệu</h2>
          <button onClick={loadData} className="bg-[#FFD700] text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-transform">Thử lại ngay</button>
        </div>
      </div>
    );
  }

  const featured = newMovies[0];
  const heroImg = featured ? getImageUrl(featured.poster_url, 1200, 95) : '';

  return (
    <div className="space-y-10 md:space-y-24 pb-20 animate-in fade-in duration-1000">
      {featured && (
        <section className="relative h-[45vh] md:h-[90vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage 
              src={heroImg} 
              alt={featured.name}
              className="w-full h-full scale-100"
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-10 md:bottom-[15%] left-4 md:left-16 max-w-4xl space-y-4 md:space-y-10 z-10">
            <div className="space-y-2 md:space-y-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
                 <span className="bg-[#FFD700] text-black px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-sm font-black tracking-widest uppercase flex items-center gap-1.5 shadow-2xl shadow-[#FFD700]/30">
                    <TrendingUp className="w-2.5 h-2.5 md:w-4 md:h-4" /> TRENDING
                 </span>
                 <span className="text-white/70 text-[8px] md:text-sm font-bold uppercase tracking-widest">{featured.year} • {featured.quality} • {featured.lang}</span>
                 <span className="flex items-center gap-1 text-blue-400 text-[8px] md:text-xs font-black uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 fill-current" /> Verified
                 </span>
              </div>
              <h1 className="text-2xl md:text-8xl lg:text-9xl font-black leading-[0.9] uppercase tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {featured.name}
              </h1>
              <p className="text-gray-400 text-[9px] md:text-2xl line-clamp-2 font-bold opacity-80 max-w-2xl mx-auto md:mx-0 uppercase tracking-tighter leading-tight">
                {featured.origin_name} - Khám phá ngay trên nền tảng Bình VietSub chính thức.
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-6">
              <Link 
                to={`/phim/${featured.slug}`}
                className="bg-[#FFD700] text-black px-6 md:px-16 py-2.5 md:py-6 rounded-xl md:rounded-3xl font-black text-[9px] md:text-lg uppercase tracking-[0.1em] flex items-center gap-2 md:gap-3 shadow-[0_15px_40px_rgba(255,215,0,0.3)] active:scale-95 transition-all"
              >
                <Play className="w-3 h-3 md:w-6 md:h-6 fill-current" /> XEM NGAY
              </Link>
              <button 
                onClick={openDownload}
                className="bg-white/5 backdrop-blur-3xl px-6 md:px-16 py-2.5 md:py-6 rounded-xl md:rounded-3xl font-black text-[9px] md:text-lg uppercase tracking-[0.1em] flex items-center gap-2 md:gap-3 border border-white/10 active:scale-95 text-white hover:bg-white/10 transition-all"
              >
                <Download className="w-3 h-3 md:w-6 md:h-6" /> TẢI APP
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-[1440px] mx-auto space-y-12 md:space-y-32 md:px-8">
        <MovieSection title="Mới cập nhật" movies={newMovies} link="/tim-kiem?type=phim-moi" icon={Sparkles} />
        
        {/* Play Store Promo Section */}
        <section className="bg-gradient-to-br from-[#0a2e5c] via-[#050505] to-[#050505] p-6 md:p-20 rounded-[2rem] md:rounded-[5rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 mx-4 md:mx-0 shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFD700]/5 blur-[150px] rounded-full group-hover:bg-[#FFD700]/10 transition-all duration-1000"></div>
           
           <div className="space-y-6 md:space-y-10 text-center md:text-left z-10 flex-grow">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="w-5 h-5 md:w-8 md:h-8" alt="Play" />
                 <span className="text-[10px] md:text-lg font-black text-gray-400 uppercase tracking-[0.3em]">Official Store App</span>
              </div>
              <h3 className="text-2xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">TRẢI NGHIỆM APP <br/><span className="text-[#FFD700]">MƯỢT MÀ HƠN</span></h3>
              <p className="text-gray-400 font-bold max-w-xl text-[10px] md:text-xl leading-relaxed uppercase tracking-tight opacity-70">
                 Tải ứng dụng Bình VietSub CC trên Store để nhận tốc độ tải phim 4K X10 lần, lưu phim ngoại tuyến và không còn quảng cáo làm phiền.
              </p>
              <div className="flex flex-col md:flex-row items-center gap-5 pt-4">
                 <button onClick={openDownload} className="active:scale-95 transition-transform">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                      className="h-12 md:h-20 shadow-2xl" 
                      alt="CH Play" 
                    />
                 </button>
                 <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-green-500" />
                    <div className="flex flex-col items-start leading-none">
                       <span className="text-[9px] md:text-xs font-black uppercase text-white">Google Play Protect</span>
                       <span className="text-[7px] md:text-[9px] font-bold text-gray-500 uppercase">Verified Security</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="relative group/logo scale-90 md:scale-125 hidden lg:block z-10 shrink-0">
              <div className="absolute inset-0 bg-[#FFD700]/10 blur-[80px] opacity-0 group-hover/logo:opacity-30 transition-all duration-700"></div>
              <div className="relative z-10 bg-white/5 p-12 rounded-[3rem] border border-white/10 backdrop-blur-sm rotate-[-4deg] group-hover/logo:rotate-0 transition-transform duration-700">
                 <Logo className="scale-[1.5]" />
                 <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-center gap-6">
                    <div className="text-center">
                       <p className="text-2xl font-black text-white">5M+</p>
                       <p className="text-[8px] font-bold text-gray-500 uppercase">Downloads</p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div className="text-center">
                       <p className="text-2xl font-black text-[#FFD700]">4.9★</p>
                       <p className="text-[8px] font-bold text-gray-500 uppercase">Rating</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <MovieSection title="Phim bộ hot" movies={seriesMovies} link="/tim-kiem?type=phim-bo" icon={Tv} />
        <MovieSection title="Phim lẻ đề cử" movies={singleMovies} link="/tim-kiem?type=phim-le" icon={Clapperboard} />
      </div>
    </div>
  );
};

export default Home;
