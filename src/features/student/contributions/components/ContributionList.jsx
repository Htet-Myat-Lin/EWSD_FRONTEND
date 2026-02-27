import { useContributions } from "@/features/coordinator/contributions/hooks/useContributions"
import { ContributionCard } from "./ContributionCard"
import { useState, useMemo } from "react"
import { useCategories } from "@/features/coordinator/contributions/hooks/useCategories";
import { Input, Select, SelectItem, Pagination, Chip, useDisclosure } from "@heroui/react";
import { useEffect } from "react";
import { CommentDialog } from "@/features/coordinator/contributions/components/CommentDialog";

const statusOptions = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "selected", label: "Selected" },
  { key: "rejected", label: "Rejected" },
  { key: "commented", label: "Commented" }
];

const ContributionList = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedContribution, setSelectedContribution] = useState(null);

  useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(searchQuery);
        setPage(1);
      }, 500);
      return () => clearTimeout(timer);
    }, [searchQuery]);

  const statusParam = statusFilter === "all" ? null : statusFilter;
  const categoryParam = categoryFilter === "all" ? null : categoryFilter;
  const searchParam = debouncedSearch || null;

  const { data, isPending } = useContributions(page, statusParam, categoryParam, searchParam)
  const { data: categoriesData } = useCategories()

  const contributions = data?.data ?? []
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
  

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">My Contributions</h1>
        <p>View and manage all your submissions</p>
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
          // isLoading={categoriesLoading}
          aria-label="Filter contributions by category"
        >
          {categoryOptions.map((option) => (
            <SelectItem key={option.key} value={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isPending && <p>Loading...</p>}
        {!isPending && contributions.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No contributions found</h3>
            <p className="text-gray-500 max-w-sm mb-4">
              {activeFiltersCount > 0 
                ? "No contributions match your current filters. Try adjusting your search criteria."
                : "You haven't submitted any contributions yet. Start by submitting your first contribution!"
              }
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setSearchQuery("");
                  setDebouncedSearch("");
                  setPage(1);
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                Remove Filters
              </button>
            )}
          </div>
        )}
        {!isPending && contributions.length > 0 && contributions.map((contribution) => (
          <ContributionCard 
            key={contribution.id} 
            contribution={contribution} 
            onOpen={onOpen}
            onCommentClick={() => {
              setSelectedContribution(contribution);
              onOpen();
            }}
          />
        ))}
        {selectedContribution && (
          <CommentDialog 
            contribution={selectedContribution} 
            onOpenChange={(open) => {
              if (!open) {
                setSelectedContribution(null);
              }
              onOpenChange(open);
            }} 
            isOpen={isOpen} 
          />
        )}
      </div>

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
  )
}

export default ContributionList