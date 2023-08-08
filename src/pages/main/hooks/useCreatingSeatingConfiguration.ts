import { useFormik } from 'formik';
import { SeatingConfiguration, SeatingConfigurationPlayer, SeatingConfigurationTable } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { shuffleArray } from '@/shared/lib';

export const useCreatingSeatingConfiguration = () => {
    const form = useFormik<SeatingConfiguration>({
        initialValues: {
            tables: [],
        },
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

    return { form, createTable, createPlayers, generatePlaceNumbers };
};
