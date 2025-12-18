import { StyleSheet, Text, View, } from "react-native";

export function RepoList({ data }) {
    return (
        <View style={styles.rep_container}>
            <View>
                <Text style={styles.Text}>{data}</Text>
            </View>
            <View>
                <Text style={styles.Text}>Repo</Text>
            </View>
            <View>
                <Text style={styles.Text}>Description</Text>
            </View>
            <View>
                <View>
                    <Text style={styles.Text}>Forks</Text>
                </View>
                <View>
                    <Text style={styles.Text_stars}>Stars</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rep_container: {
        backgroundColor: "#454545",
        width: "40%",
        maxHeight: 300,
    },
    Text: {
        color: "#fff",
    },
    Text_stars: {
        color: "#FFD700",
    },
});