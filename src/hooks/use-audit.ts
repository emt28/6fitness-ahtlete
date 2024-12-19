import { useQuery } from '@tanstack/react-query';
import { pb } from '@/lib/pocketbase';

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  details: string;
  timestamp: string;
}

export function useAuditLogs() {
  return useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const response = await pb.collection('audit_logs').getList(1, 100, {
        sort: '-timestamp',
      });
      return response.items as AuditLog[];
    },
  });
}