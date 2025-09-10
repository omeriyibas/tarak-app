export enum FlowType {
    Details = "details",
    // Checkout   = "checkout",
    // Profile    = "profile",
}

export const SCREEN_NAMES: Record<FlowType|string, string[]> = {
    [FlowType.Details]: ["DayScreen","HourScreen","AdresScreen","ProfileScreen","PhotoScreen"],
    // [FlowType.Checkout]: 5,
    // [FlowType.Profile]: 4,
};

export const SCREEN_HEAD_TEXT: Record<FlowType|string, string[]> = {
    [FlowType.Details]: ["Çalışma Günleri","Çalışma Saatleri","Adres Seçimi","Mağaza Profili","Fotoğraflar"],
    // [FlowType.Checkout]: 5,
    // [FlowType.Profile]: 4,
};
