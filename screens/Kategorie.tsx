import React, { useState , useEffect } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import tw from 'twrnc';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import { useAppTheme } from "../navigation/AppNavigation";

function Kategorie({navigation}) {
  const kapiteln = useSelector((state: RootState) => state.kapiteln.kapiteln);
  const [kategorie, setKategorie] = useState<any[]>([]);
  const [catId, setCatId] = useState<any>(1);
  const theme = useAppTheme();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      const cState: number = navigation.getState().index;
      const cRoute: any = navigation.getState().routes[cState];
      setCatId(cRoute.name);
    });
  
    return unsubscribe;
  }, [catId, navigation]);

  return (
    <ScrollView style={[
      tw`flex-1`,
      theme === "dark" ? tw`bg-neutral-900` : tw`bg-transparent`
    ]}>
      {kapiteln.map((kapitel) => (kapitel.id == catId) &&
        <View key={catId} style={tw`py-2 px-6`}>
          <Text style={[
            tw`text-3xl font-medium py-3 leading-relaxed`,
            {color: tabBarStruktur[catId].colorItem},
            // {color: tabBarStruktur[catId].colorItem, borderBottomColor: tabBarStruktur[catId].colorItem, borderBottomWidth: 3, paddingHorizontal: 0},
          ]}>{kapitel.kategorie}</Text>
          
          {kapitel.unterkategorien.map((unterkat) => (
            <>
              
              {unterkat.unterkategorie && <Text style={[
                tw`text-base font-medium pt-5`,
                theme === "dark" && tw`text-neutral-200`,
                // {color: tabBarStruktur[catId].colorItem},
                // {borderBottomColor: tabBarStruktur[catId].colorItem, borderBottomWidth: 1},
                ]}>{unterkat.unterkategorie}</Text>}

                {/* <View key={unterkat.id.toString()}
                  style={[
                    tw`mx-4 my-3 rounded-3xl`,
                    theme === "dark" ? tw`bg-neutral-800 shadow-lg` : tw`bg-white shadow-lg`
                  ]}>
                </View> */}
                  {unterkat.themen.map((thema) => (
                    <Pressable
                      key={thema.id}
                      onPress={
                        () => {
                          navigation.navigate('Bittgebete', {
                            thema: thema,
                            kategorie: kapitel.kategorie
                          })
                        }
                      }
                      style={[
                        tw`py-3 px-4 rounded-2xl mt-2 border-1 border-neutral-500`,
                        {borderColor: '#3f3f3fff', borderWidth: 1},
                        // theme === "dark" ? tw`bg-neutral-800` : tw`bg-white`
                      ]}
                    >
                      <Text style={[tw`text-base`, theme === "dark" && tw`text-neutral-200`]}>{thema.titel}</Text>
                    </Pressable>
                  ))}
            </>
            
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default Kategorie;