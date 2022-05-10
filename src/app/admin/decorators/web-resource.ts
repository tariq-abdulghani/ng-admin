export const WEB_RESOURCE_META_KEY = Symbol('WebResource');
export type CrudLink = {
  href?: string;
  rel: string;
  type: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};
export type WebResourceSpec = { name: string; links: CrudLink[] };

export function WebResource(specs: WebResourceSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(WEB_RESOURCE_META_KEY, specs, constructor.prototype);
    return class extends constructor {};
  };
}

// type EndPoint = {
//   title: string;
//   description: string;
//   uri: string;
//   uriContext: string;
//   method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
// };

type ActionEndPoint = {
  action: string;
  description?: string;
  uri: string;
  uriContext: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export class EndPoints {
  constructor(private endPoints: ActionEndPoint[]) {}

  getUri(action: string): string {
    return '';
  }
}
