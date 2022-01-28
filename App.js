import 'react-native-gesture-handler';

import React from 'react';
import {
  AbrilFatface_400Regular,
  useFonts as useAbril,
} from '@expo-google-fonts/abril-fatface';
import { NavigationContainer } from '@react-navigation/native';
import {
  Oswald_400Regular,
  useFonts as useOswald,
} from '@expo-google-fonts/oswald';
import {
  PlayfairDisplay_400Regular,
  useFonts as usePlayfair,
} from '@expo-google-fonts/playfair-display';
import {
  Roboto_400Regular,
  useFonts as useRoboto,
} from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';

import { MediaNavigator } from './src/infrastructure/navigation/media.navigator';
import { SafeArea } from './src/components/utility/safe-area.component';
import { theme } from './src/infrastructure/theme';

export default function App() {
  const [abrilLoaded] = useAbril({
    AbrilFatface_400Regular,
  });

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [playfairLoaded] = usePlayfair({
    PlayfairDisplay_400Regular,
  });

  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
  });

  if (!abrilLoaded || !oswaldLoaded || !playfairLoaded || !robotoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeArea>
        <NavigationContainer>
          <MediaNavigator />
        </NavigationContainer>
      </SafeArea>
    </ThemeProvider>
  );
}
