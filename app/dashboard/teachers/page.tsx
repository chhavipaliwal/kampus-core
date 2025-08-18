import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query';
import { getAllTeachers } from '@/services/api/teachers';
import Teachers from '@/components/dashboard/teachers';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await getAllTeachers();
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    },
    initialData: []
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Teachers />
    </HydrationBoundary>
  );
}
