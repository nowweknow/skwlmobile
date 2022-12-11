import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Provider } from 'react-redux';

import { AppNavigator } from 'navigation';
import { persistor, setupStore } from 'app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

if (__DEV__) {
  console.disableYellowBox = true;
}

const CONTAINER: ViewStyle = { flex: 1 };

function App() {
  const store = setupStore();

  return (
    <View style={CONTAINER}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
}

export default App;
