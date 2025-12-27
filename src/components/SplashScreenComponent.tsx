import React from 'react';
import { View, Image } from 'react-native';

export default function SplashScreenComponent() {

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                source={require('@/assets/images/racoon-splash.png')}
                style={{ width: 200 }}
                resizeMode="contain"
            />
        </View>
    );
}