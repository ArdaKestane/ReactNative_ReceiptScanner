import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import RNTextDetector from 'rn-text-detector';

const CameraScreen = ({ onDocumentScanned }) => {
    useEffect(() => {
        const scanDocument = async () => {
            try {
                // Start the document scanner
                const { scannedImages } = await DocumentScanner.scanDocument();

                // Get back an array with scanned image file paths
                if (scannedImages.length > 0) {
                    const image = scannedImages[0];
                    const extractedText = await extractTextFromImage(image);
                    onDocumentScanned(image, extractedText);
                }
            } catch (error) {
                console.log('Error scanning document:', error);
            }
        };

        const extractTextFromImage = async (imagePath) => {
            try {
                const textRecognition = await RNTextDetector.detectFromUri(imagePath);
                return textRecognition.map((item) => item.text).join(' ');
            } catch (error) {
                console.log('Error extracting text from image:', error);
                return '';
            }
        };

        // Call scanDocument on load
        scanDocument();
    }, [onDocumentScanned]);

    return (
        <View style={styles.container}></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF5E6',
    },
});

export default CameraScreen;
