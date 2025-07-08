import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CalculatorScreen = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [thickness, setThickness] = useState('');
    const [quantity, setQuantity] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [woodType, setWoodType] = useState('pine');

    const calculate = () => {
        if (length && width && thickness && quantity) {
            const volume = (parseFloat(length) * parseFloat(width) * parseFloat(thickness) * parseFloat(quantity)) / 1000000;
            setResult(volume);
        }
    };

    const reset = () => {
        setLength('');
        setWidth('');
        setThickness('');
        setQuantity('');
        setResult(null);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Калькулятор древесины</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Тип древесины</Text>
                <View style={styles.woodTypeContainer}>
                    {['pine', 'oak', 'birch', 'spruce'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[styles.woodTypeButton, woodType === type && styles.woodTypeSelected]}
                            onPress={() => setWoodType(type)}
                        >
                            <MaterialCommunityIcons
                                name="tree"
                                size={20}
                                color={woodType === type ? '#FFF' : '#607D8B'}
                            />
                            <Text style={[styles.woodTypeText, woodType === type && styles.woodTypeTextSelected]}>
                                {type === 'pine' ? 'Сосна' :
                                    type === 'oak' ? 'Дуб' :
                                        type === 'birch' ? 'Береза' : 'Ель'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Параметры доски</Text>

                <InputField
                    label="Длина (мм)"
                    icon="ruler"
                    value={length}
                    onChangeText={setLength}
                    keyboardType="numeric"
                />

                <InputField
                    label="Ширина (мм)"
                    icon="ruler"
                    value={width}
                    onChangeText={setWidth}
                    keyboardType="numeric"
                />

                <InputField
                    label="Толщина (мм)"
                    icon="ruler"
                    value={thickness}
                    onChangeText={setThickness}
                    keyboardType="numeric"
                />

                <InputField
                    label="Количество"
                    icon="numeric"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                />
            </View>

            {result !== null && (
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>Результат</Text>
                    <Text style={styles.resultValue}>{result.toFixed(2)} м³</Text>
                    <Text style={styles.resultNote}>Примерная стоимость: {(result * 15000).toFixed(0)} ₽</Text>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.resetButton} onPress={reset}>
                    <Text style={styles.resetButtonText}>Сбросить</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
                    <Text style={styles.calculateButtonText}>Рассчитать</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const InputField = ({ label, icon, value, onChangeText, keyboardType }: any) => (
    <View style={styles.inputContainer}>
        <View style={styles.inputLabel}>
            <MaterialCommunityIcons name={icon} size={18} color="#607D8B" />
            <Text style={styles.inputLabelText}>{label}</Text>
        </View>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder="0"
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#455A64',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
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
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 15,
    },
    woodTypeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    woodTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#CFD8DC',
        marginBottom: 10,
        width: '48%',
    },
    woodTypeSelected: {
        backgroundColor: '#607D8B',
        borderColor: '#607D8B',
    },
    woodTypeText: {
        marginLeft: 8,
        color: '#607D8B',
        fontSize: 14,
    },
    woodTypeTextSelected: {
        color: '#FFF',
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    inputLabelText: {
        marginLeft: 8,
        color: '#607D8B',
        fontSize: 14,
    },
    input: {
        backgroundColor: '#F5F7F8',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#455A64',
    },
    resultCard: {
        backgroundColor: '#E3F2FD',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1976D2',
        marginBottom: 5,
    },
    resultValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0D47A1',
        marginBottom: 5,
    },
    resultNote: {
        fontSize: 14,
        color: '#1976D2',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resetButton: {
        backgroundColor: '#ECEFF1',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    resetButtonText: {
        color: '#607D8B',
        fontWeight: '600',
    },
    calculateButton: {
        backgroundColor: '#607D8B',
        borderRadius: 12,
        padding: 15,
        alignItems: 'center',
        flex: 1,
    },
    calculateButtonText: {
        color: '#FFF',
        fontWeight: '600',
    },
});

export default CalculatorScreen;