import Comments from '../modules/comments.js';

test('comments counter', () => {
  const comments = [
    {
      Comment: 'Test',
      username: 'Eric',
      creation_date: '2022-05-20',
    },
    {
      username: 'Gideon',
      Comment: 'Work',
      creation_date: '2022-05-20',
    },
    {
      Comment: 'Test',
      creation_date: '2022-05-20',
      username: 'reviewer',
    },
    {
      Comment: 'Happy',
      creation_date: '2022-05-20',
      username: 'Codind',
    },
  ];
  const count = Comments.countFn(comments);
  expect(count).toBe(4);
});
