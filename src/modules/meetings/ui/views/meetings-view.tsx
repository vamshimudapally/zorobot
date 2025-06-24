"use client"
import React from 'react'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/Error-state';

export const MeetingsView = () => {

    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
        {JSON.stringify(data)}
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