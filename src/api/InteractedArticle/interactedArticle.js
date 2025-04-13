// src/api/article/articleService.js
import instance from '../api';

export const createInteractedArticle = (data) => {
  return instance.post('/interactedArticle', data);
};

export const deleteInteractedArticle = (id) => {
  return instance.delete(`/interactedArticle/${id}`);
};
