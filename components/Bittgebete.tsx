import Bittgebete from "../interfaces/Bittgebet";
import { StyleSheet, View, Text } from 'react-native';
import tw from 'twrnc';

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
        <View style={tw`mb-5`}>
            {dua.content && <Text style={tw`bg-gray-100 p-4`}>{dua.content}</Text>}
            {dua.arabic && <Text style={tw`p-4`}>{dua.arabic}</Text>}
            {dua.latein && <Text style={tw`p-4 italic`}>{dua.latein}</Text>}
            <Text style={tw`bg-gray-100 text-xs px-4 py-2`}>Toolbar...</Text>
        </View>
    );
}

export default Bittgebet;