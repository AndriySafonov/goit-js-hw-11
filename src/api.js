const ENDPOINT = 'https://pixabay.com/api/';
const key = '33719885-4078ecd8a7ef8c07d3287ea16';
const URL =
  '?key=33719885-4078ecd8a7ef8c07d3287ea16&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=1';
function fetchData(q) {
  return fetch(
    `${ENDPOINT}?key=${key}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=1`
  ).then(response => {
    if (!response.ok) {
      throw new Error(respose.statusText);
    }
    return response.json();
  });
}

export default fetchData;

// =========================================================

// // const options = {
// //   key: '33719885-4078ecd8a7ef8c07d3287ea16',
// //   q: 'yellow+flowers',
// //   image_type: 'photo',
// //   orientation: 'horizontal',
// //   safesearch: 'true',
// // };

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// function searchFoto(value, page = 1) {
//   return fetch(
//     `${ENDPOINT}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${page}`
//   ).then(response => {
//   if (!response.ok) {
//     throw new Error(respose.statusText);
//   }
//   return response.json();
// });
// }
