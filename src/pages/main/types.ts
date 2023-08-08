export type SeatingConfigurationPlayer = Readonly<{
    id: string;
    name: string;
    placeNumber: number;
}>;

export type SeatingConfigurationTable = Readonly<{
    id: string;
    playersCount: number;
    players: SeatingConfigurationPlayer[];
}>;

export type SeatingConfiguration = Readonly<{
    tables: SeatingConfigurationTable[];
}>;
