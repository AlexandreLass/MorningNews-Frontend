import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const hiddenArticlesSlice = createSlice({
	name: 'hiddenArticles',
	initialState,
	reducers: {
		hiddenArticle: (state, action) => {
			state.value.push(action.payload.title);
		},
        noHiddenArticles: (state, action) => {
            state.value = []
        }
	},
});

export const { hiddenArticle, noHiddenArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;