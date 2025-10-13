// app/contexts/EventsContext.jsx

/**
 * Este arquivo gerencia o estado global da aplicação usando a Context API do React.
 * Ele compartilha informações como o tipo de usuário logado, eventos confirmados e favoritos
 * entre todas as telas, evitando a necessidade de passar props por múltiplos níveis.
 */

import React, { createContext, useState } from 'react';

// Cria o objeto de Contexto que será usado pelos componentes para acessar o estado.
export const EventsContext = createContext();

/**
 * Componente "Provedor" que envolve a aplicação.
 * É aqui que os estados são criados e as funções que os modificam são definidas.
 */
export const EventsProvider = ({ children }) => {
  // Estado para rastrear o número de eventos que o usuário confirmou presença.
  const [confirmedEventsCount, setConfirmedEventsCount] = useState(0);

  // Estado que armazena um array com os IDs dos eventos favoritados pelo usuário.
  const [favoritedEvents, setFavoritedEvents] = useState([]);

  // Estado para diferenciar a experiência do usuário entre 'consumidor' e 'lojista'.
  const [userType, setUserType] = useState('consumidor'); // O padrão é 'consumidor'.

  /**
   * Adiciona ou remove um ID de evento do array de favoritos.
   * @param {number} eventId - O ID do evento a ser favoritado/desfavoritado.
   */
  const toggleFavorite = (eventId) => {
    setFavoritedEvents(prevFavorites => {
      // Se o ID já existe no array, remove (desfavorita).
      if (prevFavorites.includes(eventId)) {
        return prevFavorites.filter(id => id !== eventId);
      } 
      // Se não existe, adiciona (favorita).
      else {
        return [...prevFavorites, eventId];
      }
    });
  };

  // Objeto que agrupa todos os estados e funções a serem compartilhados.
  const value = {
    confirmedEventsCount,
    setConfirmedEventsCount,
    favoritedEvents,
    toggleFavorite,
    userType,
    setUserType,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};