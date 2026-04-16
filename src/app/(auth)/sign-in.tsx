import { Image } from "expo-image";
import { Pressable, Text, View, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import useSocialAuth from "../hooks/useSocialAuth";

const SocialButton = ({ 
  title, 
  loadingTitle, 
  icon, 
  isClicked, 
  isLoadingGlobally, 
  onPress, 
  isApple = false 
} :any) => {
  const disabled = isLoadingGlobally;

  return (
    <Pressable
      className={`mb-4 h-14 flex-row items-center rounded-2xl border px-4 shadow-sm active:opacity-80 
        ${isApple ? "border-foreground bg-foreground" : "border-border bg-card"} 
        ${disabled && !isClicked ? "opacity-50" : ""}
      `}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: isClicked }}
    >
      <View className="h-8 w-8 items-center justify-center rounded-full bg-white">
        {icon}
      </View>

      <Text
        className={`ml-3 flex-1 text-lg font-semibold ${
          isApple ? "text-background" : "text-card-foreground"
        }`}
      >
        {isClicked ? loadingTitle : title}
      </Text>

      {isClicked ? (
        <ActivityIndicator color={isApple ? "#ffffff" : "#5f6e66"} />
      ) : (
        <FontAwesome 
          name="angle-right" 
          size={18} 
          color={isApple ? "#ffffff" : "#5f6e66"} 
        />
      )}
    </Pressable>
  );
};

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isAppleClicked = loadingStrategy === "oauth_apple";
  const isFacebookClicked = loadingStrategy === "oauth_facebook";

  const isLoading = isAppleClicked || isFacebookClicked || isGoogleClicked;

  return (
    <SafeAreaView className="flex-1 bg-primary dark:bg-secondary" edges={["top"]}>
      {/* Decorative elements */}
      <View className="absolute -left-16 top-12 h-56 w-56 rounded-full bg-primary/80 dark:bg-background/40" />
      <View className="absolute right-[-74px] top-40 h-72 w-72 rounded-full bg-primary/70 dark:bg-background/35" />

      {/* Top Header Section */}
      <View className="px-6 pt-4">
        <Text className="text-center font-mono text-5xl font-extrabold uppercase tracking-tight text-primary-foreground dark:text-foreground">
          Grocify
        </Text>
        <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-foreground/75">
          Plan smarter. Shop happier.
        </Text>

        <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3">
          <Image
            source={require("../../../assets/images/auth.png")}
            style={{ width: "100%", height: 300 }}
            contentFit="contain"
            accessibilityLabel="Grocify authentication illustration"
          />
        </View>
      </View>

      {/* Bottom Card Section */}
      <View className="mt-8 flex-1 overflow-hidden rounded-t-[36px] bg-card">
        {/* 3. Added ScrollView to prevent cutting off text on small phones */}
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, paddingTop: 24 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="self-center rounded-full bg-secondary px-3 py-1">
            <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
              Welcome Back
            </Text>
          </View>

          <Text className="mt-3 mb-6 text-center text-sm leading-6 text-muted-foreground">
            Choose a social provider and jump right into your personalized grocery experience.
          </Text>

          <View>
            <SocialButton
              title="Continue with Google"
              loadingTitle="Connecting Google..."
              icon={<Image source={require("../../../assets/images/google.png")} style={{ width: 20, height: 20 }} />}
              isClicked={isGoogleClicked}
              isLoadingGlobally={isLoading}
              onPress={() => handleSocialAuth("oauth_google")}
            />

            <SocialButton
              title="Continue with Facebook"
              loadingTitle="Connecting Facebook..."
              icon={<FontAwesome name="facebook" size={24} color="#111" />}
              isClicked={isFacebookClicked}
              isLoadingGlobally={isLoading}
              onPress={() => handleSocialAuth("oauth_facebook")}
            />

            <SocialButton
              title="Continue with Apple"
              loadingTitle="Connecting Apple..."
              icon={<FontAwesome6 name="apple" size={22} color="#111" />}
              isClicked={isAppleClicked}
              isLoadingGlobally={isLoading}
              onPress={() => handleSocialAuth("oauth_apple")}
              isApple={true}
            />
          </View>

          <Text className="mt-4 text-center text-sm leading-5 text-muted-foreground">
            By continuing, you agree to our Terms and Privacy Policy.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}