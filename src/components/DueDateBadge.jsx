import { format, differenceInDays, isPast } from 'date-fns';
import { Clock, CheckCircle, AlertTriangle, Lock } from 'lucide-react';

export default function DueDateBadge({ dueDate, submitted = false, locked = false, showFull = false }) {
  if (locked) return <span className="badge badge-locked"><Lock size={10} /> Locked</span>;
  if (submitted) return <span className="badge badge-success"><CheckCircle size={10} /> Submitted</span>;
  if (!dueDate) return null;

  const today = new Date();
  const days = differenceInDays(new Date(dueDate), today);
  const overdue = isPast(new Date(dueDate));

  if (overdue) {
    return (
      <span className="badge badge-danger">
        <AlertTriangle size={10} />
        {showFull ? `Overdue · Due ${format(new Date(dueDate), 'MMM d')}` : `${Math.abs(days)}d overdue`}
      </span>
    );
  }

  if (days <= 3) {
    return (
      <span className="badge badge-warning">
        <Clock size={10} />
        {showFull ? `Due ${format(new Date(dueDate), 'MMM d')}` : days === 0 ? 'Due today' : `${days}d left`}
      </span>
    );
  }

  return (
    <span className="badge badge-muted">
      <Clock size={10} />
      {showFull ? `Due ${format(new Date(dueDate), 'MMM d, yyyy')}` : `${days}d left`}
    </span>
  );
}
