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

  return (
    <SimpleSelect options={fruits} placeholder='Select fruit'
      value={fruits[0]}
      renderAnchor={(x) => (<div>{x?.displayName}</div>)}
      render={(x) => (x.displayName)}/>
  );
}
