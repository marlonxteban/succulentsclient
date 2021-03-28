import * as axios from 'axios';

import { API } from './config';

let getAuthConfig = function(token) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

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

const deleteFamily = async function(id, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.delete(`${API}/families/${id}`, config);
    let family = parseItem(response, 'deleted', 200);
    return family;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateFamily = async function(family, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.patch(
      `${API}/families/${family.id}`,
      family,
      config
    );
    const updatedFamily = parseItem(response, 'updated', 200);
    return updatedFamily;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addFamily = async function(family, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.post(`${API}/families`, family, config);
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

const getSucculent = async function(id, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.get(`${API}/succulents/${id}`, config);
    let succulent = parseItem(response, 'succulent', 200);
    return succulent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteSucculent = async function(id, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.delete(`${API}/succulents/${id}`, config);
    let succulent = parseItem(response, 'deleted', 200);
    return succulent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateSucculent = async function(succulent, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.patch(
      `${API}/succulents/${succulent.id}`,
      succulent,
      config
    );
    const updatedSucculent = parseItem(response, 'updated', 200);
    return updatedSucculent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addSucculent = async function(succulent, token) {
  try {
    let config = getAuthConfig(token);
    const response = await axios.post(`${API}/succulents`, succulent, config);
    const addedSucculent = parseItem(response, 'created', 201);
    return addedSucculent;
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
  deleteFamily,
  updateFamily,
  addFamily,
  getSucculents,
  getSucculent,
  deleteSucculent,
  updateSucculent,
  addSucculent,
};
