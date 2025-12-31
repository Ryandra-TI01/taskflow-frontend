import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function TaskEditForm({
  title,
  description,
  dueDate,
  onTitleChange,
  onDescChange,
  onDueDateChange,
  onCancel,
  onSave,
  isSaving,
  onKeyDown = () => { },
}) {
  return (
    <div className="space-y-4 py-2">
      <Input
        value={title}
        onChange={onTitleChange}
        className="font-medium border-transparent hover:border-border focus:border-ring transition-colors"
        placeholder="Task title"
        disabled={isSaving}
        onKeyDown={onKeyDown}
      />
      <Textarea
        value={description}
        onChange={onDescChange}
        className="text-sm border-transparent hover:border-border focus:border-ring transition-colors resize-none min-h-[60px]"
        placeholder="Add description"
        rows={2}
        disabled={isSaving}
        onKeyDown={onKeyDown}
      />

      <div className="flex gap-2">
        <Input
          type="date"
          value={dueDate.date}
          onChange={(e) => onDueDateChange({ ...dueDate, date: e.target.value })}
          onKeyDown={onKeyDown}
          className="w-auto"
        />
        <Input
          type="time"
          value={dueDate.time}
          onChange={(e) => onDueDateChange({ ...dueDate, time: e.target.value })}
          className="w-auto"
          onKeyDown={onKeyDown}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={onCancel} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={!title.trim() || isSaving}
          size="sm"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
