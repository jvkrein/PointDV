// src/screens/LoginScreen.js

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const PRIMARY_COLOR = '#4263EB';
const LIGHT_GRAY_COLOR = '#f0f2f5';
const BORDER_COLOR = '#e0e0e0';

const LoginScreen = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ALTERADO: Função de login manual agora também passa dados de exemplo
  const handleLogin = () => {
    console.log('Login com:', { email, password });
    const mockUser = { id: 'user-01', name: 'Usuário Padrão', type: 'consumidor' };
    signIn(mockUser);
  };
  
  // ALTERADO: Função de acesso rápido para Consumidor
  const handleQuickLoginConsumidor = () => {
    console.log('Acesso rápido Consumidor');
    const mockConsumer = { id: 'consumer-01', name: 'João Consumidor', type: 'consumidor' };
    signIn(mockConsumer);
  };

  // ALTERADO: Função de acesso rápido para Lojista
  const handleQuickLoginLojista = () => {
    console.log('Acesso rápido Lojista');
    const mockMerchant = { id: 'merchant-01', name: 'Lojista Exemplo', businessName: 'PointDV Store', type: 'lojista' };
    signIn(mockMerchant);
  };

  const handleForgotPassword = () => console.log('Esqueceu a senha');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>📍 PointDV</Text>
            <Text style={styles.headerSubtitle}>Descubra eventos e promoções</Text>
            <Text style={styles.headerDescription}>Conectando você com o melhor da sua cidade</Text>
            <View style={styles.feature}>
              <MaterialCommunityIcons name="food-fork-drink" size={24} color="#fff" />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Restaurantes e bares</Text>
                <Text style={styles.featureDescription}>Happy hours e promoções</Text>
              </View>
            </View>
            <View style={styles.feature}>
              <Feather name="music" size={24} color="#fff" />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Shows e eventos</Text>
                <Text style={styles.featureDescription}>Música ao vivo</Text>
              </View>
            </View>
            <View style={styles.feature}>
              <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="#fff" />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Ofertas especiais</Text>
                <Text style={styles.featureDescription}>Descontos exclusivos</Text>
              </View>
            </View>
          </View>
          <View style={styles.formContainer}>
            <MaterialCommunityIcons name="star-four-points-outline" size={32} color={PRIMARY_COLOR} style={styles.formIcon} />
            <Text style={styles.formTitle}>Bem-vindo de volta!</Text>
            <Text style={styles.formSubtitle}>Entre para descobrir eventos incríveis</Text>
            <Text style={styles.quickLoginLabel}>Acesso rápido para teste:</Text>
            <View style={styles.quickLoginContainer}>
              <TouchableOpacity style={styles.quickLoginButton} onPress={handleQuickLoginConsumidor}>
                <Feather name="user" size={16} color="#333" />
                <Text style={styles.quickLoginButtonText}>Consumidor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickLoginButton} onPress={handleQuickLoginLojista}>
                <MaterialCommunityIcons name="storefront-outline" size={16} color="#333" />
                <Text style={styles.quickLoginButtonText}>Lojista</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.divider}>ou entre com seus dados</Text>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Senha</Text>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
            <Link href="/register" style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Não tem uma conta? <Text style={styles.signUpLink}>Cadastre-se grátis</Text></Text>
            </Link>
            <Text style={styles.tosText}>Ao entrar, você concorda com nossos Termos de Uso</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: LIGHT_GRAY_COLOR },
  container: { backgroundColor: LIGHT_GRAY_COLOR },
  headerContainer: {
    backgroundColor: PRIMARY_COLOR,
    padding: 30,
    paddingTop: 50,
  },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  headerSubtitle: { fontSize: 20, color: '#fff', marginBottom: 4 },
  headerDescription: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)', marginBottom: 30 },
  feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  featureText: { marginLeft: 15 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  featureDescription: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
  formContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    padding: 25,
  },
  formIcon: { alignSelf: 'center', marginBottom: 15 },
  formTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  formSubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  quickLoginLabel: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 10 },
  quickLoginContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  quickLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  quickLoginButtonText: { marginLeft: 8, fontWeight: 'bold', color: '#333' },
  divider: { textAlign: 'center', color: '#ccc', marginBottom: 20 },
  label: { fontSize: 14, color: '#3c3c3e', marginBottom: 8, fontWeight: '500' },
  passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  forgotPasswordText: { color: PRIMARY_COLOR, fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#333' },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  signUpContainer: { marginTop: 20, alignItems: 'center' },
  signUpText: { color: '#666' },
  signUpLink: { fontWeight: 'bold', color: PRIMARY_COLOR },
  tosText: {
    marginTop: 20,
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  }
});

export default LoginScreen;