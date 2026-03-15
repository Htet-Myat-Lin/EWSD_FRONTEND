import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Link,
  Spinner,
  Card,
  CardBody,
  Pagination,
  useDisclosure,
  Button,
} from "@heroui/react";
import { toast } from "react-toastify";
import { formatDate, STATUS_COLORS } from "@/utils/helpers";
import { ActionsCell } from "./ActionsCell";
import { ContributionFilters } from "./ContributionFilters";
import { BulkActionsBar } from "./BulkActionsBar";
import { CommentDialog } from "./CommentDialog";

import { useContributions } from "../hooks/useContributions";
import { useCategories } from "../hooks/useCategories";
import { useSelectContributions } from "../hooks/useSelectContributions";
import { useContributionFilters } from "../hooks/useContributionFilters";
import { ContributionService } from "@/api/services/contribution-service";

const TERMINAL_STATUSES = ["selected", "rejected"];

export const ContributionsList = () => {
  const filters = useContributionFilters();
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, isLoading, isError, error } = useContributions(
    filters.page,
    filters.statusParam,
    filters.categoryParam,
    filters.searchParam
  );

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const { mutate: selectContributions } = useSelectContributions();

  const contributions = useMemo(() => data?.data ?? [], [data?.data]);
  const currentPage = data?.meta?.current_page ?? 1;
  const lastPage = data?.meta?.last_page ?? 1;

  const categoryOptions = useMemo(() => {
    const categories = categoriesData?.data ?? [];
    return [
      { key: "all", label: "All Categories" },
      ...categories.map((cat) => ({
        key: String(cat.id),
        label: cat.name,
      })),
    ];
  }, [categoriesData]);

  // Only allow selection of non-terminal rows
  const disabledKeys = useMemo(() => {
    return contributions
      .filter((c) => TERMINAL_STATUSES.includes(c.status))
      .map((c) => String(c.id));
  }, [contributions]);

  const handleSelectContributions = ({ ids, action }) => {
    selectContributions(
      { ids, action },
      {
        onSuccess: (data) => {
          toast.success(
            data.message || `Contributions ${action} successfully`
          );
          setSelectedKeys(new Set());
        },
        onError: (err) => {
          toast.error(
            err.response?.data?.message ||
              `Failed to ${action} contributions`
          );
        },
      }
    );
  };

  const handleBulkSelect = () =>
    handleSelectContributions({
      ids: Array.from(selectedKeys),
      action: "selected",
    });

  const handleBulkReject = () =>
    handleSelectContributions({
      ids: Array.from(selectedKeys),
      action: "rejected",
    });

  const handleDownload = async (contribution) => {
    try {
      const blob = await ContributionService.downloadContribution(contribution.id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = contribution.file_url?.split("/").pop() || `contribution-${contribution.id}`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download file. Please try again.");
    }
  };

  const handleDropdownAction = (key, contribution) => {
    const action = key === "select" ? "selected" : "rejected";
    handleSelectContributions({
      ids: [contribution.id],
      action,
    });
  };

  const handleCommentClick = (contribution) => {
    setSelectedContribution(contribution);
    onOpen();
  };

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
            <p className="text-lg font-semibold mb-2">
              Error loading contributions
            </p>
            <p className="text-sm">
              {error?.message || "An unexpected error occurred"}
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contributions</h1>
        <p className="text-sm text-gray-500">
          Manage and review student contributions
        </p>
      </div>

      <ContributionFilters
        {...filters}
        categoryOptions={categoryOptions}
        categoriesLoading={categoriesLoading}
      />

      <BulkActionsBar
        count={selectedKeys.size}
        onBulkSelect={handleBulkSelect}
        onBulkReject={handleBulkReject}
        onClear={() => setSelectedKeys(new Set())}
      />

      <Card>
        <CardBody className="p-0">
          <Table
            aria-label="Contributions list"
            isStriped
            removeWrapper
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            disabledKeys={disabledKeys}
          >
            <TableHeader>
              <TableColumn>title</TableColumn>
              <TableColumn>student</TableColumn>
              <TableColumn>category</TableColumn>
              <TableColumn>academic_year</TableColumn>
              <TableColumn>status</TableColumn>
              <TableColumn>Submission date</TableColumn>
              <TableColumn>file</TableColumn>
              <TableColumn>actions</TableColumn>
            </TableHeader>

            <TableBody items={contributions}>
              {(item) => (
                <TableRow key={String(item.id)}>
                  <TableCell>{item.title || "N/A"}</TableCell>
                  <TableCell>{item.user?.name || "N/A"}</TableCell>
                  <TableCell>{item.category?.name || "N/A"}</TableCell>
                  <TableCell>{item.academic_year?.name || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      color={STATUS_COLORS[item.status] || "default"}
                      size="sm"
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                  <TableCell>
                    {item.file_url ? (
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        onPress={() => handleDownload(item)}
                      >
                        Download
                      </Button>
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <ActionsCell
                      contribution={item}
                      onDropdownAction={handleDropdownAction}
                      onCommentClick={handleCommentClick}
                    />
                  </TableCell>
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
