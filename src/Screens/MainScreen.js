import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainScreen = ({ componentsData, onComponentPress, onDeleteComponent }) => {
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: '#FDF5E6',
                paddingHorizontal: 16,
                paddingVertical: 10,
            }}
        >
            {componentsData.map((component, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.componentContainer}
                    onPress={() => onComponentPress(component)}
                >
                    <View style={styles.componentInfo}>
                        <Image
                            source={{ uri: component.image }}
                            style={styles.componentImage}
                        />
                        <View>
                            <Text>
                                <Text style={styles.boldText}>Date: </Text>
                                {component.date}
                            </Text>
                            <Text>
                                <Text style={styles.boldText}>Amount: </Text>
                                {component.amount}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => onDeleteComponent(component)}>
                        <Icon name="delete" size={20} color="red" />
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        marginVertical: 2.5,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    componentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    componentImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default MainScreen;
