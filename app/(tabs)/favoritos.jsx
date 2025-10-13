// app/(tabs)/favoritos.jsx

/**
 * Tela que exibe a lista de eventos favoritados pelo usuário.
 * Ela lê o estado global de favoritos e renderiza uma de duas visualizações:
 * 1. Um estado de "lista vazia" se nenhum evento foi favoritado.
 * 2. Uma lista com os cards dos eventos salvos.
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventsContext } from '../contexts/EventsContext';

// Paleta de cores padrão da aplicação.
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
};

// Componente para a tela vazia, exibido quando não há favoritos.
const EmptyFavorites = () => (
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons name="heart-outline" size={80} color={COLORS.gray} />
    <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
    <Text style={styles.emptySubtitle}>
      Salve eventos que você gostaria de participar para acessá-los rapidamente aqui
    </Text>
    <Link href="/(tabs)/" asChild>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="compass-outline" size={20} color={COLORS.white} />
        <Text style={styles.buttonText}>Descobrir Eventos</Text>
      </TouchableOpacity>
    </Link>
  </View>
);

// Componente para o card de um evento favoritado.
// OBS: Atualmente, este card não é dinâmico, pois a tela de detalhes não passa o ID do evento para ele.
// Para a entrega, ele simula a aparência de um evento favoritado.
const FavoriteEventCard = () => (
    <Link href="/detalhes-evento" asChild>
        <TouchableOpacity style={styles.card}>
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' }}
                style={styles.cardImage}
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Jantar Romântico</Text>
                <Text style={styles.cardLocation}>Restaurante La Bella</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>Menu especial para casais com entrada, prato principal e sobremesa.</Text>
                <View style={styles.cardFooter}>
                    <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={COLORS.gray} />
                    <Text style={styles.cardDate}>13 out.</Text>
                    <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.gray} style={{marginLeft: 15}} />
                    <Text style={styles.cardDate}>19:30</Text>
                </View>
            </View>
        </TouchableOpacity>
    </Link>
);

const FavoritosScreen = () => {
  // Lê a lista de IDs de eventos favoritados do "cérebro" da aplicação.
  const { favoritedEvents } = useContext(EventsContext);
  const favoritesCount = favoritedEvents.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <Text style={styles.headerSubtitle}>{favoritesCount} {favoritesCount === 1 ? 'evento salvo' : 'eventos salvos'}</Text>
      </View>

      {/* Renderização Condicional: Se a contagem de favoritos for zero, mostra a tela vazia.
          Caso contrário, renderiza a lista de eventos. */}
      {favoritesCount === 0 ? (
        <EmptyFavorites />
      ) : (
        <ScrollView style={styles.listContainer}>
          {/* Para este protótipo, renderiza o card fixo se a lista não estiver vazia. */}
          <FavoriteEventCard />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// Folha de estilos do componente.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerSubtitle: { color: COLORS.gray, fontSize: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.dark, marginTop: 20 },
  emptySubtitle: { fontSize: 16, color: COLORS.gray, textAlign: 'center', marginTop: 10, marginBottom: 30 },
  button: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  listContainer: { padding: 15 },
  card: { backgroundColor: COLORS.white, borderRadius: 8, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, padding: 10, flexDirection: 'row' },
  cardImage: { width: 90, height: 90, borderRadius: 8 },
  cardContent: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardLocation: { color: COLORS.gray, fontSize: 12, marginVertical: 2 },
  cardDescription: { color: COLORS.dark, fontSize: 12 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  cardDate: { marginLeft: 5, color: COLORS.gray, fontSize: 12 },
});

export default FavoritosScreen;