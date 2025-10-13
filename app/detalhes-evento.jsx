// app/detalhes-evento.jsx

/**
 * Tela que exibe os detalhes completos de um evento específico.
 * As informações do evento são recebidas dinamicamente da tela anterior via parâmetros de rota.
 * A tela permite ao usuário favoritar e confirmar participação no evento.
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventsContext } from './contexts/EventsContext';

// Paleta de cores padrão da aplicação.
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  green: '#28a745',
  blue: '#007bff',
  lightGray: '#F0F2F5',
  yellow: '#fffbeb',
  red: '#dc3545',
};

const DetalhesEventoScreen = () => {
    // Hook do Expo Router para ler os parâmetros passados na navegação.
    const params = useLocalSearchParams();
    // Decodifica a string JSON de volta para um objeto JavaScript para ser usado na tela.
    const event = JSON.parse(params.eventData);

    // Estado para controlar a visibilidade do modal "Quero Participar".
    const [modalVisible, setModalVisible] = useState(false);

    // Acessa o estado global e as funções para manipular os dados da aplicação.
    const { setConfirmedEventsCount, favoritedEvents, toggleFavorite } = useContext(EventsContext);
    
    // Verifica se o ID do evento atual está presente no array de favoritos do estado global.
    const isFavorited = favoritedEvents.includes(event.id);

    /**
     * Função chamada ao confirmar a participação em um evento.
     * Ela fecha o modal e atualiza o estado global de eventos confirmados.
     */
    const handleConfirmar = () => {
        setModalVisible(false);
        setConfirmedEventsCount(1); // Para o protótipo, define o contador como 1.
    }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView>
        {/* Imagem de cabeçalho do evento com botões de voltar e favoritar sobrepostos. */}
        <ImageBackground source={{ uri: event.image }} style={styles.headerImage}>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.dark} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorite(event.id)} style={styles.iconButton}>
              <MaterialCommunityIcons name={isFavorited ? "heart" : "heart-outline"} size={24} color={isFavorited ? COLORS.red : COLORS.dark} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        
        {/* Conteúdo principal com todas as informações detalhadas do evento. */}
        <View style={styles.contentContainer}>
          <Text style={styles.categoryTag}>{event.category}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <TouchableOpacity style={styles.restaurantLink}>
            <Text style={styles.restaurantName}>{event.establishment.name}</Text>
            <MaterialCommunityIcons name="chevron-right" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.description}>{event.description}</Text>
          <View style={styles.infoBox}><MaterialCommunityIcons name="calendar" size={24} color={COLORS.primary} /><View><Text style={styles.infoTitle}>Data</Text><Text style={styles.infoText}>{event.fullDate}</Text></View></View>
          <View style={styles.infoBox}><MaterialCommunityIcons name="clock-outline" size={24} color={COLORS.primary} /><View><Text style={styles.infoTitle}>Horário</Text><Text style={styles.infoText}>{event.time}</Text></View></View>
          <View style={styles.infoBox}><MaterialCommunityIcons name="map-marker-outline" size={24} color={COLORS.primary} /><View><Text style={styles.infoTitle}>Local</Text><Text style={styles.infoText}>{event.address}</Text></View></View>
          <Text style={styles.sectionTitle}>Sobre o Estabelecimento</Text>
          <TouchableOpacity style={styles.establishmentCard}>
            <Image source={{ uri: event.establishment.image }} style={styles.establishmentImage} />
            <View style={styles.establishmentInfo}>
              <Text style={styles.establishmentName}>{event.establishment.name}</Text>
              <Text style={styles.establishmentDetail}>{event.establishment.phone}</Text>
              <Text style={styles.establishmentDetail}>{event.establishment.hours}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Rodapé fixo com os botões de ação principais. */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => toggleFavorite(event.id)} style={styles.favoriteButton}>
          <MaterialCommunityIcons name={isFavorited ? "heart" : "heart-outline"} size={28} color={isFavorited ? COLORS.red : COLORS.dark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.actionButtonText}>Quero Participar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal interativo que funciona como um "bottom sheet". */}
      <Modal 
        visible={modalVisible} 
        transparent={true} 
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Permite fechar o modal com o botão "voltar" do Android.
      >
          {/* Componente que detecta o clique na área escura (fora do conteúdo) para fechar o modal. */}
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.modalContainer}>
                  {/* Este componente impede que o clique DENTRO do modal o feche acidentalmente. */}
                  <TouchableWithoutFeedback>
                      <View style={styles.modalContent}>
                          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                              <MaterialCommunityIcons name="close" size={24} color={COLORS.gray} />
                          </TouchableOpacity>
                          <Text style={styles.modalTitle}>Quero Participar</Text>
                          <Text style={styles.modalSubtitle}>Confirme sua participação e acesse opções úteis</Text>
                          
                          <View style={styles.eventInfoModal}>
                              <Text style={styles.eventTitleModal}>{event.title}</Text>
                              <Text style={styles.eventDetailsModal}>{event.fullDate} às {event.time}</Text>
                              <Text style={styles.eventDetailsModal}>{event.address}</Text>
                          </View>

                          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
                              <MaterialCommunityIcons name="check" size={20} color={COLORS.white} />
                              <Text style={styles.confirmButtonText}>Confirmar Participação</Text>
                          </TouchableOpacity>

                          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
                          <View style={styles.actionGrid}>
                              <TouchableOpacity style={styles.actionCard}><MaterialCommunityIcons name="heart-outline" size={24} color={COLORS.dark} /><Text style={styles.actionText}>Favoritar</Text></TouchableOpacity>
                              <TouchableOpacity style={styles.actionCard}><MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.dark} /><Text style={styles.actionText}>Lembrete</Text></TouchableOpacity>
                              <TouchableOpacity style={styles.actionCard}><MaterialCommunityIcons name="share-variant" size={24} color={COLORS.dark} /><Text style={styles.actionText}>Compartilhar</Text></TouchableOpacity>
                              <TouchableOpacity style={styles.actionCard}><MaterialCommunityIcons name="map-marker-outline" size={24} color={COLORS.dark} /><Text style={styles.actionText}>Como Chegar</Text></TouchableOpacity>
                          </View>

                          <Text style={styles.sectionTitle}>Contatar Estabelecimento</Text>
                          <TouchableOpacity style={[styles.contactButton, {backgroundColor: COLORS.green}]}><MaterialCommunityIcons name="whatsapp" size={20} color={COLORS.white} /><Text style={styles.contactButtonText}>WhatsApp</Text></TouchableOpacity>
                          <TouchableOpacity style={[styles.contactButton, {backgroundColor: COLORS.blue}]}><MaterialCommunityIcons name="phone" size={20} color={COLORS.white} /><Text style={styles.contactButtonText}>Ligar</Text></TouchableOpacity>
                          
                          <View style={styles.tipBox}><MaterialCommunityIcons name="lightbulb-on-outline" size={24} color={'#f59e0b'} /><Text style={styles.tipText}>Dica: Entre em contato com o estabelecimento para confirmar disponibilidade e fazer reservas.</Text></View>
                      </View>
                  </TouchableWithoutFeedback>
              </View>
          </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

// Folha de estilos do componente.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  headerImage: { height: 250, justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 15, flexDirection: 'row' },
  headerIcons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  iconButton: { backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  contentContainer: { backgroundColor: COLORS.white, marginTop: -20, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40 },
  categoryTag: { backgroundColor: COLORS.primary, color: COLORS.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, alignSelf: 'flex-start', overflow: 'hidden' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  restaurantLink: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  restaurantName: { color: COLORS.primary, fontSize: 16 },
  description: { color: COLORS.gray, marginVertical: 10, lineHeight: 20 },
  infoBox: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  infoTitle: { fontWeight: 'bold', marginLeft: 15 },
  infoText: { color: COLORS.gray, marginLeft: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 25, marginBottom: 15 },
  establishmentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, padding: 10, borderRadius: 8 },
  establishmentImage: { width: 60, height: 60, borderRadius: 8 },
  establishmentInfo: { flex: 1, marginLeft: 10 },
  establishmentName: { fontWeight: 'bold' },
  establishmentDetail: { color: COLORS.gray, fontSize: 12, marginTop: 4 },
  footer: { padding: 15, borderTopWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white },
  favoriteButton: { borderWidth: 1, borderColor: COLORS.gray, borderRadius: 8, padding: 12, marginRight: 10 },
  actionButton: { flex: 1, backgroundColor: COLORS.primary, padding: 15, borderRadius: 8, alignItems: 'center' },
  actionButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40 },
  closeButton: { alignSelf: 'flex-end', marginBottom: 5 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  modalSubtitle: { color: COLORS.gray, textAlign: 'center', marginVertical: 10 },
  eventInfoModal: { padding: 15, backgroundColor: COLORS.lightGray, borderRadius: 8, marginVertical: 15 },
  eventTitleModal: { fontWeight: 'bold' },
  eventDetailsModal: { color: COLORS.gray, marginTop: 5, fontSize: 12 },
  confirmButton: { flexDirection: 'row', justifyContent: 'center', backgroundColor: COLORS.primary, padding: 15, borderRadius: 8, alignItems: 'center' },
  confirmButtonText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  actionCard: { width: '48%', borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 20, alignItems: 'center', marginBottom: 10 },
  actionText: { marginTop: 8, fontSize: 12 },
  contactButton: { flexDirection: 'row', padding: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  contactButtonText: { color: COLORS.white, fontWeight: 'bold', marginLeft: 10 },
  tipBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.yellow, padding: 15, borderRadius: 8, marginTop: 25 },
  tipText: { flex: 1, marginLeft: 10, color: '#b45309', fontSize: 12 },
});

export default DetalhesEventoScreen;