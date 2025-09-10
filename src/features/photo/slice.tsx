import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PhotoState = {
    uri: string | null;
};

const initialState: PhotoState = {
    uri: null,
};

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setPhotoUri: (state, action: PayloadAction<string | null>) => {
            state.uri = action.payload;
        },
        clearPhotoUri: (state) => {
            state.uri = null;
        },
    },
});

export const { setPhotoUri, clearPhotoUri } = photoSlice.actions;
export const selectPhotoUri = (state: { photo: PhotoState }) => state.photo.uri;
export default photoSlice.reducer;


