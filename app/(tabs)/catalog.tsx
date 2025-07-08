import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CatalogScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedSort, setSelectedSort] = useState('price');

    // Пример данных каталога
    const catalogData = [
        {
            id: '1',
            name: 'Доска сосновая 40x150x6000',
            price: 450,
            shop: 'ЛесТорг',
            image: require('@/assets/images/catalog.png'),
            category: 'lumber',
            rating: 4.5,
        },
        {
            id: '2',
            name: 'Брус дубовый 100x100x3000',
            price: 1200,
            shop: 'ДревСтрой',
            image: require('@/assets/images/catalog.png'),
            category: 'timber',
            rating: 4.8,
        },
    ];

    // Фильтрация и сортировка данных
    const filteredData = catalogData
        .filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.shop.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = selectedFilter === 'all' || item.category === selectedFilter;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            if (selectedSort === 'price') return a.price - b.price;
            if (selectedSort === 'rating') return b.rating - a.rating;
            return 0;
        });

    const filters = [
        { id: 'all', name: 'Все' },
        { id: 'lumber', name: 'Пиломатериалы' },
        { id: 'timber', name: 'Брус' },
        { id: 'plywood', name: 'Фанера' },
        { id: 'furniture', name: 'Мебель' },
    ];

    const sortOptions = [
        { id: 'price', name: 'По цене' },
        { id: 'rating', name: 'По рейтингу' },
        { id: 'popular', name: 'По популярности' },
    ];

    return (
        <View style={styles.container}>
            {/* Поисковая строка */}
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={20} color="#90A4AE" style={styles.searchIcon} />
                <TextInput
                    placeholder="Поиск по названию или магазину..."
                    placeholderTextColor="#90A4AE"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Фильтры */}
            <View style={styles.filterWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {filters.map(filter => (
                        <TouchableOpacity
                            key={filter.id}
                            style={[
                                styles.filterButton,
                                selectedFilter === filter.id && styles.filterButtonActive
                            ]}
                            onPress={() => setSelectedFilter(filter.id)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedFilter === filter.id && styles.filterTextActive
                            ]}>
                                {filter.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Сортировка */}
            <View style={styles.sortContainer}>
                <Text style={styles.sortTitle}>Сортировка:</Text>
                {sortOptions.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.sortButton,
                            selectedSort === option.id && styles.sortButtonActive
                        ]}
                        onPress={() => setSelectedSort(option.id)}
                    >
                        <Text style={[
                            styles.sortText,
                            selectedSort === option.id && styles.sortTextActive
                        ]}>
                            {option.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Список товаров */}
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Image source={item.image} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemShop}>{item.shop}</Text>
                            <View style={styles.ratingContainer}>
                                <MaterialCommunityIcons name="star" size={16} color="#FFA000" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                            <Text style={styles.itemPrice}>{item.price} ₽</Text>
                        </View>
                        <TouchableOpacity style={styles.cartButton}>
                            <MaterialCommunityIcons name="cart-plus" size={24} color="#607D8B" />
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="magnify-close" size={48} color="#90A4AE" />
                        <Text style={styles.emptyText}>Ничего не найдено</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    filterWrapper: {
        height: 50, // Фиксированная высота для фильтров
        marginBottom: 16,
    },
    filterContainer: {
        paddingBottom: 8,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: '#ECEFF1',
        marginRight: 8,
        height: 36, // Фиксированная высота кнопок
        justifyContent: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#607D8B',
    },
    filterText: {
        color: '#607D8B',
        fontSize: 14,
    },
    filterTextActive: {
        color: '#FFF',
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sortTitle: {
        color: '#455A64',
        fontSize: 14,
        marginRight: 12,
    },
    sortButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
    },
    sortButtonActive: {
        backgroundColor: '#E3F2FD',
    },
    sortText: {
        color: '#607D8B',
        fontSize: 14,
    },
    sortTextActive: {
        color: '#1976D2',
        fontWeight: '500',
    },
    listContent: {
        paddingBottom: 20,
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#455A64',
        marginBottom: 4,
    },
    itemShop: {
        fontSize: 12,
        color: '#90A4AE',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ratingText: {
        marginLeft: 4,
        color: '#455A64',
        fontSize: 12,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#607D8B',
    },
    cartButton: {
        padding: 8,
        alignSelf: 'flex-start',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        marginTop: 16,
        color: '#90A4AE',
        fontSize: 16,
    },
});

export default CatalogScreen;