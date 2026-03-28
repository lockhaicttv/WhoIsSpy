# Group Management Architecture

## Component Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   ManageGroupsScreen.tsx                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  UI Layer                                              │ │
│  │  - Load Group Button                                   │ │
│  │  - Save Group Button                                   │ │
│  │  - Add Player Input                                    │ │
│  │  - Active Squad Display                                │ │
│  │  - Save Modal (create/update)                          │ │
│  │  - Load Modal (with edit/delete)                       │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↕                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  State Management (Zustand)                            │ │
│  │  - players: Player[]                                   │ │
│  │  - addPlayer()                                         │ │
│  │  - removePlayer()                                      │ │
│  │  - setPlayers()                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   db/groupService.ts                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Service Layer                                         │ │
│  │  - createGroup()                                       │ │
│  │  - getAllGroups()                                      │ │
│  │  - getGroupById()                                      │ │
│  │  - updateGroup()                                       │ │
│  │  - deleteGroup()                                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                       db/index.ts                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Drizzle ORM Instance                                  │ │
│  │  - db (drizzle instance)                               │ │
│  │  - initDatabase()                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      db/schema.ts                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Database Schema                                       │ │
│  │  - groups table                                        │ │
│  │  - groupMembers table                                  │ │
│  │  - TypeScript types                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    SQLite Database                           │
│                    (whoisspy.db)                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Persistent Storage                                    │ │
│  │  - groups                                              │ │
│  │  - group_members                                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### Saving a Group
```
User clicks "Save Group"
    ↓
Modal opens with group name input
    ↓
User enters name "Friday Night Crew"
    ↓
handleSaveGroup() called
    ↓
createGroup(name, playerNames) in groupService
    ↓
Drizzle ORM inserts into groups table
    ↓
Drizzle ORM inserts members into group_members table
    ↓
Success alert shown
    ↓
loadGroups() refreshes saved groups list
```

### Loading a Group
```
User clicks "Load Group"
    ↓
Modal opens showing all saved groups
    ↓
getAllGroups() fetches from database
    ↓
User taps "Friday Night Crew"
    ↓
handleLoadGroup(group) called
    ↓
Group members converted to Player objects
    ↓
setPlayers() updates Zustand store
    ↓
UI updates with loaded players
    ↓
Success alert shown
    ↓
Modal closes
```

### Editing a Group
```
User clicks "Load Group"
    ↓
User taps edit icon on "Friday Night Crew"
    ↓
handleEditGroup(group) called
    ↓
editingGroupId set to group.id
    ↓
groupName pre-filled with "Friday Night Crew"
    ↓
Group members loaded into current players
    ↓
Save modal opens in edit mode
    ↓
User modifies players
    ↓
User clicks "Update"
    ↓
updateGroup() called with group.id
    ↓
Database updated
    ↓
Success alert "Group updated successfully!"
```

### Deleting a Group
```
User clicks "Load Group"
    ↓
User taps delete icon on "Friday Night Crew"
    ↓
Confirmation alert appears
    ↓
User confirms deletion
    ↓
deleteGroup(group.id) called
    ↓
Drizzle ORM deletes from groups table
    ↓
Foreign key cascade deletes group_members
    ↓
loadGroups() refreshes list
    ↓
Success alert shown
```

## Database Relations

```
┌─────────────────────┐
│      groups         │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ created_at          │
│ updated_at          │
└─────────────────────┘
          │
          │ 1:N
          │
          ↓
┌─────────────────────┐
│   group_members     │
├─────────────────────┤
│ id (PK)             │
│ group_id (FK)       │  ← References groups.id
│ name                │
│ order               │
└─────────────────────┘
```

## Key Technologies

- **Drizzle ORM**: Type-safe database queries
- **expo-sqlite**: SQLite implementation for React Native
- **Zustand**: State management for current players
- **TypeScript**: Full type safety throughout

## Design Pattern

This implementation follows a **layered architecture**:

1. **Presentation Layer**: React components and UI
2. **State Management**: Zustand store for runtime state
3. **Service Layer**: groupService.ts for business logic
4. **Data Access Layer**: Drizzle ORM for database operations
5. **Persistence Layer**: SQLite database for storage

This separation ensures:
- Clean code organization
- Easy testing
- Scalability
- Type safety
- Maintainability
