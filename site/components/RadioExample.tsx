import { css } from 'emotion';
import { h } from 'preact';
import { RoutableProps } from 'preact-router';
import { useState } from 'preact/hooks';

import { Radio, RadioGroup } from '../../src/Radio';

enum Answers {
  'HighText Machine Language',
  'HyperText and links Markup Language',
  'HyperText Markup Language'
}

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
  const [ans, setAnswer] = useState(-1);
  const selectedType = Answers[ans]

  return (
    <div>
      <h3>Component :- Radio</h3>
      <label>HTML stands for - </label>
      <RadioGroup class={radioWrapperStyle} value={ans} onChange={setAnswer as any}>
        <Radio class={radioStyle} value='0'>HighText Machine Language</Radio>
        <Radio class={radioStyle} value='1'>HyperText and links Markup Language</Radio>
        <Radio class={radioStyle} value='2'>HyperText Markup Language</Radio>
      </RadioGroup>
      { selectedType ? <div>Selected value :- {selectedType}</div> : null }

    </div>
  );
}
