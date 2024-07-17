import Bittgebete from "../interfaces/Bittgebet";
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    dua: {
        backgroundColor: '#F9F9F9',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    content: {
        fontSize: 13,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    arabic: {
        fontSize: 14,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },
    latein: {
        fontSize: 14,
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    toolbar: {
        fontSize: 11,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
    },
});

function Bittgebet(dua: Bittgebete) {
    return (
        <View style={styles.dua}>
            {dua.content && <Text style={styles.content}>{dua.content}</Text>}
            {dua.arabic && <Text style={styles.arabic}>{dua.arabic}</Text>}
            {dua.latein && <Text style={styles.latein}>{dua.latein}</Text>}
            <Text style={styles.toolbar}>Toolbar...</Text>
        </View>
    );
}

export default Bittgebet;