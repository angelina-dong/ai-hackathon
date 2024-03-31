import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './MainContainer';
import LogoSplash from './LogoSplash';
import { SplashScreen } from 'expo';
import React, {useEffect, useState, useCallback} from 'react';

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const onContinue = () => {
    // Navigate to the next screen or perform any other action
    setAppIsReady(true);
  };

  if (!appIsReady) {
    return <LogoSplash onContinue={onContinue} />;
  }

  return (
    <View style={styles.container}>
      <MainContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;