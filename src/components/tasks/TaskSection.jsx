import { useEffect, useRef } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import CompleteAccordion from "./CompleteAccordian";
import EmptyTask from "./EmptyTask";
import ErrorState from "./ErrorState";
import Loading from "../common/Loading";
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../context/AuthContext";
import { TaskEditProvider } from "../../context/TaskEditContext";

export default function TaskSection({ view }) {
  const { token } = useAuth();
  const {
    incompleteQuery,
    completedQuery,
    addTask,
    updateTask,
    deleteTask,
    taskStatsQuery
  } = useTasks(token);

  const loadMoreRef = useRef();

  const currentQuery = view === 'inbox' ? incompleteQuery : completedQuery;
  const isLoading = currentQuery.isLoading;
  const isError = currentQuery.isError;
  const errorMsg = currentQuery.error?.message;

  const incompleteTasks = incompleteQuery.data?.pages.flatMap((page) => page.data) || [];
  const completedTasks = completedQuery.data?.pages.flatMap((page) => page.data) || [];

  const tasksToDisplay = view === 'inbox' ? incompleteTasks : completedTasks;

  // Infinite Scroll logic
  useEffect(() => {
    if (!loadMoreRef.current || !currentQuery.hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          currentQuery.fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [currentQuery, view]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorState
        message={errorMsg}
        onRetry={() => currentQuery.refetch()}
      />
    );

  return (
    <TaskEditProvider>
      <div className="max-w-2xl mx-auto min-h-screen space-y-6">
        {view === 'inbox' && (
          <TaskForm onAdded={(task) => addTask.mutate(task)} />
        )}

        {tasksToDisplay.length === 0 ? (
          <EmptyTask message={view === 'completed' ? "No completed tasks yet" : "All tasks are done!"} />
        ) : (
          <div className="space-y-4">
            <TaskList
              tasks={tasksToDisplay}
              onUpdate={(task) => updateTask.mutate(task)}
              onDelete={(id) => deleteTask.mutate(id)}
            />

            {/* Load more indicator */}
            <div ref={loadMoreRef} className="h-6 flex justify-center">
              {currentQuery.isFetchingNextPage && <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />}
            </div>
          </div>
        )}
      </div>
    </TaskEditProvider>
  );
}
