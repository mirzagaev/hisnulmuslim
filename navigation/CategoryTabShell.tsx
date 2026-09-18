import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Kategorie from '../screens/Kategorie';
import CategoryFooterNav from '../components/CategoryFooterNav';
import { tabBarStruktur, CATEGORY_SLUGS } from '../interfaces/KapitelSchema';

const CATEGORY_IDS = Object.keys(tabBarStruktur);

// Eigener Tab-Navigator, der ausschließlich die 7 Kategorien enthält. Er nutzt
// react-native-pager-view unter der Haube und liefert dadurch das Wisch-Gesture
// (Karussell) zwischen den Kategorien. Die eingebaute Tab-Leiste wird ausgeblendet
// (tabBar={() => null}) – als Bedienelement dient weiterhin CategoryFooterNav im
// umgebenden Bottom-Tab-Navigator.
const CategoriesTopTab = createMaterialTopTabNavigator();

function CategoriesCarousel() {
  return (
    <CategoriesTopTab.Navigator
      id={undefined}
      tabBar={() => null}
      screenOptions={{ swipeEnabled: true, animationEnabled: true }}
    >
      {CATEGORY_IDS.map((id) => (
        <CategoriesTopTab.Screen key={id} name={id} component={Kategorie} />
      ))}
    </CategoriesTopTab.Navigator>
  );
}

function ShellTabBar({ state, layout, rootNavigation }) {
  const activeRoute = state.routes[state.index];
  // Steckt der Fokus im Kategorien-Karussell, liegt die eigentlich aktive
  // Kategorie im verschachtelten Navigator-Status.
  const nestedState = activeRoute?.name === 'CategoriesGroup' ? activeRoute.state : undefined;
  const activeCategoryId = nestedState ? nestedState.routes[nestedState.index]?.name ?? null : null;

  return (
    <CategoryFooterNav
      active={activeCategoryId}
      layout={layout}
      hrefFor={(id) => `/kategorie/${CATEGORY_SLUGS[id]}`}
      onSelectCategory={(id) =>
        rootNavigation.navigate('Kategorien', { screen: 'CategoriesGroup', params: { screen: id } })
      }
    />
  );
}

interface CategoryTabShellProps {
  // Name des eigentlichen Inhalts-Tabs (z. B. "home", "Favoriten", "Suche", "Transkript", "Info").
  contentName: string;
  content: React.ComponentType<any>;
  // Navigation des umgebenden Drawer-Screens, um bei Kategorie-Auswahl dorthin zu springen.
  navigation: any;
}

// Bettet einen beliebigen Screen (Startseite, Favoriten, Suche, Transkript, Info, …) in
// denselben Tab-Navigator-Mechanismus ein, den auch die Kategorien-Ansicht verwendet. So
// übernimmt react-navigation automatisch die passende Ausrichtung der Leiste – unten auf dem
// Handy, als Sidebar links ab Tablet-Breite (siehe tabBarPosition) – statt sie händisch
// nachzubauen. Die Kategorie-Buttons springen dabei immer zur echten Kategorien-Ansicht
// (CategoriesGroup); dieser Tab-Navigator hält nur den aktuellen Screen sichtbar.
export default function CategoryTabShell({ contentName, content: Content, navigation }: CategoryTabShellProps) {
  const Tab = createBottomTabNavigator();
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName={contentName}
      screenOptions={{
        animation: 'shift',
        tabBarPosition: layout.width < 769 ? 'bottom' : 'left',
        headerShown: false,
      }}
      tabBar={(props) => <ShellTabBar {...props} layout={layout} rootNavigation={navigation} />}
    >
      <Tab.Screen name={contentName} component={Content} />
      <Tab.Screen name="CategoriesGroup" component={CategoriesCarousel} />
    </Tab.Navigator>
  );
}
