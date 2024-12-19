import { pb } from '../pocketbase';
import type { Athlete, CreateAthleteData } from '@/types/athlete';

export async function getAthletes() {
  const records = await pb.collection('athletes').getList(1, 50, {
    sort: 'name',
    expand: 'createdBy',
  });
  return records.items as unknown as Athlete[];
}

export async function createAthlete(data: CreateAthleteData) {
  const record = await pb.collection('athletes').create({
    ...data,
    createdBy: pb.authStore.model?.id,
  });
  return record as unknown as Athlete;
}

export async function updateAthlete(id: string, data: Partial<CreateAthleteData>) {
  const record = await pb.collection('athletes').update(id, {
    ...data,
    updated: new Date().toISOString(),
  });
  return record as unknown as Athlete;
}

export async function deleteAthlete(id: string) {
  await pb.collection('athletes').delete(id);
}