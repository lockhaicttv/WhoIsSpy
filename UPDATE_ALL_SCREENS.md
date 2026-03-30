# Automated Screen Translation Updates

This document tracks the translation updates for all remaining screens.

## Status: ✅ RulesScreen COMPLETE

## Remaining Screens - Quick Update Guide

For each screen below, follow this pattern:

### 1. Add imports at the top:
```typescript
import { t } from '../../utils/i18n';
import { useStore } from '../../store';
```

### 2. Add language subscription in component:
```typescript
const language = useStore((state) => state.language);
```

### 3. Replace all hardcoded text with t() calls

---

## ManageGroupsScreen.tsx - Translation Keys Needed

Replace:
- "PLAYER GROUPS" → t('manageGroups.title')
- "Create or load saved player groups" → t('manageGroups.subtitle')
- "Enter player name" → t('manageGroups.addPlayerPlaceholder')
- "ADD PLAYER" → t('manageGroups.addPlayer')
- "CREATE NEW GROUP" → t('manageGroups.createNewGroup')
- "SAVED GROUPS" → t('manageGroups.savedGroups')
- "LOAD" → t('manageGroups.loadGroup')
- "DELETE" → t('manageGroups.deleteGroup')
- "players" → t('manageGroups.players')
- "No Saved Groups" → t('manageGroups.noSavedGroups')
- Description → t('manageGroups.noSavedGroupsDesc')
- "Save This Group" → t('manageGroups.saveGroupTitle')
- "Enter group name" → t('manageGroups.groupNamePlaceholder')
- "SAVE GROUP" → t('manageGroups.saveGroup')
- Error message → t('manageGroups.minPlayersError')
- "CONTINUE" → t('common.continue')

## GameConfigScreen.tsx - Translation Keys Needed

Replace:
- "Configure Roles" → t('gameConfig.title')
- "Total Players:" → t('gameConfig.totalPlayers')
- "Number of Spies" → t('gameConfig.numSpies')
- "Blank Cards (Optional)" → t('gameConfig.numBlanks')
- "Discussion Time" → t('gameConfig.discussionTime')
- "Infinity" → t('gameConfig.infinity')
- "minutes"/"minute" → t('gameConfig.minutes')/t('gameConfig.minute')
- "Role Distribution" → t('gameConfig.roleBreakdown')
- "Civilians" → t('common.civilians')
- "Spies" → t('common.spies')
- "Blanks" → t('common.blank')
- Validation error → t('gameConfig.validationError')
- Success message → t('gameConfig.canContinue')
- "CONTINUE" → t('common.continue')

## ImportKeywordsScreen.tsx - Translation Keys Needed

Replace:
- "SELECT KEYWORDS" → t('importKeywords.title')
- "Choose a keyword pair for this game" → t('importKeywords.subtitle')
- "RANDOM PAIR" → t('importKeywords.randomPair')
- "Civilian Word" → t('importKeywords.civilianWord')
- "Spy Word" → t('importKeywords.spyWord')
- "SELECTED PAIR" → t('importKeywords.selectedPair')
- "No keywords available" → t('importKeywords.noKeywords')
- "Loading keywords..." → t('importKeywords.loadingKeywords')
- "CONTINUE" → t('common.continue')

## RoleDistributionScreen.tsx - Translation Keys Needed

Replace:
- "ROLE DISTRIBUTION" → t('roleDistribution.title')
- "Each player will see their secret role" → t('roleDistribution.subtitle')
- "TAP TO REVEAL YOUR ROLE" → t('roleDistribution.tapToReveal')
- "All players have seen their roles" → t('roleDistribution.allRevealed')
- "START DISCUSSION" → t('roleDistribution.startDiscussion')
- "WAITING" → t('roleDistribution.waiting')
- "REVEALED" → t('roleDistribution.revealed')

## RoleRevealScreen.tsx - Translation Keys Needed

Replace:
- "YOUR KEYWORD" → t('roleReveal.yourKeyword')
- Description text → t('roleReveal.rememberKeyword')
- "Strategy" → t('roleReveal.strategy')
- Strategy desc → t('roleReveal.strategyDesc')
- "Caution" → t('roleReveal.caution')
- Caution desc → t('roleReveal.cautionDesc')
- "READY" → t('common.ready')
- "Close Privately" → t('roleReveal.closePrivately')
- Close desc → t('roleReveal.closePrivatelyDesc')

## DiscussionVotingScreen.tsx - Translation Keys Needed

Replace:
- "DISCUSSION & VOTING" → t('discussion.title')
- Subtitle → t('discussion.subtitle')
- "Time Remaining" → t('discussion.timeRemaining')
- "VOTING PHASE" → t('discussion.votingPhase')
- "Select a player to eliminate" → t('discussion.selectPlayer')
- "CONFIRM VOTE" → t('discussion.confirmVote')
- "Eliminate this player?" → t('discussion.eliminateQuestion')
- "SHOW ROLE" → t('discussion.showRole')
- "This player was a..." → t('discussion.thisPlayerWas')
- "BLANK PLAYER GUESS" → t('discussion.blankGuessTitle')
- Subtitle → t('discussion.blankGuessSubtitle')
- "Enter your guess" → t('discussion.enterGuess')
- "SUBMIT GUESS" → t('discussion.submitGuess')
- "CORRECT!" → t('discussion.correct')
- "INCORRECT!" → t('discussion.incorrect')
- "Blank player guessed:" → t('discussion.blankGuessed')
- "NEXT ROUND" → t('discussion.nextRound')
- "ALIVE" → t('discussion.alive')
- "ELIMINATED" → t('discussion.eliminated')

## VictoryScreen.tsx - Translation Keys Needed

Replace:
- "BRILLIANT DEDUCTION" → t('victory.brilliantDeduction')
- "DEDUCTION COMPLETE" → t('victory.deductionComplete')
- "BLANK PLAYER\nWINS!" → t('victory.blankPlayerWins')
- "THE SPY WAS" → t('victory.theSpyWas')
- "CAUGHT!" → t('victory.caught')
- "VICTORIOUS!" → t('victory.victorious')
- "MISSION COMPLETE" → t('victory.missionComplete')
- "KEYWORDS REVEALED" → t('victory.keywordsRevealed')
- "Civilian Word" → t('victory.civilianWord')
- "Spy Word" → t('victory.spyWord')
- "THE SPIES" → t('victory.theSpies')
- "PLAY AGAIN" → t('victory.playAgain')
- "BACK TO HOME" → t('victory.backToHome')

---

## Update Pattern for Each File

```typescript
// 1. Add imports
import { t } from '../../utils/i18n';
import { useStore } from '../../store';

// 2. Add in component
const MyScreen = () => {
  const language = useStore((state) => state.language);
  
  // 3. Replace all hardcoded strings
  return (
    <View>
      <Text>{t('section.key')}</Text>
    </View>
  );
};
```

## Testing After Updates

1. Start app: `npm start`
2. Change language via selector
3. Navigate through all screens
4. Verify all text changes
5. Test on different devices/sizes

