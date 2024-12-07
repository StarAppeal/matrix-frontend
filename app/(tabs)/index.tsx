import ThemedButton from "@/src/components/themed/ThemedButton";
import ThemedBackground from "@/src/components/themed/ThemedBackground";
import {useAuth} from "@/src/context/AuthProvider";
import {useRouter} from "expo-router";
import ThemedHeader from "@/src/components/themed/ThemedHeader";

export default function HomeScreen() {
    const {logout} = useAuth();
    const router = useRouter();
    return (
        <ThemedBackground>
            <ThemedHeader>Welcome to the Home Page!</ThemedHeader>
            <ThemedButton mode={"outlined"} onPress={() => {
                console.log("Button pressed");
                logout().then(() => {
                    router.replace("/login");
                });
            }
            }>
                Logout
            </ThemedButton>
        </ThemedBackground>

    );
}
