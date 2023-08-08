import { Button, TextField, Badge } from '@mui/material';
import { FormikErrors } from 'formik';
import { useCreatingSeatingConfiguration } from '../hooks';
import { SeatingConfigurationPlayer, SeatingConfigurationTable } from '../types';
import { styles } from './styles';
import EventSeatIcon from '@mui/icons-material/EventSeat';

export const MainPage = () => {
    const { form, createTable, createPlayers, generatePlaceNumbers } = useCreatingSeatingConfiguration();

    return (
        <div className={styles}>
            <header>
                <Button variant="contained" onClick={createTable} disabled={!form.isValid}>
                    Створити стіл
                </Button>
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
                                <div className="table__head">
                                    <TextField
                                        size="small"
                                        className="field-players-count"
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
