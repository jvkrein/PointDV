// app/_layout.jsx

/**
 * Este é o arquivo de layout raiz da aplicação, funcionando como o ponto de entrada da navegação.
 * Ele define a estrutura principal (Stack Navigator) e envolve toda a aplicação com os
 * Provedores de Contexto globais, como o EventsProvider e o SafeAreaProvider.
 */

import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EventsProvider } from './contexts/EventsContext';

/**
 * O componente RootLayout define o navegador principal do tipo "Stack" (pilha).
 * Todas as telas e grupos de telas de nível superior são declarados aqui.
 */
const RootLayout = () => {
  return (
    // EventsProvider disponibiliza o estado global (userType, favoritos, etc.) para toda a aplicação.
    <EventsProvider>
      {/* SafeAreaProvider calcula as áreas seguras do dispositivo (notch, barra de gestos)
        e as disponibiliza para os componentes filhos, como o SafeAreaView.
      */}
      <SafeAreaProvider>
        {/* Stack Navigator gerencia a navegação empilhando telas umas sobre as outras. */}
        <Stack screenOptions={{ headerShown: false }}>
          
          {/* Telas do fluxo de autenticação */}
          <Stack.Screen name="login" /> 
          <Stack.Screen name="signup" />

          {/* Grupo de telas que compõem a navegação por abas (Tabs) principal do app. */}
          <Stack.Screen name="(tabs)" />
          
          {/* Telas que são apresentadas sobre as abas, como modais ou páginas de detalhe. */}
          <Stack.Screen name="detalhes-evento" />
          <Stack.Screen name="criar-evento" />
          <Stack.Screen name="configuracoes" /> 
        </Stack>
      </SafeAreaProvider>
    </EventsProvider>
  );
};

export default RootLayout;