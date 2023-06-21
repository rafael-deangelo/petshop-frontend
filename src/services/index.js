import axios from 'axios';

const api = axios.create();
api.defaults.baseURL = 'http://localhost:8000';

export default api;

// Chamada da API do BackEnd
