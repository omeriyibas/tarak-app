export enum FlowType {
    Details = "details",
    // Checkout   = "checkout",
    // Profile    = "profile",
}
//
// export const MAX_STEPS: Record<FlowType|string, number> = {
//     [FlowType.Details]: 3,
//     // [FlowType.Checkout]: 5,
//     // [FlowType.Profile]: 4,
// };

export const SCREEN_NAMES: Record<FlowType|string, string[]> = {
    [FlowType.Details]: ["Screen1","Screen2","Screen3"],
    // [FlowType.Checkout]: 5,
    // [FlowType.Profile]: 4,
};
