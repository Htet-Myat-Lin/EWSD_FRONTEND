import { useMemo } from "react";
import { Chip, Link, Checkbox } from "@heroui/react";
import { formatDate } from "@/utils/date";
import { ActionsCell } from "./ActionsCell";

const getStatusColor = (status) =>
  ({
    pending: "warning",
    commented: "primary",
    selected: "success",
    rejected: "danger",
  }[status] || "default");

export const useContributionColumns = ({
  onDropdownAction,
  onCommentClick,
  // Bulk select props
  selectedKeys,
  isAllSelected,
  isIndeterminate,
  toggleAll,
  toggleOne,
  isSelectable,
}) =>
  useMemo(
    () => [
      {
        key: "checkbox",
        label: (
          <Checkbox
            isSelected={isAllSelected}
            isIndeterminate={isIndeterminate}
            onChange={toggleAll}
            aria-label="Select all contributions"
          />
        ),
        align: "center",
        render: (item) => {
          const selectable = isSelectable(item);
          return (
            <Checkbox
              isSelected={selectedKeys.has(item.id)}
              onChange={() => toggleOne(item.id)}
              isDisabled={!selectable}
              aria-label={`Select contribution ${item.title}`}
            />
          );
        },
      },
      {
        key: "title",
        label: "Title",
        render: (item) => item.title || "N/A",
      },
      {
        key: "student",
        label: "Student",
        render: (item) => item.user?.name || "N/A",
      },
      {
        key: "cover_photo",
        label: "Cover Photo",
        render: (item) =>
          item.cover_photo_url ? (
            <img
              src={item.cover_photo_url}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">No image</span>
            </div>
          ),
      },
      {
        key: "category",
        label: "Category",
        render: (item) => item.category?.name || "N/A",
      },
      {
        key: "academic_year",
        label: "Academic Year",
        render: (item) => item.academic_year?.name || "N/A",
      },
      {
        key: "status",
        label: "Status",
        render: (item) => (
          <Chip color={getStatusColor(item.status)} size="sm" variant="flat">
            {item.status}
          </Chip>
        ),
      },
      {
        key: "created_at",
        label: "Submission Date",
        render: (item) => formatDate(item.created_at),
      },
      {
        key: "file",
        label: "File",
        render: (item) =>
          item.file_url ? (
            <Link
              href={item.file_url}
              download
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
              size="sm"
            >
              Download
            </Link>
          ) : (
            <span className="text-gray-400">No file</span>
          ),
      },
      {
        key: "actions",
        label: "Actions",
        align: "center",
        render: (item) => (
          <ActionsCell
            contribution={item}
            onDropdownAction={onDropdownAction}
            onCommentClick={onCommentClick}
          />
        ),
      },
    ],
    [
      selectedKeys,
      isAllSelected,
      isIndeterminate,
      toggleAll,
      toggleOne,
      isSelectable,
      onDropdownAction,
      onCommentClick,
    ]
  );