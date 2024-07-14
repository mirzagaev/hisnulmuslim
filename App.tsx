import * as React from 'react';
import AppNavigation from './navigation/AppNavigation';
// import { AppRegistry } from 'react-native';
// import { store } from '.'
// import { Provider } from 'react-redux'

export default function App() {
  return <AppNavigation/>
}

// const ConnectedApp = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor} loading={null}></PersistGate>
//         <AppNavigation />
//       </PersistGate>
//     </Provider>
//   );
// };

// AppRegistry.registerComponent(appData.name, () => ConnectedApp);