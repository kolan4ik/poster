import { ADD_POST, LOAD_POST, REMOVE_POST, TOGGLE_BOOKED } from "../types";

const initialState = {
  allPosts: [],
  allBookedPost: [],
  loading: true,
};

export const postReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POST:
      return {
        ...state,
        allPosts: action.payload,
        allBookedPost: action.payload.filter((post) => post.booked),
        loading: false
      };
    case TOGGLE_BOOKED:
      const allPosts = state.allPosts.map((item) => {
        if (item.id === action.payload) {
          item.booked = !item.booked;
        }
        return item;
      });

      return {
        ...state,
        allPosts,
        allBookedPost: allPosts.filter((post) => post.booked),
      };
    case REMOVE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post.id != action.payload),
        allBookedPost: state.allBookedPost.filter(
          (post) => post.id != action.payload
        ),
      };
    case ADD_POST:
      return {
        ...state,
        allPosts: [{ ...action.payload }, ...state.allPosts],
      };
    default:
      return state;
  }
};
