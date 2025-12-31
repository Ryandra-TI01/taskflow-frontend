import { Calendar, Clock } from "lucide-react";
import Loading from "../common/Loading";
import QuickStats from "./QuickStats";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

export default function CalendarSection({
  loading,
  days,
  getTasksForDate,
  isToday,
  isSelected,
  setSelectedDate,
  selectedDate,
  selectedDateTasks,
  taskStatsQuery,
}) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400";
      case "low":
        return "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Grid */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-muted-foreground font-medium py-3 text-sm"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => {
                    const dayTasks = getTasksForDate(day.date);
                    const isCurrentMonth = day.isCurrentMonth;
                    const isTodayDate = isToday(day.date);
                    const isSelectedDate = isSelected(day.date);

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(day.date)}
                        className={cn(
                          "relative p-3 min-h-[100px] rounded-lg cursor-pointer transition-all duration-200 border bg-card",
                          !isCurrentMonth && "opacity-50 bg-muted/50",
                          isTodayDate && "ring-2 ring-primary border-primary",
                          isSelectedDate && !isTodayDate && "ring-2 ring-ring border-ring",
                          "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <div className={cn(
                          "text-sm font-medium mb-2",
                          isCurrentMonth ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {day.date.getDate()}
                        </div>

                        {/* Task indicators */}
                        <div className="space-y-1">
                          {dayTasks.slice(0, 2).map((task) => (
                            <div
                              key={task.id}
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded border truncate font-medium",
                                getPriorityColor(task.priority),
                                task.is_completed && "opacity-50 line-through"
                              )}
                            >
                              {task.title}
                            </div>
                          ))}
                          {dayTasks.length > 2 && (
                            <div className="text-[10px] text-muted-foreground text-center font-medium">
                              +{dayTasks.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tasks Sidebar */}
      <div className="space-y-6">
        {/* Selected Date Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-lg">
                {selectedDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDateTasks.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No tasks for this day</p>
                </div>
              ) : (
                selectedDateTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "p-3 rounded-lg border",
                      getPriorityColor(task.priority),
                      task.is_completed && "opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={cn(
                            "font-medium text-sm",
                            task.is_completed && "line-through"
                          )}
                        >
                          {task.title}
                        </h4>
                        {task.due_date && (
                          <p className="text-xs opacity-75 mt-0.5">
                            {new Date(task.due_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                        {task.priority || 'Normal'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <QuickStats stats={taskStatsQuery.data || {}} />
      </div>
    </div>
  );
}
