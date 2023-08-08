import { createEvent } from 'effector';
import { createStore } from 'effector';
import type { SeatingConfiguration } from '../types';

const $seatingConfiguration = createStore<SeatingConfiguration>({
    tables: [],
});

const createTable = createEvent<SeatingConfiguration>();

$seatingConfiguration.on(createTable, (_, configuration) => configuration);

export const model = { stores: { $seatingConfiguration }, events: { createTable } };
