import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Card,
  CardBody,
  Link,
  Chip,
  Select,
  SelectItem,
  Pagination,
  Button,
} from "@heroui/react";
import { useContributions } from "../hooks/useContributions";
import { formatDate } from "@/utils/date";

const columns = [
  { key: "title", label: "Title" },
  { key: "student", label: "Student" },
  { key: "category", label: "Category" },
  { key: "academic_year", label: "Academic Year" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Submission Date" },
  { key: "file", label: "File" },
  { key: "actions", label: "Actions" },
];

const getStatusColor = (status) => {
  const statusColors = {
    pending: "warning",
    commented: "primary",
    selected: "success",
    rejected: "danger",
  };
  return statusColors[status] || "default";
};

const renderCell = (contribution, columnKey, onSelect, onReject) => {
  switch (columnKey) {
    case "title":
      return contribution.title || "N/A";
    case "student":
      return contribution.user?.name || "N/A";
    case "category":
      return contribution.category?.name || "N/A";
    case "academic_year":
      return contribution.academic_year?.name || "N/A";
    case "status":
      return (
        <Chip color={getStatusColor(contribution.status)} size="sm" variant="flat">
          {contribution.status}
        </Chip>
      );
    case "created_at":
      return formatDate(contribution.created_at);
    case "file":
      return contribution.file_url ? (
        <Link
          href={contribution.file_url}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          underline="hover"
        >
          Download
        </Link>
      ) : (
        <span className="text-gray-400">No file</span>
      );
    case "actions":
      return (
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            color="success"
            variant="flat"
            onPress={() => onSelect(contribution.id)}
            isDisabled={contribution.status === "selected" || contribution.status === "rejected"}
          >
            Select
          </Button>
          <Button
            size="sm"
            color="danger"
            variant="flat"
            onPress={() => onReject(contribution.id)}
            isDisabled={contribution.status === "selected" || contribution.status === "rejected"}
          >
            Reject
          </Button>
        </div>
      );
    default:
      return contribution[columnKey];
  }
};

const statusOptions = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "commented", label: "Commented" },
  { key: "selected", label: "Selected" },
  { key: "rejected", label: "Rejected" },
];

export const ContributionsList = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Pass status to API, converting "all" to null
  const statusParam = statusFilter === "all" ? null : statusFilter;
  const { data, isLoading, isError, error } = useContributions(page, statusParam);

  const handleSelect = (contributionId) => {
    console.log("Select contribution:", contributionId);
    // TODO: Implement select logic
  };

  const handleReject = (contributionId) => {
    console.log("Reject contribution:", contributionId);
    // TODO: Implement reject logic
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner label="Loading contributions..." size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="m-6">
        <CardBody>
          <div className="text-center text-danger">
            <p className="text-lg font-semibold mb-2">Error loading contributions</p>
            <p className="text-sm">{error?.message || "An unexpected error occurred"}</p>
          </div>
        </CardBody>
      </Card>
    );
  }

  const contributions = data?.data ?? [];
  const currentPage = data?.meta?.current_page ?? 1;
  const lastPage = data?.meta?.last_page ?? 1;
  const total = data?.meta?.total ?? 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contributions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review student contributions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select
            label="Filter by Status"
            placeholder="Select status"
            selectedKeys={[statusFilter]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setStatusFilter(selected);
              setPage(1);
            }}
            className="w-48"
            size="sm"
            variant="bordered"
            aria-label="Filter contributions by status"
          >
            {statusOptions.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{contributions.length}</span> of{" "}
          <span className="font-semibold text-gray-900">{total}</span> contribution{total !== 1 ? 's' : ''}
        </div>
        {statusFilter !== "all" && (
          <Chip size="sm" variant="flat" color="primary">
            Filtered by: {statusOptions.find(opt => opt.key === statusFilter)?.label}
          </Chip>
        )}
      </div>
      
      {/* Table */}
      <Card>
        <CardBody className="p-0">
          <Table 
            aria-label="Contributions list table" 
            isStriped
            removeWrapper
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              items={contributions}
              emptyContent="No contributions found."
            >
              {(contribution) => (
                <TableRow key={contribution.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell(contribution, column.key, handleSelect, handleReject)}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={lastPage}
            page={currentPage}
            onChange={setPage}
            showControls
            color="primary"
            size="md"
          />
        </div>
      )}
    </div>
  );
};
