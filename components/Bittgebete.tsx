import Bittgebete from "../interfaces/Bittgebet";
import { StyleSheet, View, Text, Button } from 'react-native';
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
        <View style={tw`py-5 border-t-2 border-gray-200`}>
            {dua.arabic && <Text style={tw`text-lg px-5`}>{dua.arabic}</Text>}
            {dua.latein && <Text style={tw`text-[#76787b] text-md mt-3 mb-6 px-5`}>{dua.latein}</Text>}
            {dua.content && <Text style={tw`text-base font-normal px-5`}>{dua.content}</Text>}
            <View style={tw`mx-5 mt-6 mb-2 px-4 py-2 bg-gray-200 rounded-full shadow-md`}>
                <Text style={tw`text-xs font-normal`}>Hisnul Muslim / Kapitel {dua.kapitel_id} / Bittgebet {dua.bittgebet_id}</Text>
            </View>
        </View>
    );
}

export default Bittgebet;