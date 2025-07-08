import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabLayout = () => {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();

    const colors = {
        light: {
            background: '#FFFFFF',
            activeTint: '#607D8B',
            inactiveTint: '#90A4AE',
            tabBarBg: '#FFFFFF',
            border: '#ECEFF1',
        },
        dark: {
            background: '#263238',
            activeTint: '#CFD8DC',
            inactiveTint: '#78909C',
            tabBarBg: '#37474F',
            border: '#455A64',
        },
    };

    const currentColors = colors[colorScheme ?? 'light'];

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: currentColors.activeTint,
                tabBarInactiveTintColor: currentColors.inactiveTint,
                headerShown: false,
                animation: 'none',
                tabBarStyle: {
                    backgroundColor: currentColors.tabBarBg,
                    borderTopWidth: 1,
                    borderTopColor: currentColors.border,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 10,
                    position: 'absolute',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: Platform.select({
                        android: 8,
                        default: 0
                    }),
                    shadowColor: Platform.select({
                        ios: '#000',
                        default: undefined
                    }),
                    shadowOffset: Platform.select({
                        ios: { width: 0, height: -2 },
                        default: undefined
                    }),
                    shadowOpacity: Platform.select({
                        ios: 0.1,
                        default: undefined
                    }),
                    shadowRadius: Platform.select({
                        ios: 8,
                        default: undefined
                    }),
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    marginBottom: Platform.OS === 'ios' ? 0 : 5,
                },
                tabBarItemStyle: {
                    paddingVertical: 8,
                },
            }}
            backBehavior="none"
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Главная',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'home' : 'home-outline'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="catalog"
                options={{
                    title: 'Каталог',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'magnify' : 'magnify-expand'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="calculator"
                options={{
                    title: 'Калькулятор',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'calculator-variant' : 'calculator-variant-outline'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: 'Проекты',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'folder' : 'folder-outline'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'account' : 'account-outline'}
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
