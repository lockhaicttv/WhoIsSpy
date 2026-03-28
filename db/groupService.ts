import { eq } from 'drizzle-orm';
import db from './index';
import { groups, groupMembers, Group, NewGroup, GroupMember } from './schema';

export interface GroupWithMembers extends Group {
  members: GroupMember[];
}

// Create a new group with members
export const createGroup = async (name: string, playerNames: string[]): Promise<number> => {
  try {
    // Insert group
    const result = db
      .insert(groups)
      .values({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ id: groups.id })
      .get();

    const groupId = result.id;

    // Insert group members
    if (playerNames.length > 0) {
      const members = playerNames.map((playerName, index) => ({
        groupId,
        name: playerName,
        order: index,
      }));

      db.insert(groupMembers).values(members).run();
    }

    return groupId;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Get all groups with their members
export const getAllGroups = (): GroupWithMembers[] => {
  try {
    const allGroups = db.select().from(groups).all();
    
    return allGroups.map(group => {
      const members = db
        .select()
        .from(groupMembers)
        .where(eq(groupMembers.groupId, group.id))
        .orderBy(groupMembers.order)
        .all();
      
      return {
        ...group,
        members,
      };
    });
  } catch (error) {
    console.error('Error getting all groups:', error);
    return [];
  }
};

// Get a single group by ID with members
export const getGroupById = (id: number): GroupWithMembers | null => {
  try {
    const group = db.select().from(groups).where(eq(groups.id, id)).get();
    
    if (!group) return null;

    const members = db
      .select()
      .from(groupMembers)
      .where(eq(groupMembers.groupId, id))
      .orderBy(groupMembers.order)
      .all();
    
    return {
      ...group,
      members,
    };
  } catch (error) {
    console.error('Error getting group by ID:', error);
    return null;
  }
};

// Update a group
export const updateGroup = async (
  id: number,
  name: string,
  playerNames: string[]
): Promise<void> => {
  try {
    // Update group
    db
      .update(groups)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(eq(groups.id, id))
      .run();

    // Delete existing members
    db.delete(groupMembers).where(eq(groupMembers.groupId, id)).run();

    // Insert new members
    if (playerNames.length > 0) {
      const members = playerNames.map((playerName, index) => ({
        groupId: id,
        name: playerName,
        order: index,
      }));

      db.insert(groupMembers).values(members).run();
    }
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

// Delete a group (cascades to members)
export const deleteGroup = (id: number): void => {
  try {
    db.delete(groups).where(eq(groups.id, id)).run();
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};
