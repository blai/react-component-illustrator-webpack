import path from 'path';
import IllustrationResolver from './illustration-resolver';

export default class ReactComponentIllustrationPlugin {
  constructor(options) {
    this.options = Object.assign({
      exportName: 'Illustration',
      filePath: path.resolve(options.root || '.', '__illustration__.js')
    }, options);
  }

  apply(compiler) {
    compiler.resolvers.normal.apply(new IllustrationResolver(this.options));
  }
}
