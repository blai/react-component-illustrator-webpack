import {illustrate} from 'react-component-illustrator';

export default class ReactComponentIllustrationResolver {
  constructor(options) {
    this.options = options;
  }

  apply(resolver) {
    let oldResolve = resolver.resolve.bind(resolver);

    resolver.resolve = (context, request, callback) => {
      if (request !== this.options.exportName) {
        return oldResolve(context, request, callback);
      }

      let oldReadFile = resolver.fileSystem.readFile.bind(resolver.fileSystem);

      resolver.fileSystem.readFile = (path, callback) => {
        if (path !== this.options.filePath) {
          return oldReadFile(path, callback);
        }

        illustrate(this.options.patterns, this.options)
          .then(callback.bind(null, null))
          .catch(console.error.bind(console))
        ;
      }

      callback(null, this.options.filePath);
    };
  }
}
