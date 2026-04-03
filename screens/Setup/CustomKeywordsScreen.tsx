import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import XLSX from 'xlsx';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import {
    addCustomKeywordsBulk,
    deleteAllCustomKeywords,
    deleteCustomKeyword,
    getCustomKeywords,
    updateCustomKeyword,
} from '../../db/keywordService';
import { useStore } from '../../store';
import { t } from '../../utils/i18n';

interface CustomKeyword {
  id: number;
  civilianWord: string;
  spyWord: string;
}

interface ImportPair {
  civilianWord: string;
  spyWord: string;
}

// Pre-encoded Excel template as base64 (minimal Excel file with headers and examples)
const EXCEL_TEMPLATE_BASE64 = 'UEsDBAoAAAAAAHHbcFYAAAAAAAAAAAAAAAANAAAAZG9jUHJvcHMvYXBwLnhtbIqLBYKgjOBgYGBkYGJgYGBqYmBkYG1kYmBqaWhqYWFmYmJhYmZkbGliYW5rZ2BsYWBpaWFhZWVhYWVhZWJhYGZgZWBkbGlkZmBkamZkYGBkZGBkZmBkbGVkYWZhYW1iYWBmZmBqbmVkYGBqbWlic2FSYGBiYGpqbmZqYGFiYmhsYG9oaGVuYGFiYGBsYGJnYmpuamFkaWBiYWZiYW1mYGVlZWBkaWNgaGliYGZpamBiYW5sYW5oYGVhZGBkaWBkaGVrZGVwY2ZXWFVUWWFCZmRGBgYGBgZGBkYGRgaGhgbmRkYWpuZGphbGltYW1pYWJhZ0ldanJhCodIbv1LUQAAK0AALAAAAAAAAAR52HBWAQAAAIEBAABNAQAAdm9sdW1ld29yay94bWwoL186Zm9vkjAwMSsuKRkBCgoAbVwAqg0AVVRFRUAB';

const createTemplateFromXLSX = async (): Promise<string> => {
  try {
    // Create a professional template with headers and example rows
    const ws = XLSX.utils.aoa_to_sheet([
      ['civilian_word', 'spy_word'],
      ['Apple', 'Pear'],
      ['Coffee', 'Tea'],
      ['Dog', 'Wolf'],
      ['Piano', 'Guitar'],
      ['Summer', 'Winter'],
      ['', ''],
      ['', ''],
      ['', ''],
      ['', ''],
    ]);

    // Set column widths for better readability
    ws['!cols'] = [{ wch: 25 }, { wch: 25 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Keywords');

    // Write to base64
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    // Save to cache directory
    const filename = 'custom_keywords_template.xlsx';
    const fileUri = FileSystem.cacheDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: 'base64',
    });

    return fileUri;
  } catch (error) {
    console.error('Error creating template from XLSX:', error);
    throw error;
  }
};

const CustomKeywordsScreen = () => {
  const currentLanguage = useStore((state) => state.language);
  const [customKeywords, setCustomKeywords] = useState<CustomKeyword[]>([]);
  const [importedPairs, setImportedPairs] = useState<ImportPair[]>([]);
  const [showImportReview, setShowImportReview] = useState(false);
  const [newCivWord, setNewCivWord] = useState('');
  const [newSpyWord, setNewSpyWord] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCivWord, setEditCivWord] = useState('');
  const [editSpyWord, setEditSpyWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load custom keywords on mount and when language changes
  useEffect(() => {
    loadCustomKeywords();
  }, [currentLanguage]);

  const loadCustomKeywords = () => {
    try {
      const keywords = getCustomKeywords(currentLanguage);
      setCustomKeywords(keywords as CustomKeyword[]);
    } catch (error) {
      console.error('Error loading custom keywords:', error);
      setCustomKeywords([]);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      setIsLoading(true);
      console.log('Starting template download...');

      // Check if Sharing is available first
      const sharingAvailable = await Sharing.isAvailableAsync();
      console.log('Sharing available:', sharingAvailable);

      if (!sharingAvailable) {
        Alert.alert('Info', 'File sharing is not available on this device');
        setIsLoading(false);
        return;
      }

      console.log('Creating template with XLSX...');
      const fileUri = await createTemplateFromXLSX();
      console.log('XLSX template created successfully at:', fileUri);

      // Share the file
      console.log('Sharing file...');
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: t('customKeywords.downloadTemplate'),
      });

      console.log('Template shared successfully');
      setIsLoading(false);
      Alert.alert('Success', 'Template downloaded! Fill it in and import back to the app.');
    } catch (error) {
      console.error('Error downloading template:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      Alert.alert(
        'Error',
        `Failed to download template: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      setIsLoading(false);
    }
  };

  const handleImportExcel = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setIsLoading(false);
        return;
      }

      const file = result.assets[0];
      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: 'base64',
      });

      const wb = XLSX.read(fileContent, { type: 'base64' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<{ civilian_word: string; spy_word: string }>(ws);

      // Filter valid rows
      const validPairs: ImportPair[] = data
        .filter((row) => row.civilian_word?.trim() && row.spy_word?.trim())
        .map((row) => ({
          civilianWord: row.civilian_word.trim(),
          spyWord: row.spy_word.trim(),
        }));

      if (validPairs.length === 0) {
        Alert.alert('Error', t('customKeywords.emptyFile'));
        setIsLoading(false);
        return;
      }

      setImportedPairs(validPairs);
      setShowImportReview(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error importing Excel:', error);
      Alert.alert('Error', t('customKeywords.importError'));
      setIsLoading(false);
    }
  };

  const handleConfirmImport = () => {
    try {
      addCustomKeywordsBulk(importedPairs, currentLanguage);
      setShowImportReview(false);
      setImportedPairs([]);
      loadCustomKeywords();
      Alert.alert(
        'Success',
        t('customKeywords.importSuccess', { count: importedPairs.length })
      );
    } catch (error) {
      console.error('Error confirming import:', error);
      Alert.alert('Error', t('customKeywords.importError'));
    }
  };

  const handleAddManually = () => {
    if (!newCivWord.trim() || !newSpyWord.trim()) {
      Alert.alert('Error', 'Please enter both civilian and spy words');
      return;
    }

    try {
      addCustomKeywordsBulk(
        [{ civilianWord: newCivWord, spyWord: newSpyWord }],
        currentLanguage
      );
      setNewCivWord('');
      setNewSpyWord('');
      loadCustomKeywords();
      Alert.alert('Success', t('customKeywords.addKeyword'));
    } catch (error) {
      console.error('Error adding keyword:', error);
      Alert.alert('Error', 'Failed to add keyword');
    }
  };

  const handleUpdateKeyword = (id: number) => {
    if (!editCivWord.trim() || !editSpyWord.trim()) {
      Alert.alert('Error', 'Please enter both civilian and spy words');
      return;
    }

    try {
      updateCustomKeyword(id, editCivWord, editSpyWord);
      setEditingId(null);
      setEditCivWord('');
      setEditSpyWord('');
      loadCustomKeywords();
      Alert.alert('Success', t('customKeywords.updated'));
    } catch (error) {
      console.error('Error updating keyword:', error);
      Alert.alert('Error', 'Failed to update keyword');
    }
  };

  const handleDeleteKeyword = (id: number) => {
    Alert.alert(
      t('customKeywords.deleteConfirm'),
      '',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('customKeywords.deleteKeyword'),
          style: 'destructive',
          onPress: () => {
            try {
              deleteCustomKeyword(id);
              loadCustomKeywords();
            } catch (error) {
              console.error('Error deleting keyword:', error);
              Alert.alert('Error', 'Failed to delete keyword');
            }
          },
        },
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      t('customKeywords.deleteAll'),
      t('customKeywords.deleteAllConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('customKeywords.deleteAll'),
          style: 'destructive',
          onPress: () => {
            try {
              deleteAllCustomKeywords(currentLanguage);
              loadCustomKeywords();
            } catch (error) {
              console.error('Error deleting all keywords:', error);
              Alert.alert('Error', 'Failed to delete keywords');
            }
          },
        },
      ]
    );
  };

  const handleUpdateImportedPair = (index: number, field: 'civilianWord' | 'spyWord', value: string) => {
    const updated = [...importedPairs];
    updated[index] = { ...updated[index], [field]: value };
    setImportedPairs(updated);
  };

  const handleRemoveImportedPair = (index: number) => {
    const updated = importedPairs.filter((_, i) => i !== index);
    setImportedPairs(updated);
  };

  const getLanguageName = (code: string): string => {
    const names: Record<string, string> = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      zh: '中文',
      vi: 'Tiếng Việt',
      de: 'Deutsch',
      ja: '日本語',
      ko: '한국어',
      pt: 'Português',
      ru: 'Русский',
      ar: 'العربية',
      hi: 'हिन्दी',
      th: 'ไทย',
      id: 'Bahasa Indonesia',
      tr: 'Türkçe',
    };
    return names[code] || code;
  };

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View className="items-center mb-6">
            <Text className="font-black text-3xl text-[#1b3420] text-center mb-2 uppercase tracking-tighter">
              {t('customKeywords.title')}
            </Text>
            <Text className="text-sm text-[#47624b] text-center max-w-sm">
              {t('customKeywords.languageNote')}
            </Text>
          </View>

          {/* Current Language Card */}
          <Card variant="primary" className="mb-6 rotate-1">
            <View className="flex-row items-center gap-3 mb-2">
              <Ionicons name="language" size={20} color="#006b1b" />
              <Text className="text-sm font-bold text-[#47624b] uppercase">
                {t('customKeywords.currentLanguage', { language: getLanguageName(currentLanguage) })}
              </Text>
            </View>
            <Text className="text-xs text-[#47624b]/70">
              {t('customKeywords.languageNote')}
            </Text>
          </Card>

          {/* Action Buttons */}
          <View className="gap-4 mb-6">
            <TouchableOpacity
              onPress={handleDownloadTemplate}
              disabled={isLoading}
              className="opacity-100"
            >
              <Card variant="secondary" className="rotate-1">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#5b5300]/10 items-center justify-center">
                    <Ionicons name="download" size={20} color="#5b5300" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-sm text-[#5b5300] uppercase">
                      {t('customKeywords.downloadTemplate')}
                    </Text>
                    <Text className="text-xs text-[#5b5300]/70">
                      {t('customKeywords.downloadTemplateDesc')}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleImportExcel}
              disabled={isLoading}
              className="opacity-100"
            >
              <Card variant="surface" className="-rotate-1">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-[#006b1b]/10 items-center justify-center">
                    <Ionicons name="document" size={20} color="#006b1b" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-sm text-[#1b3420] uppercase">
                      {t('customKeywords.importExcel')}
                    </Text>
                    <Text className="text-xs text-[#47624b]/70">
                      {t('customKeywords.importExcelDesc')}
                    </Text>
                  </View>
                  {isLoading && <ActivityIndicator size="small" color="#006b1b" />}
                </View>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Keywords List */}
          <Card variant="container-high" className="mb-6 rotate-1">
            <View className="mb-4">
              <Text className="font-bold text-lg text-[#1b3420] uppercase tracking-tight mb-1">
                {customKeywords.length > 0
                  ? t('customKeywords.keywordPairs', { count: customKeywords.length })
                  : t('customKeywords.noKeywords')}
              </Text>
              {customKeywords.length === 0 && (
                <Text className="text-xs text-[#47624b]/70">
                  {t('customKeywords.noKeywordsDesc')}
                </Text>
              )}
            </View>

            {customKeywords.length > 0 && (
              <>
                {/* List of keywords */}
                <View className="gap-3 mb-6">
                  {customKeywords.map((kw) =>
                    editingId === kw.id ? (
                      // Edit mode
                      <View
                        key={kw.id}
                        className="bg-white/50 p-3 rounded-lg border-2 border-[#006b1b]"
                      >
                        <TextInput
                          value={editCivWord}
                          onChangeText={setEditCivWord}
                          placeholder={t('customKeywords.civilianPlaceholder')}
                          placeholderTextColor="#47624b/50"
                          className="bg-white p-2 rounded mb-2 text-sm text-[#1b3420] font-bold"
                        />
                        <TextInput
                          value={editSpyWord}
                          onChangeText={setEditSpyWord}
                          placeholder={t('customKeywords.spyPlaceholder')}
                          placeholderTextColor="#47624b/50"
                          className="bg-white p-2 rounded mb-3 text-sm text-[#1b3420] font-bold"
                        />
                        <View className="gap-2">
                          <Button
                            label="Save"
                            variant="primary"
                            size="small"
                            onPress={() => handleUpdateKeyword(kw.id)}
                            className="w-full"
                          />
                          <Button
                            label="Cancel"
                            variant="secondary"
                            size="small"
                            onPress={() => setEditingId(null)}
                            className="w-full"
                          />
                        </View>
                      </View>
                    ) : (
                      // Display mode
                      <View
                        key={kw.id}
                        className="bg-white/50 p-3 rounded-lg flex-row items-center justify-between"
                      >
                        <View className="flex-1">
                          <Text className="text-xs text-[#47624b] uppercase mb-1">
                            {t('customKeywords.civilianWord')}
                          </Text>
                          <Text className="font-bold text-sm text-[#1b3420] mb-2">
                            {kw.civilianWord}
                          </Text>
                          <Text className="text-xs text-[#47624b] uppercase mb-1">
                            {t('customKeywords.spyWord')}
                          </Text>
                          <Text className="font-bold text-sm text-[#1b3420]">
                            {kw.spyWord}
                          </Text>
                        </View>
                        <View className="flex-row gap-2 ml-3">
                          <TouchableOpacity
                            onPress={() => {
                              setEditingId(kw.id);
                              setEditCivWord(kw.civilianWord);
                              setEditSpyWord(kw.spyWord);
                            }}
                            className="py-2 px-3 rounded-lg bg-[#006b1b]/20"
                          >
                            <Ionicons name="pencil" size={16} color="#006b1b" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleDeleteKeyword(kw.id)}
                            className="py-2 px-3 rounded-lg bg-red-400/20"
                          >
                            <Ionicons name="trash" size={16} color="#c41c3b" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )
                  )}
                </View>

                {/* Delete All Button */}
                {customKeywords.length > 0 && (
                  <TouchableOpacity
                    onPress={handleDeleteAll}
                    className="bg-red-400/20 py-2 px-4 rounded-lg mb-4"
                  >
                    <Text className="text-center text-sm font-bold text-red-600 uppercase">
                      {t('customKeywords.deleteAll')}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </Card>

          {/* Add Manually Section */}
          <Card variant="secondary" className="mb-32 -rotate-1">
            <View className="mb-4">
              <Text className="font-bold text-lg text-[#5b5300] uppercase tracking-tight">
                {t('customKeywords.addManually')}
              </Text>
            </View>

            <TextInput
              value={newCivWord}
              onChangeText={setNewCivWord}
              placeholder={t('customKeywords.civilianPlaceholder')}
              placeholderTextColor="#5b5300/50"
              className="bg-white p-3 rounded-lg mb-3 text-sm text-[#1b3420] font-bold"
            />

            <TextInput
              value={newSpyWord}
              onChangeText={setNewSpyWord}
              placeholder={t('customKeywords.spyPlaceholder')}
              placeholderTextColor="#5b5300/50"
              className="bg-white p-3 rounded-lg mb-4 text-sm text-[#1b3420] font-bold"
            />

            <Button
              label={t('customKeywords.addKeyword')}
              variant="secondary"
              size="small"
              icon="add"
              onPress={handleAddManually}
            />
          </Card>
        </ScrollView>
      </SafeAreaView>

      {/* Import Review Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showImportReview}
        onRequestClose={() => setShowImportReview(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <Card variant="primary" className="w-full max-w-lg">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="font-bold text-lg text-[#1b3420] uppercase">
                  {t('customKeywords.reviewImport')}
                </Text>
                <Text className="text-xs text-[#47624b]">
                  {t('customKeywords.keywordPairs', { count: importedPairs.length })}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowImportReview(false)} className="p-2">
                <Ionicons name="close-circle" size={24} color="#1b3420" />
              </TouchableOpacity>
            </View>

            <Text className="text-xs text-[#47624b] mb-4">
              {t('customKeywords.editBeforeSave')}
            </Text>

            {/* Scrollable list of pairs */}
            <ScrollView
              className="max-h-96 mb-4 -mx-6 px-6"
              showsVerticalScrollIndicator={false}
            >
              {importedPairs.map((pair, index) => (
                <View
                  key={index}
                  className="bg-white/50 p-3 rounded-lg mb-3 flex-row items-center justify-between"
                >
                  <View className="flex-1 mr-2">
                    <TextInput
                      value={pair.civilianWord}
                      onChangeText={(value) =>
                        handleUpdateImportedPair(index, 'civilianWord', value)
                      }
                      placeholder="Civilian"
                      placeholderTextColor="#47624b/50"
                      className="bg-white p-2 rounded mb-2 text-xs text-[#1b3420] font-bold"
                    />
                    <TextInput
                      value={pair.spyWord}
                      onChangeText={(value) =>
                        handleUpdateImportedPair(index, 'spyWord', value)
                      }
                      placeholder="Spy"
                      placeholderTextColor="#47624b/50"
                      className="bg-white p-2 rounded text-xs text-[#1b3420] font-bold"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveImportedPair(index)}
                    className="py-2 px-3 rounded-lg bg-red-400/20"
                  >
                    <Ionicons name="trash" size={16} color="#c41c3b" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Buttons */}
            <View className="gap-3">
              <Button
                label={t('customKeywords.confirmImport', { count: importedPairs.length })}
                variant="primary"
                size="small"
                onPress={handleConfirmImport}
                className="w-full"
              />
              <Button
                label="Cancel"
                variant="secondary"
                size="small"
                onPress={() => {
                  setShowImportReview(false);
                  setImportedPairs([]);
                }}
                className="w-full"
              />
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};

export default CustomKeywordsScreen;
