// app/contexts/EventsContext.jsx (VERSÃO FINAL COM USERTYPE)

import { createContext, useState } from 'react';

// 1. Criamos o contexto
export const EventsContext = createContext();

// 2. Criamos o "Provedor" que vai gerenciar e compartilhar a informação
export const EventsProvider = ({ children }) => {
  // Estado para o número de eventos confirmados
  const [confirmedEventsCount, setConfirmedEventsCount] = useState(0);

  // Estado para guardar os IDs dos eventos favoritados
  const [favoritedEvents, setFavoritedEvents] = useState([]);

  // <-- MUDANÇA 1: Novo estado para guardar o tipo de usuário ('consumidor' ou 'lojista')
  const [userType, setUserType] = useState('consumidor'); // O padrão é consumidor

  // Função para adicionar ou remover um evento dos favoritos
  const toggleFavorite = (eventId) => {
    setFavoritedEvents(prevFavorites => {
      if (prevFavorites.includes(eventId)) {
        return prevFavorites.filter(id => id !== eventId);
      } else {
        return [...prevFavorites, eventId];
      }
    });
  };

  // O provedor agora compartilha TODAS as informações
  const value = {
    confirmedEventsCount,
    setConfirmedEventsCount,
    favoritedEvents,
    toggleFavorite,
    userType,          // <-- MUDANÇA 2: Compartilhando o novo estado
    setUserType,       // <-- MUDANÇA 3: Compartilhando a função para alterá-lo
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};