import type { Configuration } from 'webpack';

module.exports = {
  entry: { 
    contentScript: 'src/extension/content-script.ts',
    background: 'src/extension/background.ts'
  },
} as Configuration;