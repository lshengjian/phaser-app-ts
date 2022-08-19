import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { splitVendorChunkPlugin } from 'vite'
export default defineConfig({
  base:'/phaser-app-ts/',
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output:{
        manualChunks(id) {
          if (id.includes('node_modules')) {

           // return 'vendor';
           return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }

      },
      
      plugins: [
        splitVendorChunkPlugin(),
        nodeResolve(),
        //  Toggle the booleans here to enable / disable Phaser 3 features:
        replace({
          preventAssignment: true,
          'typeof CANVAS_RENDERER': "'true'",
          'typeof WEBGL_RENDERER': "'true'",
          'typeof EXPERIMENTAL': "'true'",
          'typeof PLUGIN_CAMERA3D': "'false'",
          'typeof PLUGIN_FBINSTANT': "'false'",
          'typeof FEATURE_SOUND': "'true'"
        })
      ]
    }
  }
});
