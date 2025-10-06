// src/components/FilterModal.js

import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PRIMARY_COLOR = '#4263EB';

const FilterModal = ({ visible, onClose, onApply, onClear, currentFilters }) => {
  const insets = useSafeAreaInsets();
  const [localFilters, setLocalFilters] = useState(currentFilters);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [visible, currentFilters]);
  
  const handleLocationChange = (text) => {
    setLocalFilters(prev => ({ ...prev, location: text }));
  };

  const handleClear = () => {
    const clearedFilters = { category: 'Todos', date: null, location: '' };
    setLocalFilters(clearedFilters);
    onClear();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10 }]}>
          <View style={styles.header}>
            <Feather name="sliders" size={24} color="#333" />
            <Text style={styles.headerTitle}>Filtros</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Categoria</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text>{localFilters?.category}</Text>
              <Feather name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>

            <Text style={styles.label}>Data</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text>dd/mm/aaaa</Text>
              <Feather name="calendar" size={20} color="#888" />
            </TouchableOpacity>

            <Text style={styles.label}>Localização</Text>
            <View style={styles.inputContainer}>
              <TextInput 
                placeholder="Bairro, rua ou estabelecimento"
                value={localFilters?.location}
                onChangeText={handleLocationChange}
              />
            </View>
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => onApply(localFilters)}>
              <Text style={styles.primaryButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleClear}>
              <Text style={styles.secondaryButtonText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, width: '100%', elevation: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
  form: { flexGrow: 1 },
  label: { fontSize: 16, fontWeight: '500', color: '#333', marginTop: 15, marginBottom: 8 },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 10, padding: 15 },
  inputContainer: { backgroundColor: '#f0f2f5', borderRadius: 10, padding: 15 },
  footer: { flexDirection: 'row', marginTop: 30 },
  primaryButton: { flex: 2, backgroundColor: '#1c1c1e', padding: 15, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: 'white', fontWeight: 'bold' },
  secondaryButton: { flex: 1, borderWidth: 1, borderColor: '#e0e0e0', padding: 15, borderRadius: 10, alignItems: 'center', marginLeft: 10 },
  secondaryButtonText: { fontWeight: 'bold' },
});

export default FilterModal;