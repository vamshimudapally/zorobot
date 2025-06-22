import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";



interface AgentFormProps {
    onSuccess?: ()=> void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
};

export const AgentForm = ({
    onSuccess,
    onCancel,
    initialValues,
}: AgentFormProps) => {
    const trpc = useTRPC();
    const queryclient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess:async ()=>{
                await queryclient.invalidateQueries(
                    trpc.agents.getMany.queryOptions(),
                );

                if(initialValues?.id){
                   await queryclient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id: initialValues.id})
                    );
                }
                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }),

    );
    const form = useForm<z.infer<typeof agentsInsertSchema>>({
        resolver: zodResolver(agentsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? "",
        },
    });
    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
        if(isEdit){
            console.log("TODO: updateAgent")
        }else{
            createAgent.mutate(values);
        }
    };

    return(
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar 
                    seed={form.watch("name")}
                    variant="botttsNeutral"
                    className="border size-16"
                />
                <FormField 
                name="name"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="e.g. code expert"/>
                        </FormControl>
                        <FormMessage  />
                    </FormItem>
                )}
                />
                <FormField 
                name="instructions"
                control={form.control}
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Instuctions</FormLabel>
                        <FormControl>
                            <Textarea 
                                {...field} 
                                placeholder="e.g. you are a coding expert that can answer my questions and help with my code"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex justify-between gap-x-2">
                    {onCancel && (
                        <Button 
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={() => onCancel()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button disabled={isPending} type="submit" >
                        {isEdit? "update" : "Create"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}