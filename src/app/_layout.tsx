import {ClerkProvider} from "@clerk/expo";
import {tokenCache} from "@clerk/expo/token-cache"
import { Stack } from "expo-router";
import "../../global.css"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";

const pulishableKey =  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if(!pulishableKey){
  throw new Error("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set")
}

export default function RootLayout(){
  const colorScheme = useColorScheme()
  return (
  <ClerkProvider publishableKey={pulishableKey} tokenCache={tokenCache}>  
    <ThemeProvider value={colorScheme === "dark"? DarkTheme :DefaultTheme}>
      <Stack screenOptions={{headerShown: false}}/>
    </ThemeProvider>  
  </ClerkProvider>
)}
