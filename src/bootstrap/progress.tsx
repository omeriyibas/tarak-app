import { FlowType } from "@/src/constants/progress";
import { loadProgressThunk } from "@/src/features/progress/thunks";
import store from "@/src/store/store";


export async function bootstrapProgress() {
    const res: any = await store.dispatch<any>(loadProgressThunk(FlowType.Details));

}
