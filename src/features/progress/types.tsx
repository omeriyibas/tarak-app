export type ProgressState = {
    error?: string | null;
    flows: {
        [flow: string]: { step?: number; completed: boolean };
    };
};

export type PayloadProgress = { step?: number; flow: string };


