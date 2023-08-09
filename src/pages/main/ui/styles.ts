import { css } from '@emotion/css';

export const styles = css`
    --padding: 20px;

    max-width: calc(1440px + var(--padding) * 2);
    margin-inline: auto;
    padding: var(--padding);

    header {
        display: flex;
        gap: var(--padding);
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

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .table {
        padding: var(--padding);
        padding-block-start: calc(var(--padding) * 1.5);
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.23);
        background-color: #f7f7f8;
        position: relative;

        .btn-delete-table {
            position: absolute;
            right: 0;
            top: 0;
            transform: translate(15px, -15px);
            z-index: 1;
            background-color: #f7f7f8;
            border: 1px solid rgba(0, 0, 0, 0.23);

            &:hover {
                color: #d32f2f;
            }

            svg {
                transition: all 200ms ease-in-out;
            }
        }

        .text-field {
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
