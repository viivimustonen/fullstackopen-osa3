import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";
//const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (noteObject) => {
  const request = axios.post(baseUrl, noteObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
    const request = axios.delete(`http://localhost:3001/api/persons/${id}`);
    return request.then((response) => response.data);
};

const update = (id, noteObject) => {
const request = axios.put(`http://localhost:3001/api/persons/${id}`, noteObject);
return request.then((response) => response.data);
};

export default { getAll, create, remove, update};