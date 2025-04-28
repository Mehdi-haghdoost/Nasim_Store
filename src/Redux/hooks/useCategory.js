import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categoryThunks';
import { useEffect } from 'react';

export const useCategory = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        if (categories.length === 0 && !loading && !error) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length, loading, error]);

    return {
        categories,
        loading,
        error,
        refreshCategories: () => dispatch(fetchCategories())
    };
};