// app/criar-evento.jsx (NOVO ARQUIVO)

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#4A90E2',
  white: '#FFFFFF',
  gray: '#A0A0A0',
  dark: '#333333',
  lightGray: '#F0F2F5',
  red: '#dc3545',
};

const CriarEventoScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Evento</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Card de Informações Básicas */}
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
          <TextInput style={[styles.input, styles.textArea]} placeholder="Descreva seu evento ou promoção..." multiline />
        </View>

        {/* Card de Data e Horário */}
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

        {/* Card de Localização */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Localização</Text>
          <Text style={styles.label}>Endereço Completo *</Text>
          <TextInput style={styles.input} placeholder="Rua, número e complemento" />
        </View>

        {/* Card de Imagem */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Imagem do Evento</Text>
          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput style={styles.input} placeholder="Cole a URL de uma imagem" />
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialCommunityIcons name="image-outline" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>Usar Imagem Padrão da Categoria</Text>
          </TouchableOpacity>
          <View style={styles.tipBox}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={'#f59e0b'} />
            <Text style={styles.tipText}>Dica: Use imagens com proporção 16:9</Text>
          </View>
        </View>
      </ScrollView>

      {/* Rodapé com Botões */}
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.lightGray },
  header: { padding: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  container: { padding: 15 },
  card: { backgroundColor: COLORS.white, borderRadius: 8, padding: 15, marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  label: { color: COLORS.dark, marginBottom: 5, fontSize: 14 },
  input: { backgroundColor: COLORS.lightGray, padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  picker: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.lightGray, padding: 12, borderRadius: 8, marginBottom: 15 },
  pickerText: { color: COLORS.gray, fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  secondaryButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary, marginTop: 5 },
  secondaryButtonText: { color: COLORS.primary, fontWeight: 'bold', marginLeft: 8 },
  tipBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffbeb', padding: 10, borderRadius: 8, marginTop: 15 },
  tipText: { flex: 1, marginLeft: 10, color: '#b45309', fontSize: 12 },
  footer: { padding: 15, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: '#eee' },
  primaryButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 8, alignItems: 'center' },
  primaryButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
  cancelButton: { padding: 15, alignItems: 'center' },
  cancelButtonText: { color: COLORS.primary, fontWeight: 'bold' },
});

export default CriarEventoScreen;