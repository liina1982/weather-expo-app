import React, { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Home from './screens/Home'

SplashScreen.preventAutoHideAsync().catch(error => { console.log(error) })

export default function App (): JSX.Element | null {
  const [fontsLoaded] = useFonts({
    'SF-Thin': require('./assets/fonts/SF-Pro-Display-Thin.otf'),
    'SF-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf'),
    'SF-Semibold': require('./assets/fonts/SF-Pro-Display-Semibold.otf')
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync().catch(error => { console.log(error) })
    }
  }, [fontsLoaded])
  if (!fontsLoaded) return null
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Home />
        <StatusBar style='light'/>
      </GestureHandlerRootView>
  </SafeAreaProvider>
  )
}
