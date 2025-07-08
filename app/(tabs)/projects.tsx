import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const projectsData = [
    {
        id: '1',
        title: 'Деревянная беседка',
        date: '15.06.2023',
        image: require('@/assets/images/project.png'),
        materials: 12,
        cost: 45000,
    },
    {
        id: '2',
        title: 'Садовая мебель',
        date: '02.07.2023',
        image: require('@/assets/images/project.png'),
        materials: 8,
        cost: 28000,
    },
    {
        id: '3',
        title: 'Детская площадка',
        date: '22.07.2023',
        image: require('@/assets/images/project.png'),
        materials: 15,
        cost: 62000,
    },
];

const ProjectsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Мои проекты</Text>

            <TouchableOpacity style={styles.newProjectButton}>
                <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
                <Text style={styles.newProjectButtonText}>Новый проект</Text>
            </TouchableOpacity>

            <FlatList
                data={projectsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.projectCard}>
                        <Image source={item.image} style={styles.projectImage} />
                        <View style={styles.projectInfo}>
                            <Text style={styles.projectTitle}>{item.title}</Text>
                            <Text style={styles.projectDate}>{item.date}</Text>

                            <View style={styles.projectDetails}>
                                <View style={styles.detailItem}>
                                    <MaterialCommunityIcons name="cube-outline" size={16} color="#607D8B" />
                                    <Text style={styles.detailText}>{item.materials} материалов</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <MaterialCommunityIcons name="cash" size={16} color="#607D8B" />
                                    <Text style={styles.detailText}>{item.cost.toLocaleString()} ₽</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#455A64',
        marginBottom: 20,
    },
    newProjectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#607D8B',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    newProjectButtonText: {
        color: '#FFF',
        fontWeight: '600',
        marginLeft: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    projectCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    projectImage: {
        width: '100%',
        height: 150,
    },
    projectInfo: {
        padding: 15,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#455A64',
        marginBottom: 5,
    },
    projectDate: {
        fontSize: 12,
        color: '#90A4AE',
        marginBottom: 10,
    },
    projectDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: 5,
        color: '#607D8B',
        fontSize: 14,
    },
});

export default ProjectsScreen;