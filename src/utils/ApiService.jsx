export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzNiZWJhNjhlMTY2ODEzZGUxYjI0MDQ0MzE0MmFkZSIsIm5iZiI6MTczNjI3NjcxMy40NjQsInN1YiI6IjY3N2Q3YWU5NmQ3Y2EwMGU3ODczMTMxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTKIbcyjQ4oIWHtCHeAHuovJixKLZcC8-VRTE68qA38';

export const optionsGet = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: 'application/json',
  },
};

export const headers = {
  accept: 'application/json',
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: `Bearer ${API_KEY}`,
};
