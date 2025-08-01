"use client"
import React from 'react'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/Error-state';
import { DataTable } from '@/components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';
import { useRouter } from 'next/navigation';
import { UseMeetingsFilters } from '../../hooks/use-meetings-filters';
import { DataPagination } from '@/components/data-pagination';

export const MeetingsView = () => {

    const trpc = useTRPC();
    const router = useRouter();
    const [filters , setFilters] = UseMeetingsFilters();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }));

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <DataTable 
            data={data.items} 
            columns={columns} 
            onRowClick={(row) => router.push(`/meetings/${row.id}` )} />
        <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
        />
        {data.items.length === 0 && (
            <EmptyState 
                title="Create your first meeting"
                description="Schedule a meeting to connect with others. Each meeting lets you collabrate, share ideas, and interact with participants in real time"
                />
        )}
        {/* {JSON.stringify(data)} */}
    </div>
  );
};

export const MeetingsViewLoading = () => {
    return(
        <LoadingState 
        title="Loading Meetings"
        description="This may take some time"
        
        />
    );
}

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title='Error Loading Meetings'
            description='Something went wrong'
            />
    )
}