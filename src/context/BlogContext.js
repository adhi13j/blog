import createDataContext from './createDataContext';
import { SettingsContext } from './SettingsContext';
import { createAPI } from '../api/json-server';

const BlogReducer = (state, actions) => {
  switch (actions.type) {
    case "get_BlogPosts":
      return actions.payload.data.data;
    case "remove_BlogPost":
      return state.filter((blogPost) => blogPost.id !== actions.payload);
    case "edit_BlogPost":
      return state.map((post) => {
        if (post.id === actions.payload.id) {
          return {
            ...post,
            title: actions.payload.title,
            content: actions.payload.content
          };
        }
        return post;
      });
    default:
      return state;
  }
};

const getBlogPost = (dispatch, { baseURL }) => {
  return async () => {
    const api = createAPI(baseURL);
    const data = await api.request("/BlogPosts");
    dispatch({ type: "get_BlogPosts", payload: { data } });
  };
};

const addBlogPost = (dispatch, { baseURL }) => {
  return async (title, content, callback) => {
    const api = createAPI(baseURL);
    await api.post("/BlogPosts", { title, content });
    if (callback) { callback(); }
  };
};

const removeBlogPost = (dispatch, { baseURL }) => {
  return async (id) => {
    const api = createAPI(baseURL);
    await api.delete(`/BlogPosts/${id}`);
    dispatch({ type: "remove_BlogPost", payload: id });
  };
};

const editBlogPost = (dispatch, { baseURL }) => {
  return async (title, content, id, callback) => {
    const api = createAPI(baseURL);
    await api.put(`/BlogPosts/${id}`, { title, content });
    dispatch({ type: "edit_BlogPost", payload: { title, content, id } });
    if (callback) { callback(); }
  };
};

export const { Context, Provider } = createDataContext(
  BlogReducer,
  { addBlogPost, removeBlogPost, editBlogPost, getBlogPost },
  [],
  SettingsContext // Pass SettingsContext as extra context
);