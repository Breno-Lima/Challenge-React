// const api = 'https://teste.reobote.tec.br/api';

// const headers = {
//   'Content-Type': 'application/json',
// };
// const fetchApi = (endpoint, options = {}) => {
//   const csrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN')).split('=')[1];
//   options.headers = {
//     ...headers,
//     'X-XSRF-TOKEN': csrfToken,
//   };
//   return fetch(`${api}/${endpoint}`, options)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.error('There was an error!', error);
//     });
// };

// export default fetchApi;