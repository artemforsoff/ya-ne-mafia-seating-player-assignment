import { css } from '@emotion/css';

export const styles = css`
    --padding: 20px;

    max-width: calc(1440px + var(--padding) * 2);
    margin-inline: auto;
    padding: var(--padding);

    header {
        border-block-end: 1px solid rgba(0, 0, 0, 0.23);
        padding-block-end: var(--padding);
    }

    main {
        padding-block-start: var(--padding);
    }

    .table-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: var(--padding);
    }

    .table {
        padding: var(--padding);
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.23);
        background-color: #f7f7f8;

        .field-players-count {
            background-color: #fff;
        }

        &__head {
            display: grid;
            gap: calc(var(--padding) / 2);
        }

        &__body {
            padding-block-end: var(--padding);
        }

        &__player-list {
            padding-block-start: var(--padding);
            display: grid;
            gap: var(--padding);
        }

        &__player-card {
            display: grid;
            grid-template-columns: min-content 1fr;
            align-items: center;
            gap: var(--padding);
        }
    }
`;
