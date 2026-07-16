import React, { useEffect } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchKapiteln } from '../redux/slices/kapitelSlice';
import { fetchDuas } from '../redux/slices/duaSlice';
import { fetchThemen } from '../redux/slices/themaSlice';
import { AppDispatch } from '../redux/store';
import { useAppTheme } from "./AppNavigation";
import tw from 'twrnc';
import { tabBarStruktur } from "../interfaces/KapitelSchema"
import CategoryStripe from '../components/CategoryStripe';
import CategoryIcon from '../components/icons/CategoryIcon';
import { CATEGORY_COLORS } from '../theme/colors';

function MyTabBar({ state, descriptors, navigation, layout }) {
  const { colors } = useTheme();
  const theme = useAppTheme();
  const { buildHref } = useLinkBuilder();
  const vertical = layout.width >= 769;
  const activeRoute = state.routes[state.index]?.name;

  return (
    <View style={theme === "dark" ? tw`bg-neutral-900` : tw`bg-white`}>
      <CategoryStripe active={activeRoute} height={4} />
      <View style={[
          tw`flex py-2`,
          vertical ? tw`flex-col` : tw`flex-row`,
      ]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const catColor = CATEGORY_COLORS[route.name];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                tw`flex items-center font-semibold`,
                vertical ? tw`py-1` : tw`flex-1 py-2`,
              ]}
            >
              <View
                style={{
                  padding: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: isFocused ? catColor.base : (theme === 'dark' ? '#404040' : '#e5e5e5'),
                  backgroundColor: isFocused ? catColor.base : (theme === 'dark' ? 'rgba(0,0,0,0.6)' : '#f5f5f5'),
                }}
              >
                <CategoryIcon
                  category={route.name}
                  active={isFocused}
                  color={isFocused ? '#ffffff' : (theme === 'dark' ? '#a3a3a3' : '#737373')}
                  size={layout.width < 400 ? 26 : 30}
                />
              </View>
              <Text style={[
                tw`text-xs pt-1`,
                theme === "dark" ? tw`text-neutral-200` : tw`text-neutral-700`,
                isFocused && { color: catColor.base, fontWeight: '600' },
              ]}>{tabBarStruktur[route.name].label}</Text>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
}

function TabBar({ layout, navigation }) {
  const Tab = createBottomTabNavigator();
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName='1'
      screenOptions={({ route }) => ({
        animation: 'shift',
        tabBarPosition: layout.width < 769 ? 'bottom' : 'left',
        headerShown: false,
        headerTitleStyle: {
          paddingHorizontal: 0,
          fontSize: 20,
        },
        headerStyle: {},
      })}
      tabBar={(props) => <MyTabBar {...props} layout={layout} />}
    >
      <Tab.Screen name="1" component={Kategorie} options={{
        title: tabBarStruktur["1"].label,
        headerTintColor: tabBarStruktur["1"].colorItem,
      }} />
      <Tab.Screen name="2" component={Kategorie} options={{title: tabBarStruktur["2"].label,
        headerTintColor: tabBarStruktur["2"].colorItem,
      }} />
      <Tab.Screen name="3" component={Kategorie} options={{title: tabBarStruktur["3"].label,
        headerTintColor: tabBarStruktur["3"].colorItem,
      }} />
      <Tab.Screen name="4" component={Kategorie} options={{title: tabBarStruktur["4"].label,
        headerTintColor: tabBarStruktur["4"].colorItem,
      }} />
      <Tab.Screen name="5" component={Kategorie} options={{title: tabBarStruktur["5"].label,
        headerTintColor: tabBarStruktur["5"].colorItem,
      }} />
      <Tab.Screen name="6" component={Kategorie} options={{title: tabBarStruktur["6"].label,
        headerTintColor: tabBarStruktur["6"].colorItem,
      }} />
      <Tab.Screen name="7" component={Kategorie} options={{title: tabBarStruktur["7"].label,
        headerTintColor: tabBarStruktur["7"].colorItem,
      }} />
    </Tab.Navigator>
  );
}

export default function Kategorien({ navigation }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchKapiteln());
    dispatch(fetchThemen());
    dispatch(fetchDuas());
  }, []);

  const layout = useWindowDimensions();
  return <TabBar layout={layout} navigation={navigation} />;
}
