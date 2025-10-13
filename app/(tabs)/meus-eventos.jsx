// app/(tabs)/meus-eventos.jsx

/**
 * Tela dinâmica que exibe diferentes interfaces para o Consumidor e para o Lojista.
 * Utiliza o estado global 'userType' para decidir qual componente renderizar.
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventsContext } from '../contexts/EventsContext';

// Paleta de cores padrão da aplicação.
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
  green: '#28a745',
};

// --- COMPONENTES REUTILIZÁVEIS PARA A VISÃO DO CONSUMIDOR ---

// Componente exibido quando o consumidor não confirmou presença em nenhum evento.
const ConsumerEmptyState = () => (
  <View style={styles.container}>
    <MaterialCommunityIcons name="calendar-remove-outline" size={80} color={COLORS.gray} />
    <Text style={styles.title}>Nenhum evento confirmado</Text>
    <Text style={styles.subtitle}>Quando você confirmar participação, eles aparecerão aqui</Text>
    <Link href="/(tabs)/" asChild><TouchableOpacity style={styles.button}><MaterialCommunityIcons name="compass-outline" size={20} color={COLORS.white} /><Text style={styles.buttonText}>Explorar Eventos</Text></TouchableOpacity></Link>
  </View>
);

// Componente que exibe um card de um evento confirmado.
const ConfirmedEventCard = () => (
  <View style={styles.eventCard}>
    <Image source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500' }} style={styles.cardImage} />
    <View style={styles.tagConfirmed}><MaterialCommunityIcons name="check-circle" size={12} color={COLORS.white} /><Text style={styles.tagText}>Confirmado</Text></View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>Jantar Romântico</Text>
      <Text style={styles.cardLocation}>Restaurante La Bella</Text>
      <View style={styles.cardDetails}><Text style={styles.cardDate}>Seg, 13 Out.</Text><Text style={styles.cardTime}>19:30</Text></View>
    </View>
  </View>
);

// Componente que encapsula a lógica de visualização de participação do consumidor.
const ConsumerParticipationView = () => {
    const { confirmedEventsCount } = useContext(EventsContext);
    // Se não há eventos confirmados, mostra o estado vazio.
    if (confirmedEventsCount === 0) { return <ConsumerEmptyState />; }
    // Caso contrário, mostra a lista de eventos.
    return (<View style={styles.listContainer}><ConfirmedEventCard /></View>);
};

// --- COMPONENTE 1: TELA COMPLETA PARA O CONSUMIDOR ---
const ConsumerEventsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={[styles.header, { justifyContent: 'flex-start' }]}><Text style={styles.headerTitle}>Meus Eventos</Text></View>
      <ConsumerParticipationView />
    </SafeAreaView>
  );
};

// --- COMPONENTE 2: TELA COMPLETA PARA O LOJISTA ---
const LojistaEventsScreen = () => {
  // Estado local para controlar qual aba está ativa ('Meus Eventos' ou 'Participando').
  const [activeTab, setActiveTab] = useState('Meus Eventos');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {/* Cabeçalho específico do lojista com botão para criar evento. */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Meus Eventos</Text>
          <Text style={styles.headerSubtitleLojista}>0 criados • 0 participando</Text>
        </View>
        <Link href="/criar-evento" asChild>
          <TouchableOpacity style={styles.createButton}>
            <MaterialCommunityIcons name="plus" size={20} color={COLORS.white} />
            <Text style={styles.createButtonText}>Criar</Text>
          </TouchableOpacity>
        </Link>
      </View>
      {/* Navegação por abas interna da tela do lojista. */}
      <View style={styles.lojistaTabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Meus Eventos')} style={[styles.tabButton, activeTab === 'Meus Eventos' && styles.tabActive]}><Text style={[styles.tabText, activeTab === 'Meus Eventos' && styles.tabTextActive]}>Meus Eventos (0)</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Participando')} style={[styles.tabButton, activeTab === 'Participando' && styles.tabActive]}><Text style={[styles.tabText, activeTab === 'Participando' && styles.tabTextActive]}>Participando (0)</Text></TouchableOpacity>
      </View>
      
      {/* Renderização condicional do conteúdo com base na aba ativa. */}
      {activeTab === 'Meus Eventos' ? (
        // Visão para gerenciar os próprios eventos.
        <View style={styles.container}>
            <MaterialCommunityIcons name="calendar-blank-outline" size={80} color={COLORS.gray} />
            <Text style={styles.title}>Nenhum evento criado</Text>
            <Text style={styles.subtitle}>Crie seu primeiro evento para começar a divulgar suas promoções e atrair clientes</Text>
            <Link href="/criar-evento" asChild>
              <TouchableOpacity style={styles.button}>
                <MaterialCommunityIcons name="plus" size={20} color={COLORS.white} />
                <Text style={styles.buttonText}>Criar Evento</Text>
              </TouchableOpacity>
            </Link>
        </View>
      ) : (
        // Visão para eventos que o próprio lojista está participando (reutiliza a lógica do consumidor).
        <ConsumerParticipationView />
      )}
    </SafeAreaView>
  );
};

// --- COMPONENTE PRINCIPAL (EXPORTADO): O "SELETOR" INTELIGENTE ---
/**
 * Este é o componente principal exportado pelo arquivo. Ele atua como um "seletor",
 * lendo o 'userType' do estado global e decidindo qual das duas telas (Consumidor ou Lojista)
 * deve ser renderizada.
 */
const MeusEventosPage = () => {
  const { userType } = useContext(EventsContext);
  if (userType === 'lojista') {
    return <LojistaEventsScreen />;
  }
  return <ConsumerEventsScreen />;
};

// Folha de estilos do componente.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerSubtitleLojista: { color: COLORS.gray, fontSize: 12 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.dark, marginTop: 20 },
  subtitle: { fontSize: 16, color: COLORS.gray, textAlign: 'center', marginTop: 10, marginBottom: 30 },
  button: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  listContainer: { padding: 15 },
  consumerTabContainer: { flexDirection: 'row', backgroundColor: COLORS.lightGray, borderRadius: 8, padding: 4, marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 8, borderRadius: 6 },
  tabActive: { backgroundColor: COLORS.white, elevation: 1, shadowOpacity: 0.1, shadowRadius: 3 },
  tabText: { textAlign: 'center', color: COLORS.gray, fontWeight: 'bold' },
  tabTextActive: { color: COLORS.dark },
  eventCard: { flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  cardImage: { width: 80, height: 80, borderRadius: 8 },
  tagConfirmed: { position: 'absolute', top: 6, left: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.green, borderRadius: 12, paddingVertical: 2, paddingHorizontal: 6, },
  tagText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold', marginLeft: 3 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardLocation: { color: COLORS.gray, marginVertical: 4 },
  cardDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '60%' },
  cardDate: { color: COLORS.gray, fontSize: 12 },
  cardTime: { color: COLORS.gray, fontSize: 12 },
  createButton: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, alignItems: 'center' },
  createButtonText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 5 },
  lojistaTabContainer: { marginHorizontal: 15, marginTop: 15, flexDirection: 'row', backgroundColor: COLORS.lightGray, borderRadius: 8, padding: 4 },
});

export default MeusEventosPage;