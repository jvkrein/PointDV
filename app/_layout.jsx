// app/_layout.jsx (COM A TELA DE CONFIGURAÇÕES)

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EventsProvider } from './contexts/EventsContext';

const RootLayout = () => {
  return (
    <EventsProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" /> 
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="detalhes-evento" />
          <Stack.Screen name="criar-evento" />
          {/* MUDANÇA AQUI: Adicionada a nova tela de configurações */}
          <Stack.Screen name="configuracoes" /> 
        </Stack>
      </SafeAreaProvider>
    </EventsProvider>
  );
};

export default RootLayout;