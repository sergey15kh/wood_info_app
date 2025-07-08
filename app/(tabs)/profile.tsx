import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
    const router = useRouter();
    const user = {
        name: 'Іван Петров',
        email: 'ivan.petrov@example.com',
        phone: '+380 (99) 123-45-67',
        avatar: require('@/assets/images/no_avatar.png'),
        registrationDate: '15 березня 2022',
    };

    const menuItems = [
        { icon: 'cog', title: 'Налаштування', action: 'settings' },
        { icon: 'shield-account', title: 'Безпека', action: 'security' },
        { icon: 'help-circle', title: 'Допомога', action: 'help' },
        { icon: 'information', title: 'Про додаток', action: 'about' },
        { icon: 'logout', title: 'Вийти', action: 'logout' },
    ];

    const handleMenuItemPress = (action: string) => {
        if (action === 'settings') {
            router.push('/pages/settings');
        }
        if (action === 'security') {
            router.push('/pages/security');
        }
        if (action === 'help') {
            router.push('/pages/help');
        }
        if (action === 'about') {
            router.push('/pages/about'); // Добавляем переход на страницу "Про додаток"
        }
        console.log(action);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.profileHeader}>
                <Image source={user.avatar} style={styles.avatar} />
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                    <MaterialCommunityIcons name="phone" size={20} color="#607D8B" />
                    <Text style={styles.infoText}>{user.phone}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#607D8B" />
                    <Text style={styles.infoText}>Дата реєстрації: {user.registrationDate}</Text>
                </View>
            </View>

            <View style={styles.menuCard}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => handleMenuItemPress(item.action)}
                    >
                        <MaterialCommunityIcons name={item.icon} size={24} color="#607D8B" />
                        <Text style={styles.menuItemText}>{item.title}</Text>
                        <MaterialCommunityIcons name="chevron-right" size={24} color="#90A4AE" />
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.upgradeButton}>
                <MaterialCommunityIcons name="crown" size={20} color="#FFA000" />
                <Text style={styles.upgradeButtonText}>Оновити до PRO версії</Text>
            </TouchableOpacity>
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
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#ECEFF1',
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#90A4AE',
    },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
        color: '#455A64',
        fontSize: 14,
    },
    menuCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ECEFF1',
    },
    menuItemText: {
        flex: 1,
        marginLeft: 15,
        color: '#455A64',
        fontSize: 16,
    },
    upgradeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8E1',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#FFE082',
    },
    upgradeButtonText: {
        marginLeft: 10,
        color: '#FFA000',
        fontWeight: '600',
    },
});

export default ProfileScreen;