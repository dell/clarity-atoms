import { cx, css } from '@emotion/css';
import { ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import { noop } from 'rxjs';

import { Button } from '../Button';
import { SVGIcon } from '../icons/SVGIcon';
import { DialogContext } from '../helper/internal';
import { Surface } from '../portal/Surface';

import { useDialog, DialogStrategy } from './dialogHook';

export interface DialogProps {
  class?: string;
  children: ComponentChildren;

  open: boolean;
  strategy?: DialogStrategy;
  onEscape?: () => void;
}


const rootStyle = css`
  position: fixed;

  background: #FFFFFF;
  box-shadow: 0 0 6px 0 rgba(20, 20, 20, 0.2);
  outline: none;

  overflow: auto;
`;

const modalStyle = css`
  max-width: 90%;
  max-height: 90%;

  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const sidebarRightStyle = css`
  height: 100%;

  left: 100%;
  top: 0%;
`;


export function Dialog(props: DialogProps) {

  const { children, open, onEscape } = props;

  const strategy = props.strategy ?? 'modal';

  const ref = useDialog(open, strategy);

  const classes = cx(
    'dialog',
    rootStyle,
    strategy === 'modal' && modalStyle,
    strategy === 'sidebar-right' && sidebarRightStyle,
    props.class
  );

  return (
    <DialogContext.Provider value={{ onClose: onEscape || noop}}>
      <Surface attached={open} class={'dialog-surface'} overlay='dark' onBackdropClick={onEscape}>
        <div ref={ref} class={cx('dialog', classes)} tabIndex={-1}>
          {children}
        </div>
      </Surface>
    </DialogContext.Provider>
  );
}

Dialog.Header = Header;
Dialog.Section = Section;


interface HeaderProps {
  children: ComponentChildren;
}

const headerStyle = css`
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 1.5rem 1.5rem;
`;

const headingStyle = css`
  margin: 0;

  font-size: 1.5rem;
`;

const buttonStyle = css`
  .svg-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function Header(props: HeaderProps) {

  const { children } = props;

  const { onClose } = useContext(DialogContext);

  return (
    <div class={headerStyle}>
      <h2 class={headingStyle}>{children}</h2>
      <Button class={buttonStyle} variant='minimal' onClick={onClose}>
        <SVGIcon name='close' />
      </Button>
    </div>
  );
}

interface SectionProps {
  class?: string;
  children: ComponentChildren;
}

const sectionStyle = css`
  padding: 0 1.5rem 1rem;
`;

function Section(props: SectionProps) {

  const { children } = props;

  return (
    <div class={cx(sectionStyle, props.class)}>
      {children}
    </div>
  );
}
