import { Button, Chip } from "@heroui/react";
import { LuCheck, LuX } from "react-icons/lu";

export const BulkActionsBar = ({ count, onBulkSelect, onBulkReject, onClear }) => {
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-primary-50 border border-primary-200 rounded-lg transition-all duration-200">
      <Chip size="sm" color="primary" variant="flat">
        {count} selected
      </Chip>

      <div className="h-4 w-px bg-primary-200" />

      <Button
        size="sm"
        color="success"
        variant="flat"
        startContent={<LuCheck size={14} />}
        onPress={onBulkSelect}
      >
        Select All
      </Button>

      <Button
        size="sm"
        color="danger"
        variant="flat"
        startContent={<LuX size={14} />}
        onPress={onBulkReject}
      >
        Reject All
      </Button>

      <Button
        size="sm"
        variant="light"
        startContent={<LuX size={14} />}
        onPress={onClear}
        className="ml-auto text-gray-500"
      >
        Clear Selection
      </Button>
    </div>
  );
};