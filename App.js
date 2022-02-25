import 'react-native-gesture-handler';

import React from 'react';
import {
  AbrilFatface_400Regular,
  useFonts as useAbril,
} from '@expo-google-fonts/abril-fatface';
import {
  Oswald_400Regular,
  useFonts as useOswald,
} from '@expo-google-fonts/oswald';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  PlayfairDisplay_400Regular,
  useFonts as usePlayfair,
} from '@expo-google-fonts/playfair-display';
import {
  Roboto_400Regular,
  useFonts as useRoboto,
} from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components/native';

import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { Navigation } from './src/infrastructure/navigation';
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
      <AuthenticationContextProvider>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </AuthenticationContextProvider>
    </ThemeProvider>
  );
}
