import { css, cx } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { Link } from 'preact-router/match';

import { border, borderSecondary, primary } from '../../src/color';


export interface AppNavProps {
  class?: string;
}


const rootStyle = css`
  background-color: #FAFAFA;

  z-index: 1;
`;

const listStyle = css`
  display: flex;
  margin: 2rem 0 0;
  padding: 0 0 2rem;

  flex-direction: column;

  list-style: none;
`;


export function AppNav(props: AppNavProps) {

  return (
    <nav class={cx(rootStyle, props.class)}>
      <ul class={listStyle}>
        <NavItem href='/button'>Button</NavItem>
        <NavItem href='/checkbox'>Checkbox</NavItem>
        <NavItem href='/dialog'>Dialog</NavItem>
        <NavItem href='/radio'>Radio</NavItem>
        <NavItem href='/simple-select'>Simple Select</NavItem>

        <NavItem href='/radio'>Radio</NavItem>
      </ul>
    </nav>
  );
}


const listItemStyle = css`
  margin: 1.5rem 1rem 0;
  font-weight: 500;

  font-size: 0.875rem;
`;


const linkStyle = css`
  display: flex;

  padding: 0.6rem 0.75rem;
  text-decoration: none;

  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  border-bottom: 1px solid ${borderSecondary};

  transition: all 120ms ease-out;

  color: #444444;

  &:hover {
    background: #F0F0F0;

    border-color: ${border};
    color: #666666;
  }
`;

const activeLinkStyle = css`
  color: ${primary};

  border-color: ${primary};
`;


function NavItem(props: { children: ComponentChildren; href: string; }) {
  return (
    <li class={listItemStyle}>
      <Link activeClassName={activeLinkStyle} class={linkStyle} href={props.href}>
        {props.children}
      </Link>
    </li>
  );
}
