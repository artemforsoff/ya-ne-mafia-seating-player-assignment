import { Button, TextField, Badge, IconButton } from '@mui/material';
import { FormikErrors } from 'formik';
import { useCreatingSeatingConfiguration } from '../hooks';
import { SeatingConfigurationPlayer, SeatingConfigurationTable } from '../types';
import { styles } from './styles';
import { EventSeat as EventSeatIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';
import { ConfirmDeleteTableModal } from './confirm-delete-table-modal';
import { Nullable } from '@/shared/utility-types';

export const MainPage = () => {
    const { form, createTable, createPlayers, generatePlaceNumbers, deleteTable, shuffleTables } =
        useCreatingSeatingConfiguration();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tableIdForDeleting, setTableIdForDeleting] =
        useState<Nullable<SeatingConfigurationTable['id']>>(null);

    return (
        <div className={styles}>
            <ConfirmDeleteTableModal
                open={isOpenModal}
                handleClose={() => setIsOpenModal(false)}
                handleConfirm={() => {
                    if (tableIdForDeleting) deleteTable(tableIdForDeleting);
                    setIsOpenModal(false);
                }}
            />

            <header>
                <Button variant="contained" onClick={createTable} disabled={!form.isValid}>
                    Створити стіл
                </Button>

                {form.values.tables.length > 1 && (
                    <Button variant="contained" onClick={shuffleTables} disabled={!form.isValid}>
                        Перемішати столи
                    </Button>
                )}
            </header>

            <main>
                <ul className="table-list">
                    {form.values.tables.map((table, tableIndex) => {
                        const tableErrors = form.errors.tables?.[tableIndex] as
                            | FormikErrors<SeatingConfigurationTable>
                            | undefined;

                        const hasPlayers = Boolean(
                            Number(table.playersCount) && Number(table.playersCount) === table.players.length
                        );

                        return (
                            <li key={table.id} className="table">
                                <IconButton
                                    className="btn-delete-table"
                                    aria-label="Видалити стіл"
                                    onClick={() => {
                                        setIsOpenModal(true);
                                        setTableIdForDeleting(table.id);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>

                                <div className="table__head">
                                    <TextField
                                        size="small"
                                        className="text-field"
                                        required
                                        label="Кількість гравців"
                                        variant="outlined"
                                        value={table.playersCount}
                                        error={Boolean(tableErrors?.playersCount)}
                                        onChange={(event) => {
                                            form.setFieldValue(
                                                `tables[${tableIndex}].playersCount`,
                                                event.target.value
                                            );
                                        }}
                                        disabled={hasPlayers}
                                    />

                                    <Button
                                        variant="contained"
                                        disabled={Boolean(tableErrors?.playersCount || hasPlayers)}
                                        onClick={() => createPlayers(table.id)}
                                    >
                                        Далі
                                    </Button>
                                </div>

                                {Boolean(form.values.tables[tableIndex].players.length) && (
                                    <>
                                        <div className="table__body">
                                            <ul className="table__player-list">
                                                {form.values.tables[tableIndex].players.map(
                                                    (player, playerIndex) => {
                                                        const playerErrors = tableErrors?.players?.[
                                                            playerIndex
                                                        ] as
                                                            | FormikErrors<SeatingConfigurationPlayer>
                                                            | undefined;

                                                        return (
                                                            <li
                                                                key={player.id}
                                                                className="table__player-card"
                                                            >
                                                                <Badge
                                                                    badgeContent={
                                                                        player.placeNumber === -1
                                                                            ? 'N'
                                                                            : player.placeNumber
                                                                    }
                                                                    color="primary"
                                                                >
                                                                    <EventSeatIcon color="action" />
                                                                </Badge>

                                                                <TextField
                                                                    size="small"
                                                                    className="text-field"
                                                                    required
                                                                    label="Ім'я гравця"
                                                                    variant="outlined"
                                                                    value={player.name}
                                                                    error={Boolean(playerErrors?.name)}
                                                                    onChange={(event) => {
                                                                        form.setFieldValue(
                                                                            `tables[${tableIndex}].players[${playerIndex}].name`,
                                                                            event.target.value
                                                                        );
                                                                    }}
                                                                />
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>

                                        <Button
                                            variant="contained"
                                            onClick={() => generatePlaceNumbers(table.id)}
                                            disabled={Boolean(tableErrors)}
                                        >
                                            Згенерувати номери
                                        </Button>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </main>
        </div>
    );
};
