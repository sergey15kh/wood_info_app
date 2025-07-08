import React from 'react';
import { View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button title="🇺🇦" onPress={() => i18n.changeLanguage('uk')} />
            <Button title="🇷🇺" onPress={() => i18n.changeLanguage('ru')} />
        </View>
    );
}
