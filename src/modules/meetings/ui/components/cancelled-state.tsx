import { EmptyState } from "@/components/empty-state"



export const CancelledState = () => {
    return (
        <div className="bg-white rounded px-4 py-5 flex flex-col gap-y-8 items-center">
            <EmptyState 
            image="/cancelled.svg"
            title="Meeting is cancelled"
            description="This meeting was cancelled"
            />
        </div>
    )
}