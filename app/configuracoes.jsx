// app/configuracoes.jsx (VERSÃO FINAL COM LAYOUT CORRIGIDO)

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'; // Adicionado React para clareza
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
};

const SettingSwitchItem = ({ label, description, value, onValueChange, disabled = false }) => (
  <View style={styles.switchItem}>
    <View style={{ flex: 1 }}><Text style={styles.listItemTitle}>{label}</Text><Text style={styles.listItemSubtitle}>{description}</Text></View>
    <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={value ? COLORS.primary : '#f4f3f4'} onValueChange={onValueChange} value={value} disabled={disabled} />
  </View>
);

const SettingNavigationItem = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <View><Text style={styles.listItemTitle}>{label}</Text>{value && <Text style={styles.listItemSubtitle}>{value}</Text>}</View>
    <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gray} />
  </TouchableOpacity>
);

const ConfiguracoesScreen = () => {
  const [novosEventos, setNovosEventos] = useState(true);
  const [promocoes, setPromocoes] = useState(true);
  const [atualizacoes, setAtualizacoes] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.dark} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- ESTRUTURA DOS CARDS CORRIGIDA --- */}

        {/* Card Localização */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="map-marker-outline" size={24} color={COLORS.primary} /><Text style={styles.sectionTitle}>Localização</Text></View>
          <SettingNavigationItem label="Endereço atual" value="Casa - Centro" />
        </View>

        {/* Card Notificações */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.primary} /><Text style={styles.sectionTitle}>Notificações</Text></View>
          <SettingSwitchItem label="Novos eventos" description="Receba alertas de eventos próximos" value={novosEventos} onValueChange={setNovosEventos} />
          <View style={styles.divider} />
          <SettingSwitchItem label="Promoções" description="Ofertas especiais e descontos" value={promocoes} onValueChange={setPromocoes} />
          <View style={styles.divider} />
          <SettingSwitchItem label="Atualizações do app" description="Novidades e melhorias" value={atualizacoes} onValueChange={setAtualizacoes} />
        </View>

        {/* Card Aparência */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="theme-light-dark" size={24} color={COLORS.primary} /><Text style={styles.sectionTitle}>Aparência</Text></View>
          <SettingSwitchItem label="Modo escuro" description="Ativar tema escuro" value={modoEscuro} onValueChange={setModoEscuro} disabled={true} />
          <Text style={styles.comingSoonText}>Em breve: Modo escuro disponível na próxima versão</Text>
        </View>

        {/* Card Idioma */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="web" size={24} color={COLORS.primary} /><Text style={styles.sectionTitle}>Idioma</Text></View>
          <SettingNavigationItem label="Português (Brasil)" />
        </View>
        
        {/* Card Privacidade e Segurança */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="shield-lock-outline" size={24} color={COLORS.primary} /><Text style={styles.sectionTitle}>Privacidade e Segurança</Text></View>
          <SettingNavigationItem label="Política de Privacidade" />
          <View style={styles.divider} />
          <SettingNavigationItem label="Termos de Uso" />
          <View style={styles.divider} />
          <SettingNavigationItem label="Alterar senha" />
        </View>

        {/* Card Suporte */}
        <View style={styles.card}>
          <View style={styles.cardHeader}><MaterialCommunityIcons name="help-circle-outline" size={24} color={COLORS.primary} /><Text style={styles.sectionTitle}>Suporte</Text></View>
          <SettingNavigationItem label="Central de Ajuda" />
          <View style={styles.divider} />
          <SettingNavigationItem label="Sobre o PointDV" />
        </View>

        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.lightGray },
  header: { padding: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  container: { padding: 15 },
  // --- ESTILOS CORRIGIDOS ---
  card: { backgroundColor: COLORS.white, borderRadius: 8, marginBottom: 15, padding: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  listItemTitle: { fontSize: 16 },
  listItemSubtitle: { color: COLORS.gray, fontSize: 12, marginTop: 2 },
  switchItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  navItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: 10 },
  divider: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 5 },
  comingSoonText: { fontSize: 12, color: COLORS.gray, marginTop: 5, marginLeft: 5 },
  versionText: { textAlign: 'center', color: COLORS.gray, fontSize: 12, paddingBottom: 20 },
});

export default ConfiguracoesScreen;