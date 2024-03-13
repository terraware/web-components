import { titleCase } from './text';

test('titleCase for a single word', () => {
  const lowerCaseWord = titleCase('species');
  expect(lowerCaseWord === 'Species').toBe(true);
  const capitalizedWord = titleCase('Species');
  expect(capitalizedWord === 'Species').toBe(true);
  const allCapsWord = titleCase('SPECIES');
  expect(allCapsWord === 'SPECIES').toBe(true);
  const reverseCapWord = titleCase('sPECIES');
  expect(reverseCapWord === 'Species').toBe(true);
});

test('titleCase for multiple words', () => {
  const lowerCaseString = titleCase('common name');
  expect(lowerCaseString === 'Common Name').toBe(true);
  const capitalizedString = titleCase('Common Name');
  expect(capitalizedString === 'Common Name').toBe(true);
  const allCapsString = titleCase('common NAME');
  expect(allCapsString === 'Common NAME').toBe(true);
  const reverseCapString = titleCase('cOMMON nAME');
  expect(reverseCapString === 'Common Name').toBe(true);
});
