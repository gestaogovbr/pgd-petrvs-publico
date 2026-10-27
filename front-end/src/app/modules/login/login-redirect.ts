import { FullRoute } from 'src/app/services/navigate.service';

export function parseLoginRedirect(value: unknown): FullRoute | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  try {
    const destination: unknown = JSON.parse(value);
    if (typeof destination !== 'object' || destination === null) {
      return undefined;
    }

    const { route, params } = destination as Partial<FullRoute>;
    if (!Array.isArray(route) || route.length === 0 ||
        !route.every(segment => typeof segment === 'string' && segment.length > 0) ||
        route[0] === 'login') {
      return undefined;
    }

    if (params !== undefined && (typeof params !== 'object' || params === null || Array.isArray(params))) {
      return undefined;
    }

    return { route, params };
  } catch {
    return undefined;
  }
}
