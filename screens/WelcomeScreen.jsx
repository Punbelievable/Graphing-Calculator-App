import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Calculator App!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Calculator')}
            >
                <Text style={styles.buttonText}>Normal Calculator</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('GraphicalCalculator')}
            >
                <Text style={styles.buttonText}>Graphical Calculator</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
                Due to the limitations of plotting, this Calculator App cannot handle infinite ranges for X values.
                In future updates, I plan to enhance this feature, including the ability to plot in 3D.
                Currently, you can only set the range of x to be plotted.
                {'\n\n'}
                Done by YiJie {'\n'} Check out my work on {' '}
                <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/Punbelievable')}>
                    GitHub
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f9fc',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginVertical: 10,
        elevation: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 150,
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
    link: {
        color: '#6200ee',
        textDecorationLine: 'underline',
    },
    
});

export default WelcomeScreen;