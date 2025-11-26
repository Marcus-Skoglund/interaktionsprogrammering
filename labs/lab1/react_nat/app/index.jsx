import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const SeparatorV = () => <View style={styles.separatorVertivally} />;
const SeparatorH = () => <View style={styles.separatorHorizontally} />;

const Home = () => (
    <SafeAreaProvider>
        <View style={styles.top}>
            <Text style={styles.topText}>React native</Text>
        </View>
        <View style={styles.imageContainer}>
            <Image source={require('../assets/ColorWheel.png')} style={styles.image} />
        </View>
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.fixToText}>
                    <Button
                        color="#8C8C8C"
                        title="button"
                    />
                    <SeparatorH />
                    <Button
                        color="#8C8C8C"
                        title="button"
                    />
                </View>
                <SeparatorV />
                <View style={styles.fixToText}>
                    <Button
                        color="#8C8C8C"
                        title="button"
                    />
                    <SeparatorH />
                    <Button
                        color="#8C8C8C"
                        title="button"
                    />
                </View>
            </View>
            <View style={styles.emailContainer}>
                <Text style={{ width: 90 }}>Email</Text>
                <TextInput style={styles.email} />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    topText: {
        marginLeft: 20,
        color: "#fff",
        fontSize: 24,
    },
    top: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: "#158565",
        boarderWidth: 5,
    },
    image: {
        height: 150,
        width: 150,
    },
    imageContainer: {
        marginTop: 20,
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginVertical: 12,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    emailContainer: {
        marginTop: 50,
        marginLeft: -100,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    email: {
        width: 200,
        borderBottomWidth: 1,
    },
    separatorVertivally: {
        marginVertical: 12,
    },
    separatorHorizontally: {
        marginHorizontal: 60,
    },
});

export default Home