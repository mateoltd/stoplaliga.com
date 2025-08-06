import { MetadataRoute } from 'next';
import { locales } from '../../middleware';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stoplaliga.com';
  const currentDate = new Date();
  
  const pages = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/controversies',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/sources',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add root URLs (content negotiated based on Accept-Language)
  pages.forEach((page) => {
    const url = page.path === '' ? baseUrl : `${baseUrl}${page.path}`;
    sitemapEntries.push({
      url,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  // Add localized pages
  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = page.path === '' 
        ? `${baseUrl}/${locale}` 
        : `${baseUrl}/${locale}${page.path}`;
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority * 0.9, // Slightly lower priority than root URLs
      });
    });
  });

  return sitemapEntries;
} 