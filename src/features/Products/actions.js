import debounce from 'debounce-promise';

import * as constant from './constant';
import getProducts from '../../api/products';

const debouncedGetProducts = debounce(getProducts, 1000);

export function startFetchProduct() {
  return {
    type: constant.FETCH_START,
  };
}

export function errorFetchProduct() {
  return {
    type: constant.FETCH_ERROR,
  };
}

export function successFetchProduct(data, count) {
  return {
    type: constant.FETCH_SUCCESS,
    data,
    count,
  };
}

export function fetchProduct() {
  return async (dispatch, getState) => {
    dispatch(startFetchProduct());

    const defaultParams = {
      limit: getState().products.perPage || 9,
      currentPage: getState().product.currentPage || 1,
      tags: getState().products.tags || [],
      q: getState().product.keyword || '',
      category: getState().product.category || '',
    };
    defaultParams.skip = defaultParams.limit * defaultParams.currentPage - defaultParams.limit;

    try {
      const { data, count } = await debouncedGetProducts(defaultParams);
      dispatch(successFetchProduct(data, count));
    } catch (error) {
      dispatch(errorFetchProduct());
    }
  };
}

export const setPage = (page = 1) => ({ type: constant.SET_PAGE, page });

export const setKeyword = (keyword) => ({ type: constant.SET_KEYWORD, keyword });

export const setCategory = (category) => ({ type: constant.SET_CATEGORY, category });

export const setTags = (tags) => ({ type: constant.SET_TAGS, tags });

export const toggleTag = (tag) => ({ type: constant.TOGGLE_TAG, tag });

export const goToNextPage = () => ({ type: constant.NEXT_PAGE });

export const goToPrevPage = () => ({ type: constant.PREV_PAGE });

export const clearTags = () => ({ type: constant.SET_TAGS, tags: [] });
