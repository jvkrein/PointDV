// app/(tabs)/perfil.jsx

/**
 * Tela de Perfil do Usuário.
 * Exibe informações do usuário (consumidor ou lojista),
 * além de opções de navegação, como "Meus Eventos", "Favoritos" e "Configurações".
 * Inclui também botão de logout e seção "Sobre o PointDV".
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventsContext } from '../contexts/EventsContext';

/** Paleta de cores padrão da aplicação. */
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
  red: '#dc3545',
};

/** Dados de exemplo para simular os perfis. */
const consumidorData = { name: 'Maria Santos', type: 'Consumidor', email: 'consumidor@teste.com' };
const lojistaData = { name: 'João Silva', type: 'Lojista', email: 'lojista@teste.com', establishment: 'Bar do João' };

/**
 * Componente reutilizável de item de lista.
 * Representa uma opção de menu no perfil (como "Favoritos", "Configurações", etc.).
 */
const ProfileListItem = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={onPress}>
    <View style={styles.listItemIcon}>
      <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
    </View>
    <View style={styles.listItemTextContainer}>
      <Text style={styles.listItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.listItemSubtitle}>{subtitle}</Text>}
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gray} />
  </TouchableOpacity>
);

/**
 * Componente principal da tela de perfil.
 * Exibe informações do usuário logado e opções de ação.
 */
const PerfilScreen = () => {
  const { userType, setUserType } = useContext(EventsContext);
  const userData = userType === 'consumidor' ? consumidorData : lojistaData;

  /** Função de logout — redefine tipo de usuário e redireciona para login. */
  const handleLogout = () => {
    setUserType('consumidor');
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView>

        {/* Cabeçalho do perfil com nome, tipo e avatar. */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account-outline" size={40} color={COLORS.primary} />
          </View>

          <Text style={styles.userName}>{userData.name}</Text>

          <View style={userType === 'consumidor' ? styles.userTagConsumer : styles.userTagLojista}>
            <Text style={styles.userTagText}>{userData.type}</Text>
          </View>
        </View>

        {/* Conteúdo principal com dados e opções de ação. */}
        <View style={styles.content}>

          {/* Cartão de informações pessoais (e estabelecimento, se lojista). */}
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="email-outline" size={24} color={COLORS.primary} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Email</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </View>
            </View>

            {/* Exibe o nome do estabelecimento apenas para lojistas. */}
            {userType === 'lojista' && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoItem}>
                  <MaterialCommunityIcons name="storefront-outline" size={24} color={COLORS.primary} />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Estabelecimento</Text>
                    <Text style={styles.infoValue}>{userData.establishment}</Text>
                  </View>
                </View>
              </>
            )}
          </View>

          {/* Lista de ações e atalhos do perfil. */}
          <View style={styles.actionList}>
            {userType === 'lojista' && (
              <ProfileListItem 
                icon="calendar-edit"
                title="Gerenciar Eventos"
                subtitle="Criar e editar seus eventos"
                onPress={() => router.push('/(tabs)/meus-eventos')}
              />
            )}

            <ProfileListItem 
              icon="calendar-check-outline"
              title="Meus Eventos"
              subtitle="1 evento confirmado"
              onPress={() => router.push('/(tabs)/meus-eventos')}
            />

            <ProfileListItem 
              icon="heart-outline"
              title="Favoritos"
              subtitle="0 eventos salvos"
              onPress={() => router.push('/(tabs)/favoritos')}
            />

            <ProfileListItem 
              icon="cog-outline"
              title="Configurações"
              subtitle="Preferências e notificações"
              onPress={() => router.push('/configuracoes')}
            />
          </View>

          {/* Seção informativa sobre o aplicativo. */}
          <View style={styles.aboutSection}>
            <MaterialCommunityIcons name="information-outline" size={24} color={COLORS.primary} />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.aboutTitle}>Sobre o PointDV</Text>
              <Text style={styles.aboutText}>
                Descubra eventos e promoções locais. Conecte-se com os melhores estabelecimentos da sua cidade.
              </Text>
              <Text style={styles.aboutListItem}>• Para consumidores: encontre eventos próximos</Text>
              <Text style={styles.aboutListItem}>• Para lojistas: divulgue gratuitamente</Text>
              <Text style={styles.aboutListItem}>• Versão 1.0.0 - Beta</Text>
            </View>
          </View>

          {/* Botão de sair da conta. */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color={COLORS.red} />
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/** Folha de estilos da tela de perfil. */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.lightGray },

  // Cabeçalho
  header: { backgroundColor: COLORS.primary, padding: 20, paddingTop: 60, alignItems: 'center' },
  backButton: { position: 'absolute', top: 55, left: 15 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  userName: { fontSize: 22, fontWeight: 'bold', color: COLORS.white },
  userTagConsumer: { backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 12, marginTop: 8 },
  userTagLojista: { backgroundColor: '#FFD700', borderRadius: 12, paddingVertical: 4, paddingHorizontal: 12, marginTop: 8 },
  userTagText: { color: COLORS.dark, fontWeight: 'bold', fontSize: 12 },

  // Conteúdo
  content: { padding: 15, paddingBottom: 30 },

  // Cartão de informações
  infoCard: { backgroundColor: COLORS.white, borderRadius: 8, padding: 15, marginTop: -30, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2 },
  infoItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  infoTextContainer: { marginLeft: 15 },
  infoTitle: { color: COLORS.gray, fontSize: 12 },
  infoValue: { color: COLORS.dark, fontSize: 16, fontWeight: '500' },
  divider: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 5 },

  // Lista de ações
  actionList: { marginTop: 20, backgroundColor: COLORS.white, borderRadius: 8, overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  listItemIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.lightGray, justifyContent: 'center', alignItems: 'center' },
  listItemTextContainer: { flex: 1, marginLeft: 15 },
  listItemTitle: { fontSize: 16, fontWeight: '500' },
  listItemSubtitle: { color: COLORS.gray, fontSize: 12, marginTop: 2 },

  // Seção "Sobre"
  aboutSection: { flexDirection: 'row', marginTop: 20, backgroundColor: COLORS.white, borderRadius: 8, padding: 15 },
  aboutTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  aboutText: { color: COLORS.gray, marginBottom: 10, lineHeight: 20 },
  aboutListItem: { color: COLORS.gray, fontSize: 12, marginBottom: 5 },

  // Botão de logout
  logoutButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, backgroundColor: COLORS.white, borderRadius: 8, padding: 15, borderWidth: 1, borderColor: COLORS.red },
  logoutButtonText: { color: COLORS.red, fontWeight: 'bold', marginLeft: 10 },
});

export default PerfilScreen;
