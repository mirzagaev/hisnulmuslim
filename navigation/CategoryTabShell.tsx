import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Kategorie from '../screens/Kategorie';
import CategoryFooterNav from '../components/CategoryFooterNav';
import { tabBarStruktur, CATEGORY_SLUGS } from '../interfaces/KapitelSchema';

const CATEGORY_IDS = Object.keys(tabBarStruktur);

function ShellTabBar({ state, layout, rootNavigation }) {
  const activeRoute = state.routes[state.index]?.name;
  const isCategoryActive = !!tabBarStruktur[activeRoute];

  return (
    <CategoryFooterNav
      active={isCategoryActive ? activeRoute : null}
      layout={layout}
      hrefFor={(id) => `/kategorie/${CATEGORY_SLUGS[id]}`}
      onSelectCategory={(id) => rootNavigation.navigate('Kategorien', { screen: id })}
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
// nachzubauen. Die Kategorie-Buttons springen dabei immer zur echten Kategorien-Ansicht;
// dieser Tab-Navigator hält nur den aktuellen Screen sichtbar.
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
      {CATEGORY_IDS.map((id) => (
        <Tab.Screen key={id} name={id} component={Kategorie} />
      ))}
    </Tab.Navigator>
  );
}
