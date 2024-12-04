import {ThemeType} from "@/src/core/theme";
import {StyleSheet, View} from "react-native";
import {useTheme} from "@/src/context/ThemeProvider";

const createStyles = (theme: ThemeType) => {
    return StyleSheet.create({
        container: {
            flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background
        },
    });
}
export const ThemedView = ({children}: { children: React.ReactNode }) => {
    const {theme} = useTheme();
    const styles = createStyles(theme);
    return <View style={styles.container}>{children}</View>;
}
