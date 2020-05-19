import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((response) => response.data);
};

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const update = (id, newNumber) => {
  console.log(`${baseURL}/${id}`);
  return axios
    .put(`${baseURL}/${id}`, newNumber)
    .then((response) => response.data);
};

const remove = (id) => {
  console.log(`${baseURL}/${id}`);
  return axios.delete(`${baseURL}/${id}`).then((response) => response.data);
};

export default { getAll, create, remove, update };
