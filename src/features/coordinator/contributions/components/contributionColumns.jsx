import { Chip, Link } from "@heroui/react";
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
}) => [
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
      <Chip
        color={getStatusColor(item.status)}
        size="sm"
        variant="flat"
      >
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
    render: (item) => (
      <ActionsCell
        contribution={item}
        onDropdownAction={onDropdownAction}
        onCommentClick={onCommentClick}
      />
    ),
  },
];