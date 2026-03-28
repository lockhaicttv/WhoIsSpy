# Group Management Feature - Quick Start Guide

## 🎯 What's New?

The Manage Groups screen now supports **saving and loading player groups** using a local SQLite database. Never type the same player names again!

## 🚀 Quick Start

### Saving a Group
1. Add players to your squad
2. Tap **"Save Group"** button
3. Enter a group name (e.g., "Friday Night Crew")
4. Tap **"Save"**
5. ✅ Done! Your group is saved locally

### Loading a Group
1. Tap **"Load Group"** button
2. Select a group from the list
3. ✅ Players automatically load into your squad

### Editing a Group
1. Tap **"Load Group"** button
2. Tap the **pencil icon** on the group you want to edit
3. Modify the players
4. Tap **"Save Group"**
5. Tap **"Update"**

### Deleting a Group
1. Tap **"Load Group"** button
2. Tap the **trash icon** on the group you want to delete
3. Confirm deletion
4. ✅ Group removed permanently

## 📦 Installation & Setup

The feature is **ready to use**! The database is automatically initialized when the app starts.

### Dependencies Added
```json
{
  "drizzle-orm": "latest",
  "expo-sqlite": "latest",
  "@op-engineering/op-sqlite": "latest",
  "drizzle-kit": "latest"
}
```

Already installed via: `npm install`

## 📁 Files Changed/Added

### New Files
- `db/schema.ts` - Database table definitions
- `db/index.ts` - Database initialization
- `db/groupService.ts` - CRUD operations for groups
- `GROUP_MANAGEMENT_FEATURE.md` - Detailed documentation
- `GROUP_MANAGEMENT_ARCHITECTURE.md` - Architecture diagrams

### Modified Files
- `app/_layout.tsx` - Added database initialization
- `screens/Setup/ManageGroupsScreen.tsx` - Added group management UI
- `package.json` - Added new dependencies

## 🎨 UI Components Added

### 1. Group Management Buttons
```
┌────────────────────┬────────────────────┐
│  📥 LOAD GROUP    │  💾 SAVE GROUP    │
└────────────────────┴────────────────────┘
```

### 2. Save Modal
- Group name input
- Preview of players to save
- Save/Cancel buttons
- Support for create & update

### 3. Load Modal
- Scrollable list of saved groups
- Shows player count and names
- Edit (✏️) and Delete (🗑️) buttons
- Empty state message

## 🗄️ Database Schema

```sql
-- Groups
CREATE TABLE groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Group Members
CREATE TABLE group_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);
```

## 💡 Usage Tips

1. **Quick Access**: Save your regular gaming groups for instant loading
2. **Multiple Groups**: Create separate groups for different occasions
3. **Edit Anytime**: Update group members without creating new groups
4. **No Limit**: Save as many groups as you want
5. **Offline**: All data stored locally, no internet needed

## 🧪 Testing Checklist

- [x] Save a group with 3+ players
- [x] Load a saved group
- [x] Edit an existing group
- [x] Delete a group
- [x] Handle empty groups list
- [x] Validate group name input
- [x] Test app restart (persistence)

## 🐛 Troubleshooting

### Groups not saving?
- Check that you have players in your squad
- Ensure you entered a group name
- Check console for database errors

### Groups not loading?
- Verify groups exist in the load modal
- Check database initialization in console
- Try restarting the app

### Delete not working?
- Confirm the deletion in the alert dialog
- Check database permissions

## 📱 Screenshots

### Before
```
┌─────────────────────────────────┐
│  OPERATIVES                     │
├─────────────────────────────────┤
│                                 │
│  [Enter operative name...]      │
│  [ADD NEW PLAYER]               │
│                                 │
│  Active Squad                   │
│  - Player 1                     │
│  - Player 2                     │
│  - Player 3                     │
│                                 │
│  [CONFIRM SQUAD]                │
└─────────────────────────────────┘
```

### After (with Group Management)
```
┌─────────────────────────────────┐
│  OPERATIVES                     │
├─────────────────────────────────┤
│  [LOAD GROUP] [SAVE GROUP] ← NEW│
│                                 │
│  [Enter operative name...]      │
│  [ADD NEW PLAYER]               │
│                                 │
│  Active Squad                   │
│  - Player 1                     │
│  - Player 2                     │
│  - Player 3                     │
│                                 │
│  [CONFIRM SQUAD]                │
└─────────────────────────────────┘
```

## 🎯 Future Enhancements (Optional)

- [ ] Search groups by name
- [ ] Sort by date/name/player count
- [ ] Duplicate group functionality
- [ ] Export/import as JSON
- [ ] Group categories/tags
- [ ] Recently used groups
- [ ] Auto-save current session

## 📚 Additional Resources

- See `GROUP_MANAGEMENT_FEATURE.md` for detailed implementation
- See `GROUP_MANAGEMENT_ARCHITECTURE.md` for architecture diagrams
- Drizzle ORM Docs: https://orm.drizzle.team/
- Expo SQLite Docs: https://docs.expo.dev/versions/latest/sdk/sqlite/

## ✅ Ready to Play!

The feature is **production-ready** and follows the existing design system. Start saving your groups and enjoy faster game setup! 🎮🕵️
