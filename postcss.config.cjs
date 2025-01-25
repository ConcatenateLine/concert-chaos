// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

// postcss.config.js  -  to configure postcss
module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    // optimize for production
    // ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
