import { pb } from '../pocketbase';
import type { CoachNote } from '@/types/note';

export async function getCoachNotes(athleteId: string) {
  const records = await pb.collection('coach_notes').getList(1, 50, {
    filter: `athleteId = "${athleteId}"`,
    sort: '-created',
    expand: 'createdBy',
  });
  return records.items as unknown as CoachNote[];
}

export async function createCoachNote(athleteId: string, data: {
  content: string;
  type: CoachNote['type'];
  visibility: CoachNote['visibility'];
}) {
  const record = await pb.collection('coach_notes').create({
    athleteId,
    ...data,
    createdBy: pb.authStore.model?.id,
  });
  return record as unknown as CoachNote;
}