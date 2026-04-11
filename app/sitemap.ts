import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://surchargeswap.com.au'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
