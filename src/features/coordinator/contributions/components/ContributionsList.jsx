import { useState, useMemo, useEffect } from "react";
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
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Tooltip
} from "@heroui/react";
import { LuEllipsisVertical, LuCheck, LuX, LuMessageCircleMore } from "react-icons/lu";
import { useContributions } from "../hooks/useContributions";
import { useCategories } from "../hooks/useCategories";
import { useSelectContributions } from "../hooks/useSelectContributions";
import { formatDate } from "@/utils/date";
import { toast } from "react-toastify";
import { CommentDialog } from "./CommentDialog";

const columns = [
  { key: "title", label: "Title" },
  { key: "student", label: "Student" },
  { key: "cover_photo", label: "Cover Photo" },
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

const renderCell = (contribution, columnKey, onDropdownAction, onCommentClick) => {
  switch (columnKey) {
    case "title":
      return contribution.title || "N/A";
    case "student":
      return contribution.user?.name || "N/A";
    case "cover_photo":
      return contribution.cover_photo_url ? (
        <img
          src={contribution.cover_photo_url}
          alt={contribution.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-xs text-gray-400">No image</span>
        </div>
      );
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
          as={"a"}
          href={contribution.file_url}
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
      );
    case "actions": {
      const isDisabled = contribution.status === "selected" || contribution.status === "rejected";
      return (
        <div className="relative flex justify-center items-center">
          <Tooltip content="Add Comment" placement="top" delay={300} closeDelay={0}>
            <Button 
              onPress={() => onCommentClick(contribution)} 
              isIconOnly 
              size="sm" 
              variant="light" 
              className={`transition-all duration-200 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-100 hover:text-primary'}`}
              isDisabled={isDisabled}
            >
              <LuMessageCircleMore size={18} className={isDisabled ? "text-gray-300" : "text-primary"} />
            </Button>
          </Tooltip>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                isIconOnly 
                size="sm" 
                variant="light" 
                className={`transition-all duration-200 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-warning-100 hover:text-warning'}`}
                isDisabled={isDisabled}
              >
                <LuEllipsisVertical size={18} className={isDisabled ? "text-gray-300" : "text-warning"} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Contribution actions"
              onAction={(key) => onDropdownAction(key, contribution)}
              disabledKeys={isDisabled ? ["select", "reject"] : []}
            >
              <DropdownItem
                key="select"
                color="success"
                className="text-success"
                startContent={<LuCheck size={16} />}
              >
                Select
              </DropdownItem>
              <DropdownItem
                key="reject"
                color="danger"
                className="text-danger"
                startContent={<LuX size={16} />}
              >
                Reject
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
    default:
      return contribution[columnKey];
  }
};

const statusOptions = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "selected", label: "Selected" },
  { key: "rejected", label: "Rejected" },
  { key: "commented", label: "Commented" }
];

export const ContributionsList = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedContribution, setSelectedContribution] = useState(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Pass filters to API, converting "all" to null
  const statusParam = statusFilter === "all" ? null : statusFilter;
  const categoryParam = categoryFilter === "all" ? null : categoryFilter;
  const searchParam = debouncedSearch || null;
  
  const { data, isLoading, isError, error } = useContributions(page, statusParam, categoryParam, searchParam);
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { mutate: selectContributions } = useSelectContributions();

  // Compute derived values before conditional returns
  const contributions = data?.data ?? [];
  const currentPage = data?.meta?.current_page ?? 1;
  const lastPage = data?.meta?.last_page ?? 1;
  const total = data?.meta?.total ?? 0;

  const categoryOptions = useMemo(() => {
    const categories = categoriesData?.data ?? [];
    return [
      { key: "all", label: "All Categories" },
      ...categories.map(cat => ({ key: String(cat.id), label: cat.name }))
    ];
  }, [categoriesData]);

  const activeFiltersCount = useMemo(() => {
    return [
      statusFilter !== "all",
      categoryFilter !== "all",
      debouncedSearch !== ""
    ].filter(Boolean).length;
  }, [statusFilter, categoryFilter, debouncedSearch]);

  const handleDropdownAction = (key, contribution) => {
    const action = key === "select" ? "selected" : "rejected";
    
    selectContributions(
      { ids: [contribution.id], action },
      {
        onSuccess: (data) => {
          toast.success(data.message || `Contribution ${action} successfully`);
        },
        onError: (error) => {
          const message = error.response?.data?.message || `Failed to ${key} contribution`;
          toast.error(message);
        },
      }
    );
  };

  const handleCommentClick = (contribution) => {
    setSelectedContribution(contribution);
    onOpen();
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

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contributions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review student contributions
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search by title, student, or academic year..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            isClearable
            onClear={() => setSearchQuery("")}
            className="flex-1"
            size="sm"
            variant="bordered"
            aria-label="Search contributions"
          />
          
          <Select
            label="Status"
            placeholder="Select status"
            selectedKeys={[statusFilter]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setStatusFilter(selected);
              setPage(1);
            }}
            className="w-full sm:w-48"
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

          <Select
            label="Category"
            placeholder="Select category"
            selectedKeys={[categoryFilter]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              setCategoryFilter(selected);
              setPage(1);
            }}
            className="w-full sm:w-48"
            size="sm"
            variant="bordered"
            isLoading={categoriesLoading}
            aria-label="Filter contributions by category"
          >
            {categoryOptions.map((option) => (
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
        {activeFiltersCount > 0 && (
          <Chip size="sm" variant="flat" color="primary">
            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
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
                <TableColumn 
                  key={column.key}
                  align={column.key === "actions" ? "center" : "start"}
                >
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
                      {renderCell(contribution, column.key, handleDropdownAction, handleCommentClick)}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Comment Dialog */}
      <CommentDialog 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        contribution={selectedContribution}
      />

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
