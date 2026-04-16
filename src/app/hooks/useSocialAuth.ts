import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const {startSSOFlow} = useSSO();

    const handleSocialAuth = async(strategy:"oauth_google" | "oauth_facebook" | "oauth_apple") => {
        setLoadingStrategy(strategy);
        try {
            if(loadingStrategy) {
                Alert.alert("Authentication in progress", `Please wait while we complete the ${loadingStrategy.replace("oauth_", "")} authentication.`);
                return;
            }

            const {createdSessionId , setActive} = await startSSOFlow({strategy});;
            if(!createdSessionId || !setActive) {
                Alert.alert("Error during social authentication: Failed to create session");
                return;
            }
            await setActive({session: createdSessionId});
        } catch (error) {
            console.error("Error during social authentication:", error);
            Alert.alert("Error during social authentication", error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoadingStrategy(null);
        }
    }
    return{handleSocialAuth, loadingStrategy};

}

export default useSocialAuth;