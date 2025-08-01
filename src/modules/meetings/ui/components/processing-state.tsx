import { EmptyState } from "@/components/empty-state"



export const ProcessingState = () => {
    return (
        <div className="bg-white rounded px-4 py-5 flex flex-col gap-y-8 items-center">
            <EmptyState 
            image="/processing.svg"

            title="Meeting Completed"

            description="This meeting was completed, a summary will appear soon"
            />
        </div>
    )
}