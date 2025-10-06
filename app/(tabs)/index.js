// app/(tabs)/index.js

import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterModal from '../../src/components/FilterModal';
import { events as mockEvents } from '../../src/data/mockData';

const PRIMARY_COLOR = '#4263EB';
const CATEGORIES = ['Todos', 'Comida', 'Música', 'Compras', 'Diversão'];

// CORREÇÃO: Componentes formatados em múltiplas linhas e sem o ';' no final
const HighlightCard = ({ event }) => (
  <TouchableOpacity style={styles.highlightCard}>
    <Image source={{ uri: event.image }} style={styles.highlightImage} />
    <View style={styles.tagContainer}>
      <Text style={styles.tagText}>{event.category}</Text>
    </View>
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{event.date}</Text>
    </View>
    <View style={styles.highlightContent}>
      <Text style={styles.highlightTitle}>{event.title}</Text>
      <Text style={styles.highlightLocation}><Feather name="map-pin" size={12} /> {event.location}</Text>
      <Text style={styles.highlightDescription}>{event.description}</Text>
      <Text style={styles.highlightTime}><Feather name="clock" size={12} /> {event.time}</Text>
    </View>
  </TouchableOpacity>
);

const EventCard = ({ event }) => (
  <TouchableOpacity style={styles.eventCard}>
    <Image source={{ uri: event.image }} style={styles.eventImage} />
    <View style={styles.eventContent}>
      <Text style={styles.tagTextSmall}>{event.category}</Text>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.eventLocation}><Feather name="map-pin" size={12} /> {event.location}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <View style={styles.eventFooter}>
        <Text style={styles.eventInfo}><Feather name="calendar" size={12} /> {event.date}</Text>
        <Text style={styles.eventInfo}><Feather name="clock" size={12} /> {event.time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


const FeedScreen = () => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);

  const [filters, setFilters] = useState({
    category: 'Todos',
    date: null,
    location: '',
  });

  const highlights = mockEvents.filter(e => e.isHighlight);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const categoryMatch = filters.category === 'Todos' || event.category === filters.category;
      const locationMatch = !filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase());
      return categoryMatch && locationMatch;
    });
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'Todos') count++;
    if (filters.date) count++;
    if (filters.location) count++;
    return count;
  }, [filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setModalVisible(false);
  };

  const handleClearFilters = () => {
    setFilters({ category: 'Todos', date: null, location: '' });
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View>
          <Text style={styles.locationLabel}>Sua localização</Text>
          <Text style={styles.locationText}><Feather name="map-pin" size={16} /> Centro, São Paulo</Text>
        </View>
        <Text style={styles.logo}>PointDV</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput placeholder="Buscar eventos..." style={styles.searchInput} />
          <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
            <Feather name="filter" size={20} color="#333" />
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryChip, filters.category === item && styles.categoryChipSelected]}
              onPress={() => setFilters(prev => ({ ...prev, category: item }))} 
            >
              <Text style={[styles.categoryText, filters.category === item && styles.categoryTextSelected]}>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaques perto de você</Text>
          <Text style={styles.sectionSubtitle}>Eventos e promoções imperdíveis</Text>
          <FlatList
            horizontal
            data={highlights}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HighlightCard event={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resultados</Text>
          {filteredEvents.map(event => <EventCard key={event.id} event={event} />)}
        </View>
      </ScrollView>

      {/* Reative o FilterModal aqui quando quiser testá-lo */}
      <FilterModal 
        visible={isModalVisible}
        currentFilters={filters}
        onClose={() => setModalVisible(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </View>
  );
};

// ... (O resto dos estilos continua o mesmo)
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    container: { flex: 1 },
    header: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingHorizontal: 20, 
      paddingBottom: 10,
      backgroundColor: '#fff',
    },
    locationLabel: { color: '#888', fontSize: 12 },
    locationText: { fontWeight: 'bold', fontSize: 16 },
    logo: { color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 20 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 10, paddingHorizontal: 10, marginHorizontal: 20 },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, height: 50 },
    filterButton: { position: 'relative' },
    filterBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
    filterBadgeText: { color: '#fff', fontSize: 12 },
    categoriesList: { paddingHorizontal: 20, marginVertical: 20 },
    categoryChip: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#f0f2f5', borderRadius: 20, marginRight: 10 },
    categoryChipSelected: { backgroundColor: PRIMARY_COLOR },
    categoryText: { color: '#333' },
    categoryTextSelected: { color: '#fff' },
    section: { paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
    sectionSubtitle: { color: '#888', marginBottom: 15 },
    highlightCard: { width: 300, marginRight: 15, borderRadius: 15, overflow: 'hidden', backgroundColor: '#fff', elevation: 3 },
    highlightImage: { width: '100%', height: 150 },
    tagContainer: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
    tagText: { color: '#fff', fontWeight: 'bold' },
    dateContainer: { position: 'absolute', top: 10, right: 10, backgroundColor: '#fff', borderRadius: 8, padding: 8, alignItems: 'center' },
    dateText: { color: '#333', fontWeight: 'bold' },
    highlightContent: { padding: 15 },
    highlightTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    highlightLocation: { color: '#666', marginBottom: 5 },
    highlightDescription: { color: '#888', fontSize: 12 },
    highlightTime: { color: '#666' },
    eventCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 15, padding: 10, marginBottom: 15, elevation: 3 },
    eventImage: { width: 100, height: 100, borderRadius: 10 },
    eventContent: { flex: 1, marginLeft: 15 },
    tagTextSmall: { backgroundColor: PRIMARY_COLOR, color: '#fff', alignSelf: 'flex-start', paddingHorizontal: 8, borderRadius: 5, fontSize: 12, marginBottom: 5, overflow: 'hidden' },
    eventTitle: { fontSize: 16, fontWeight: 'bold' },
    eventLocation: { color: '#666', marginVertical: 4 },
    eventDescription: { color: '#888', fontSize: 12, flexShrink: 1 },
    eventFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    eventInfo: { color: '#666' },
});


export default FeedScreen;