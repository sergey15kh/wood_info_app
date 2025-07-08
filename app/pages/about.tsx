import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AboutScreen = () => {
    const router = useRouter();

    const appInfo = {
        version: '1.0.0',
        releaseDate: '15 листопада 2023',
        developer: 'WoodInfo Team',
        website: 'https://woodinfo.com',
        privacyPolicy: 'https://woodinfo.com/privacy',
        termsOfUse: 'https://woodinfo.com/terms'
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Кнопка назад */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#607D8B" />
            </TouchableOpacity>

            {/* Логотип и название */}
            <View style={styles.header}>
                <Image
                    source={require('@/assets/images/react-logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>WoodInfo</Text>
                <Text style={styles.subtitle}>Ваш помічник у світі деревини</Text>
            </View>

            {/* Информация о версии */}
            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="information" size={20} color="#607D8B" />
                    <Text style={styles.infoLabel}>Версія:</Text>
                    <Text style={styles.infoValue}>{appInfo.version}</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#607D8B" />
                    <Text style={styles.infoLabel}>Дата релізу:</Text>
                    <Text style={styles.infoValue}>{appInfo.releaseDate}</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="code-tags" size={20} color="#607D8B" />
                    <Text style={styles.infoLabel}>Розробник:</Text>
                    <Text style={styles.infoValue}>{appInfo.developer}</Text>
                </View>
            </View>

            {/* Ссылки */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Посилання</Text>

                <TouchableOpacity
                    style={styles.linkItem}
                    onPress={() => Linking.openURL(appInfo.website)}
                >
                    <MaterialCommunityIcons name="web" size={22} color="#607D8B" />
                    <Text style={styles.linkText}>Офіційний сайт</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkItem}
                    onPress={() => Linking.openURL(appInfo.privacyPolicy)}
                >
                    <MaterialCommunityIcons name="shield-lock" size={22} color="#607D8B" />
                    <Text style={styles.linkText}>Політика конфіденційності</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkItem}
                    onPress={() => Linking.openURL(appInfo.termsOfUse)}
                >
                    <MaterialCommunityIcons name="file-document" size={22} color="#607D8B" />
                    <Text style={styles.linkText}>Умови використання</Text>
                </TouchableOpacity>
            </View>

            {/* Благодарности */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Подяки</Text>
                <Text style={styles.thanksText}>
                    Дякуємо, що обрали наш додаток! Ми постійно працюємо над його вдосконаленням.
                </Text>
                <Text style={styles.thanksText}>
                    Якщо у вас є пропозиції чи зауваження, будь ласка, повідомте нам через розділ "Допомога".
                </Text>
            </View>

            {/* Копирайт */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2023 WoodInfo</Text>
                <Text style={styles.footerText}>Всі права захищені</Text>
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
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#455A64',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#90A4AE',
        textAlign: 'center',
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
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoLabel: {
        marginLeft: 10,
        marginRight: 5,
        color: '#455A64',
        fontSize: 16,
        width: 120,
    },
    infoValue: {
        flex: 1,
        color: '#607D8B',
        fontSize: 16,
        fontWeight: '500',
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
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ECEFF1',
    },
    linkText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#455A64',
    },
    thanksText: {
        fontSize: 14,
        color: '#455A64',
        marginBottom: 10,
        lineHeight: 20,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#90A4AE',
        marginBottom: 5,
    },
});

export default AboutScreen;