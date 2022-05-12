import Layout from './Layout.vue';
import LazyImg from './LazyImg.vue';
import NotFound from './NotFound.vue';

// import DefaultTheme from 'vitepress/theme';

import './style.css';

// export const NewTheme = {
//   ...DefaultTheme,
//   enhanceApp({ app }) {
//     // register global components
//     app.component('MyGlobalComponent' /* ... */)
//   }
// };

export default {
  Layout,

  NotFound: NotFound, // <- this is a Vue 3 functional component

  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData` is a `ref` of current site-level metadata.
    app.component('LazyImg', LazyImg);
  }
}
