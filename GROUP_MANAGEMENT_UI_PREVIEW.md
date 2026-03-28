# Visual UI Preview - Group Management Feature

## Main Screen with Group Buttons

```
╔═══════════════════════════════════════════════════════╗
║  ← BACK          OPERATIVES                    👤     ║
╠═══════════════════════════════════════════════════════╣
║                                                       ║
║  ┌───────────────────┐  ┌───────────────────┐       ║
║  │ 📥 LOAD GROUP    │  │ 💾 SAVE GROUP    │       ║
║  └───────────────────┘  └───────────────────┘       ║
║                                                       ║
║  ┌─────────────────────────────────────────────┐    ║
║  │  Enter operative name...                    │    ║
║  └─────────────────────────────────────────────┘    ║
║                                                       ║
║  ┌────────────────────────────────────────────────┐ ║
║  │          ➕ ADD NEW PLAYER                     │ ║
║  └────────────────────────────────────────────────┘ ║
║                                                       ║
║  ╭─────────────────────────────────────────────────╮ ║
║  │  Active Squad                                   │ ║
║  │  4 PLAYERS TOTAL                                │ ║
║  │                                                 │ ║
║  │  ┌──────────────────────────────────────┐     │ ║
║  │  │  Currently Deployed                   │     │ ║
║  │  │                                        │     │ ║
║  │  │   😀      😎      😃      😐          │     │ ║
║  │  │   Bob    Alice   Charlie  Dave        │     │ ║
║  │  │   ⓧ      ⓧ       ⓧ        ⓧ          │     │ ║
║  │  └──────────────────────────────────────┘     │ ║
║  ╰─────────────────────────────────────────────────╯ ║
║                                                       ║
║  ┌────────────────────────────────────────────────┐ ║
║  │          🚀 CONFIRM SQUAD                      │ ║
║  └────────────────────────────────────────────────┘ ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Save Group Modal

```
╔═══════════════════════════════════════════════════════╗
║                      MODAL OVERLAY                    ║
║  ┌──────────────────────────────────────────────┐    ║
║  │                                           ✕   │    ║
║  │                                               │    ║
║  │              💾                               │    ║
║  │          SAVE GROUP                           │    ║
║  │   Save current players as a group for         │    ║
║  │   quick access later                          │    ║
║  │                                               │    ║
║  │  ┌─────────────────────────────────────┐     │    ║
║  │  │  Group name...                      │     │    ║
║  │  └─────────────────────────────────────┘     │    ║
║  │                                               │    ║
║  │  ╭──────────────────────────────────────╮    │    ║
║  │  │ Players to save:                     │    │    ║
║  │  │ Bob, Alice, Charlie, Dave            │    │    ║
║  │  ╰──────────────────────────────────────╯    │    ║
║  │                                               │    ║
║  │  ┌──────────┐      ┌──────────────────┐     │    ║
║  │  │ CANCEL   │      │ ✓ SAVE           │     │    ║
║  │  └──────────┘      └──────────────────┘     │    ║
║  │                                               │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Load Group Modal (with saved groups)

```
╔═══════════════════════════════════════════════════════╗
║                      MODAL OVERLAY                    ║
║  ┌──────────────────────────────────────────────┐    ║
║  │                                           ✕   │    ║
║  │                                               │    ║
║  │              📂                               │    ║
║  │          LOAD GROUP                           │    ║
║  │   Select a saved group to load                │    ║
║  │                                               │    ║
║  │  ╔════════════════════════════════════════╗  │    ║
║  │  ║ Friday Night Crew            ✏️  🗑️   ║  │    ║
║  │  ║ 5 PLAYERS                               ║  │    ║
║  │  ║ ┌────────────────────────────────────┐ ║  │    ║
║  │  ║ │ Bob, Alice, Charlie, Dave, Eve     │ ║  │    ║
║  │  ║ └────────────────────────────────────┘ ║  │    ║
║  │  ╚════════════════════════════════════════╝  │    ║
║  │                                               │    ║
║  │  ╔════════════════════════════════════════╗  │    ║
║  │  ║ Weekend Warriors            ✏️  🗑️    ║  │    ║
║  │  ║ 4 PLAYERS                               ║  │    ║
║  │  ║ ┌────────────────────────────────────┐ ║  │    ║
║  │  ║ │ John, Jane, Jack, Jill             │ ║  │    ║
║  │  ║ └────────────────────────────────────┘ ║  │    ║
║  │  ╚════════════════════════════════════════╝  │    ║
║  │                                               │    ║
║  │  ╔════════════════════════════════════════╗  │    ║
║  │  ║ Office Squad               ✏️  🗑️     ║  │    ║
║  │  ║ 6 PLAYERS                               ║  │    ║
║  │  ║ ┌────────────────────────────────────┐ ║  │    ║
║  │  ║ │ Tom, Tim, Tina, Tony, Ted, Tara    │ ║  │    ║
║  │  ║ └────────────────────────────────────┘ ║  │    ║
║  │  ╚════════════════════════════════════════╝  │    ║
║  │                                               │    ║
║  │  ┌────────────────────────────────────────┐ │    ║
║  │  │          CLOSE                         │ │    ║
║  │  └────────────────────────────────────────┘ │    ║
║  │                                               │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Load Group Modal (empty state)

```
╔═══════════════════════════════════════════════════════╗
║                      MODAL OVERLAY                    ║
║  ┌──────────────────────────────────────────────┐    ║
║  │                                           ✕   │    ║
║  │                                               │    ║
║  │              📂                               │    ║
║  │          LOAD GROUP                           │    ║
║  │   Select a saved group to load                │    ║
║  │                                               │    ║
║  │  ╭──────────────────────────────────────╮    │    ║
║  │  │                                       │    │    ║
║  │  │           📁                          │    │    ║
║  │  │                                       │    │    ║
║  │  │   No saved groups yet. Save your     │    │    ║
║  │  │   current squad to access it later!  │    │    ║
║  │  │                                       │    │    ║
║  │  ╰──────────────────────────────────────╯    │    ║
║  │                                               │    ║
║  │  ┌────────────────────────────────────────┐ │    ║
║  │  │          CLOSE                         │ │    ║
║  │  └────────────────────────────────────────┘ │    ║
║  │                                               │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Edit Mode (Save Modal)

```
╔═══════════════════════════════════════════════════════╗
║                      MODAL OVERLAY                    ║
║  ┌──────────────────────────────────────────────┐    ║
║  │                                           ✕   │    ║
║  │                                               │    ║
║  │              💾                               │    ║
║  │         UPDATE GROUP                          │    ║
║  │   Update this saved group with current        │    ║
║  │   players                                     │    ║
║  │                                               │    ║
║  │  ┌─────────────────────────────────────┐     │    ║
║  │  │  Friday Night Crew                  │     │    ║
║  │  └─────────────────────────────────────┘     │    ║
║  │                                               │    ║
║  │  ╭──────────────────────────────────────╮    │    ║
║  │  │ Players to save:                     │    │    ║
║  │  │ Bob, Alice, Charlie, Dave, Frank     │    │    ║
║  │  ╰──────────────────────────────────────╯    │    ║
║  │                                               │    ║
║  │  ┌──────────┐      ┌──────────────────┐     │    ║
║  │  │ CANCEL   │      │ ✓ UPDATE         │     │    ║
║  │  └──────────┘      └──────────────────┘     │    ║
║  │                                               │    ║
║  └──────────────────────────────────────────────┘    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```

## Delete Confirmation Alert

```
┌───────────────────────────────────┐
│       Delete Group                │
├───────────────────────────────────┤
│                                   │
│  Are you sure you want to delete  │
│  "Friday Night Crew"?             │
│                                   │
│  ┌──────────┐    ┌──────────┐   │
│  │ Cancel   │    │ Delete   │   │
│  └──────────┘    └──────────┘   │
│                                   │
└───────────────────────────────────┘
```

## Success/Error Alerts

```
┌───────────────────────────────────┐
│          Success                  │
├───────────────────────────────────┤
│                                   │
│  Group saved successfully!        │
│                                   │
│  ┌──────────────────────────┐   │
│  │          OK              │   │
│  └──────────────────────────┘   │
│                                   │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│          Success                  │
├───────────────────────────────────┤
│                                   │
│  Loaded Friday Night Crew         │
│                                   │
│  ┌──────────────────────────┐   │
│  │          OK              │   │
│  └──────────────────────────┘   │
│                                   │
└───────────────────────────────────┘

┌───────────────────────────────────┐
│          Error                    │
├───────────────────────────────────┤
│                                   │
│  Please enter a group name        │
│                                   │
│  ┌──────────────────────────┐   │
│  │          OK              │   │
│  └──────────────────────────┘   │
│                                   │
└───────────────────────────────────┘
```

## Interaction Flow

### Saving Flow
```
1. User adds players: Bob, Alice, Charlie
2. User taps "SAVE GROUP" button
3. Modal opens with input field
4. User types "Friday Night Crew"
5. User taps "SAVE" button
6. Alert: "Group saved successfully!"
7. Modal closes
```

### Loading Flow
```
1. User taps "LOAD GROUP" button
2. Modal opens with list of saved groups
3. User sees "Friday Night Crew"
4. User taps the group card
5. Alert: "Loaded Friday Night Crew"
6. Active Squad now shows: Bob, Alice, Charlie
7. Modal closes
```

### Editing Flow
```
1. User taps "LOAD GROUP" button
2. Modal shows saved groups
3. User taps ✏️ edit icon on "Friday Night Crew"
4. Players load into Active Squad
5. Save modal opens with group name pre-filled
6. Modal title shows "UPDATE GROUP"
7. User adds/removes players
8. User taps "UPDATE" button
9. Alert: "Group updated successfully!"
10. Modals close
```

### Deleting Flow
```
1. User taps "LOAD GROUP" button
2. Modal shows saved groups
3. User taps 🗑️ delete icon on "Friday Night Crew"
4. Confirmation alert appears
5. User taps "Delete" to confirm
6. Alert: "Group deleted"
7. Group removed from list
```

## Color Scheme

- **Load Button**: Light green (#d8f9d9)
- **Save Button**: Primary green (#91f78e)
- **Edit Icon**: Primary green (#91f78e) 
- **Delete Icon**: Error red (#f95630)
- **Modal Background**: Surface (#e0fee1)
- **Cards**: Light green (#d8f9d9)
- **Text**: Dark green (#1b3420)
- **Disabled**: 50% opacity

## Icons Used

- 📥 `download` - Load Group button
- 💾 `save` - Save Group button
- 📂 `folder-open` - Load modal header
- ✏️ `create` - Edit button
- 🗑️ `trash` - Delete button
- ✕ `close` - Close modal button
- ✓ `checkmark-circle` - Save/Update button
- 😀 `emoticon-*` - Player avatars
