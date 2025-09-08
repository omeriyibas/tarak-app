import {createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';
import {loadProgressThunk, updateProgressThunk} from '@/src/features/progress/thunks';
import {updateFlow,errorFlow} from "@/src/features/progress/slice"; // veya hook dışı erişim için ayrı bir wrapper

export const progressListener = createListenerMiddleware();

progressListener.startListening({
    matcher: isAnyOf(updateProgressThunk.fulfilled, loadProgressThunk.fulfilled),
    effect: async (action, listenerApi) => {
        const {flow, step} = action.payload as { flow: string; step: number };
        listenerApi.dispatch(updateFlow({flow, step}));

        // console.log("gonext")
        // const segment = SCREEN_NAMES[flow][step];
        // if (segment) router.replace(`/screens/step/${segment}`);


    },
});

progressListener.startListening({
    matcher: isAnyOf(updateProgressThunk.rejected, loadProgressThunk.rejected),
    effect: async (action, listenerApi) => {

        const msg = (action.payload as string)
        listenerApi.dispatch(errorFlow(msg));

    },
});

