import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from '../slices/categorySlice';
import client from '../../graphql/client';
import { GET_CATEGORIES } from '../../graphql/entities/categories/category.queries';

export const fetchCategories = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const { data } = await client.query({
            query: GET_CATEGORIES,
            fetchPolicy: 'network-only',
        });
        dispatch(fetchCategoriesSuccess(data.getCategories));
    } catch (error) {
        dispatch(fetchCategoriesFailure(error.message));
        console.error('Error fetching categories:', error);
    }
};