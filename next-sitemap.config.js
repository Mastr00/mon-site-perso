/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mmsa.app',
  generateRobotsTxt: true,
  exclude: ['/dashboard', '/api/*'],
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
