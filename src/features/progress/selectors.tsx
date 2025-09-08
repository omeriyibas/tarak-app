import { FlowType } from "@/src/constants/progress";
import { RootState } from "@/src/store/store";

export const selectStep = (flow: FlowType) => (state: RootState) =>
    state.progress.flows[flow]?.step ?? 0;

// export const selectStep = (flow: FlowType) => (state: RootState) =>
//     state.progress.flows[flow]?.step ?? 0;
