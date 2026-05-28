export type VideoItem = {
  id: string
  title: string
  location: string
  roomType: string
  serviceType: string
  thumbnail?: string
  videoUrl?: string
  instagramUrl?: string
  duration?: string
  tags: string[]
  featured?: boolean
}

/**
 * Real Reels/video linklari `instagramUrl` orqali ulanadi (Phase Trust-1).
 * Thumbnail va `videoUrl` ixtiyoriy — yo'q bo'lsa abstrakt LED ceiling
 * fallback render qilinadi (`VideoThumbnailFallback`).
 *
 * Mijozdan ruxsat olishi va wire-up qadamlari uchun:
 *   → docs/VIDEOS_AND_TESTIMONIALS_GUIDE.md §2
 */
export const videos: VideoItem[] = [
  {
    id: 'zal-led-qarshi',
    title: 'Zal uchun LED натяжной потолок',
    location: 'Qarshi',
    roomType: 'Zal',
    serviceType: 'LED liniya + натяжной потолок',
    instagramUrl: 'https://instagram.com/vashpotolok',
    duration: '0:18',
    tags: ['LED', 'Zal', 'Qarshi'],
    featured: true,
  },
  {
    id: 'yotoqxona-matoviy-qashqadaryo',
    title: 'Yotoqxona uchun sokin matoviy dizayn',
    location: 'Qashqadaryo',
    roomType: 'Yotoqxona',
    serviceType: 'Matoviy натяжной потолок',
    instagramUrl: 'https://instagram.com/vashpotolok',
    duration: '0:15',
    tags: ['Matoviy', 'Yotoqxona'],
  },
  {
    id: 'oshxona-glyans-qarshi',
    title: 'Oshxona uchun yorug‘ yechim',
    location: 'Qarshi',
    roomType: 'Oshxona',
    serviceType: 'Glyans потолок',
    instagramUrl: 'https://instagram.com/vashpotolok',
    duration: '0:20',
    tags: ['Oshxona', 'Glyans'],
  },
]
