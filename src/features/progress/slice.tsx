import {SCREEN_NAMES} from "@/src/constants/progress";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadProgressThunk, updateProgressThunk} from "./thunks";
import {PayloadProgress, ProgressState} from "./types";
import {router} from "expo-router";

const initialState: ProgressState = {flows: {}};

const progressSlice = createSlice({
    name: "progress",
    initialState,
    reducers: {
        // İstersen local override vb. ekleyebilirsin
        resetFlow(state, {payload}:PayloadAction<PayloadProgress>) {
            state.flows[payload.flow] = {step: 0, completed: false};
        },
        updateFlow(state, {payload}:PayloadAction<PayloadProgress>) {
            const {flow, step} = payload;
            let completed = false;
            if (step === SCREEN_NAMES[flow].length) completed = true
            state.flows[flow] = {step, completed};
        },
        errorFlow(state, {payload}:PayloadAction<string>) {
            state.error = String(payload || 'Load last step failed');
        },
        goRouter(state, {payload}:PayloadAction<string>) {
            const step=state.flows[payload].step; //payload = flow
            const segment = SCREEN_NAMES[flow][step];
            if (segment) router.replace(`/screens/step/${segment}`);
        }

    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loadProgressThunk.fulfilled, (state, action) => {
    //             const {flow, step} = action.payload;
    //             let completed = false;
    //             if (step === SCREEN_NAMES[flow].length) completed = true
    //             state.flows[flow] = {step, completed};
    //         })
    //         .addCase(loadProgressThunk.rejected, (state: ProgressState, action) => {
    //             state.error = String(action.error.message || 'Load last step failed');
    //         })
    //         .addCase(updateProgressThunk.fulfilled, (state, action) => {
    //             const {flow, step} = action.payload;
    //             let completed = false;
    //             if (step === SCREEN_NAMES[flow].length) completed = true
    //             state.flows[flow] = {step, completed};
    //         })
    //         .addCase(updateProgressThunk.rejected, (state: ProgressState, action) => {
    //             state.error = String(action.error.message || 'Update last step failed');
    //         })
    // },
});

export const { resetFlow,updateFlow,errorFlow } = progressSlice.actions;
export default progressSlice.reducer;
