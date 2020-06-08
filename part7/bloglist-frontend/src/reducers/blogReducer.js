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
    console.log(updatedBlog);
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
      id,
    });
  };
};

export const commentBlogAction = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(id, comment);
    dispatch({
      type: 'COMMENT',
      commentedBlog,
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
        blog.id !== action.updatedBlog.body.id ? blog : action.updatedBlog.body
      );
    case 'REMOVE':
      const filteredBlogs = state.filter((blog) => blog.id !== action.id);
      return filteredBlogs;
    case 'COMMENT':
      return state.map((blog) =>
        blog.id !== action.commentedBlog.id ? blog : action.commentedBlog
      );
    default:
      return state;
  }
};

export default blogReducer;
