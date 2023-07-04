import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ComponentDetailScreen = ({ component, onClose }) => {
    const { image, date, amount, extractedText } = component;

    return (
        <View style={styles.container}>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : null}

            <View style={styles.detailsContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.text}>{date}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount:</Text>
                    <Text style={styles.text}>{amount}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Extracted Text:</Text>
                    <Text style={styles.text}>{extractedText}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF5E6',
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    detailsContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
    },
    text: {
        flex: 2,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
});

export default ComponentDetailScreen;
