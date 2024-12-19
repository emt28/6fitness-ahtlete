import { pb } from '../pocketbase';
import type { DevelopmentGoal, CreateGoalData, GoalNote, CreateGoalNoteData } from '@/types/development';

export async function getGoals(athleteId: string) {
  const records = await pb.collection('goals').getList(1, 50, {
    filter: `athleteId = "${athleteId}"`,
    sort: '-created',
    expand: 'protocolId,assignedTo',
  });
  return records.items as unknown as DevelopmentGoal[];
}

export async function createGoal(data: CreateGoalData & { athleteId: string }) {
  const record = await pb.collection('goals').create({
    ...data,
    createdBy: pb.authStore.model?.id,
  });
  return record as unknown as DevelopmentGoal;
}

export async function addGoalNote(goalId: string, data: CreateGoalNoteData) {
  const record = await pb.collection('goal_notes').create({
    goalId,
    ...data,
    createdBy: pb.authStore.model?.id,
  });
  return record as unknown as GoalNote;
}