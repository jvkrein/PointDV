// app/register.js

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FormContainer from '../src/components/FormContainer'; // Importando nosso novo componente

// Cores do design
const PRIMARY_COLOR = '#4263EB';
const BORDER_COLOR = '#e0e0e0';
const LIGHT_GRAY_COLOR = '#f7f7f7';

const RegisterScreen = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useState('consumidor');
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleRegister = () => {
    const formData = {
      accountType, nome, email, senha,
      ...(accountType === 'lojista' && { nomeEstabelecimento, telefone, endereco }),
    };
    console.log('Dados do Cadastro:', formData);
  };

  return (
    <FormContainer>
      <Stack.Screen options={{ 
          headerTitle: 'Criar Conta',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Feather name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
          ),
      }} />

      <Text style={styles.mainSubtitle}>Junte-se ao PointDV</Text>
      
      {/* SELEÇÃO DE TIPO DE CONTA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escolha o tipo de conta</Text>
        <Text style={styles.sectionSubtitle}>Selecione como você vai usar o PointDV</Text>
        
        <TouchableOpacity 
          style={[styles.typeButton, accountType === 'consumidor' && styles.typeButtonSelected]}
          onPress={() => setAccountType('consumidor')}
        >
          <Feather name="user" size={24} color={accountType === 'consumidor' ? PRIMARY_COLOR : '#555'} />
          <View style={styles.typeButtonTextContainer}>
            <Text style={[styles.typeButtonTitle, accountType === 'consumidor' && styles.typeButtonTitleSelected]}>Consumidor</Text>
            <Text style={styles.typeButtonSubtitle}>Descubra eventos, promoções e novidades na sua cidade</Text>
          </View>
          {accountType === 'consumidor' && <Feather name="check-circle" size={20} color={PRIMARY_COLOR} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, accountType === 'lojista' && styles.typeButtonSelected]}
          onPress={() => setAccountType('lojista')}
        >
          <MaterialCommunityIcons name="storefront-outline" size={24} color={accountType === 'lojista' ? PRIMARY_COLOR : '#555'} />
          <View style={styles.typeButtonTextContainer}>
            <Text style={[styles.typeButtonTitle, accountType === 'lojista' && styles.typeButtonTitleSelected]}>Lojista</Text>
            <Text style={styles.typeButtonSubtitle}>Divulgue seus eventos e promoções para mais clientes</Text>
          </View>
          {accountType === 'lojista' && <Feather name="check-circle" size={20} color={PRIMARY_COLOR} />}
        </TouchableOpacity>
      </View>

      {/* INFORMAÇÕES PESSOAIS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>
        
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#888" />
          <TextInput style={styles.input} placeholder="Seu nome completo" value={nome} onChangeText={setNome} />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#888" />
          <TextInput style={styles.input} placeholder="seu@email.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}/>
        </View>
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#888" />
          <TextInput style={styles.input} placeholder="Mínimo 6 caracteres" secureTextEntry value={senha} onChangeText={setSenha} />
        </View>
        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#888" />
          <TextInput style={styles.input} placeholder="Digite novamente" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />
        </View>
      </View>
      
      {/* INFORMAÇÕES DO ESTABELECIMENTO */}
      {accountType === 'lojista' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Estabelecimento</Text>
          
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="storefront-outline" size={20} color="#888" />
            <TextInput style={styles.input} placeholder="Nome do seu negócio" value={nomeEstabelecimento} onChangeText={setNomeEstabelecimento}/>
          </View>
          <View style={styles.inputContainer}>
            <Feather name="phone" size={20} color="#888" />
            <TextInput style={styles.input} placeholder="(11) 99999-9999" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />
          </View>
          <View style={styles.textAreaContainer}>
            <Feather name="map-pin" size={20} color="#888" />
            <TextInput
              style={styles.textArea}
              placeholder="Endereço completo do estabelecimento"
              value={endereco}
              onChangeText={setEndereco}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
      )}

      {/* BOTÃO E LINKS */}
      <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
        <Text style={styles.createButtonText}>Criar Minha Conta</Text>
      </TouchableOpacity>
      
      <Text style={styles.legalText}>
        Ao criar uma conta, você concorda com nossos{' '}
        <Text style={styles.linkText}>Termos de Uso</Text> e{' '}
        <Text style={styles.linkText}>Política de Privacidade</Text>
      </Text>

      <TouchableOpacity onPress={() => router.replace('/')} style={styles.footerLinkContainer}>
          <Text style={styles.footerText}>Já tem uma conta? <Text style={styles.linkText}>Fazer login</Text></Text>
      </TouchableOpacity>
    </FormContainer>
  );
};

// ESTILOS (REMOVEMOS O safeArea e container que agora estão no FormContainer)
const styles = StyleSheet.create({
  mainSubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  sectionSubtitle: { fontSize: 14, color: '#777', marginBottom: 15 },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
    marginBottom: 10,
  },
  typeButtonSelected: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: '#f0f5ff',
  },
  typeButtonTextContainer: { flex: 1, marginHorizontal: 15 },
  typeButtonTitle: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  typeButtonTitleSelected: { color: PRIMARY_COLOR },
  typeButtonSubtitle: { fontSize: 13, color: '#777' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  input: { flex: 1, paddingVertical: 15, paddingLeft: 10, fontSize: 16 },
  textAreaContainer: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY_COLOR,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 10,
  },
  textArea: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  legalText: { textAlign: 'center', color: '#999', marginVertical: 20, fontSize: 12 },
  linkText: { color: PRIMARY_COLOR, fontWeight: 'bold' },
  footerLinkContainer: { alignItems: 'center' },
  footerText: { color: '#666' },
});

export default RegisterScreen;