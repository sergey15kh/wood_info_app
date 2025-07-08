import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SecurityScreen = () => {
    const router = useRouter();
    const [biometricAuth, setBiometricAuth] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [passwordChangeRequired, setPasswordChangeRequired] = useState(false);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Кнопка назад */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#607D8B" />
            </TouchableOpacity>

            <Text style={styles.title}>Безпека</Text>

            {/* Биометрическая аутентификация */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Біометрична автентифікація</Text>
                <View style={styles.switchItem}>
                    <View style={styles.switchTextContainer}>
                        <MaterialCommunityIcons name="fingerprint" size={20} color="#607D8B" style={styles.icon} />
                        <Text style={styles.switchText}>Увійти за допомогою відбитку</Text>
                    </View>
                    <Switch
                        value={biometricAuth}
                        onValueChange={setBiometricAuth}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#ECEFF1', true: '#607D8B' }}
                    />
                </View>
            </View>

            {/* Двухфакторная аутентификация */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Двофакторна автентифікація</Text>
                <View style={styles.switchItem}>
                    <View style={styles.switchTextContainer}>
                        <MaterialCommunityIcons name="cellphone-key" size={20} color="#607D8B" style={styles.icon} />
                        <Text style={styles.switchText}>Вимкнути/Увімкнути 2FA</Text>
                    </View>
                    <Switch
                        value={twoFactorAuth}
                        onValueChange={setTwoFactorAuth}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#ECEFF1', true: '#607D8B' }}
                    />
                </View>
            </View>

            {/* Смена пароля */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Пароль</Text>
                <TouchableOpacity style={styles.actionItem}>
                    <MaterialCommunityIcons name="form-textbox-password" size={20} color="#607D8B" style={styles.icon} />
                    <Text style={styles.actionText}>Змінити пароль</Text>
                </TouchableOpacity>

                <View style={styles.switchItem}>
                    <View style={styles.switchTextContainer}>
                        <MaterialCommunityIcons name="calendar-alert" size={20} color="#607D8B" style={styles.icon} />
                        <Text style={styles.switchText}>Вимагати зміни пароля щомісяця</Text>
                    </View>
                    <Switch
                        value={passwordChangeRequired}
                        onValueChange={setPasswordChangeRequired}
                        thumbColor="#FFFFFF"
                        trackColor={{ false: '#ECEFF1', true: '#607D8B' }}
                    />
                </View>
            </View>

            {/* Активные сессии */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Активні сесії</Text>
                <TouchableOpacity style={styles.actionItem}>
                    <MaterialCommunityIcons name="devices" size={20} color="#607D8B" style={styles.icon} />
                    <Text style={styles.actionText}>Переглянути всі пристрої</Text>
                </TouchableOpacity>
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
    switchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    switchTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchText: {
        fontSize: 16,
        color: '#455A64',
        marginLeft: 10,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ECEFF1',
    },
    actionText: {
        fontSize: 16,
        color: '#455A64',
        marginLeft: 10,
    },
    icon: {
        width: 24,
        textAlign: 'center',
    },
});

export default SecurityScreen;