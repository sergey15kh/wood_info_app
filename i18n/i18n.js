import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импортируем переводы
import en from './locales/en.json';
import uk from './locales/uk.json';
import ru from './locales/ru.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            uk: { translation: uk },
            ru: { translation: ru }
        },
        lng: 'uk', // язык по умолчанию
        fallbackLng: 'uk',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;