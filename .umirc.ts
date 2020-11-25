import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
});
