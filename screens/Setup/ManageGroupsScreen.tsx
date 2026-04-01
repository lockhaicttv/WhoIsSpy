import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  GroupWithMembers,
  updateGroup
} from '../../db/groupService';
import { useStore } from '../../store';
import { getAvatarColor, getAvatarIcon } from '../../utils/avatarUtils';
import { t } from '../../utils/i18n';

const ManageGroupsScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const addPlayer = useStore((state) => state.addPlayer);
  const removePlayer = useStore((state) => state.removePlayer);
  const setPlayers = useStore((state) => state.setPlayers);

  const [newName, setNewName] = useState('');
  const [savedGroups, setSavedGroups] = useState<GroupWithMembers[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);

  // Load saved groups on mount
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = () => {
    const groups = getAllGroups();
    setSavedGroups(groups);
  };

  const handleAdd = () => {
    if (newName.trim()) {
      addPlayer(newName.trim());
      setNewName('');
    }
  };

  const canConfirmSquad = players.length >= 3;

  const handleConfirmSquad = () => {
    if (canConfirmSquad) {
      router.push('/game-config');
    }
  };

  const handleSaveGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert(t('manageGroups.error'), t('manageGroups.enterGroupNameError'));
      return;
    }

    if (players.length === 0) {
      Alert.alert(t('manageGroups.error'), t('manageGroups.noPlayersError'));
      return;
    }

    try {
      const playerNames = players.map(p => p.name);
      
      if (editingGroupId) {
        await updateGroup(editingGroupId, groupName.trim(), playerNames);
        Alert.alert(t('manageGroups.success'), t('manageGroups.groupUpdated'));
      } else {
        await createGroup(groupName.trim(), playerNames);
        Alert.alert(t('manageGroups.success'), t('manageGroups.groupSaved'));
      }
      
      setShowSaveModal(false);
      setGroupName('');
      setEditingGroupId(null);
      loadGroups();
    } catch (error) {
      Alert.alert(t('manageGroups.error'), t('manageGroups.failedToSave'));
    }
  };

  const handleLoadGroup = (group: GroupWithMembers) => {
    // Clear current players and load group members
    const newPlayers = group.members.map((member, index) => ({
      id: Date.now().toString() + index,
      name: member.name,
      role: 'civilian' as const,
      isAlive: true,
      hasSeenRole: false,
    }));
    
    setPlayers(newPlayers);
    setShowLoadModal(false);
    Alert.alert(t('manageGroups.success'), t('manageGroups.loadedGroup', { name: group.name }));
  };

  const handleDeleteGroup = (id: number, name: string) => {
    Alert.alert(
      t('manageGroups.deleteGroupTitle'),
      t('manageGroups.deleteGroupConfirm', { name }),
      [
        { text: t('manageGroups.cancel'), style: 'cancel' },
        {
          text: t('manageGroups.deleteGroup'),
          style: 'destructive',
          onPress: () => {
            deleteGroup(id);
            loadGroups();
            Alert.alert(t('manageGroups.success'), t('manageGroups.groupDeleted'));
          },
        },
      ]
    );
  };

  const handleEditGroup = (group: GroupWithMembers) => {
    setEditingGroupId(group.id);
    setGroupName(group.name);
    
    // Load group members into current players
    const newPlayers = group.members.map((member, index) => ({
      id: Date.now().toString() + index,
      name: member.name,
      role: 'civilian' as const,
      isAlive: true,
      hasSeenRole: false,
    }));
    
    setPlayers(newPlayers);
    setShowLoadModal(false);
    setShowSaveModal(true);
  };


  return (
    <View className="flex-1 bg-[#e0fee1]">
    <SafeAreaView className="flex-1 bg-[#e0fee1]" edges={['bottom']}>
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Group Management Buttons */}
        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity 
            onPress={() => setShowLoadModal(true)}
            className="flex-1 bg-[#d8f9d9] p-4 rounded-xl flex-row items-center justify-center gap-2"
            style={{
              shadowColor: '#1b3420',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2
            }}
          >
            <Ionicons name="download" size={20} color="#006b1b" />
            <Text className="font-bold text-sm text-[#006b1b] uppercase">{t('manageGroups.loadGroupButton')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => {
              setEditingGroupId(null);
              setGroupName('');
              setShowSaveModal(true);
            }}
            disabled={players.length === 0}
            className={`flex-1 bg-[#91f78e] p-4 rounded-xl flex-row items-center justify-center gap-2 ${
              players.length === 0 ? 'opacity-50' : ''
            }`}
            style={{
              shadowColor: '#1b3420',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2
            }}
          >
            <Ionicons name="save" size={20} color="#006b1b" />
            <Text className="font-bold text-sm text-[#006b1b] uppercase">{t('manageGroups.saveGroupButton')}</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <View className="mb-4 bg-white rounded-full px-6 py-4 shadow-sm border-2 border-[#bee7c1] flex-row items-center">
            <TextInput 
              className="flex-1 text-xl text-[#1b3420] font-bold"
              placeholder={t('manageGroups.enterOperativeName')}
              placeholderTextColor="#88a48a"
              value={newName}
              onChangeText={setNewName}
              onSubmitEditing={handleAdd}
            />
          </View>
          <Button 
            label={t('manageGroups.addNewPlayer')}
            onPress={handleAdd} 
            disabled={!newName.trim()}
            icon="add-circle"
          />
        </View>

        <Card variant="secondary" rotated className="mb-8">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="font-bold text-3xl text-[#5b5300] leading-snug">{t('manageGroups.activeSquad')}</Text>
              <Text className="font-black text-[12px] tracking-widest uppercase opacity-80 text-[#5b5300] mt-1">{t('manageGroups.playersTotal', { count: players.length })}</Text>
            </View>
          </View>

          <View className="bg-[#b3dfb8]/30 rounded-xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-black text-[11px] uppercase text-[#47624b]">{t('manageGroups.currentlyDeployed')}</Text>
            </View>

            <View className="flex-row flex-wrap gap-5">
              {players.length === 0 && (
                <Text className="text-sm font-bold text-[#47624b] py-4">{t('manageGroups.noOperatives')}</Text>
              )}
              {players.map((item, index) => (
                <View key={item.id} className="flex-col items-center gap-1">
                  <View className="w-16 h-16 bg-[#e0fee1] rounded-full items-center justify-center border-2 border-[#005d16]/20 shadow-sm relative">
                    <MaterialCommunityIcons name={getAvatarIcon(index)} size={32} color={getAvatarColor(index)} />
                    <TouchableOpacity 
                      onPress={() => removePlayer(item.id)}
                      className="absolute -top-1 -right-1 bg-[#b02500] rounded-full w-6 h-6 items-center justify-center border-2 border-[#f9e534]"
                    >
                      <Ionicons name="close" size={14} color="white" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-sm font-bold text-[#1b3420]">{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        <View className="mb-32">
          <Button 
            label={t('manageGroups.confirmSquad')}
            variant="tertiary"
            onPress={handleConfirmSquad} 
            disabled={!canConfirmSquad}
            className={!canConfirmSquad ? 'opacity-50' : ''}
          />
          {players.length < 3 && (
            <Text className="text-center text-[#b02500] font-bold text-sm mt-4 uppercase tracking-wide">
              {t('manageGroups.needMinPlayers')}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Save Group Modal */}
      <Modal
        visible={showSaveModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setShowSaveModal(false);
          setGroupName('');
          setEditingGroupId(null);
        }}
      >
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <Card variant="surface" className="w-full max-w-md p-8">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-[#91f78e] items-center justify-center mb-4">
                <Ionicons name="save" size={32} color="#006b1b" />
              </View>
              <Text className="text-2xl font-black text-[#1b3420] uppercase tracking-tight">
                {editingGroupId ? t('manageGroups.updateGroup') : t('manageGroups.saveGroupTitle')}
              </Text>
              <Text className="text-sm text-[#47624b] mt-2 text-center">
                {editingGroupId 
                  ? t('manageGroups.updateGroupDesc')
                  : t('manageGroups.saveGroupDesc')}
              </Text>
            </View>

            <View className="mb-6 bg-white rounded-full px-6 py-4 shadow-sm border-2 border-[#bee7c1] flex-row items-center">
              <TextInput 
                className="flex-1 text-xl text-[#1b3420] font-bold" 
                placeholder={t('manageGroups.groupNameModalPlaceholder')}
                placeholderTextColor="#88a48a"
                value={groupName}
                onChangeText={setGroupName}
                autoFocus={true}
              />
            </View>

            <View className="bg-[#d8f9d9] rounded-xl p-4 mb-6">
              <Text className="text-xs font-bold text-[#47624b] uppercase mb-2">{t('manageGroups.playersToSave')}</Text>
              <Text className="text-sm font-medium text-[#1b3420]">
                {players.map(p => p.name).join(', ')}
              </Text>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button 
                  label={t('manageGroups.cancel')}
                  variant="secondary"
                  size="small"
                  onPress={() => {
                    setShowSaveModal(false);
                    setGroupName('');
                    setEditingGroupId(null);
                  }}
                />
              </View>
              <View className="flex-1">
                <Button 
                  label={editingGroupId ? t('manageGroups.update') : t('manageGroups.save')}
                  variant="primary"
                  size="small"
                  onPress={handleSaveGroup}
                  disabled={!groupName.trim()}
                  icon="checkmark-circle"
                />
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => {
                setShowSaveModal(false);
                setGroupName('');
                setEditingGroupId(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1b3420]/10 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#1b3420" />
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>

      {/* Load Group Modal */}
      <Modal
        visible={showLoadModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLoadModal(false)}
      >
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <Card variant="surface" className="w-full max-w-md p-8 max-h-[80%]">
            <View className="items-center mb-6">
              <View className="w-16 h-16 rounded-full bg-[#d8f9d9] items-center justify-center mb-4">
                <Ionicons name="folder-open" size={32} color="#006b1b" />
              </View>
              <Text className="text-2xl font-black text-[#1b3420] uppercase tracking-tight">
                {t('manageGroups.loadGroupButton')}
              </Text>
              <Text className="text-sm text-[#47624b] mt-2 text-center">
                {t('manageGroups.selectGroupToLoad')}
              </Text>
            </View>

            <ScrollView className="max-h-[400px] mb-6" showsVerticalScrollIndicator={false}>
              {savedGroups.length === 0 ? (
                <View className="bg-[#d8f9d9] rounded-xl p-6 items-center">
                  <Ionicons name="folder-open-outline" size={48} color="#47624b" style={{ opacity: 0.3 }} />
                  <Text className="text-sm font-bold text-[#47624b] mt-4 text-center">
                    {t('manageGroups.noSavedGroupsModal')}
                  </Text>
                </View>
              ) : (
                <View className="gap-3">
                  {savedGroups.map((group) => (
                    <TouchableOpacity
                      key={group.id}
                      onPress={() => handleLoadGroup(group)}
                      className="bg-[#d8f9d9] rounded-xl p-4"
                      style={{
                        shadowColor: '#1b3420',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2
                      }}
                    >
                      <View className="flex-row items-center justify-between mb-2">
                        <View className="flex-1">
                          <Text className="text-lg font-black text-[#1b3420] mb-1">
                            {group.name}
                          </Text>
                          <Text className="text-xs text-[#47624b] font-bold uppercase">
                            {t('manageGroups.nPlayers', { count: group.members.length })}
                          </Text>
                        </View>
                        <View className="flex-row gap-2">
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              handleEditGroup(group);
                            }}
                            className="w-10 h-10 rounded-full bg-[#91f78e] items-center justify-center"
                          >
                            <Ionicons name="create" size={20} color="#006b1b" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              handleDeleteGroup(group.id, group.name);
                            }}
                            className="w-10 h-10 rounded-full bg-[#f95630] items-center justify-center"
                          >
                            <Ionicons name="trash" size={20} color="white" />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View className="bg-white/50 rounded-lg p-2">
                        <Text className="text-xs font-medium text-[#1b3420]">
                          {group.members.map(m => m.name).join(', ')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </ScrollView>

            <Button 
              label={t('manageGroups.close')}
              variant="secondary"
              size="small"
              onPress={() => setShowLoadModal(false)}
            />

            <TouchableOpacity 
              onPress={() => setShowLoadModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1b3420]/10 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#1b3420" />
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
    
    {/* Bottom Navigation - Fixed at bottom */}
    <BottomNavigation />
  </View>
  );
};
export default ManageGroupsScreen;
