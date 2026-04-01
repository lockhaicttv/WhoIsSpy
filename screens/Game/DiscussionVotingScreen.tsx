import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { useStore } from '../../store';
import { getAvatarBgColor, getAvatarColor, getAvatarIcon } from '../../utils/avatarUtils';
import { t } from '../../utils/i18n';
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
  const language = useStore((state) => state.language);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [votedPlayer, setVotedPlayer] = useState<any>(null);
  const [blankGuess, setBlankGuess] = useState('');
  const [timeRemaining, setTimeRemaining] = useState<number | null>(discussionTime);
  const [timerRunning, setTimerRunning] = useState(false);
  const [randomPlayer, setRandomPlayer] = useState<string | null>(null);
  const [highlightedPlayerId, setHighlightedPlayerId] = useState<string | null>(null);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const timerRef = useRef<number | null>(null);
  const timerSoundStarted = useRef<boolean>(false);
  const bannerOpacity = useRef(new Animated.Value(0)).current;

  // Timer control - only runs when timerRunning is true
  useEffect(() => {
    if (timerRunning && timeRemaining !== null && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else if (!timerRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      soundManager.stopSound('timer-count');
    };
  }, [timerRunning]);

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
        timerRunning && setTimerRunning(false);
        soundManager.stopSound('timer-count');
        
        if (timerRef.current) clearInterval(timerRef.current);
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

  // Random player picker with card highlight animation
  const handleRandomPlayer = useCallback(() => {
    const alivePlayers = players.filter(p => p.isAlive);
    if (alivePlayers.length === 0 || isRandomizing) return;
    
    setIsRandomizing(true);
    setRandomPlayer(null);
    bannerOpacity.setValue(0);

    // Pre-pick the final winner
    const finalPick = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
    
    // Build a sequence: cycle through alive players multiple times, ending on finalPick
    const sequence: string[] = [];
    const totalCycles = 3; // go through all players 3 times
    for (let c = 0; c < totalCycles; c++) {
      for (const p of alivePlayers) {
        sequence.push(p.id);
      }
    }
    // Add extra steps to land on the final pick
    const lastIndex = alivePlayers.findIndex(p => p.id === finalPick.id);
    for (let i = 0; i <= lastIndex; i++) {
      sequence.push(alivePlayers[i].id);
    }

    let step = 0;
    const totalSteps = sequence.length;

    const animate = () => {
      if (step >= totalSteps) {
        // Done - set final result
        setHighlightedPlayerId(finalPick.id);
        setRandomPlayer(finalPick.name);
        setIsRandomizing(false);
        soundManager.playSound('ting', 0.7);
        
        // Fade in the banner
        Animated.timing(bannerOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          // After 3s, fade out then clear
          setTimeout(() => {
            Animated.timing(bannerOpacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }).start(() => {
              setRandomPlayer(null);
              setHighlightedPlayerId(null);
            });
          }, 3000);
        });
        return;
      }

      setHighlightedPlayerId(sequence[step]);
      step++;

      // Slow down: start fast (80ms), end slow (300ms)
      const progress = step / totalSteps;
      const delay = 80 + progress * progress * 250;
      setTimeout(animate, delay);
    };

    animate();
  }, [players, isRandomizing]);

  // Timer toggle
  const handleTimerToggle = useCallback(() => {
    if (discussionTime === null) return; // No timer configured
    
    if (timerRunning) {
      // Pause
      setTimerRunning(false);
      soundManager.stopSound('timer-count');
    } else {
      // Start or resume
      if (timeRemaining === 0) {
        // Reset timer if it already ended
        setTimeRemaining(discussionTime);
        timerSoundStarted.current = false;
      }
      setTimerRunning(true);
    }
  }, [timerRunning, timeRemaining, discussionTime]);

  // End game - reveal all
  const handleEndGame = useCallback(() => {
    Alert.alert(
      t('discussion.endGameTitle'),
      t('discussion.endGameConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('discussion.endGame'), 
          style: 'destructive',
          onPress: () => {
            if (timerRef.current) clearInterval(timerRef.current);
            soundManager.stopSound('timer-count');
            router.push('/game-reveal');
          }
        },
      ]
    );
  }, [router]);

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
              {t('discussion.discussionTime')}
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
                {t('discussion.timeRunningOut')}
              </Text>
            )}
            {timeRemaining === 0 && (
              <Text className="text-xs font-bold text-white uppercase tracking-widest mt-2">
                {t('discussion.timesUpVoteNow')}
              </Text>
            )}
          </View>
          <Text className="mt-4 text-[#47624b] font-medium text-center max-w-xs">
            {discussionTime === null 
              ? t('discussion.discussFreelyDesc')
              : timeRemaining === 0
                ? t('discussion.discussTimeEndedDesc')
                : t('discussion.discussCarefullyDesc')
            }
          </Text>
        </View>

        {/* Players Who Have Seen Their Keywords */}
        <Card variant="primary" className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-black text-[11px] uppercase text-[#005e17]">
              {t('discussion.ciphersViewed')}
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
                {t('discussion.waitingForPlayers').replace('{{count}}', String(players.filter(p => !p.hasSeenRole).length))}
              </Text>
            </View>
          )}
        </Card>

        {/* Player Grid */}
        <View className="flex-row flex-wrap justify-between gap-6">
          {players.map((item, index) => {
            const isDead = !item.isAlive;
            const isSelected = selectedId === item.id;
            const isHighlighted = highlightedPlayerId === item.id;
            const rotation = rotations[index % rotations.length];
            
            return (
              <TouchableOpacity 
                key={item.id}
                onPress={() => !isDead && setSelectedId(item.id)}
                disabled={isDead}
                className={`w-[45%] bg-[#f9e534] p-4 rounded-xl ${rotation} ${isDead ? 'opacity-40' : ''} ${isSelected ? 'border-4 border-[#006b1b]' : isHighlighted ? 'border-4 border-[#ff9800]' : ''}`}
                style={{
                  shadowColor: isHighlighted ? '#ff9800' : '#1b3420',
                  shadowOffset: { width: 0, height: isHighlighted ? 4 : 0 },
                  shadowOpacity: isHighlighted ? 0.4 : 0,
                  shadowRadius: isHighlighted ? 12 : 0,
                  elevation: isHighlighted ? 8 : 0,
                  borderBottomLeftRadius: index % 2 === 0 ? 12 : 48,
                  borderBottomRightRadius: index % 2 === 0 ? 48 : 12,
                }}
              >
                {isSelected && !isDead && (
                  <View className="absolute -top-3 -right-2 bg-[#006b1b] text-[#e0fee1] text-[10px] font-bold px-2 py-1 rounded-full">
                    <Text className="text-[10px] font-bold uppercase tracking-tighter text-[#e0fee1]">{t('discussion.selected')}</Text>
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
                      {isDead ? (item.role === 'spy' ? t('discussion.spyRevealed') : t('discussion.civRevealed')) : t('discussion.ready')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      </SafeAreaView>

      {/* Random Player Result - floating above nav */}
      {randomPlayer && (
        <Animated.View className="w-full px-6 pb-2 bg-[#e0fee1]" style={{ opacity: bannerOpacity }}>
          <View className="bg-[#f9e534] rounded-xl px-4 py-3 items-center">
            <Text className="text-[10px] font-black text-[#5b5300] uppercase tracking-widest">{t('discussion.describerIs')}</Text>
            <Text className="text-xl font-black text-[#5b5300] uppercase tracking-tight leading-snug">{randomPlayer}</Text>
          </View>
        </Animated.View>
      )}

      {/* Bottom Action Bar - BottomNavigation style */}
      <View 
        className="w-full flex-row justify-around items-center px-4 pb-6 pt-3 bg-[#e0fee1] rounded-t-[32px] border-t-2 border-[#d8f9d9]"
        style={{
          shadowColor: '#1b3420',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {/* Random Player */}
        <TouchableOpacity
          onPress={handleRandomPlayer}
          className="flex-col items-center justify-center px-4 py-2 opacity-70"
        >
          <Ionicons name="shuffle" size={24} color="#1b3420" />
          <Text className="text-[8px] font-bold mt-0.5 uppercase text-[#1b3420]" numberOfLines={1}>
            {t('discussion.randomPlayer')}
          </Text>
        </TouchableOpacity>

        {/* Timer */}
        <TouchableOpacity
          onPress={handleTimerToggle}
          disabled={discussionTime === null}
          className={`flex-col items-center justify-center px-4 py-2 ${
            discussionTime === null 
              ? 'opacity-30' 
              : timerRunning 
                ? 'bg-[#f95630] rounded-full'
                : 'opacity-70'
          }`}
          style={timerRunning ? { borderBottomWidth: 4, borderBottomColor: '#c7401f' } : {}}
        >
          <Ionicons 
            name={timerRunning ? 'pause' : 'play'} 
            size={24} 
            color={timerRunning ? '#fff' : '#1b3420'} 
          />
          <Text className={`text-[8px] font-bold mt-0.5 uppercase ${
            timerRunning ? 'text-white' : 'text-[#1b3420]'
          }`} numberOfLines={1}>
            {timerRunning ? t('discussion.pauseTimer') : timeRemaining === 0 ? t('discussion.resetTimer') : t('discussion.startTimer')}
          </Text>
        </TouchableOpacity>

        {/* Vote */}
        <TouchableOpacity
          onPress={handleVote}
          disabled={!selectedId}
          className={`flex-col items-center justify-center px-4 py-2 ${
            selectedId 
              ? 'bg-[#006b1b] rounded-full'
              : 'opacity-30'
          }`}
          style={selectedId ? { borderBottomWidth: 4, borderBottomColor: '#005d16' } : {}}
        >
          <Ionicons 
            name="checkmark-circle" 
            size={24} 
            color={selectedId ? '#e0fee1' : '#1b3420'} 
          />
          <Text className={`text-[8px] font-bold mt-0.5 uppercase ${
            selectedId ? 'text-[#e0fee1]' : 'text-[#1b3420]'
          }`} numberOfLines={1}>
            {t('discussion.voteNow')}
          </Text>
        </TouchableOpacity>

        {/* End Game */}
        <TouchableOpacity
          onPress={handleEndGame}
          className="flex-col items-center justify-center px-4 py-2 opacity-70"
        >
          <Ionicons name="flag" size={24} color="#ff9800" />
          <Text className="text-[8px] font-bold mt-0.5 uppercase text-[#ff9800]" numberOfLines={1}>
            {t('discussion.endGame')}
          </Text>
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
                        {t('discussion.roleRevealed')}
                      </Text>
                      <View className="flex-row items-center gap-3">
                        <Ionicons 
                          name={votedPlayer.role === 'spy' ? 'eye' : 'shield-checkmark'} 
                          size={48} 
                          color={votedPlayer.role === 'spy' ? '#ff9800' : '#006b1b'} 
                        />
                        <Text className={`text-4xl font-black uppercase tracking-tight leading-snug ${
                          votedPlayer.role === 'spy' ? 'text-[#ff9800]' : 'text-[#006b1b]'
                        }`}>
                          {votedPlayer.role === 'spy' ? t('discussion.infiltrator') : t('discussion.agent')}
                        </Text>
                      </View>
                    </View>

                    <Button 
                      label={t('common.continue')}
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
                        {t('discussion.interceptorDetected')}
                      </Text>
                      <Text className="text-2xl font-black text-[#5b5300] uppercase tracking-tight mb-4">
                        {t('discussion.finalChance')}
                      </Text>
                      <Text className="text-sm font-medium text-[#5b5300] text-center mb-6">
                        {t('discussion.interceptorGuessDesc').replace('{{name}}', votedPlayer.name)}
                      </Text>
                      
                      {/* Input for blank guess */}
                      <View className="w-full bg-white rounded-full px-6 py-4 shadow-sm border-2 border-[#5b5300]/20 flex-row items-center mb-4">
                        <TextInput 
                          className="flex-1 text-xl text-[#1b3420] font-bold text-center" 
                          placeholder={t('discussion.enterAgentCipher')}
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
                          label={t('discussion.skip')}
                          variant="secondary"
                          onPress={handleConfirmElimination}
                        />
                      </View>
                      <View className="flex-1">
                        <Button 
                          label={t('discussion.guess')}
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
