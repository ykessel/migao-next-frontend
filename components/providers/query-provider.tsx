'use client';

import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { queryClient } from '@/lib/query-client';

export function QueryProvider({ children, dehydratedState }: { children: ReactNode, dehydratedState?: unknown }) {
  const [client] = useState(() => queryClient());
  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
