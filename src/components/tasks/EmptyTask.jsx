import completeTask from "../../assets/illustrations/complete-task.svg";
export default function EmptyTask({ message = "All tasks are done!" }) {
  return (
    <div className="text-center py-8">
      <img
        src={completeTask}
        alt="Task Completed"
        className="w-56 h-auto mx-auto mb-3 mt-14 opacity-80"
      />
      <p className="text-muted-foreground mt-8 text-lg font-medium">{message}</p>
    </div>
  );
}
