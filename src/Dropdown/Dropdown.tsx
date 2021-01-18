import { cloneElement, ComponentChildren, Fragment, VNode } from 'preact';
import { Children } from 'preact/compat';

import { ListValue, useList } from '../List/useList';

import { DropdownSurface, useDropdownEffect } from './useDropdownEffect';


export interface DropdownProps<T> {
  children: VNode<{ onClick: () => void; }>;
  surface: (close: () => void, highlighted?: T) => ComponentChildren;
  surfaceClass?: string;

  // Usage of list is complete optional
  options?: ListValue<T>[];
  value?: ListValue<T>;
}


export function Dropdown<T>(props: DropdownProps<T>) {


  const { children, options, surface, surfaceClass } = props;

  const dde = useDropdownEffect();

  const list = useList(options || [], {
    keydown: {
      Tab(e) {
        e.preventDefault();
        e.stopPropagation();
        dde.close();
      }
    }
  });

  const dd = {
    ...dde,
    surfaceProps: {
      ...dde.surfaceProps,

      onKeydown(e: KeyboardEvent) {
        list.onKeydown(e);
        dde.surfaceProps.onKeydown(e);

        // TODO: Should this be here.
        // This will block all the actions.
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  const anchorChild = cloneElement(Children.only(children) as any);
  const onAnchorClick =  (anchorChild.props as any).onClick;

  const onClick = () => {
    dd.open();
    onAnchorClick?.();
  };

  anchorChild.ref = dd.anchorProps.ref;
  anchorChild.props = {...anchorChild.props, onClick };

  return (
    <Fragment>
      {anchorChild}
      <DropdownSurface dd={dd} surfaceClass={surfaceClass}>
        {surface(dd.close, list.highlighted ?? undefined)}
      </DropdownSurface>
    </Fragment>
  );
}
