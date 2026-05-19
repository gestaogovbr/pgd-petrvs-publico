import { FullRoute, RouteMetadata } from 'src/app/app-types';

export type ToolbarButton = {
  id?: string,
  divider?: boolean,
  route?: FullRoute,
  metadata?: RouteMetadata,
  class?: string,
  icon?: string,
  img?: string,
  disabled?: boolean | (() => boolean),
  iconChar?: string, 
  color?: string,
  label?: string,
  hint?: string,
  running?: boolean,
  toggle?: boolean,
  badge?: string,
  pressed?: boolean | ((button: ToolbarButton) => boolean),
  items?: ToolbarButton[],
  hidden?: boolean,
  dynamicItems?: (...args: any[]) => ToolbarButton[] | undefined,
  dynamicVisible?: (...args: any[]) => boolean,
  onClick?: (...args: any[]) => any
}
