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
 * Real Reels/video linklari `instagramUrl` orqali ulanadi. Thumbnail va
 * `videoUrl` ixtiyoriy — yo'q bo'lsa abstrakt LED ceiling fallback render
 * qilinadi (`VideoThumbnailFallback`).
 *
 * Phase Bio-Ready: agar barcha item'lar faqat umumiy Instagram profile
 * link bo'lsa (Reels URL emas), Video section avtomatik **hidden** bo'ladi.
 * `hasRealVideoContent(...)` helper'i shu logikani hal qiladi.
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

/**
 * Real video kontent borligini aniqlash. Agar yo'q bo'lsa, sahifa
 * `VideoShowcase` section'ini render qilmaydi va "demo" taassurot
 * yaratmaydi.
 *
 * Real kontent shartlari (kamida bittasi):
 *   - `videoUrl` (direct hosting link) mavjud
 *   - `thumbnail` (real WebP/JPEG rasm) mavjud
 *   - `instagramUrl` aniq Reels yoki post linki (URL ichida `/reel/`
 *     yoki `/p/` segmenti bor) — umumiy profil linki emas
 */
function isRealVideoContent(v: VideoItem): boolean {
  if (v.videoUrl) return true
  if (v.thumbnail) return true
  if (v.instagramUrl) {
    if (v.instagramUrl.includes('/reel/') || v.instagramUrl.includes('/reels/')) return true
    if (v.instagramUrl.includes('/p/')) return true
  }
  return false
}

export function hasRealVideoContent(items: VideoItem[]): boolean {
  return items.some(isRealVideoContent)
}
