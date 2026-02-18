
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, fetchListByType } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import { Loader2, Search as SearchIcon, Filter } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const type = searchParams.get('type');
  const category = searchParams.get('category');
  
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (query) {
          data = await searchMovies(query, page);
          const items = data.data.items || [];
          setResults(page === 1 ? items : [...results, ...items]);
          setHasMore(data.data.params.pagination.currentPage < data.data.params.pagination.totalPages);
        } else if (type) {
          data = await fetchListByType(type, page);
          const items = data.data.items || [];
          setResults(page === 1 ? items : [...results, ...items]);
          setHasMore(data.data.params.pagination.currentPage < data.data.params.pagination.totalPages);
        } else if (category) {
          data = await searchMovies(category, page);
          const items = data.data.items || [];
          setResults(page === 1 ? items : [...results, ...items]);
          setHasMore(data.data.params.pagination.currentPage < data.data.params.pagination.totalPages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, type, category, page]);

  const getTitle = () => {
    if (query) return `Kết quả: "${query}"`;
    if (type === 'phim-bo') return 'Phim Bộ Mới';
    if (type === 'phim-le') return 'Phim Lẻ Mới';
    if (type === 'hoat-hinh') return 'Anime';
    if (category) return `Thể Loại: ${category.replace('-', ' ').toUpperCase()}`;
    return 'Tất cả phim';
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-20 pt-12 md:pt-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-6 md:py-12">
        <div className="space-y-0.5">
           <h1 className="text-lg md:text-3xl font-black uppercase tracking-tight border-l-3 border-[#FFD700] pl-2.5 md:pl-4">{getTitle()}</h1>
           <p className="text-gray-500 text-[8px] md:text-sm font-medium uppercase tracking-widest">Bình Vietsub CC - Cinema App</p>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all text-[8px] md:text-sm font-bold">
              <Filter className="w-3 h-3 md:w-4 md:h-4" /> Lọc phim
           </button>
        </div>
      </div>

      {loading && page === 1 ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 md:w-10 text-[#FFD700] animate-spin" />
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-8 md:space-y-12">
           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-6">
            {results.map((movie, idx) => (
              <MovieCard key={`${movie._id}-${idx}`} movie={movie} />
            ))}
          </div>

          {hasMore && (
             <div className="flex justify-center pb-12">
                <button 
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                  className="bg-[#FFD700] text-black hover:bg-yellow-500 px-8 md:px-12 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-sm uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-[#FFD700]/20 disabled:opacity-50"
                >
                   {loading ? 'Đang tải...' : 'Xem thêm'}
                </button>
             </div>
          )}
        </div>
      ) : (
        <div className="h-[40vh] flex flex-col items-center justify-center text-center">
           <SearchIcon className="w-10 h-10 md:w-16 md:h-16 text-white/10 mb-3" />
           <p className="text-[10px] md:text-xl text-gray-500 font-bold uppercase tracking-widest">Không tìm thấy phim.</p>
           <button onClick={() => window.history.back()} className="mt-3 text-[#FFD700] text-[8px] font-black uppercase tracking-widest hover:underline">Quay lại</button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
