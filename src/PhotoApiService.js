import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const key = '33719885-4078ecd8a7ef8c07d3287ea16';

export default class PhotoApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  getPhotos() {
    const URL = `${ENDPOINT}?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    // return fetch(URL)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.nextPage();
    //     return hits;
    //   });
    return axios.get(URL).then(({ data }) => data.hits);
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
