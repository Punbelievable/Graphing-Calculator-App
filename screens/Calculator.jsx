import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    // Add the value of the button to the display
    const handleButtonPress = (value) => {
        if (result) {
            // If there's a result, clear input and reset result
            setInput(value);
            setResult(''); // Clear the result state
        } else {
            setInput((prevInput) => prevInput + value);
        }
    };

    const handleCalculate = () => {
        try {
            // Start with the original input
            let sanitizedInput = input;

            // Replace 'x' with '*' for multiplication
            sanitizedInput = sanitizedInput.replace(/x/g, '*');

            // Replace '%' with '/100'
            if (sanitizedInput.includes("%")) {
                sanitizedInput = sanitizedInput.replace(/(\d+)%/g, '($1/100)'); // Handle numbers before %
            }

            // The eval() function evaluates JavaScript code represented as a string and returns its completion value. 
            const result = eval(sanitizedInput);

            //setInput(result.toString());
            setResult(result.toString());
            setInput('');
        } catch (error) {
            setInput('Error');
        }
    };

    const handleDelete = () => {
        setInput((prevInput) => prevInput.slice(0, -1)); // Remove the last character
    };

    const handleBracketButtonPress = () => {
        setInput((prevInput) => {
            // Check if the input is empty
            if (prevInput === '') {
                return prevInput + '('; // Add an opening bracket
            }

            // Check the number of opening and closing brackets
            const openBrackets = (prevInput.match(/\(/g) || []).length; // Count opening brackets
            const closeBrackets = (prevInput.match(/\)/g) || []).length; // Count closing brackets

            // Get the last character
            const lastChar = prevInput[prevInput.length - 1];
            const isLastCharNumber = !isNaN(lastChar);

            // If the last character is an opening bracket, allow stacking of brackets
            if (lastChar === '(') {
                return prevInput + '('; // Add another opening bracket
            }

            // If there are unmatched opening brackets, add a closing bracket
            if (openBrackets > closeBrackets) {
                return prevInput + ')'; // Add closing bracket if there's an unmatched opening bracket
            }

            // If the last character is a number, add a multiplication and an opening bracket
            if (isLastCharNumber) {
                return prevInput + 'x('; // Add a multiplication and an opening bracket
            }

            // If the last character is neither a number nor an opening bracket, add an opening bracket
            return prevInput + 'x(';
        });
    };




    const handleClear = () => {
        setInput('');
        setResult('');
    };

    return (
        <View style={styles.container}>
            {/*Display Box*/}
            <TextInput
                style={styles.display}
                value={result ? result : input}
                editable={false} // Make it non-editable to simulate display
                textAlign='left' // Align text to the left
                placeholder="0"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleClear()} style={[styles.button, styles.clearButton]}>
                    <Text style={styles.buttonText}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleBracketButtonPress()} style={[styles.button, styles.otherButtons]}>
                    <Text style={styles.buttonText}>( )</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress('%')} style={[styles.button, styles.otherButtons]}>
                    <Text style={styles.buttonText}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress('/')} style={[styles.button, styles.operatorButton]}>
                    <Text style={styles.buttonText}>÷</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleButtonPress("7")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("8")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("9")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("x")} style={[styles.button, styles.operatorButton]}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleButtonPress("4")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("5")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("6")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("-")} style={[styles.button, styles.operatorButton]}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleButtonPress("1")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("2")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("3")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("+")} style={[styles.button, styles.operatorButton]}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleButtonPress("0")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress(".")} style={[styles.button, styles.numberButton]}>
                    <Text style={styles.buttonText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>DEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCalculate()} style={[styles.button, styles.equalButton]}>
                    <Text style={styles.buttonText}>=</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F7F7F7',
    },
    display: { // Display Box
        fontSize: 48,
        marginBottom: 20,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        padding: 10,
        height: 80,
        width: '100%', // Ensure it takes full width of its container
        color: '#000000'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // The spacing between each row of buttons
    },
    button: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    numberButton: {
        backgroundColor: '#FFB74D',
    },
    operatorButton: {
        backgroundColor: '#007BFF',
    },
    clearButton: {
        backgroundColor: '#dc3545',
    },
    equalButton: {
        backgroundColor: '#28A745',
    },
    buttonText: {
        color: '#333333',
        fontSize: 25,
        fontWeight: "bold"
    },
    otherButtons: {
        backgroundColor: '#66BFFF',
    },
    deleteButton: {
        backgroundColor: '#FF6F61',
    },
});

export default Calculator;
