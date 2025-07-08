import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from '@/firebase/firebase';

const AuthScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const validatePassword = (pass: string) => {
        if (pass.length < 6) return false;
        if (!/[A-Z]/.test(pass)) return false;
        if (!/[0-9]/.test(pass)) return false;
        return true;
    };

    const handleAuth = async () => {
        if (!isLogin && !validatePassword(password)) {
            Alert.alert(
                t('auth.error'),
                t('auth.password_requirements') + '\n' +
                `• ${t('auth.min_length')}\n` +
                `• ${t('auth.one_uppercase')}\n` +
                `• ${t('auth.one_number')}`
            );
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                router.back();
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert(t('auth.success'), t('auth.registration_success'));
                setIsLogin(true);
            }
        } catch (error) {
            Alert.alert(t('auth.error'), error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.back();
        } catch (error) {
            Alert.alert(t('auth.error'), error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isLogin ? t('auth.login') : t('auth.register')}
            </Text>

            <TextInput
                style={styles.input}
                placeholder={t('auth.email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder={t('auth.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>
                    {isLogin ? t('auth.login') : t('auth.register')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleSignIn}
            >
                <Text style={styles.googleButtonText}>
                    {t('auth.sign_in_with_google')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsLogin(!isLogin)}
            >
                <Text style={styles.toggleText}>
                    {isLogin ? t('auth.switch_to_register') : t('auth.switch_to_login')}
                </Text>
            </TouchableOpacity>

            {!isLogin && (
                <View style={styles.passwordRequirements}>
                    <Text style={styles.requirementsTitle}>
                        {t('auth.password_requirements')}
                    </Text>
                    <Text style={styles.requirementItem}>
                        • {t('auth.min_length')}
                    </Text>
                    <Text style={styles.requirementItem}>
                        • {t('auth.one_uppercase')}
                    </Text>
                    <Text style={styles.requirementItem}>
                        • {t('auth.one_number')}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#455A64',
    },
    input: {
        height: 50,
        borderColor: '#CFD8DC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#607D8B',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    googleButton: {
        backgroundColor: '#DB4437',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    googleButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    toggleButton: {
        marginTop: 15,
    },
    toggleText: {
        color: '#607D8B',
        textAlign: 'center',
    },
    passwordRequirements: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    requirementsTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#455A64',
    },
    requirementItem: {
        marginLeft: 10,
        color: '#607D8B',
    },
});

export default AuthScreen;