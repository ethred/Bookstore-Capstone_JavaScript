import Comments from '../modules/comments.js';

test('pokes counter', () => {
  const pokeID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const numberPokes = Comments.countFn(pokeID);
  expect(numberPokes).toBe(10);
});
