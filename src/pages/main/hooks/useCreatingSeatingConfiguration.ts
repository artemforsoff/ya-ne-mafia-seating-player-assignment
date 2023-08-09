import { useFormik } from 'formik';
import type { SeatingConfiguration, SeatingConfigurationPlayer, SeatingConfigurationTable } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { shuffleArray } from '@/shared/lib';
import { useEffect } from 'react';
import { SEATING_CONFIGURATION_LS_KEY } from '@/shared/constants';

const defaultInitialValues: SeatingConfiguration = {
    tables: [],
};

export const useCreatingSeatingConfiguration = () => {
    const form = useFormik<SeatingConfiguration>({
        initialValues: JSON.parse(
            localStorage.getItem(SEATING_CONFIGURATION_LS_KEY) || JSON.stringify(defaultInitialValues)
        ),
        onSubmit: () => {},
        validationSchema: yup.object().shape({
            tables: yup.array().of(
                yup.object().shape({
                    playersCount: yup.number().positive().required(),
                    players: yup
                        .array()
                        .of(
                            yup.object().shape({
                                name: yup.string().required().trim(),
                            })
                        )
                        .when('playersCount', (playersCount: Array<number>, schema) => {
                            return schema.test('sd', (players) => {
                                if (players && playersCount[0]) {
                                    return players.length === playersCount[0];
                                }
                                return false;
                            });
                        }),
                })
            ),
        }),
    });

    const { values } = form;

    useEffect(() => {
        localStorage.setItem(SEATING_CONFIGURATION_LS_KEY, JSON.stringify(values));
    }, [values]);

    const createTable = () => {
        form.setFieldValue(
            'tables',
            form.values.tables.concat([
                {
                    id: uuidv4(),
                    playersCount: 10,
                    players: [],
                },
            ])
        );
    };

    const createPlayers = (tableId: SeatingConfigurationTable['id']) => {
        const tableIndex = form.values.tables.findIndex((table) => table.id === tableId);

        if (tableIndex === Math.abs(tableIndex)) {
            form.setFieldValue(
                `tables[${tableIndex}].players`,
                Array(Number(form.values.tables[tableIndex].playersCount))
                    .fill(null)
                    .map(() => {
                        const player: SeatingConfigurationPlayer = {
                            id: uuidv4(),
                            name: '',
                            placeNumber: 0,
                        };
                        return player;
                    })
            );
        }
    };

    const generatePlaceNumbers = (tableId: SeatingConfigurationTable['id']) => {
        const tableIndex = form.values.tables.findIndex((table) => table.id === tableId);

        if (tableIndex === Math.abs(tableIndex)) {
            form.setFieldValue(
                `tables[${tableIndex}].players`,
                shuffleArray(form.values.tables[tableIndex].players)
                    .map((player, index) => ({
                        ...player,
                        placeNumber: index + 1,
                    }))
                    .sort((a, b) => a.placeNumber - b.placeNumber)
            );
        }
    };

    const deleteTable = (tableId: SeatingConfigurationTable['id']) => {
        form.setFieldValue(
            `tables`,
            form.values.tables.filter((table) => table.id !== tableId)
        );
    };

    const shuffleTables = () => {
        const allPlayerNames = shuffleArray(
            form.values.tables.map((table) => table.players.map((player) => player.name)).flat()
        );

        form.setFieldValue(
            'tables',
            form.values.tables.map((table) => {
                return {
                    ...table,
                    players: table.players.map((player) => {
                        const name = allPlayerNames[0];

                        allPlayerNames.shift();

                        return {
                            ...player,
                            name,
                        };
                    }),
                };
            })
        );
    };

    return { form, createTable, createPlayers, generatePlaceNumbers, deleteTable, shuffleTables };
};
