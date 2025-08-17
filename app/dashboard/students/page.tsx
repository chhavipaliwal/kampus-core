import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query';
import { getAllStudent } from '@/api/students';
import Students from '@/components/dashboard/students';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await getAllStudent();
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    },
    initialData: []
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Students />
    </HydrationBoundary>
  );
}
