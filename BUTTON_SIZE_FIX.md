# Button Size Fix - Modal Buttons Update

## Issue
The buttons in the Save Group modal had text that was too large (text-2xl / 24px) and was overflowing, making the modal look cramped and unprofessional.

## Solution
Added a `size` prop to the Button component to support three different sizes:
- **small**: py-3 px-6, text-sm (14px), icon 20px
- **medium**: py-4 px-8, text-lg (18px), icon 24px  
- **large** (default): py-6 px-12, text-2xl (24px), icon 32px

## Changes Made

### 1. `components/Button/Button.tsx`
- Added `size?: 'small' | 'medium' | 'large'` prop to ButtonProps interface
- Default size is 'large' to maintain backward compatibility
- Created `getSizeStyles()` function that returns appropriate styles for each size:
  - padding: Different padding for each size
  - iconSize: Scaled icon sizes (20px, 24px, 32px)
  - textSize: Tailwind classes (text-sm, text-lg, text-2xl)
  - borderWidth: Scaled border width (3px, 3px, 4px)
  - gap: Scaled gap between icon and text (gap-2, gap-3, gap-4)

### 2. `screens/Setup/ManageGroupsScreen.tsx`
Updated all modal buttons to use `size="small"`:
- Save modal "Cancel" button
- Save modal "Save"/"Update" button  
- Load modal "Close" button

## Before vs After

### Before (text-2xl)
```
┌──────────────────────────┬──────────────────────────┐
│ CANCEL (overflows)       │ ✓ SAVE (overflows)      │
└──────────────────────────┴──────────────────────────┘
```

### After (text-sm)
```
┌───────────────┬───────────────┐
│ CANCEL        │ ✓ SAVE        │
└───────────────┴───────────────┘
```

## Button Size Comparison

### Small (text-sm)
- Font Size: 14px
- Padding: 12px vertical, 24px horizontal
- Icon: 20px
- Border: 3px bottom
- Use Case: Modals, inline actions, compact UIs

### Medium (text-lg)
- Font Size: 18px
- Padding: 16px vertical, 32px horizontal
- Icon: 24px
- Border: 3px bottom
- Use Case: Secondary actions, cards

### Large (text-2xl) - Default
- Font Size: 24px
- Padding: 24px vertical, 48px horizontal
- Icon: 32px
- Border: 4px bottom
- Use Case: Primary CTAs, main screen actions

## Backward Compatibility

All existing buttons continue to work without changes since `size="large"` is the default. No breaking changes.

## Files Modified
- `components/Button/Button.tsx` - Added size prop and logic
- `screens/Setup/ManageGroupsScreen.tsx` - Applied size="small" to modal buttons

## Testing Recommendations
- [x] Save modal buttons fit properly
- [x] Load modal button fits properly
- [x] Text is readable at small size
- [x] Icons scale proportionally
- [x] Button press animation works correctly
- [x] Existing large buttons still work
- [ ] Test on different screen sizes
- [ ] Test with very long button labels

## Usage Examples

```tsx
// Small button for modals
<Button 
  label="Cancel" 
  variant="secondary" 
  size="small"
  onPress={handleCancel}
/>

// Medium button for cards
<Button 
  label="Learn More" 
  variant="tertiary" 
  size="medium"
  onPress={handleLearnMore}
/>

// Large button for main actions (default)
<Button 
  label="Start Mission" 
  variant="primary"
  onPress={handleStart}
/>
```

## Visual Comparison

### Modal with Small Buttons
```
╔═══════════════════════════════════╗
║          SAVE GROUP               ║
╠═══════════════════════════════════╣
║                                   ║
║  [Group name input...]            ║
║                                   ║
║  ┌────────┐    ┌────────────┐    ║
║  │ CANCEL │    │ ✓ SAVE     │    ║ ← Perfect fit!
║  └────────┘    └────────────┘    ║
║                                   ║
╚═══════════════════════════════════╝
```

## Benefits
1. **Better UX**: Buttons fit properly in modals
2. **Flexible**: Three sizes for different contexts
3. **Consistent**: Same button component across app
4. **Scalable**: Easy to add more sizes if needed
5. **Type-safe**: TypeScript ensures valid sizes

## Note
This fix improves the UI/UX of the group management modals without affecting any other parts of the application.
