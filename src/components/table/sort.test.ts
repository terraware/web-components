import { descendingComparator } from './sort';

const rowA = {
  'string1': 'foo',
  'string2': 'same',
  'number1': '1050',
  'number2': '150',
  'number3': '1.100',
};

const rowB = {
  'string1': 'barbaz',
  'string2': 'same',
  'number1': '1099',
  'number2': '21.001',
  'number3': '1.1',
};

test('compare unequal string fields', () => {
  const cmp = descendingComparator(rowA, rowB, 'string1');
  expect(cmp).toEqual(-1);
});

test('compare equal string fields', () => {
  const cmp = descendingComparator(rowA, rowB, 'string2');
  expect(cmp).toEqual(0);
});

test('compare unequal number fields with same whole number digits', () => {
  const cmp = descendingComparator(rowA, rowB, 'number1');
  expect(Math.sign(cmp)).toEqual(1);
});

test('compare unequal number fields with differing whole number digits', () => {
  const cmp = descendingComparator(rowA, rowB, 'number2');
  expect(Math.sign(cmp)).toEqual(-1);
});

test('compare equal number fields', () => {
  const cmp = descendingComparator(rowA, rowB, 'number3');
  expect(Math.sign(cmp)).toEqual(0);
});
