// {
//   return (target: any, key: string, descriptor: any) => {
//     var originalMethod = descriptor.value;

//     descriptor.value = function (...args: any[]) {
//       funcToCallEveryTime(...args);
//       return originalMethod.apply(target, args);
//     };

//     return descriptor;
//   };
// }

export function BeforeInvocation(func: Function) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      func();
      return originalMethod.apply(target, args);
    };
    return descriptor;
  };
}

export function AfterInvocation(func: Function) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const retVal = originalMethod.apply(target, args);
      func();
      return retVal;
    };
    return descriptor;
  };
}

export function AroundInvocation(func: Function) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      func();
      const retVal = originalMethod.apply(target, args);
      func();
      return retVal;
    };
    return descriptor;
  };
}
