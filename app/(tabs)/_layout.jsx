// app/(tabs)/_layout.jsx (ESTA É A CORREÇÃO PRINCIPAL)

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventsContext } from '../contexts/EventsContext';

const COLORS = {
  primary: '#4A90E2',
  gray: '#A0A0A0',
  notification: '#28a745',
};

export default function TabLayout() {
  const { confirmedEventsCount } = useContext(EventsContext);
  const insets = useSafeAreaInsets(); // Mede as áreas seguras

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        // A mágica acontece aqui:
        tabBarStyle: {
          height: 60 + insets.bottom, // A altura da barra agora inclui o espaço da navegação do celular
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10, // O padding interno também se ajusta
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (<MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={28} color={color} />),
        }}
      />
      <Tabs.Screen
        name="meus-eventos"
        options={{
          title: 'Meus Eventos',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <MaterialCommunityIcons name={focused ? 'calendar-check' : 'calendar-check-outline'} size={28} color={color} />
              {confirmedEventsCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{confirmedEventsCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (<MaterialCommunityIcons name={focused ? 'heart' : 'heart-outline'} size={28} color={color} />),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (<MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} size={28} color={color} />),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: COLORS.notification,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});