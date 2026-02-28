import { useMemo, useState } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Spinner, Card, CardBody, Chip, Pagination, useDisclosure,
} from "@heroui/react";
import { toast } from "react-toastify";

import { useContributions } from "../hooks/useContributions";
import { useCategories } from "../hooks/useCategories";
import { useSelectContributions } from "../hooks/useSelectContributions";
import { useContributionColumns } from "./contributionColumns";
import { ContributionFilters } from "./ContributionFilters";
import { BulkActionsBar } from "./BulkActionsBar";
import { CommentDialog } from "./CommentDialog";
import { useContributionFilters } from "../hooks/useContributionFilters";
import { useContributionSelection } from "../hooks/useContributionSelection";

export const ContributionsList = () => {
  const filters = useContributionFilters();
  const [selectedContribution, setSelectedContribution] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isLoading, isError, error } = useContributions(
    filters.page,
    filters.statusParam,
    filters.categoryParam,
    filters.searchParam
  );
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { mutate: selectContributions } = useSelectContributions();

  const contributions = data?.data ?? [];
  const currentPage = data?.meta?.current_page ?? 1;
  const lastPage = data?.meta?.last_page ?? 1;
  const total = data?.meta?.total ?? 0;

  // ── Bulk selection ────────────────────────────────────────────────────────
  const {
    selectedKeys,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    clearSelection,
    isSelectable,
  } = useContributionSelection(contributions);

  // ── Category options ──────────────────────────────────────────────────────
  const categoryOptions = useMemo(() => {
    const categories = categoriesData?.data ?? [];
    return [
      { key: "all", label: "All Categories" },
      ...categories.map((cat) => ({ key: String(cat.id), label: cat.name })),
    ];
  }, [categoriesData]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSelectContributions = ({ ids, action }) => {
    selectContributions(
      { ids, action },
      {
        onSuccess: (data) => {
          toast.success(data.message || `Contributions ${action} successfully`);
          clearSelection();
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || `Failed to ${action} contributions`);
        },
      }
    );
  };

  const handleDropdownAction = (key, contribution) => {
    const action = key === "select" ? "selected" : "rejected";
    handleSelectContributions({ ids: [contribution.id], action });
  };

  const handleCommentClick = (contribution) => {
    setSelectedContribution(contribution);
    onOpen();
  };

  const handleBulkSelect = () =>
    handleSelectContributions({ ids: Array.from(selectedKeys), action: "selected" });

  const handleBulkReject = () =>
    handleSelectContributions({ ids: Array.from(selectedKeys), action: "rejected" });

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = useContributionColumns({
    onDropdownAction: handleDropdownAction,
    onCommentClick: handleCommentClick,
    selectedKeys,
    isAllSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    isSelectable,
  });

  // ── Loading / Error states ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
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
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contributions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review student contributions</p>
        </div>
        <ContributionFilters
          {...filters}
          categoryOptions={categoryOptions}
          categoriesLoading={categoriesLoading}
        />
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">{contributions.length}</span> of{" "}
          <span className="font-semibold text-gray-900">{total}</span>{" "}
          contribution{total !== 1 ? "s" : ""}
        </p>
        {filters.activeFiltersCount > 0 && (
          <Chip size="sm" variant="flat" color="primary">
            {filters.activeFiltersCount} filter{filters.activeFiltersCount !== 1 ? "s" : ""} active
          </Chip>
        )}
      </div>

      {/* Bulk Actions Bar — only visible when items are selected */}
      <BulkActionsBar
        count={selectedCount}
        onBulkSelect={handleBulkSelect}
        onBulkReject={handleBulkReject}
        onClear={clearSelection}
      />

      {/* Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Contributions list" isStriped removeWrapper>
            <TableHeader columns={columns}>
              {(col) => (
                <TableColumn key={col.key} align={col.align ?? "start"}>
                  {col.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={contributions} emptyContent="No contributions found.">
              {(contribution) => (
                <TableRow key={contribution.id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(contribution) : contribution[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <CommentDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        contribution={selectedContribution}
      />

      {lastPage > 1 && (
        <div className="flex justify-center">
          <Pagination
            total={lastPage}
            page={currentPage}
            onChange={filters.setPage}
            showControls
            color="primary"
          />
        </div>
      )}
    </div>
  );
};