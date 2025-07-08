import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HelpScreen = () => {
    const router = useRouter();

    const helpSections = [
        {
            title: "Часті питання",
            items: [
                {
                    icon: "help-circle",
                    title: "Як замовити матеріали?",
                    action: () => router.push('/pages/faq/ordering')
                },
                {
                    icon: "calculator",
                    title: "Як користуватися калькулятором?",
                    action: () => router.push('/pages/faq/calculator')
                },
            ]
        },
        {
            title: "Контакти",
            items: [
                {
                    icon: "email",
                    title: "Написати на пошту",
                    action: () => Linking.openURL('mailto:support@woodinfo.com')
                },
                {
                    icon: "phone",
                    title: "Зателефонувати",
                    action: () => Linking.openURL('tel:+380991234567')
                },
                {
                    icon: "chat",
                    title: "Онлайн-чат",
                    action: () => router.push('/pages/help/chat')
                },
            ]
        },
        {
            title: "Корисні матеріали",
            items: [
                {
                    icon: "book",
                    title: "Інструкція з використання",
                    action: () => Linking.openURL('https://woodinfo.com/manual')
                },
            ]
        }
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Кнопка назад */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#607D8B" />
            </TouchableOpacity>

            <Text style={styles.title}>Допомога</Text>

            {helpSections.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.items.map((item, itemIndex) => (
                        <TouchableOpacity
                            key={itemIndex}
                            style={styles.helpItem}
                            onPress={item.action}
                        >
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={22}
                                color="#607D8B"
                                style={styles.itemIcon}
                            />
                            <Text style={styles.itemText}>{item.title}</Text>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={22}
                                color="#90A4AE"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            ))}

            {/* Блок с информацией о приложении */}
            <View style={styles.infoBlock}>
                <Text style={styles.infoText}>Версія додатка: 1.0.0</Text>
                <Text style={styles.infoText}>© 2023 WoodInfo. Всі права захищені.</Text>
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
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ECEFF1',
    },
    itemIcon: {
        width: 30,
        textAlign: 'center',
    },
    itemText: {
        flex: 1,
        fontSize: 16,
        color: '#455A64',
        marginLeft: 10,
    },
    infoBlock: {
        marginTop: 10,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: '#90A4AE',
        marginBottom: 5,
    },
});

export default HelpScreen;