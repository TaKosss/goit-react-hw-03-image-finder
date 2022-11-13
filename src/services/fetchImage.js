import axios from 'axios';

const KEY = '29971148-c945d30420d20d2baba09e6a1'
const url = new window.URL('https://pixabay.com/api/');
url.searchParams.append('key', KEY);
url.searchParams.append('image_type', 'photo');
url.searchParams.append('orientation', 'horizontal');
url.searchParams.append('per_page', '12');

export async function fetchImage(query, pageNumber) {
  const fetchImageUrl = new window.URL(url);
  fetchImageUrl.searchParams.append('q', query);
  fetchImageUrl.searchParams.append('page', pageNumber);
   

  try {
      const response = await axios.get(fetchImageUrl.toString());
    return response.data;
  } catch (error) {
    throw error;
  }
}
