import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Sidebar } from './Sidebar';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
    title: 'widget/Sidebar',
    component: Sidebar,
    decorators: [
        StoreDecorator({
            user: {
                authData: {},
            },
        }),
    ],
} as Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
};

export const NoAuth: Story = {
    decorators: [
        StoreDecorator({
            user: {
                authData: undefined,
            },
        }),
    ],
};

