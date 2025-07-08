import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { app } from '@/firebase/config';
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

const categories = [
    { key: 'edged', icon: 'floor-plan', labelKey: 'category.edged', color: '#E3F2FD' },
    { key: 'unedged', icon: 'image-filter-hdr', labelKey: 'category.unedged', color: '#E8F5E9' },
    { key: 'furniture', icon: 'table-furniture', labelKey: 'category.furniture', color: '#FFF8E1' },
    { key: 'calculator', icon: 'calculator-variant', labelKey: 'category.calculator', color: '#F3E5F5' },
    { key: 'materials', icon: 'wood', labelKey: 'category.materials', color: '#E0F7FA' },
    { key: 'projects', icon: 'folder-information', labelKey: 'category.projects', color: '#F1F8E9' },
];

export default function HomeScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const handleAuth = async () => {
        try {
            if (user) {
                router.push('../profile');
            } else {
                const provider = new GoogleAuthProvider();
                await signInWithRedirect(auth, provider);
            }
        } catch (error) {
            Alert.alert(t('auth.error'), error.message);
        }
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.categoryBox, { backgroundColor: item.color }]}
            onPress={() => router.push(`../${item.key}`)}
        >
            <MaterialCommunityIcons name={item.icon} size={32} color="#455A64" />
            <Text style={styles.categoryText}>
                {t(item.labelKey)}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>{t('loading')}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.appTitle}>Wood Info</Text>
                    <Text style={styles.appSubtitle}>{t('app.tagline')}</Text>
                </View>

                <TouchableOpacity
                    style={styles.settingsIcon}
                    onPress={() => router.push('../profile')}
                >
                    <Ionicons name="settings-outline" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* User Profile Section */}
            <TouchableOpacity style={styles.userCard} onPress={handleAuth}>
                <Image
                    source={user?.photoURL ? { uri: user.photoURL } : require('@/assets/images/no_avatar.png')}
                    style={styles.avatar}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user?.displayName || t('guest')}</Text>
                    <Text style={styles.userStatus}>
                        {user ? t('app.premium_member') : t('app.not_registered')}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#90A4AE" />
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#90A4AE" style={styles.searchIcon} />
                <TextInput
                    placeholder={t('search')}
                    placeholderTextColor="#90A4AE"
                    style={styles.searchInput}
                />
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickAction}>
                    <View style={[styles.quickActionIcon, { backgroundColor: '#E3F2FD' }]}>
                        <MaterialCommunityIcons name="history" size={20} color="#1976D2" />
                    </View>
                    <Text style={styles.quickActionText}>{t('actions.history')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickAction}>
                    <View style={[styles.quickActionIcon, { backgroundColor: '#FFF8E1' }]}>
                        <MaterialCommunityIcons name="star" size={20} color="#FFA000" />
                    </View>
                    <Text style={styles.quickActionText}>{t('actions.favorites')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.quickAction}>
                    <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E9' }]}>
                        <MaterialCommunityIcons name="share" size={20} color="#388E3C" />
                    </View>
                    <Text style={styles.quickActionText}>{t('actions.share')}</Text>
                </TouchableOpacity>
            </View>

            {/* Categories Section */}
            <Text style={styles.sectionTitle}>{t('categories')}</Text>
            <FlatList
                data={categories}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={styles.categoryContainer}
                keyExtractor={(item) => item.key}
                renderItem={renderCategoryItem}
            />

            {/* Recent Calculations */}
            <View style={styles.recentSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{t('recent.title')}</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>{t('recent.see_all')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.recentItem}>
                    <View style={[styles.recentIcon, { backgroundColor: '#E3F2FD' }]}>
                        <MaterialCommunityIcons name="calculator-variant" size={20} color="#1976D2" />
                    </View>
                    <View style={styles.recentDetails}>
                        <Text style={styles.recentTitle}>Oak Board Calculation</Text>
                        <Text style={styles.recentSubtitle}>2 days ago</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#90A4AE" />
                </View>

                <View style={styles.recentItem}>
                    <View style={[styles.recentIcon, { backgroundColor: '#E8F5E9' }]}>
                        <MaterialCommunityIcons name="floor-plan" size={20} color="#388E3C" />
                    </View>
                    <View style={styles.recentDetails}>
                        <Text style={styles.recentTitle}>Pine Beam Project</Text>
                        <Text style={styles.recentSubtitle}>1 week ago</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#90A4AE" />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#607D8B',
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    headerContent: {
        flex: 1,
    },
    appTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
    },
    appSubtitle: {
        fontSize: 14,
        color: '#CFD8DC',
    },
    settingsIcon: {
        padding: 8,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#ECEFF1',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#455A64',
    },
    userStatus: {
        fontSize: 12,
        color: '#90A4AE',
        marginTop: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#455A64',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 24,
    },
    quickAction: {
        alignItems: 'center',
        width: '30%',
    },
    quickActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickActionText: {
        fontSize: 12,
        color: '#607D8B',
        fontWeight: '500',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#455A64',
        marginHorizontal: 20,
        marginBottom: 16,
    },
    categoryContainer: {
        paddingHorizontal: 15,
    },
    categoryBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        padding: 20,
        margin: 8,
        minHeight: 120,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    categoryText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
        color: '#455A64',
    },
    recentSection: {
        marginTop: 8,
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 12,
    },
    seeAll: {
        color: '#90A4AE',
        fontSize: 14,
        fontWeight: '500',
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    recentIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    recentDetails: {
        flex: 1,
    },
    recentTitle: {
        fontSize: 14,
        color: '#455A64',
        fontWeight: '500',
    },
    recentSubtitle: {
        fontSize: 12,
        color: '#90A4AE',
        marginTop: 4,
    },
});