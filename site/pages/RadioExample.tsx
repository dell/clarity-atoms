import { css } from '@emotion/css';
import { h } from 'preact';
import { RoutableProps } from 'preact-router';
import { useState } from 'preact/hooks';

import { Radio } from '../../src/Radio';

const radioWrapperStyle = css`
  display: flex;
  margin: 1rem 0;

  flex-direction: column;
`;

const radioStyle = css`
  margin: 0.5rem 0;
`;

// Argument props is required for 'path' attribute in AppRouter.tsx
export function RadioExample(props: RoutableProps) {
  const [ans, setAnswer] = useState<string>('');

  return (
    <div>
      <h3>Component :- Radio</h3>
      <label>HTML stands for - </label>
      <div class={radioWrapperStyle}>
        <Radio name="answer" class={radioStyle} value='HighText Machine Language' onChange={setAnswer as any}>HighText Machine Language</Radio>
        <Radio name="answer" class={radioStyle} value='HyperText and links Markup Language' onChange={setAnswer as any}>HyperText and links Markup Language</Radio>
        <Radio name="answer" class={radioStyle} value='HyperText Markup Language' onChange={setAnswer as any}>HyperText Markup Language</Radio>
      </div>
      { ans ? <div>Selected value :- {ans}</div> : null }

    </div>
  );
}
