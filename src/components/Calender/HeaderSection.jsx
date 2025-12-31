import { ChevronLeft, ChevronRight, Calendar, Plus } from "lucide-react";
import ModalTaskForm from "./ModalTaskForm";
import { useModal } from "../../context/ModalProvider";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function HeaderSection({ navigateMonth, currentDate, viewMode, setViewMode }) {
  const { openModal } = useModal();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Calendar
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage your tasks efficiently
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => openModal(<ModalTaskForm />)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>

            <div className="flex bg-muted rounded-md p-1">
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("month")}
                className="h-8"
              >
                Month
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
                className="h-8"
              >
                Week
              </Button>
            </div>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth(1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
