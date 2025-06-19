import { CommandDialog, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import React, { Dispatch, SetStateAction } from 'react'

interface Props  {
    open : boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({open , setOpen}: Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}  >
        <CommandInput 
        placeholder='Find a Meeting or agent'
        />
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
    </CommandDialog>
  );
};
