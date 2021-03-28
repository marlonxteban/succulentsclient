import * as axios from 'axios';

import { API } from './config';

const getFamilies = async function() {
  try {
    const response = await axios.get(`${API}/families`);

    let data = parseList(response, 'families');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getFamily = async function(id) {
  try {
    const response = await axios.get(`${API}/families/${id}`);
    let family = parseItem(response, 'family', 200);
    return family;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateFamily = async function(family) {
  try {
    const response = await axios.put(`${API}/families/${family.id}`, family);
    const updatedFamily = parseItem(response, 'updated', 200);
    return updatedFamily;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addFamily = async function(family) {
  try {
    const response = await axios.post(`${API}/families`, family);
    const addedFamily = parseItem(response, 'created', 200);
    return addedFamily;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSucculents = async function() {
  try {
    const response = await axios.get(`${API}/succulents`);

    let data = parseList(response, 'succulents');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getSucculent = async function(id) {
  try {
    const response = await axios.get(`${API}/succulents/${id}`);
    let succulent = parseItem(response, 200);
    return succulent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateSucculent = async function(succulent) {
  try {
    const response = await axios.put(
      `${API}/succulents/${succulent.id}`,
      succulent
    );
    const updatedSucculent = parseItem(response, 200);
    return updatedSucculent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addSucculent = async function(succulent) {
  try {
    const response = await axios.post(`${API}/succulents`, succulent);
    const addedSucculent = parseItem(response, 201);
    return addedSucculent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getVillains = async function() {
  try {
    const response = await axios.get(`${API}/villains`);
    let villains = parseList(response);
    return villains;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getVillain = async function(id) {
  try {
    const response = await axios.get(`${API}/villains/${id}`);
    let villain = parseItem(response, 200);
    return villain;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateVillain = async function(villain) {
  try {
    const response = await axios.put(`${API}/villains/${villain.id}`, villain);
    const updatedVillain = parseItem(response, 200);
    return updatedVillain;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseList = (response, listName) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data[listName];
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = (response, fieldName, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data[fieldName];
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

export const dataService = {
  getFamilies,
  getFamily,
  updateFamily,
  addFamily,
  getSucculents,
  getSucculent,
  updateSucculent,
  addSucculent,
  getVillains,
  getVillain,
  updateVillain,
};
