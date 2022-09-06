import * as constant from './constant';

const statusList = {
  process: 'process',
  success: 'success',
  error: 'error',
  idle: 'idle',
};

const initialState = {
  data: [],
  currentPage: 1,
  totalItems: -1,
  perPage: 4,
  keyword: '',
  category: '',
  tags: [],
  status: statusList.idle,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.FETCH_START:
      return { ...state, status: statusList.process };
    case constant.FETCH_ERROR:
      return { ...state, status: statusList.error };
    case constant.FETCH_SUCCESS:
      return {
        ...state, data: action.data, totalItems: action.count, status: statusList.success,
      };
    case constant.SET_PAGE:
      return { ...state, currentPage: action.currentPage };
    case constant.SET_KEYWORD:
      return {
        ...state, category: '', tags: [], keyword: action.keyword, currentPage: 1,
      };
    case constant.SET_CATEGORY:
      return {
        ...state, category: action.category, tags: [], currentPage: 1,
      };
    case constant.SET_TAGS:
      return { ...state, tags: action.tags };
    case constant.NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case constant.PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case constant.TOGGLE_TAG:
      return {
        ...state,
        currentPage: 1,
        tags: state.tags.includes(action.tag)
          ? state.tags.filter((tag) => tag !== action.tag)
          : [...state.tags, action.tag],
      };
    default:
      return state;
  }
};

export default reducer;
