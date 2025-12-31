import { CheckSquare, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface TaskSidebarProps {
    className?: string;
    view: "inbox" | "completed";
    setView: (view: "inbox" | "completed") => void;
}

export function TaskSidebar({ className, view, setView }: TaskSidebarProps) {
    return (
        <div className={cn("pb-12 w-64 border-r bg-card hidden md:block", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Filters
                    </h2>
                    <div className="space-y-1">
                        <Button
                            variant={view === "inbox" ? "secondary" : "ghost"}
                            className={cn("w-full justify-start", view === "inbox" && "text-primary")}
                            onClick={() => setView("inbox")}
                        >
                            <CheckSquare className="mr-2 h-4 w-4" />
                            Inbox
                        </Button>
                        <Button
                            variant={view === "completed" ? "secondary" : "ghost"}
                            className={cn("w-full justify-start", view === "completed" && "text-primary")}
                            onClick={() => setView("completed")}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Completed
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
