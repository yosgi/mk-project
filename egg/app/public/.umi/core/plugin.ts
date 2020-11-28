// @ts-nocheck
import { Plugin } from '/usr/local/lib/node_modules/umi/node_modules/@umijs/runtime';

const plugin = new Plugin({
  validKeys: ['modifyClientRenderOpts','patchRoutes','rootContainer','render','onRouteChange',],
});

export { plugin };
