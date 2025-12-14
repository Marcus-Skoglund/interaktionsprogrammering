import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const CardForm = ({
    number_length,
    CVC_length,
    cardNumber,
    setCardNumber,
    setCardName,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    setCVC,
    flipToFront,
    flipToBack,
    currentYear
}) => {
    return (
        <View style={styles.infoContainer}>
            <View>
                <Text>Card Number</Text>
                <TextInput
                    onFocus={flipToFront}
                    value={cardNumber}
                    onChangeText={setCardNumber} // This will trigger the formatter in parent
                    style={styles.textField}
                    keyboardType="numeric"
                    maxLength={number_length}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>Card Holder</Text>
                <TextInput
                    onFocus={flipToFront}
                    onChangeText={setCardName}
                    style={styles.textField}
                    maxLength={26}
                />
            </View>
            <View style={styles.bottomRow}>
                <View>
                    <Text>Expiration Date</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            onFocus={flipToFront}
                            selectedValue={selectedMonth}
                            onValueChange={(value, index) => { if (index !== 0) setSelectedMonth(value); }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Month" value={null} />
                            {[...Array(12)].map((_, i) => (
                                <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
                            ))}
                        </Picker>
                        <Picker
                            onFocus={flipToFront}
                            selectedValue={selectedYear}
                            onValueChange={(value, index) => { if (index !== 0) setSelectedYear(value); }}
                            style={[styles.picker, { marginLeft: 15 }]}
                        >
                            <Picker.Item label="Year" value={null} />
                            {[...Array(12)].map((_, i) => {
                                const year = currentYear + i;
                                return <Picker.Item key={year} label={`${year}`} value={year} />
                            })}
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text>CVC</Text>
                    <TextInput
                        onFocus={flipToBack}
                        onBlur={flipToFront}
                        onChangeText={setCVC}
                        style={styles.textFieldCVC}
                        maxLength={CVC_length}
                    />
                </View>
            </View>
            <View style={styles.button}>
                <Button title="Submit" color="#070be8ff" />
            </View>
        </View>
    );
};

export default CardForm;

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: -110,
        paddingTop: 160,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    bottomRow: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textField: {
        marginTop: 5,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        paddingLeft: 10,
    },
    textFieldCVC: {
        marginTop: 5,
        keyboardType: "numeric",
        width: 100,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        borderColor: '#ccc',
    },
    pickerContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picker: {
        backgroundColor: "#fff",
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        marginTop: 30,
        height: 50,
    },
});