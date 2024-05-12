import axios from 'axios';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  return token;
};
export const useReports = ({ endpoint, id }) => {
  const url = id ? `${process.env.REACT_APP_RUTA}${endpoint}/${id}` : endpoint;
  const handleFetch = async () => {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      responseType: 'blob',
    });

    return data;
  };
  return {
    handleFetch,
  };
};
