/** @type {import('next').NextConfig} */
// next.config.mjs
const config = {
  // Use the basePath for GitHub Pages if necessary
  basePath: "/mcq",
  // Use the assetPrefix for GitHub Pages if necessary
  // assetPrefix: '/your-repo-name/',
  // Specify exportPathMap to export your dynamic pages
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/cognitive": { page: "/cognitive" },
      "/quantitative": { page: "/quantitative" },
      "/literature_a": { page: "/literature_a" },
      "/literature_b": { page: "/literature_b" },
    };
  },
};

export default config;
