import { ReactElement, useState } from "react";
import TaskSection from "../components/tasks/TaskSection";
import { TaskSidebar } from "../components/tasks/TaskSidebar";
import { TaskEditProvider } from "../context/TaskEditContext";

export default function TaskPage(): ReactElement {
  const [view, setView] = useState<"inbox" | "completed">("inbox");

  return (
    <TaskEditProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <TaskSidebar view={view} setView={setView} />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 px-4 py-8 md:px-8 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {view === "inbox" ? "Inbox" : "Completed Tasks"}
                </h1>
                <p className="text-muted-foreground">
                  {view === "inbox"
                    ? "Stay organized and manage your daily tasks."
                    : "Review your completed accomplishments."}
                </p>
              </div>
            </div>
            <TaskSection view={view} />
          </div>
        </div>
      </div>
    </TaskEditProvider>
  );
}
