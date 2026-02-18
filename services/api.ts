
const BASE_URL = 'https://phimapi.com';

// Cache object to store API responses
const apiCache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 1000 * 60 * 10; 

const fetchWithCache = async (url: string) => {
  const now = Date.now();
  if (apiCache[url] && now - apiCache[url].timestamp < CACHE_TTL) {
    return apiCache[url].data;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    
    const data = await res.json();
    apiCache[url] = { data, timestamp: now };
    return data;
  } catch (error) {
    if (apiCache[url]) return apiCache[url].data;
    throw error;
  }
};

/**
 * Lấy URL ảnh đã được tối ưu qua Proxy
 * @param path Đường dẫn gốc
 * @param width Độ rộng mong muốn (để tối ưu băng thông)
 * @param quality Chất lượng ảnh (1-100)
 */
export const getImageUrl = (path: string, width: number = 400, quality: number = 80) => {
  if (!path) return 'https://placehold.co/400x600/111/ffd700?text=Binh+VietSub';
  
  let fullUrl = path;
  if (!path.startsWith('http')) {
    fullUrl = `https://phimimg.com/${path}`;
  }

  // Sử dụng images.weserv.nl làm proxy để nén ảnh siêu tốc
  // &we: WebP output
  // &w: Width
  // &q: Quality
  // &il: Interlaced (load mờ trước rõ sau)
  return `https://images.weserv.nl/?url=${encodeURIComponent(fullUrl)}&w=${width}&q=${quality}&output=webp&il`;
};

export const fetchNewUpdates = async (page = 1) => {
  return fetchWithCache(`${BASE_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`);
};

export const fetchListByType = async (type: string, page = 1) => {
  return fetchWithCache(`${BASE_URL}/v1/api/danh-sach/${type}?page=${page}`);
};

export const fetchMovieDetail = async (slug: string) => {
  return fetchWithCache(`${BASE_URL}/phim/${slug}`);
};

export const searchMovies = async (keyword: string, page = 1) => {
  return fetchWithCache(`${BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`);
};
