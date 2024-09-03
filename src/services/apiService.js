import axios from 'axios';


const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';


const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-rapidapi-key': '3dbd392366msh79a4418efd4a86cp11b018jsn11ca60c264d9', 
    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
  },
});


export const fetchCities = async (searchTerm, limit) => {
  try {
    const response = await apiService.get('/cities', {
      params: { namePrefix: searchTerm, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};


export const fetchPlaceDistance = async (placeId, toPlaceId, distanceUnit = 'KM') => {
  try {
    const response = await apiService.get(`/places/${placeId}/distance`, {
      params: { toPlaceId, distanceUnit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching place distance:', error);
    throw error;
  }
};


export default apiService;
