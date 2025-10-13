// app/configuracoes.jsx

/**
 * Tela de Configurações do aplicativo.
 * Permite ajustar preferências de notificação, aparência, idioma e privacidade.
 * Também exibe informações sobre suporte e versão atual do app.
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Paleta de cores padrão da aplicação. */
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
};

/**
 * Componente reutilizável para itens com chave liga/desliga (Switch).
 * Usado para notificações e aparência.
 */
const SettingSwitchItem = ({ label, description, value, onValueChange, disabled = false }) => (
  <View style={styles.switchItem}>
    <View style={{ flex: 1 }}>
      <Text style={styles.listItemTitle}>{label}</Text>
      <Text style={styles.listItemSubtitle}>{description}</Text>
    </View>
    <Switch
      trackColor={{ false: '#767577', true: '#81b0ff' }}
      thumbColor={value ? COLORS.primary : '#f4f3f4'}
      onValueChange={onValueChange}
      value={value}
      disabled={disabled}
    />
  </View>
);

/**
 * Componente reutilizável para itens navegáveis.
 * Usado em seções como "Idioma", "Política de Privacidade" e "Suporte".
 */
const SettingNavigationItem = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <View>
      <Text style={styles.listItemTitle}>{label}</Text>
      {value && <Text style={styles.listItemSubtitle}>{value}</Text>}
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gray} />
  </TouchableOpacity>
);

/**
 * Componente principal da tela de configurações.
 * Contém as seções de ajustes do usuário e informações do aplicativo.
 */
const ConfiguracoesScreen = () => {
  // Estados locais das opções
  const [novosEventos, setNovosEventos] = useState(true);
  const [promocoes, setPromocoes] = useState(true);
  const [atualizacoes, setAtualizacoes] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Cabeçalho com botão de voltar e título da página */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      {/* Conteúdo principal da tela */}
      <ScrollView contentContainerStyle={styles.container}>

        {/* --- Seção: Localização --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="map-marker-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Localização</Text>
          </View>
          <SettingNavigationItem label="Endereço atual" value="Casa - Centro" />
        </View>

        {/* --- Seção: Notificações --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Notificações</Text>
          </View>

          <SettingSwitchItem
            label="Novos eventos"
            description="Receba alertas de eventos próximos"
            value={novosEventos}
            onValueChange={setNovosEventos}
          />
          <View style={styles.divider} />

          <SettingSwitchItem
            label="Promoções"
            description="Ofertas especiais e descontos"
            value={promocoes}
            onValueChange={setPromocoes}
          />
          <View style={styles.divider} />

          <SettingSwitchItem
            label="Atualizações do app"
            description="Novidades e melhorias"
            value={atualizacoes}
            onValueChange={setAtualizacoes}
          />
        </View>

        {/* --- Seção: Aparência --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="theme-light-dark" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Aparência</Text>
          </View>
          <SettingSwitchItem
            label="Modo escuro"
            description="Ativar tema escuro"
            value={modoEscuro}
            onValueChange={setModoEscuro}
            disabled={true}
          />
          <Text style={styles.comingSoonText}>
            Em breve: Modo escuro disponível na próxima versão
          </Text>
        </View>

        {/* --- Seção: Idioma --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="web" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Idioma</Text>
          </View>
          <SettingNavigationItem label="Português (Brasil)" />
        </View>

        {/* --- Seção: Privacidade e Segurança --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="shield-lock-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Privacidade e Segurança</Text>
          </View>
          <SettingNavigationItem label="Política de Privacidade" />
          <View style={styles.divider} />
          <SettingNavigationItem label="Termos de Uso" />
          <View style={styles.divider} />
          <SettingNavigationItem label="Alterar senha" />
        </View>

        {/* --- Seção: Suporte --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Suporte</Text>
          </View>
          <SettingNavigationItem label="Central de Ajuda" />
          <View style={styles.divider} />
          <SettingNavigationItem label="Sobre o PointDV" />
        </View>

        {/* Versão do aplicativo */}
        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

/** Folha de estilos da tela de Configurações. */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.lightGray },

  // Cabeçalho
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },

  // Container principal
  container: { padding: 15 },

  // Cartões de seção
  card: { backgroundColor: COLORS.white, borderRadius: 8, marginBottom: 15, padding: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },

  // Itens de lista
  listItemTitle: { fontSize: 16 },
  listItemSubtitle: { color: COLORS.gray, fontSize: 12, marginTop: 2 },
  switchItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },

  // Elementos visuais
  divider: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 5 },
  comingSoonText: { fontSize: 12, color: COLORS.gray, marginTop: 5, marginLeft: 5 },
  versionText: { textAlign: 'center', color: COLORS.gray, fontSize: 12, paddingBottom: 20 },
});

export default ConfiguracoesScreen;
