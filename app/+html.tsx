import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
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
                  var isDark = false;
                  var stored = localStorage.getItem('theme-storage');
                  if (stored) {
                    var parsed = JSON.parse(stored);
                    if (parsed && parsed.state) {
                      isDark = parsed.state.isDark;
                    }
                  } else {
                    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  }

                  if (isDark) {
                    document.body.style.backgroundColor = '#121212';
                  } else {
                    document.body.style.backgroundColor = '#ffffff';
                  }
                } catch (e) {}
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