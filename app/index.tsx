// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { Text, View, XStack, YStack, TamaguiProvider, Theme, Paragraph, ZStack, Stack } from 'tamagui'
import config from "tamagui.config";
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import { ScreenContainer } from './ScreenContainer';
import AppContainer from './AppContainer';
import SettingsStack from './SettingsStack';
import HomeStack from './HomeStack';

// const maiTrackerTheme = {
//   background: '#000',
//   color: '#aaa',
//   // define any key to any string or number value
// }

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }
  
  return (
    // <TamaguiProvider config={config}>
      <AppContainer>
          <ScreenContainer title="maiTracker">
              <HomeStack></HomeStack>
              <SettingsStack></SettingsStack>
              <Stack flex={1} justifyContent="center" alignItems="center">
                <Text>Help content goes here...</Text>
              </Stack>
          </ScreenContainer>
        </AppContainer>
        
    // {/* </TamaguiProvider> */}
  )
}