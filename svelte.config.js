import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
      adapter: adapter(),
      paths: {
          base: process.env.NODE_ENV === 'production' ? '/prowe12.github.io' : '',
      }
  }
};

export default config;


// import adapter from '@sveltejs/adapter-static';

// export default {
//   kit: {
//     adapter: adapter({
//       // default options are shown
//       pages: 'build',
//       assets: 'build',
//       fallback: null
//     }),
//     paths: {
//       base: ''
//     }
//   }
// };