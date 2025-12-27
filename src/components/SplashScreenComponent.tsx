import React from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { useThemeStore } from '@/src/stores/themeStore';

export default function SplashScreenComponent() {
    const systemColorScheme = useColorScheme();

    const { isDark, isHydrated } = useThemeStore();

    const effectiveIsDark = isHydrated ? isDark : systemColorScheme === 'dark';

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: effectiveIsDark ? '#121212' : '#ffffff',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                source={require('@/assets/images/racoon-splash.png')}
                style={{ width: 200, resizeMode: 'contain' }}
            />
        </View>
    );
}