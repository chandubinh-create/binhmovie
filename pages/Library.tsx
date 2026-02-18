
import React, { useState, useEffect } from 'react';
import { HistoryItem } from '../types';
import { Link } from 'react-router-dom';
import { Clock, Play, Trash2, ChevronRight, Bookmark } from 'lucide-react';
import { getImageUrl } from '../services/api';

const Library: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'bookmarks'>('history');

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('phim_history') || '[]');
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('phim_history');
    setHistory([]);
  };

  const removeHistoryItem = (slug: string) => {
    const updated = history.filter(item => item.slug !== slug);
    localStorage.setItem('phim_history', JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Thư viện của bạn</h1>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
           <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
           >
              Lịch sử xem
           </button>
           <button 
              onClick={() => setActiveTab('bookmarks')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'bookmarks' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
           >
              Danh sách lưu
           </button>
        </div>
      </div>

      {activeTab === 'history' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" /> Vừa xem gần đây
             </h2>
             {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Xóa tất cả
                </button>
             )}
          </div>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {history.map((item) => (
                <div key={item.slug} className="group relative bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all shadow-xl">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={getImageUrl(item.poster)} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Link 
                          to={`/xem-phim/${item.slug}/${item.episodeSlug}`}
                          className="bg-red-600 p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform"
                        >
                          <Play className="w-5 h-5 fill-current" />
                       </Link>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm truncate mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                       <span className="bg-white/10 px-1.5 py-0.5 rounded text-red-400 font-bold uppercase tracking-widest">Tập {item.episodeName}</span>
                       <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                    <button 
                      onClick={() => removeHistoryItem(item.slug)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                    >
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-white/5 rounded-3xl border border-dashed border-white/10">
               <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-gray-500" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-1">Lịch sử trống</h3>
                  <p className="text-gray-500 text-sm">Bạn chưa xem bộ phim nào gần đây.</p>
               </div>
               <Link to="/" className="inline-block bg-red-600 px-8 py-2 rounded-full font-bold hover:bg-red-700 transition-colors">Khám phá phim mới</Link>
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white/5 rounded-3xl border border-dashed border-white/10">
           <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <Bookmark className="w-8 h-8 text-gray-500" />
           </div>
           <div>
              <h3 className="text-xl font-bold mb-1">Danh sách lưu trống</h3>
              <p className="text-gray-500 text-sm">Lưu lại những bộ phim yêu thích để xem sau.</p>
           </div>
           <Link to="/" className="inline-block bg-red-600 px-8 py-2 rounded-full font-bold">Tìm kiếm ngay</Link>
        </div>
      )}
    </div>
  );
};

export default Library;
