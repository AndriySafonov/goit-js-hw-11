const ENDPOINT = 'https://pixabay.com/api/';

// const options = {
//   key: '33719885-4078ecd8a7ef8c07d3287ea16',
//   q: 'yellow+flowers',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: 'true',
// };

function fetchData(query) {
  return fetch(
    `${ENDPOINT}?key=33719885-4078ecd8a7ef8c07d3287ea16&image_type=photo&orientation=horizontal&safesearch=true&q=${query}`
  )
    .then(response => response.json())
    // .then(({ hits }) => console.log(hits));
}

export default fetchData;
