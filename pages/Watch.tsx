
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchMovieDetail } from '../services/api';
import { MovieDetail, HistoryItem, Comment } from '../types';
import { ChevronLeft, Info, List, SkipForward, Star, MessageCircle, AlertCircle, Loader2, Send, ThumbsUp, Trash2, RefreshCcw } from 'lucide-react';

const CommentsSection = ({ movieSlug }: { movieSlug: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments_${movieSlug}`) || '[]');
    setComments(savedComments);
  }, [movieSlug]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      movieSlug,
      userName: 'Khách Xem Phim',
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      content: newComment,
      timestamp: Date.now(),
      likes: 0
    };

    setTimeout(() => {
      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`comments_${movieSlug}`, JSON.stringify(updatedComments));
      setNewComment('');
      setIsSubmitting(false);
    }, 600);
  };

  const handleLike = (id: string) => {
    const updated = comments.map(c => {
      if (c.id === id) {
        return { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked };
      }
      return c;
    });
    setComments(updated);
    localStorage.setItem(`comments_${movieSlug}`, JSON.stringify(updated));
  };

  const deleteComment = (id: string) => {
    const updated = comments.filter(c => c.id !== id);
    setComments(updated);
    localStorage.setItem(`comments_${movieSlug}`, JSON.stringify(updated));
  };

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h4 className="font-bold flex items-center gap-2 text-lg uppercase tracking-wider">
          <MessageCircle className="w-5 h-5 text-red-500" /> Thảo luận ({comments.length})
        </h4>
      </div>

      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0 font-black text-sm shadow-lg shadow-red-600/20">
          B
        </div>
        <form onSubmit={handlePostComment} className="flex-grow space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Chia sẻ cảm nghĩ của bạn về bộ phim..."
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-sm focus:border-red-600 focus:outline-none transition-all min-h-[100px] resize-none placeholder:text-gray-600"
          />
          <div className="flex justify-end">
            <button
              disabled={isSubmitting || !newComment.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-xl shadow-red-600/20"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Gửi bình luận
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group animate-in fade-in duration-300">
              <img src={comment.userAvatar} alt="avatar" className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
              <div className="flex-grow space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white hover:text-red-500 transition-colors cursor-pointer">{comment.userName}</span>
                  <span className="text-[10px] text-gray-500 font-medium">• {formatTime(comment.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed bg-white/5 p-3 rounded-xl rounded-tl-none border border-white/5">
                  {comment.content}
                </p>
                <div className="flex items-center gap-6 mt-2 px-1">
                  <button 
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${comment.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${comment.isLiked ? 'fill-current' : ''}`} /> {comment.likes || ''} Thích
                  </button>
                  <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">
                    Trả lời
                  </button>
                  <button 
                    onClick={() => deleteComment(comment.id)}
                    className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/5 p-12 rounded-3xl text-center border border-dashed border-white/10">
            <p className="text-gray-500 italic">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Watch: React.FC = () => {
  const { slug, episodeSlug } = useParams<{ slug: string; episodeSlug: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playerKey, setPlayerKey] = useState(0); // For refreshing player

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchMovieDetail(slug)
        .then(data => {
          if (data.movie) {
            const movieData = { ...data.movie, episodes: data.episodes };
            setMovie(movieData);
            
            let ep = null;
            movieData.episodes.forEach((server: any) => {
              const found = server.server_data.find((e: any) => e.slug === episodeSlug);
              if (found) ep = found;
            });
            setCurrentEpisode(ep);

            const history: HistoryItem[] = JSON.parse(localStorage.getItem('phim_history') || '[]');
            const updated = history.filter(h => h.slug !== slug);
            updated.unshift({
              slug: movieData.slug,
              name: movieData.name,
              poster: movieData.thumb_url,
              episodeName: ep?.name || 'Full',
              episodeSlug: ep?.slug || '',
              timestamp: Date.now(),
              progress: 0,
              duration: 0
            });
            localStorage.setItem('phim_history', JSON.stringify(updated.slice(0, 20)));
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug, episodeSlug]);

  const refreshPlayer = () => {
    setPlayerKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
          <p className="text-gray-500 font-bold animate-pulse">ĐANG TỐI ƯU LUỒNG PHÁT...</p>
        </div>
      </div>
    );
  }

  if (!movie || !currentEpisode) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-red-600 mb-4" />
        <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Lỗi tải dữ liệu</h2>
        <Link to="/" className="bg-red-600 px-8 py-3 rounded-full font-black shadow-xl">QUAY VỀ TRANG CHỦ</Link>
      </div>
    );
  }

  const handleNextEpisode = () => {
    const serverData = movie.episodes[0].server_data;
    const currentIndex = serverData.findIndex(ep => ep.slug === episodeSlug);
    if (currentIndex < serverData.length - 1) {
      const nextEp = serverData[currentIndex + 1];
      navigate(`/xem-phim/${movie.slug}/${nextEp.slug}`);
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen animate-in fade-in duration-700">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-4 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
           <Link to={`/phim/${movie.slug}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Thông tin phim
           </Link>
           <div className="flex items-center gap-6">
              <span className="text-red-500 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">{currentEpisode.name}</span>
              <button onClick={refreshPlayer} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                 <RefreshCcw className="w-4 h-4" /> Làm mới trình phát
              </button>
           </div>
        </div>

        <div className="relative aspect-video bg-black shadow-2xl border-y border-white/5">
          <iframe
            key={playerKey}
            src={currentEpisode.link_embed}
            className="w-full h-full border-0"
            allowFullScreen
            title={movie.name}
          />
        </div>

        <div className="bg-[#111] p-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/5">
          <div className="flex items-center gap-4">
             <button 
                onClick={handleNextEpisode}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-black flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-red-600/20 text-xs"
             >
                <SkipForward className="w-4 h-4 fill-current" /> TẬP TIẾP THEO
             </button>
             <button className="bg-white/5 hover:bg-white/10 p-2.5 rounded-lg transition-colors border border-white/10">
                <Star className="w-5 h-5" />
             </button>
          </div>
          <div className="text-xs font-bold tracking-widest text-gray-500 flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             MẠNG LƯỚI ỔN ĐỊNH: <span className="text-white">MAX SPEED</span>
          </div>
        </div>

        <div className="px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
          <div className="flex-grow space-y-8">
            <div className="pb-8 border-b border-white/5">
              <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">{movie.name}</h1>
              <p className="text-gray-500 font-bold text-sm tracking-wide uppercase italic">{movie.origin_name} • {movie.year} • {movie.quality}</p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 shadow-2xl">
               <h4 className="font-black flex items-center gap-2 mb-4 text-lg uppercase tracking-tighter">
                  <Info className="w-5 h-5 text-red-500" /> Nội dung chính
               </h4>
               <p className="text-sm text-gray-400 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: movie.content }} />
            </div>

            <CommentsSection movieSlug={movie.slug} />
          </div>

          <div className="w-full lg:w-[400px] space-y-8 shrink-0">
             <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                   <h4 className="font-black flex items-center gap-2 uppercase tracking-tighter">
                      <List className="w-5 h-5 text-red-500" /> Danh sách tập
                   </h4>
                   <span className="text-[10px] font-bold text-gray-500 bg-black/40 px-2 py-1 rounded-full">{movie.episodes[0].server_data.length} TẬP</span>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-red-600">
                   <div className="grid grid-cols-4 gap-2">
                      {movie.episodes[0].server_data.map((ep, idx) => (
                         <Link
                            key={idx}
                            to={`/xem-phim/${movie.slug}/${ep.slug}`}
                            className={`py-2 text-center rounded-lg text-xs font-black transition-all border ${
                               episodeSlug === ep.slug 
                               ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30' 
                               : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10 hover:text-white'
                            }`}
                         >
                            {ep.name}
                         </Link>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-600/30 p-6 rounded-2xl">
                <h5 className="font-black text-red-500 mb-2 uppercase text-sm tracking-widest">Gợi ý trải nghiệm</h5>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                   Sử dụng trình duyệt Chrome hoặc Edge để đạt được tốc độ tải phim tốt nhất. 
                   Nếu gặp hiện tượng giật lag, hãy bấm nút "Làm mới trình phát" ở góc trên.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
