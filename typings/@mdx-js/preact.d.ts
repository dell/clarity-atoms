import { ComponentChildren, FunctionComponent } from 'preact';


export interface MDXProviderProps {
  components: any;
  children: ComponentChildren;
}

export const MDXProvider: FunctionComponent<MDXProviderProps>;
