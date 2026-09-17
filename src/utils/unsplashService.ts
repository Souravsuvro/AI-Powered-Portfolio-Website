import { createApi } from 'unsplash-js';

const LOG_PREFIX = '[Unsplash Service]';

const FALLBACK_IMAGES: Record<string, string> = {
  'AI': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
  'Cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'Software Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
  'default': 'https://images.unsplash.com/photo-1526374965328-7f61d4b3a4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
};

const imageCache: Record<string, string> = {};

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

let unsplash: ReturnType<typeof createApi> | null = null;
try {
  if (accessKey) {
    unsplash = createApi({ accessKey });
    console.log(`${LOG_PREFIX} Unsplash client initialized successfully`);
  } else {
    console.warn(`${LOG_PREFIX} No Unsplash access key found, using fallback images`);
  }
} catch (error) {
  console.error(`${LOG_PREFIX} Error initializing Unsplash client:`, error);
}

export const fetchUnsplashImage = async (
  query: string,
  width = 1200,
  height = 800
): Promise<string> => {
  if (!query) {
    console.warn(`${LOG_PREFIX} Empty query provided, using default fallback`);
    return FALLBACK_IMAGES['default'];
  }

  const cacheKey = `${query}-${width}-${height}`;
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  if (!unsplash || !accessKey) {
    return getFallbackImage(query);
  }

  try {
    const result = await unsplash.search.getPhotos({
      query,
      orientation: 'landscape',
      page: 1,
      perPage: 1,
    });

    if (result?.response?.results?.[0]?.urls?.raw) {
      const imageUrl = `${result.response.results[0].urls.raw}&w=${width}&h=${height}&fit=crop`;
      imageCache[cacheKey] = imageUrl;
      return imageUrl;
    }

    return getFallbackImage(query);
  } catch (error) {
    console.error(`${LOG_PREFIX} Error fetching image:`, error);
    return getFallbackImage(query);
  }
};

const getFallbackImage = (query: string): string => {
  if (!query) return FALLBACK_IMAGES['default'];
  for (const [key, image] of Object.entries(FALLBACK_IMAGES)) {
    if (query.toLowerCase().includes(key.toLowerCase())) {
      return image;
    }
  }
  return FALLBACK_IMAGES['default'];
};

export const getUnsplashQueryForTopic = (topic: string): string => {
  const topicMap: { [key: string]: string } = {
    'AI': 'artificial intelligence technology robot',
    'Cybersecurity': 'cybersecurity digital security network',
    'Software Development': 'software coding programming computer',
    'Cloud Computing': 'cloud computing data center technology',
    'Blockchain': 'blockchain cryptocurrency digital technology',
    'Career': 'professional career technology workspace',
    'Technology': 'modern technology innovation digital',
    'Travel': 'travel digital nomad remote work',
    'Web Development': 'web development coding react',
    'Business': 'business growth strategy digital'
  };

  return topicMap[topic] || 'technology innovation digital';
};
