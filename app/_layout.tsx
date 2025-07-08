import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const pathname = usePathname();

    useEffect(() => {
        if (Platform.OS === 'android') {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                () => pathname === '/'
            );
            return () => backHandler.remove();
        }
    }, [pathname]);

    if (!loaded) return null;

    return (
        <SafeAreaProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                <Stack
                    screenOptions={{
                        gestureEnabled: false,
                        animation: 'none',
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen
                        name="pages/settings"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pages/security"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pages/help"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="pages/about"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
