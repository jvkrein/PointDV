// app/(tabs)/_layout.js
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. IMPORTAMOS O HOOK

const PRIMARY_COLOR = '#4263EB';
const INACTIVE_COLOR = '#8e8e8e';

export default function TabsLayout() {
  const insets = useSafeAreaInsets(); // 2. PEGAMOS AS MEDIDAS DA ÁREA SEGURA

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        // 3. APLICAMOS AS MEDIDAS DINAMICAMENTE NO ESTILO
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: insets.bottom + 5, // Adiciona o espaçamento seguro embaixo
          height: 60 + insets.bottom,     // Aumenta a altura total da barra
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'heart' : 'heart-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}