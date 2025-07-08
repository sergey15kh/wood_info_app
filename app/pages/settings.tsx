import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [currentLanguage, setCurrentLanguage] = useState('uk');

    const languages = [
        { code: 'uk', name: 'Українська' },
        { code: 'ru', name: 'Русский' },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Кнопка назад */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#607D8B" />
            </TouchableOpacity>

            <Text style={styles.title}>Налаштування</Text>

            {/* Язык */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Мова</Text>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={styles.languageItem}
                        onPress={() => setCurrentLanguage(lang.code)}
                    >
                        <Text style={styles.languageText}>{lang.name}</Text>
                        {currentLanguage === lang.code && (
                            <MaterialCommunityIcons name="check" size={24} color="#607D8B" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Тема */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Тема</Text>
                <View style={styles.switchItem}>
                    <Text style={styles.switchText}>Темна тема</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={setIsDarkMode}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#ECEFF1', true: '#607D8B' }}
                    />
                </View>
            </View>

            {/* Уведомления */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Сповіщення</Text>
                <View style={styles.switchItem}>
                    <Text style={styles.switchText}>Отримувати сповіщення</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#ECEFF1', true: '#607D8B' }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    backButton: {
        marginBottom: 20,
        padding: 8,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 30,
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 16,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ECEFF1',
    },
    languageText: {
        fontSize: 16,
        color: '#455A64',
    },
    switchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    switchText: {
        fontSize: 16,
        color: '#455A64',
    },
});

export default SettingsScreen;