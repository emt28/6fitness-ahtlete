import { pb } from '../pocketbase';
import type { Assessment, CreateAssessmentData } from '@/types/assessment';
import { calculatePerformanceLevel } from '../utils';

export async function getAssessments(athleteId?: string) {
  const filter = athleteId ? `athleteId = "${athleteId}"` : '';
  const records = await pb.collection('assessments').getList(1, 100, {
    filter,
    sort: '-assessedAt',
    expand: 'athleteId,protocolId,assessedBy',
  });
  return records.items as unknown as Assessment[];
}

export async function createAssessment(data: CreateAssessmentData) {
  const protocol = await pb.collection('protocols').getOne(data.protocolId);
  const performanceLevel = calculatePerformanceLevel(data.value, protocol);

  const record = await pb.collection('assessments').create({
    ...data,
    performanceLevel,
    assessedBy: pb.authStore.model?.id,
  });
  return record as unknown as Assessment;
}

export async function getAthleteAssessments(athleteId: string, protocolId?: string) {
  const filter = protocolId 
    ? `athleteId = "${athleteId}" && protocolId = "${protocolId}"`
    : `athleteId = "${athleteId}"`;
    
  const records = await pb.collection('assessments').getList(1, 100, {
    filter,
    sort: '-assessedAt',
    expand: 'protocolId',
  });
  return records.items as unknown as Assessment[];
}