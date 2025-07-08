import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ProductScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    // Данные товара (в реальном приложении будут получаться по id)
    const product = {
        id: '1',
        name: 'Доска сосновая 40x150x6000',
        price: 450,
        oldPrice: 520,
        shop: 'ЛесТорг',
        rating: 4.5,
        reviewsCount: 24,
        description: 'Высококачественная обрезная доска из сосны. Идеально подходит для строительства, отделки и изготовления мебели.',
        characteristics: [
            { name: 'Порода дерева', value: 'Сосна' },
            { name: 'Сорт', value: 'A' },
            { name: 'Влажность', value: '12%' },
            { name: 'Длина', value: '6 м' },
            { name: 'Ширина', value: '150 мм' },
            { name: 'Толщина', value: '40 мм' },
        ],
        images: [
            require('@/assets/images/catalog.png'),
            require('@/assets/images/catalog.png'),
            require('@/assets/images/catalog.png'),
        ]
    };

    const handleAddToCart = () => {
        // Логика добавления в корзину
        console.log(`Added ${quantity} items to cart`);
        router.back();
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Кнопка назад */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#607D8B" />
                </TouchableOpacity>

                {/* Галерея изображений */}
                <View style={styles.galleryContainer}>
                    <Image source={product.images[activeImage]} style={styles.mainImage} />
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.thumbnailContainer}
                    >
                        {product.images.map((img, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveImage(index)}
                                style={[
                                    styles.thumbnail,
                                    index === activeImage && styles.thumbnailActive
                                ]}
                            >
                                <Image source={img} style={styles.thumbnailImage} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Основная информация */}
                <View style={styles.infoCard}>
                    <Text style={styles.productName}>{product.name}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{product.price} ₽</Text>
                        {product.oldPrice && (
                            <Text style={styles.oldPrice}>{product.oldPrice} ₽</Text>
                        )}
                    </View>

                    <View style={styles.shopContainer}>
                        <MaterialCommunityIcons name="storefront" size={20} color="#607D8B" />
                        <Text style={styles.shopName}>{product.shop}</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <MaterialCommunityIcons name="star" size={16} color="#FFA000" />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                        <Text style={styles.reviewsText}>({product.reviewsCount} отзывов)</Text>
                    </View>
                </View>

                {/* Характеристики */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Характеристики</Text>
                    <View style={styles.characteristicsContainer}>
                        {product.characteristics.map((char, index) => (
                            <View key={index} style={styles.characteristicRow}>
                                <Text style={styles.characteristicName}>{char.name}</Text>
                                <Text style={styles.characteristicValue}>{char.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Описание */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Описание</Text>
                    <Text style={styles.descriptionText}>{product.description}</Text>
                </View>
            </ScrollView>

            {/* Панель добавления в корзину */}
            <View style={styles.cartPanel}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                        <MaterialCommunityIcons name="minus" size={20} color="#607D8B" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                        <MaterialCommunityIcons name="plus" size={20} color="#607D8B" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartText}>В корзину</Text>
                    <Text style={styles.addToCartPrice}>{product.price * quantity} ₽</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    content: {
        paddingBottom: 100, // Для нижней панели
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 8,
    },
    galleryContainer: {
        marginBottom: 16,
    },
    mainImage: {
        width: '100%',
        height: width * 0.8,
        resizeMode: 'cover',
    },
    thumbnailContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ECEFF1',
    },
    thumbnailActive: {
        borderColor: '#607D8B',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
    },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    productName: {
        fontSize: 20,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#607D8B',
        marginRight: 12,
    },
    oldPrice: {
        fontSize: 16,
        color: '#90A4AE',
        textDecorationLine: 'line-through',
    },
    shopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    shopName: {
        marginLeft: 8,
        color: '#607D8B',
        fontSize: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 4,
        color: '#455A64',
        fontSize: 14,
    },
    reviewsText: {
        marginLeft: 8,
        color: '#90A4AE',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 12,
    },
    characteristicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    characteristicRow: {
        width: '50%',
        marginBottom: 12,
    },
    characteristicName: {
        color: '#90A4AE',
        fontSize: 14,
        marginBottom: 2,
    },
    characteristicValue: {
        color: '#455A64',
        fontSize: 16,
        fontWeight: '500',
    },
    descriptionText: {
        color: '#455A64',
        fontSize: 16,
        lineHeight: 24,
    },
    cartPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ECEFF1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECEFF1',
        borderRadius: 12,
        paddingHorizontal: 8,
        marginRight: 16,
    },
    quantityButton: {
        padding: 8,
    },
    quantityText: {
        minWidth: 30,
        textAlign: 'center',
        color: '#455A64',
        fontSize: 16,
        fontWeight: '500',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#607D8B',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addToCartText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    addToCartPrice: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ProductScreen;