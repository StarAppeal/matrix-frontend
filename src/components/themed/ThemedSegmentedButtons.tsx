import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

export type SegmentedButton<T extends string> = {
    value: T;
    label: string;
    icon?: string;
    disabled?: boolean;
};

type ThemedSegmentedButtonsProps<T extends string> = {
    value: T;
    onValueChange: (value: T) => void;
    style?: StyleProp<ViewStyle>;
} & ({
    buttons: SegmentedButton<T>[];
    options?: never;
} | {
    buttons?: never;
    options: Record<T, string>;
});

const ThemedSegmentedButtons = <T extends string>({
                                                      value,
                                                      onValueChange,
                                                      buttons,
                                                      options,
                                                      style,
                                                  }: ThemedSegmentedButtonsProps<T>) => {

    const finalButtons = buttons || (options ? (Object.keys(options) as T[]).map(key => ({
        value: key,
        label: options[key],
    })) : []);

    const handleValueChange = (val: string) => {
        onValueChange(val as T);
    };

    return (
        <View style={[styles.container, style]}>
            <SegmentedButtons
                value={value}
                onValueChange={handleValueChange}
                buttons={finalButtons}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
});

export default ThemedSegmentedButtons;