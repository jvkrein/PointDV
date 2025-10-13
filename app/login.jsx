// app/login.jsx

/**
 * Tela inicial da aplicação, responsável pelo login do usuário.
 * Apresenta um formulário de login e opções de acesso rápido para 'Consumidor' e 'Lojista'.
 * Esta tela utiliza um layout imersivo, com o cabeçalho se estendendo por baixo da barra de status.
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventsContext } from './contexts/EventsContext';

// Paleta de cores padrão da aplicação.
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  lightGray: '#F0F2F5',
  gray: '#A0A0A0',
  dark: '#333333',
  link: '#2968B4',
};

const SignInScreen = () => {
  // Hook para obter as dimensões das áreas seguras do dispositivo (topo e base).
  const insets = useSafeAreaInsets();
  
  // Acessa o contexto global para obter a função que define o tipo de usuário.
  const { setUserType } = useContext(EventsContext);

  /**
   * Função que lida com o processo de login.
   * @param {'consumidor' | 'lojista'} type - O tipo de usuário que está fazendo o login.
   */
  const handleLogin = (type) => {
    // Define o tipo de usuário no estado global para que o resto do app saiba quem está logado.
    setUserType(type); 
    // Navega para a tela principal de abas, substituindo a tela de login na pilha de navegação.
    router.replace('/(tabs)'); 
  };

  return (
    // View principal que ocupa toda a tela.
    <View style={styles.safeArea}>
      {/* Configura a barra de status para ter ícones claros e ser translúcida. */}
      <StatusBar style="light" translucent />
      
      <ScrollView
        // O `contentContainerStyle` aplica espaçamento dinâmico na base da lista,
        // garantindo que o conteúdo não fique escondido atrás da barra de navegação do celular.
        contentContainerStyle={[
          styles.container,
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
        ]}
      >
        {/* Cabeçalho azul com layout imersivo. */}
        {/* O `paddingTop` é calculado dinamicamente para compensar a altura da barra de status. */}
        <View style={[styles.header, { paddingTop: insets.top + 40 }]}>
          <MaterialCommunityIcons name="map-marker-outline" size={30} color={COLORS.white} />
          <Text style={styles.logoText}>PointDV</Text>
          <Text style={styles.headerSubtitle}>Descubra eventos e promoções</Text>
          <Text style={styles.headerDescription}>Conectando você com o melhor da sua cidade</Text>
          <View style={styles.categoryList}>
            <View style={styles.categoryItem}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={22} color={COLORS.white} />
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>Restaurantes e bares</Text>
                <Text style={styles.categorySubtitle}>Happy hours e promoções</Text>
              </View>
            </View>
            <View style={styles.categoryItem}>
              <MaterialCommunityIcons name="music-note" size={22} color={COLORS.white} />
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>Shows e eventos</Text>
                <Text style={styles.categorySubtitle}>Música ao vivo</Text>
              </View>
            </View>
            <View style={styles.categoryItem}>
              <MaterialCommunityIcons name="tag-outline" size={22} color={COLORS.white} />
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>Ofertas especiais</Text>
                <Text style={styles.categorySubtitle}>Descontos exclusivos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Formulário de login branco. */}
        <View style={styles.formContainer}>
          <MaterialCommunityIcons name="star-circle-outline" size={40} color={COLORS.primary} />
          <Text style={styles.welcomeTitle}>Bem-vindo de volta!</Text>
          <Text style={styles.welcomeSubtitle}>Entre para descobrir eventos incríveis</Text>
          
          <Text style={styles.quickAccessText}>Acesso rápido para teste:</Text>
          {/* Botões de acesso rápido que definem o tipo de usuário e navegam para a home. */}
          <View style={styles.quickAccessButtons}>
            <TouchableOpacity style={styles.quickAccessButton} onPress={() => handleLogin('consumidor')}>
              <MaterialCommunityIcons name="account-outline" size={20} color={COLORS.primary} />
              <Text style={styles.quickAccessButtonText}>Consumidor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton} onPress={() => handleLogin('lojista')}>
              <MaterialCommunityIcons name="storefront-outline" size={20} color={COLORS.primary} />
              <Text style={styles.quickAccessButtonText}>Lojista</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.separatorText}>ou entre com seus dados</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput placeholder="seu@email.com" style={styles.input} keyboardType="email-address" placeholderTextColor={COLORS.gray} />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput placeholder="Sua senha" style={styles.input} secureTextEntry placeholderTextColor={COLORS.gray} />
            <TouchableOpacity><Text style={styles.forgotPasswordText}>Esqueceu?</Text></TouchableOpacity>
          </View>

          {/* Botão principal de "Entrar", que por padrão loga como consumidor. */}
          <TouchableOpacity style={styles.signInButton} onPress={() => handleLogin('consumidor')}>
            <Text style={styles.signInButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Link para a tela de cadastro. */}
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.footerText}>
                Não tem uma conta? <Text style={styles.linkText}>Cadastre-se grátis</Text>
              </Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.termsText}>Ao entrar, você concorda com nossos Termos de Uso</Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Folha de estilos do componente.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.lightGray },
  container: { flexGrow: 1 },
  header: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingBottom: 60, alignItems: 'center' },
  logoText: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginTop: 5 },
  headerSubtitle: { fontSize: 18, color: COLORS.white, marginTop: 10 },
  headerDescription: { fontSize: 14, color: COLORS.white, opacity: 0.9, marginTop: 5 },
  categoryList: { marginTop: 30, width: '100%' },
  categoryItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  categoryTextContainer: { marginLeft: 15 },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.white },
  categorySubtitle: { fontSize: 12, color: COLORS.white, opacity: 0.9 },
  formContainer: { backgroundColor: COLORS.white, paddingHorizontal: 20, paddingVertical: 30, marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: 'center' },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.dark, marginTop: 10 },
  welcomeSubtitle: { fontSize: 14, color: COLORS.gray, marginTop: 5, marginBottom: 20 },
  quickAccessText: { color: COLORS.gray, marginBottom: 10, fontSize: 12 },
  quickAccessButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  quickAccessButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.lightGray, borderRadius: 8, paddingVertical: 12, width: '48%' },
  quickAccessButtonText: { marginLeft: 8, color: COLORS.primary, fontWeight: 'bold' },
  separatorText: { color: COLORS.gray, marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.lightGray, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, width: '100%' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, color: COLORS.dark },
  forgotPasswordText: { color: COLORS.link, fontWeight: 'bold', fontSize: 12 },
  signInButton: { backgroundColor: COLORS.primary, width: '100%', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  signInButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  footerText: { marginTop: 20, color: COLORS.gray },
  linkText: { color: COLORS.link, fontWeight: 'bold' },
  termsText: { marginTop: 10, fontSize: 12, color: COLORS.gray, textAlign: 'center' },
});

export default SignInScreen;