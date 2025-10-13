// app/criar-evento.jsx

/**
 * Tela de Criação de Evento.
 * Permite que o lojista cadastre um novo evento ou promoção,
 * inserindo informações básicas, data, local e imagem ilustrativa.
 */

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Paleta de cores padrão da aplicação. */
const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
  red: '#dc3545',
};

/**
 * Componente principal da tela de criação de evento.
 * Estrutura organizada em seções (cards) para inserir dados do evento.
 */
const CriarEventoScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Cabeçalho com botão de voltar e título da tela */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Evento</Text>
      </View>

      {/* Conteúdo principal com campos de preenchimento */}
      <ScrollView contentContainerStyle={styles.container}>

        {/* --- Seção: Informações Básicas --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>

          <Text style={styles.label}>Título do Evento *</Text>
          <TextInput style={styles.input} placeholder="Ex: Happy Hour Especial" />

          <Text style={styles.label}>Categoria *</Text>
          <TouchableOpacity style={styles.picker}>
            <Text style={styles.pickerText}>Selecione uma categoria</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color={COLORS.gray} />
          </TouchableOpacity>

          <Text style={styles.label}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva seu evento ou promoção..."
            multiline
          />
        </View>

        {/* --- Seção: Data e Horário --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Data e Horário</Text>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Data *</Text>
              <TextInput style={styles.input} placeholder="dd/mm/aaaa" />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Horário *</Text>
              <TextInput style={styles.input} placeholder="--:--" />
            </View>
          </View>
        </View>

        {/* --- Seção: Localização --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <Text style={styles.label}>Endereço Completo *</Text>
          <TextInput style={styles.input} placeholder="Rua, número e complemento" />
        </View>

        {/* --- Seção: Imagem do Evento --- */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Imagem do Evento</Text>

          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput style={styles.input} placeholder="Cole a URL de uma imagem" />

          {/* Botão para usar imagem padrão */}
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialCommunityIcons name="image-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>Usar Imagem Padrão da Categoria</Text>
          </TouchableOpacity>

          {/* Dica visual */}
          <View style={styles.tipBox}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={'#f59e0b'} />
            <Text style={styles.tipText}>Dica: Use imagens com proporção 16:9</Text>
          </View>
        </View>
      </ScrollView>

      {/* --- Rodapé com botões de ação --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Criar Evento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/** Folha de estilos da tela de criação de evento. */
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

  // Conteúdo
  container: { padding: 15 },

  // Cartões de seção
  card: { backgroundColor: COLORS.white, borderRadius: 8, padding: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },

  // Campos de entrada
  label: { color: COLORS.dark, marginBottom: 5, fontSize: 14 },
  input: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },

  // Seletor de categoria
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  pickerText: { color: COLORS.gray, fontSize: 16 },

  // Layout de linhas
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },

  // Botão secundário (imagem padrão)
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 5,
  },
  secondaryButtonText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 8 },

  // Caixa de dica
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  tipText: { flex: 1, marginLeft: 10, color: '#b45309', fontSize: 12 },

  // Rodapé com botões
  footer: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  cancelButton: { padding: 15, alignItems: 'center' },
  cancelButtonText: { color: COLORS.primary, fontWeight: 'bold' },
});

export default CriarEventoScreen;
