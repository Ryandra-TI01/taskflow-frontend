import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { useTaskForm } from "../../hooks/useTaskForm";
import { cn } from "../../lib/utils";

export default function TaskForm({ onAdded }) {
  const {
    state: {
      title,
      setTitle,
      description,
      setDescription,
      dueDate,
      setDueDate,
      isExpanded,
      setIsExpanded,
      isFocused,
      setIsFocused,
      loading,
      titleInputRef,
      formRef,
    },
    handlers: { handleKeyDown, onSubmit, resetForm },
  } = useTaskForm({ onAdded });

  return (
    <Card
      ref={formRef}
      className={cn(
        "transition-all duration-300 border-transparent shadow-none hover:shadow-md hover:border-border",
        (isExpanded || isFocused) && "shadow-lg border-border"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 mt-1">
            <Plus
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-300 cursor-pointer",
                isExpanded && "rotate-45"
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>

          <div className="flex-1 space-y-4">
            <Input
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => {
                setIsExpanded(true);
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Add new task"
              className="border-none shadow-none focus-visible:ring-0 px-0 text-base font-medium placeholder:font-normal"
              disabled={loading}
            />

            <div
              className={cn(
                "overflow-hidden transition-all duration-300 space-y-4",
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add description"
                className="resize-none border-none focus-visible:ring-0 px-0 min-h-[60px]"
                rows={2}
                disabled={loading}
              />

              <div className="flex gap-4">
                <Input
                  type="date"
                  value={dueDate.date}
                  onChange={(e) =>
                    setDueDate({ ...dueDate, date: e.target.value })
                  }
                  className="w-auto"
                />
                <Input
                  type="time"
                  value={dueDate.time}
                  onChange={(e) =>
                    setDueDate({ ...dueDate, time: e.target.value })
                  }
                  className="w-auto"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  onClick={resetForm}
                  variant="ghost"
                  disabled={loading}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      await onSubmit();
                      toast.success("Task added successfully!");
                    } catch (err) {
                      console.error("Error adding task", err);
                      toast.error("Failed to add task.");
                    }
                  }}
                  disabled={!title.trim() || loading}
                >
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
