import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import Plotly from 'react-native-plotly';

const GraphicalCalculator = () => {
    const [equations, setEquations] = useState(['']);
    const [data, setData] = useState([]);
    const [minX, setMinX] = useState(-10);
    const [maxX, setMaxX] = useState(10);

    const generateGraphData = () => {
        if (equations[0].trim() == ""){
            Alert.alert("Error", "Please enter an equation!");
            return;
        }
        const minXValue = parseFloat(minX);
        const maxXValue = parseFloat(maxX);

        if (isNaN(minXValue) || isNaN(maxXValue)) {
            Alert.alert("Error", "Please enter valid numeric values for min and max x");
            return;
        }

        if (minXValue >= maxXValue) {
            Alert.alert("Error", "Min x must be less than Max x");
            return;
        }

        const newData = [];

        equations.forEach((equation, index) => {
            if (equation.trim() === "") return;

            const xValues = [];
            const yValues = [];

            const range = maxXValue - minXValue;
            const numPoints = Math.min(Math.abs(range / 0.1), 1000);
            const stepSize = range / numPoints;

            const sanitizedEquation = equation.toLowerCase()
            .replace(/(\d)([a-zA-Z])/g, '$1 * $2') // Add multiplication between number and variable
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/exp\(/g, 'Math.exp(')
            .replace(/log\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(');
        

            for (let x = minXValue; x <= maxXValue; x += stepSize) {
                xValues.push(x);
                try {
                    const y = eval(sanitizedEquation.replace(/x/g, x));
                    yValues.push(y);
                } catch (error) {
                    Alert.alert('Invalid equation', error.message);
                    return;
                }
            }

            newData.push({
                x: xValues,
                y: yValues,
                type: 'scatter',
                mode: 'lines',
                marker: { color: getRandomColor() },
                name: equation,
            });
        });

        setData(newData);
    };

    const handleEquationChange = (index, value) => {
        const updatedEquations = [...equations];
        // Remove all spaces
        updatedEquations[index] = value.replace(/\s+/g, '');
        setEquations(updatedEquations);
    };

    const addEquation = () => {
        setEquations([...equations, '']);
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView} style={styles.scrollContainer}>
                {equations.map((equation, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        placeholder={`Enter equation ${index + 1} (e.g., sin(x), x*x)`}
                        value={equation}
                        onChangeText={(text) => handleEquationChange(index, text)}
                    />
                ))}
            </ScrollView>
            <Button title="Add Equation" onPress={addEquation} />
            <View style={styles.rangeContainer}>
                <Text style={styles.label}>Min X:</Text>
                <TextInput
                    style={styles.rangeInput}
                    value={String(minX)}
                    keyboardType="numeric"
                    onChangeText={(text) => setMinX(text)}
                />
                <Text style={styles.label}>Max X:</Text>
                <TextInput
                    style={styles.rangeInput}
                    value={String(maxX)}
                    keyboardType="numeric"
                    onChangeText={(text) => setMaxX(text)}
                />
            </View>
            <Button title="Plot Graph" onPress={generateGraphData} />
            <Plotly
                data={data}
                layout={{
                    xaxis: {
                        title: 'x',
                        titlefont: {
                            size: 18,
                        },
                        tickfont: {
                            size: 14,
                        },
                    },
                    yaxis: {
                        title: 'y',
                        titlefont: {
                            size: 18,
                        },
                        tickfont: {
                            size: 14,
                        },
                        automargin: true,
                    },
                    margin: {
                        l: 30,
                        r: 30,
                        t: 30,
                        b: 30,
                    },
                }}
                config={{
                    modeBarButtonsToRemove: [
                        'zoom2d',
                        'lasso2d',
                        'toggleSpikelines',
                        'hoverCompareCartesian',
                        'hoverClosestCartesian',
                        'toggleHover',
                    ],
                    displayModeBar: true,
                }}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f9fc',
    },
    scrollContainer: {
        maxHeight: 120,
    },
    input: {
        borderWidth: 2,
        borderColor: '#cccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    rangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    label: {
        fontSize: 14,
        marginRight: 5,
    },
    rangeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
});

export default GraphicalCalculator;