import type { Preview } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';
import '../src/app/globals.css';

import messages from '../messages/en.json';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Pulse Design System theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: '☀️ Light', icon: 'sun' },
          { value: 'dark', title: '🌙 Dark', icon: 'moon' },
          { value: 'neon', title: '⚡ Neon', icon: 'lightning' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'neon');
        root.classList.add(theme);
        document.body.style.backgroundColor = 'var(--background)';
        document.body.style.color = 'var(--foreground)';
      }, [theme]);

      return React.createElement(
        ThemeProvider,
        { attribute: 'class', forcedTheme: theme, enableSystem: false },
        React.createElement(
          NextIntlClientProvider,
          { locale: 'en', messages },
          React.createElement(
            'div',
            { style: { padding: '1rem', minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)' } },
            React.createElement(Story)
          )
        )
      );
    },
  ],
};

export default preview;