import { css } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { Link } from 'preact-router/match';

import { border, borderSecondary, primary } from '../../src/color';


export interface AppNavProps {

}


const rootStyle = css`
  background-color: #FAFAFA;
`;

const listStyle = css`
  display: flex;
  margin: 2rem 0 0;
  padding: 0;

  flex-direction: column;

  list-style: none;
`;


export function AppNav(_props: AppNavProps) {

  return (
    <nav class={rootStyle}>
      <ul class={listStyle}>
        <NavItem href='/button'>Button</NavItem>
        <NavItem href='/checkbox'>Checkbox</NavItem>
        <NavItem href='/radio'>Radio</NavItem>
        <NavItem href='/simple-select'>Simple Select</NavItem>
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
