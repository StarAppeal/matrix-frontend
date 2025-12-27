import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

import { lightColors, darkColors } from '@/src/core/colors';

export default function Root({ children }: PropsWithChildren) {
    const lightBg = lightColors.background;
    const darkBg = darkColors.background;

    return (
        <html lang="de">
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              (function() {
                try {
                  let isDark = false;
                  let stored = localStorage.getItem('theme-storage');
                  if (stored) {
                    let parsed = JSON.parse(stored);
                    if (parsed && parsed.state) {
                      isDark = parsed.state.isDark;
                    }
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }

                  let color = isDark ? '${darkBg}' : '${lightBg}';
                  document.documentElement.style.setProperty('background-color', color, 'important');
                  
                } catch (e) {
                    console.error('Splash script failed', e);
                }
              })();
            `,
                }}
            />
            <ScrollViewStyleReset />
        </head>
        <body>{children}</body>
        </html>
    );
}