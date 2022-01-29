class ServiceLocator {
  dependencyMap: any;

  dependencyCache: any;

  constructor() {
    this.dependencyMap = {};
    this.dependencyCache = {};
  }

  register(dependencyName: string, constructor: () => void) {
    if (typeof constructor !== 'function') {
      throw new Error(
        `${dependencyName}: Dependency constructor is not a function`,
      );
    }

    if (!dependencyName) {
      throw new Error('Invalid depdendency name provided');
    }

    this.dependencyMap[dependencyName] = constructor;
  }

  get(dependencyName: string) {
    if (this.dependencyMap[dependencyName] === undefined) {
      throw new Error(
        `${dependencyName}: Attempting to retrieve unknown dependency`,
      );
    }

    if (typeof this.dependencyMap[dependencyName] !== 'function') {
      throw new Error(
        `${dependencyName}: Dependency constructor is not a function`,
      );
    }

    if (this.dependencyCache[dependencyName] === undefined) {
      const dependencyConstructor = this.dependencyMap[dependencyName];
      const dependency = dependencyConstructor(this);
      if (dependency) {
        this.dependencyCache[dependencyName] = dependency;
      }
    }

    return this.dependencyCache[dependencyName];
  }

  clear() {
    this.dependencyCache = {};
    this.dependencyMap = {};
  }
}

const serviceLocator = new ServiceLocator();

export default serviceLocator;
