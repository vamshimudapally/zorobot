"use client"
import React from 'react'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/Error-state';
import { DataTable } from '@/components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';

export const MeetingsView = () => {

    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className='flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <DataTable data={data.items} columns={columns} />
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