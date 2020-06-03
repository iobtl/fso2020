import blogService from '../services/blogs';

export const initializeBlogs = (url) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll(url);
    dispatch({
      type: 'INIT_BLOGS',
      blogs,
    });
  };
};

export const createNewBlogAction = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'CREATE',
      newBlog,
    });
  };
};

export const likeBlogAction = (id, newBlog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, newBlog);
    dispatch({
      type: 'LIKE',
      updatedBlog,
    });
  };
};

export const removeBlogAction = (id) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(id);
    dispatch({
      type: 'REMOVE',
      removedBlog,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.blogs;
    case 'CREATE':
      return [...state, action.newBlog];
    case 'LIKE':
      return state.map((blog) =>
        blog.id !== action.updatedBlog.id ? blog : action.updatedBlog
      );
    case 'REMOVE':
      return state.filter((blog) => blog.id !== action.newBlog.id);
    default:
      return state;
  }
};

export default blogReducer;
