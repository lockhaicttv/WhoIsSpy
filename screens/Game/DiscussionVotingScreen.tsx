import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useStore } from '../../store';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAvatarIcon, getAvatarColor, getAvatarBgColor } from '../../utils/avatarUtils';
import { soundManager } from '../../utils/soundManager';

const DiscussionVotingScreen = () => {
  const router = useRouter();
  const players = useStore((state) => state.players);
  const eliminatePlayer = useStore((state) => state.eliminatePlayer);
  const setWinner = useStore((state) => state.setWinner);
  const setPhase = useStore((state) => state.setPhase);
  const civWord = useStore((state) => state.civilianWord);
  const spyWord = useStore((state) => state.spyWord);
  const discussionTime = useStore((state) => state.discussionTime);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState<any>(null);
  const [blankGuess, setBlankGuess] = useState('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(discussionTime);
  const timerRef = useRef<number | null>(null);
  const timerSoundStarted = useRef<boolean>(false);

  // Initialize and manage timer
  useEffect(() => {
    if (discussionTime !== null) {
      setTimeRemaining(discussionTime);
      timerSoundStarted.current = false;
      
      // Start countdown timer
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        soundManager.stopSound('timer-count');
      };
    }
  }, [discussionTime]);

  // Handle timer sound effects
  useEffect(() => {
    if (timeRemaining === null) return;

    // Start looping timer sound at 10 seconds
    if (timeRemaining === 10 && !timerSoundStarted.current) {
      soundManager.playSound('timer-count', 0.4, true); // loop = true
      timerSoundStarted.current = true;
    }

    // Stop timer sound and play ting when time's up
    if (timeRemaining === 0) {
      soundManager.stopSound('timer-count');
      soundManager.playSound('ting', 0.7);
      timerSoundStarted.current = false;
    }
  }, [timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const checkWinCondition = (updatedPlayers: any[]) => {
    const alive = updatedPlayers.filter(p => p.isAlive);
    const spies = alive.filter(p => p.role === 'spy');
    const civs = alive.filter(p => p.role !== 'spy'); 
    
    if (spies.length === 0) {
      setWinner('civilians');
      setPhase('victory');
      router.push('/victory');
      return true;
    }
    if (spies.length >= civs.length) {
      setWinner('spies');
      setPhase('victory');
      router.push('/victory');
      return true;
    }
    return false;
  };

  const handleVote = () => {
    if (!selectedId) return;
    const playerToEliminate = players.find(p => p.id === selectedId);
    if (!playerToEliminate) return;

    // Show role popup instead of simple alert
    setVotedPlayer(playerToEliminate);
    setShowRolePopup(true);
    
    // Play blank-caught sound if it's a blank player
    if (playerToEliminate.role === 'blank') {
      soundManager.playSound('blank-caught', 0.7);
    }
  };

  const handleConfirmElimination = () => {
    if (!votedPlayer) return;

    eliminatePlayer(votedPlayer.id);
    const updatedPlayers = players.map(p => p.id === votedPlayer.id ? { ...p, isAlive: false} : p);
    
    setShowRolePopup(false);
    setVotedPlayer(null);
    setBlankGuess('');
    
    const gameEnded = checkWinCondition(updatedPlayers);
    if (!gameEnded) {
      setSelectedId(null);
      // Reset timer for next round
      if (discussionTime !== null) {
        setTimeRemaining(discussionTime);
        timerSoundStarted.current = false;
        soundManager.stopSound('timer-count');
        
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev === null || prev <= 0) {
              if (timerRef.current) clearInterval(timerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  };

  const handleBlankGuess = () => {
    if (!votedPlayer || !blankGuess.trim()) return;

    // Check if blank player guessed the civilian word correctly
    const isCorrect = blankGuess.trim().toLowerCase() === civWord.toLowerCase();
    
    if (isCorrect) {
      // Blank wins by guessing correctly! (Blank is third team)
      setShowRolePopup(false);
      setWinner('blank'); // Blank is a third team - they win alone!
      setPhase('victory');
      router.push('/victory');
    } else {
      // Wrong guess - eliminate the blank player
      handleConfirmElimination();
    }
  };

  const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

  return (
    <View className="flex-1 bg-[#e0fee1]">
      <SafeAreaView className="flex-1 flex-col" edges={['bottom']}>
      <ScrollView className="flex-1 px-6 pt-4 pb-32" showsVerticalScrollIndicator={false}>
        {/* Countdown Section */}
        <View className="flex-col items-center mb-6">
          <View className={`px-8 py-4 rounded-xl flex-col items-center justify-center ${
            timeRemaining !== null && timeRemaining <= 10 ? 'bg-[#f95630]' : 'bg-[#d8f9d9]'
          }`}>
            <Text className={`font-bold text-xs tracking-[0.2em] uppercase mb-1 ${
              timeRemaining !== null && timeRemaining <= 10 ? 'text-white' : 'text-[#47624b]'
            }`}>
              DISCUSSION TIME
            </Text>
            <View className="flex-row items-baseline gap-1">
              {discussionTime === null ? (
                <Text className="text-6xl font-black text-[#006b1b] tracking-tighter leading-none">∞</Text>
              ) : (
                <Text className={`text-6xl font-black tracking-tighter leading-none ${
                  timeRemaining !== null && timeRemaining <= 10 ? 'text-white' : 'text-[#006b1b]'
                }`}>
                  {timeRemaining !== null ? formatTime(timeRemaining) : '0:00'}
                </Text>
              )}
            </View>
            {timeRemaining !== null && timeRemaining <= 10 && timeRemaining > 0 && (
              <Text className="text-xs font-bold text-white uppercase tracking-widest mt-2 animate-pulse">
                TIME RUNNING OUT!
              </Text>
            )}
            {timeRemaining === 0 && (
              <Text className="text-xs font-bold text-white uppercase tracking-widest mt-2">
                TIME&#39;S UP! VOTE NOW
              </Text>
            )}
          </View>
          <Text className="mt-4 text-[#47624b] font-medium text-center max-w-xs">
            {discussionTime === null 
              ? "Discuss with others and find out who doesn't belong!"
              : timeRemaining === 0
                ? "Discussion time ended. Vote to eliminate a player."
                : "Discuss carefully and watch for suspicious behavior"
            }
          </Text>
        </View>

        {/* Players Who Have Seen Their Keywords */}
        <Card variant="primary" className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-black text-[11px] uppercase text-[#005e17]">
              Keywords Viewed
            </Text>
            <View className="flex-row items-center gap-1">
              <Text className="font-black text-sm text-[#006b1b]">
                {players.filter(p => p.hasSeenRole).length}/{players.length}
              </Text>
              <Ionicons name="checkmark-circle" size={16} color="#006b1b" />
            </View>
          </View>
          
          {/* Avatar row showing who has seen */}
          <View className="flex-row flex-wrap gap-3">
            {players.map((item, index) => {
              const hasSeen = item.hasSeenRole;
              return (
                <View 
                  key={item.id} 
                  className="flex-col items-center gap-1"
                  style={{ opacity: hasSeen ? 1 : 0.3 }}
                >
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center border-2"
                    style={{ 
                      backgroundColor: hasSeen ? getAvatarBgColor(index) : '#c6ecc8',
                      borderColor: hasSeen ? getAvatarColor(index) : '#98b499'
                    }}
                  >
                    {hasSeen ? (
                      <MaterialCommunityIcons 
                        name={getAvatarIcon(index)} 
                        size={24} 
                        color={getAvatarColor(index)} 
                      />
                    ) : (
                      <Ionicons name="lock-closed" size={20} color="#98b499" />
                    )}
                  </View>
                  <Text 
                    className="text-[9px] font-bold uppercase tracking-tight"
                    style={{ color: hasSeen ? '#005e17' : '#98b499' }}
                  >
                    {item.name.length > 6 ? item.name.substring(0, 5) + '.' : item.name}
                  </Text>
                </View>
              );
            })}
          </View>

          {players.filter(p => !p.hasSeenRole).length > 0 && (
            <View className="mt-4 bg-[#c6ecc8] rounded-lg p-3 flex-row items-center gap-2">
              <Ionicons name="time" size={16} color="#005e17" />
              <Text className="flex-1 text-xs font-bold text-[#005e17]">
                Waiting for {players.filter(p => !p.hasSeenRole).length} player(s) to view keywords...
              </Text>
            </View>
          )}
        </Card>

        {/* Player Grid */}
        <View className="flex-row flex-wrap justify-between gap-6">
          {players.map((item, index) => {
            const isDead = !item.isAlive;
            const isSelected = selectedId === item.id;
            const rotation = rotations[index % rotations.length];
            
            return (
              <TouchableOpacity 
                key={item.id}
                onPress={() => !isDead && setSelectedId(item.id)}
                disabled={isDead}
                className={`w-[45%] bg-[#f9e534] p-4 rounded-xl ${rotation} ${isDead ? 'opacity-40' : ''} ${isSelected ? 'border-4 border-[#006b1b]' : ''}`}
                style={{
                  shadowColor: '#1b3420',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  elevation: 0,
                  borderBottomLeftRadius: index % 2 === 0 ? 12 : 48,
                  borderBottomRightRadius: index % 2 === 0 ? 48 : 12,
                }}
              >
                {isSelected && !isDead && (
                  <View className="absolute -top-3 -right-2 bg-[#006b1b] text-[#e0fee1] text-[10px] font-bold px-2 py-1 rounded-full">
                    <Text className="text-[10px] font-bold uppercase tracking-tighter text-[#e0fee1]">You</Text>
                  </View>
                )}
                
                <View className="flex-col items-center text-center gap-3">
                  <View 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getAvatarBgColor(index) }}
                  >
                    <MaterialCommunityIcons name={getAvatarIcon(index)} size={32} color={getAvatarColor(index)} />
                  </View>
                  <View>
                    <Text className={`font-bold text-lg text-[#5b5300] leading-tight ${isDead ? 'line-through' : ''}`}>
                      {item.name}
                    </Text>
                    <Text className="text-[10px] font-bold text-[#5b5300]/60 uppercase tracking-widest">
                      {isDead ? (item.role === 'spy' ? '🕵️ SPY' : '👤 CIVILIAN') : 'READY'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      </SafeAreaView>

      {/* Sticky Vote Button */}
      <View className="w-full px-6 py-3 bg-[#e0fee1]">
        <Button 
          label="VOTE NOW"
          variant="primary"
          onPress={handleVote} 
          disabled={!selectedId}
          icon="checkmark-circle"
          className={!selectedId ? 'opacity-50' : ''}
        />
      </View>

      {/* BottomNavBar - Fixed at bottom */}
      <View className="w-full flex-row justify-around items-center px-4 pb-6 pt-3 bg-[#e0fee1] rounded-t-[32px]"
            style={{
              shadowColor: '#1b3420',
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 8
            }}>
        <TouchableOpacity className="flex-col items-center justify-center bg-[#006b1b] rounded-full px-6 py-2"
                          style={{ borderBottomWidth: 4, borderBottomColor: '#005d16' }}>
          <Ionicons name="game-controller" size={24} color="#e0fee1" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#e0fee1]">Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70">
          <Ionicons name="people" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#1b3420]">Players</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-col items-center justify-center opacity-70">
          <Ionicons name="document-text" size={24} color="#1b3420" />
          <Text className="text-[10px] font-medium tracking-wide uppercase text-[#1b3420]">Rules</Text>
        </TouchableOpacity>
      </View>

      {/* Role Reveal Popup Modal */}
      <Modal
        visible={showRolePopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setShowRolePopup(false);
          setVotedPlayer(null);
          setBlankGuess('');
          setSelectedId(null);
        }}
      >
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <Card variant="surface" className="w-full max-w-md p-8">
            {votedPlayer && (
              <>
                {/* Player Info */}
                <View className="items-center mb-6">
                  <View 
                    className="w-24 h-24 rounded-full items-center justify-center mb-4"
                    style={{ backgroundColor: getAvatarBgColor(players.findIndex(p => p.id === votedPlayer.id)) }}
                  >
                    <MaterialCommunityIcons 
                      name={getAvatarIcon(players.findIndex(p => p.id === votedPlayer.id))} 
                      size={48} 
                      color={getAvatarColor(players.findIndex(p => p.id === votedPlayer.id))} 
                    />
                  </View>
                  <Text className="text-2xl font-black text-[#1b3420] uppercase tracking-tight">
                    {votedPlayer.name}
                  </Text>
                </View>

                {/* Role Display */}
                {votedPlayer.role !== 'blank' ? (
                  <>
                    <View className="bg-[#d8f9d9] rounded-2xl p-6 items-center mb-6">
                      <Text className="text-xs font-bold text-[#47624b] uppercase tracking-widest mb-2">
                        ROLE REVEALED
                      </Text>
                      <View className="flex-row items-center gap-3">
                        <Ionicons 
                          name={votedPlayer.role === 'spy' ? 'eye' : 'shield-checkmark'} 
                          size={48} 
                          color={votedPlayer.role === 'spy' ? '#ff9800' : '#006b1b'} 
                        />
                        <Text className={`text-5xl font-black uppercase tracking-tight ${
                          votedPlayer.role === 'spy' ? 'text-[#ff9800]' : 'text-[#006b1b]'
                        }`}>
                          {votedPlayer.role === 'spy' ? 'SPY' : 'CIVILIAN'}
                        </Text>
                      </View>
                    </View>

                    <Button 
                      label="CONTINUE"
                      variant="primary"
                      onPress={handleConfirmElimination}
                      icon="arrow-forward"
                    />
                  </>
                ) : (
                  // Blank Player - Let them guess
                  <>
                    <View className="bg-[#f9e534] rounded-2xl p-6 items-center mb-6">
                      <Ionicons name="help-circle" size={48} color="#5b5300" style={{ opacity: 0.3, marginBottom: 16 }} />
                      <Text className="text-xs font-bold text-[#5b5300] uppercase tracking-widest mb-2">
                        BLANK PLAYER!
                      </Text>
                      <Text className="text-2xl font-black text-[#5b5300] uppercase tracking-tight mb-4">
                        FINAL CHANCE
                      </Text>
                      <Text className="text-sm font-medium text-[#5b5300] text-center mb-6">
                        {votedPlayer.name} can guess the civilian keyword. If correct, they win! If wrong, they&#39;re eliminated.
                      </Text>
                      
                      {/* Input for blank guess */}
                      <View className="w-full bg-white rounded-full px-6 py-4 shadow-sm border-2 border-[#5b5300]/20 flex-row items-center mb-4">
                        <TextInput 
                          className="flex-1 text-xl text-[#1b3420] font-bold text-center" 
                          placeholder="Enter civilian keyword..."
                          placeholderTextColor="#88a48a"
                          value={blankGuess}
                          onChangeText={setBlankGuess}
                          autoFocus={true}
                        />
                      </View>
                    </View>

                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <Button 
                          label="SKIP"
                          variant="secondary"
                          onPress={handleConfirmElimination}
                        />
                      </View>
                      <View className="flex-1">
                        <Button 
                          label="GUESS"
                          variant="primary"
                          onPress={handleBlankGuess}
                          disabled={!blankGuess.trim()}
                          icon="checkmark-circle"
                        />
                      </View>
                    </View>
                  </>
                )}

                {/* Close button */}
                <TouchableOpacity 
                  onPress={() => {
                    setShowRolePopup(false);
                    setVotedPlayer(null);
                    setBlankGuess('');
                    setSelectedId(null);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#1b3420]/10 items-center justify-center"
                >
                  <Ionicons name="close" size={24} color="#1b3420" />
                </TouchableOpacity>
              </>
            )}
          </Card>
        </View>
      </Modal>
    </View>
  );
};
export default DiscussionVotingScreen;
