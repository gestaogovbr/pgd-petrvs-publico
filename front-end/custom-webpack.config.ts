import type { Configuration } from 'webpack';

module.exports = {
  watch: true,
  entry: { 
    contentScript: 'src/extension/content-script.ts',
    background: 'src/extension/background.ts'
  },
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000,
  },
} as Configuration;