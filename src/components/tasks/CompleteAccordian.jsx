import { useState } from "react";
import { ChevronRight } from "lucide-react";
import TaskList from "./TaskList";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export default function CompleteAccordian({
  tasks,
  hasMore,
  onLoadMore,
  onUpdate,
  onDelete,
  tasksLength = tasks.length,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-t pt-4 mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full h-auto py-2 px-3 hover:bg-muted/50"
      >
        <span className="text-sm font-medium text-muted-foreground">
          Completed ({tasksLength})
        </span>
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "rotate-90"
          )}
        />
      </Button>

      {isExpanded && (
        <div className="mt-2 space-y-2 animate-accordion-down">
          <TaskList
            tasks={tasks}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          {hasMore && (
            <Button
              variant="link"
              onClick={onLoadMore}
              className="text-xs h-auto p-0 text-primary"
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
