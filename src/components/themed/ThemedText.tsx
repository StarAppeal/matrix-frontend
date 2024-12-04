import {ThemeType} from "@/src/core/theme";
import {StyleSheet, Text} from "react-native";
import {useTheme} from "@/src/context/ThemeProvider";

const createStyles = (theme: ThemeType) => {
    return StyleSheet.create({
        text: {
            color: theme.colors.text,
        },
    });
}
export const ThemedText = ({children}: { children: React.ReactNode }) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return <Text style={styles.text}>{children}</Text>;
}
