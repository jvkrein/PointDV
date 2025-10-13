// app/(tabs)/index.jsx (VERSÃO ATUALIZADA COM ENVIO DE DADOS)

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  lightGray: '#F0F2F5',
  gray: '#A0A0A0',
  dark: '#333333',
};

// <-- MUDANÇA 1: Dados de exemplo enriquecidos com todos os detalhes necessários
const DUMMY_EVENTS = {
  destaques: [
    { 
      id: 1, 
      category: 'Comida', 
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500', 
      title: 'Jantar Romântico', 
      location: 'Restaurante La Bella', 
      time: '19:30', 
      shortDate: 'OUT\n13',
      fullDate: 'segunda-feira, 13 de outubro de 2025',
      address: 'Av. Paulista, 1000',
      description: 'Menu especial para casais com entrada, prato principal e sobremesa. Reservas pelo telefone.',
      establishment: {
        name: 'Restaurante La Bella',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        phone: '(11) 99999-3456',
        hours: 'Ter-Dom: 12h-23h'
      }
    },
    { 
      id: 2, 
      category: 'Entretenimento', 
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500', 
      title: 'Festa Anos 80', 
      location: 'Clube Noturno', 
      time: '22:00', 
      shortDate: 'OUT\n15',
      fullDate: 'quarta-feira, 15 de outubro de 2025',
      address: 'Rua Augusta, 500',
      description: 'DJ tocando os maiores sucessos dos anos 80. Open bar até meia-noite. Ingressos limitados!',
      establishment: {
        name: 'Clube Noturno',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500',
        phone: '(11) 98888-1234',
        hours: 'Sex-Sáb: 22h-04h'
      }
    },
  ],
  todos: [
    // ... você pode enriquecer os outros eventos da mesma forma se quiser ...
  ],
};

// <-- MUDANÇA 2: O EventCard agora envia os dados do evento clicado via parâmetros
const EventCard = ({ event, isHighlight = false }) => (
  <Link 
    href={{
      pathname: "/detalhes-evento",
      // Enviamos o objeto do evento como uma string. A outra tela vai decodificar.
      params: { eventData: JSON.stringify(event) }
    }} 
    asChild
  >
    <TouchableOpacity style={isHighlight ? styles.highlightCard : styles.eventCard}>
      <ImageBackground source={{ uri: event.image }} style={styles.cardImage} imageStyle={{ borderRadius: 8 }}>
        <View style={styles.cardTagContainer}><Text style={styles.cardTag}>{event.category}</Text></View>
        {isHighlight && (<View style={styles.dateTagContainer}><Text style={styles.dateTag}>{event.shortDate}</Text></View>)}
      </ImageBackground>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{event.title}</Text>
        <Text style={styles.cardLocation}>{event.location}</Text>
        {isHighlight && <Text style={styles.cardDescription} numberOfLines={2}>{event.description}</Text>}
        <View style={styles.cardTimeContainer}>
          <MaterialCommunityIcons name="clock-outline" size={14} color={COLORS.gray} />
          <Text style={styles.cardTime}>{event.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

const FeedScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View><Text style={styles.headerLocationText}>Entregar em</Text><Text style={styles.headerLocation}>Casa - Centro</Text></View>
          <Text style={styles.headerLogo}>PointDV</Text>
        </View>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={22} color={COLORS.gray} />
          <TextInput placeholder="Buscar eventos..." style={styles.searchInput} />
          <MaterialCommunityIcons name="filter-variant" size={22} color={COLORS.dark} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <TouchableOpacity style={[styles.categoryButton, styles.categoryButtonActive]}>
            <MaterialCommunityIcons name="compass" size={24} color={COLORS.white} />
            <Text style={[styles.categoryText, styles.categoryTextActive]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={COLORS.gray} />
            <Text style={styles.categoryText}>Comida</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaques perto de você</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DUMMY_EVENTS.destaques.map(event => <EventCard key={event.id} event={event} isHighlight />)}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Todos os eventos</Text>
          {DUMMY_EVENTS.todos.map(event => <EventCard key={event.id} event={event} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { paddingHorizontal: 15, paddingTop: 15, paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLocationText: { color: COLORS.gray },
  headerLocation: { fontWeight: 'bold', color: COLORS.dark },
  headerLogo: { color: COLORS.primary, fontWeight: 'bold', fontSize: 18 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, borderRadius: 8, paddingHorizontal: 10, marginTop: 20 },
  searchInput: { flex: 1, height: 45, marginLeft: 10 },
  categoryScroll: { marginTop: 20 },
  categoryButton: { alignItems: 'center', marginRight: 20 },
  categoryButtonActive: { backgroundColor: COLORS.primary, borderRadius: 50, width: 50, height: 50, justifyContent: 'center' },
  categoryText: { color: COLORS.gray, marginTop: 5 },
  categoryTextActive: { display: 'none' },
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  highlightCard: { width: 250, backgroundColor: COLORS.white, borderRadius: 8, marginRight: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, },
  eventCard: { backgroundColor: COLORS.white, borderRadius: 8, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, },
  cardImage: { height: 120, justifyContent: 'space-between', padding: 8, flexDirection: 'row' },
  cardTagContainer: { backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start' },
  cardTag: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
  dateTagContainer: { backgroundColor: COLORS.white, borderRadius: 4, padding: 5, alignItems: 'center' },
  dateTag: { color: COLORS.dark, fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  cardContent: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardLocation: { color: COLORS.gray, fontSize: 12, marginTop: 4 },
  cardDescription: { color: COLORS.dark, fontSize: 12, marginTop: 4 },
  cardTimeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  cardTime: { marginLeft: 5, color: COLORS.gray, fontSize: 12 },
});

export default FeedScreen;