import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../store';
import { getAvailableLanguages, t } from '../../utils/i18n';
import Card from '../Card/Card';
import Button from '../Button/Button';

const LanguageSelector: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentLanguage = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  const languages = getAvailableLanguages();
  const currentLangName = languages.find(l => l.code === currentLanguage)?.nativeName || 'English';

  // Debug: Log languages array
  console.log('Available languages:', languages);
  console.log('Languages count:', languages.length);
  console.log('Current language:', currentLanguage);

  const handleLanguageSelect = async (langCode: string) => {
    console.log('Selecting language:', langCode);
    await setLanguage(langCode);
    setModalVisible(false);
  };

  return (
    <>
      {/* Language Selector Button */}
      <TouchableOpacity
        onPress={() => {
          console.log('Opening language modal');
          setModalVisible(true);
        }}
        className="flex-row items-center justify-between bg-[#d8f9d9] p-4 rounded-xl"
        style={{
          shadowColor: '#1b3420',
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-[#006b1b]/10 items-center justify-center">
            <Ionicons name="language" size={20} color="#006b1b" />
          </View>
          <View>
            <Text className="text-xs font-bold text-[#47624b] uppercase tracking-wider">
              {t('settings.language')}
            </Text>
            <Text className="text-base font-black text-[#006b1b]">
              {currentLangName}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#006b1b" />
      </TouchableOpacity>

      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View 
            className="bg-[#e0fee1] rounded-t-3xl pt-6 pb-8 px-6" 
            style={{ 
              maxHeight: '80%',
              minHeight: 400,
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-[#006b1b]/10 items-center justify-center">
                  <Ionicons name="language" size={24} color="#006b1b" />
                </View>
                <Text className="text-2xl font-black text-[#1b3420] uppercase tracking-tight">
                  {t('settings.selectLanguage')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="w-10 h-10 rounded-full bg-[#47624b]/10 items-center justify-center"
              >
                <Ionicons name="close" size={24} color="#47624b" />
              </TouchableOpacity>
            </View>

            {/* Debug info */}
            <Text className="text-xs text-[#47624b] mb-2">
              Debug: {languages.length} languages loaded
            </Text>

            {/* Language List */}
            <ScrollView 
              className="flex-1" 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {languages.length === 0 ? (
                <View className="p-4 bg-red-100 rounded-xl">
                  <Text className="text-red-600">No languages found!</Text>
                </View>
              ) : (
                <View className="gap-3">
                  {languages.map((lang) => {
                    const isSelected = currentLanguage === lang.code;
                    
                    console.log('Rendering language:', lang.code, lang.nativeName);
                    
                    return (
                      <TouchableOpacity
                        key={lang.code}
                        onPress={() => handleLanguageSelect(lang.code)}
                        className={`flex-row items-center justify-between p-4 rounded-xl ${
                          isSelected ? 'bg-[#006b1b]' : 'bg-[#d8f9d9]'
                        }`}
                        style={{
                          borderBottomWidth: isSelected ? 3 : 0,
                          borderBottomColor: '#005d16',
                          minHeight: 70,
                        }}
                      >
                        <View className="flex-row items-center gap-3">
                          <View className={`w-10 h-10 rounded-full items-center justify-center ${
                            isSelected ? 'bg-[#d1ffc8]/20' : 'bg-[#006b1b]/10'
                          }`}>
                            <Text className="text-xl">
                              {lang.code === 'en' && '🇬🇧'}
                              {lang.code === 'es' && '🇪🇸'}
                              {lang.code === 'fr' && '🇫🇷'}
                              {lang.code === 'zh' && '🇨🇳'}
                              {lang.code === 'vi' && '🇻🇳'}
                            </Text>
                          </View>
                          <View className="flex-shrink">
                            <Text className={`text-base font-black ${
                              isSelected ? 'text-[#d1ffc8]' : 'text-[#006b1b]'
                            }`}>
                              {lang.nativeName}
                            </Text>
                            <Text className={`text-xs font-medium ${
                              isSelected ? 'text-[#d1ffc8]/70' : 'text-[#47624b]'
                            }`}>
                              {lang.name}
                            </Text>
                          </View>
                        </View>
                        {isSelected && (
                          <View className="w-8 h-8 rounded-full bg-[#d1ffc8] items-center justify-center">
                            <Ionicons name="checkmark" size={20} color="#006b1b" />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LanguageSelector;
