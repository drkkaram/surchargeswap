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
    {
      url: `${baseUrl}/enforcement-faq`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cafe`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/restaurant`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/retail`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/beauty`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gym`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hotel`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trades`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medical`,
      lastModified: new Date('2026-04-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-04-13'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2026-04-13'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-04-13'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
