/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mmsa.app',
  generateRobotsTxt: true,
  exclude: ['/dashboard', '/api/*'],
  transform: async (config, path) => {
    const priorities = {
      '/': 1,
      '/portfolio': 0.9,
      '/cv': 0.85,
      '/contact': 0.75,
    };
    const isProject = path.startsWith('/projects/');

    return {
      loc: path,
      changefreq: isProject || path === '/portfolio' ? 'weekly' : 'monthly',
      priority: priorities[path] ?? (isProject ? 0.8 : config.priority),
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api/'],
      },
    ],
  },
  changefreq: 'monthly',
  priority: 0.7,
};
