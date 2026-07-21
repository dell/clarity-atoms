import { useState } from 'preact/hooks';
import { SimpleSelect } from '../../../src/Select/SimpleSelect';


export interface FruitList {
  id: number;
  displayName: string;
  urlSlug: string;
}

const fruits: FruitList[] = [
  { id: 1, displayName: 'Green Apples', urlSlug: 'green-apples' },
  { id: 2, displayName: 'Mangoes', urlSlug: 'mangoes' },
  { id: 3, displayName: 'Oranges', urlSlug: 'oranges' },
  { id: 4, displayName: 'Water melons', urlSlug: 'water-melons' }
];


export function SimpleFruitSelect() {

  const [selected, setSelected] = useState<FruitList>(fruits[0]);

  return (
    <SimpleSelect options={fruits} placeholder='Select fruit'
      onChange={(x) => setSelected(x)}
      value={selected}
      renderAnchor={(x) => (<div>{x?.displayName}</div>)}
      render={(x) => (x.displayName)} />
  );
}
