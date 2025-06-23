import { ResponsiveDialog } from '@/components/responsive-dialog'

import React from 'react'
import { AgentForm } from './agent-form';
import { AgentGetOne } from '../../types';

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}


export const UpdateAgentDialog = ({
    open,
    onOpenChange,
    initialValues,
} : UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog 
        title='Edit Agent'
        description='Edit a new Agent'
        open = {open}
        onOpenChange={onOpenChange}
    >
        <AgentForm 
        onSuccess={() => onOpenChange(false)}
        onCancel= {() => onOpenChange(false)}
        initialValues={initialValues}
        />
    </ResponsiveDialog>
  );
};

