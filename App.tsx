import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import  Store from './store'
import HomeScreen from './screens/HomeScreen'
import MapScreen from './screens/MapScreen'
import EatsScreen from './screens/EatsScreen'
import 'react-native-gesture-handler'
import React from 'react'

export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
          behavior={Platform.OS==='ios'?'padding':'height'}
          keyboardVerticalOffset={Platform.OS === 'ios'?-64:0}
          style={{ flex:1 }}
          >
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown:false,
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown:false,
                }}
              />
              <Stack.Screen
                name='EatsScreen'
                component={EatsScreen}
                options={{
                  headerShown:false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
