import { css } from 'emotion';
import { h } from 'preact';
import { RoutableProps } from 'preact-router';
import { useState } from 'preact/hooks';

import { Radio } from '../../src/Radio';

enum Answers {
  Default = 'Default',
  Option1 = 'HighText Machine Language',
  Option2 = 'HyperText and links Markup Language',
  Option3 = 'HyperText Markup Language'
}

type AnswerOption = keyof typeof Answers;

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
  const [ans, setAnswer] = useState<AnswerOption>(Answers.Default);
  const selectedType = Answers[ans];

  const onChange = (x: any) => setAnswer(x);

  return (
    <div>
      <h3>Component :- Radio</h3>
      <label>HTML stands for - </label>
      <div class={radioWrapperStyle}>
        <Radio name="answer" class={radioStyle} value='Option1' onChange={onChange}>HighText Machine Language</Radio>
        <Radio name="answer" class={radioStyle} value='Option2' onChange={onChange}>HyperText and links Markup Language</Radio>
        <Radio name="answer" class={radioStyle} value='Option3' onChange={onChange}>HyperText Markup Language</Radio>
      </div>
      { selectedType ? <div>Selected value :- {selectedType}</div> : null }

    </div>
  );
}
