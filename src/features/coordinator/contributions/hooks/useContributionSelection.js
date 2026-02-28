import { useState, useCallback, useMemo } from "react";

const TERMINAL_STATUSES = ["selected", "rejected"];

export const useContributionSelection = (contributions) => {
  // Stable string key derived from contribution IDs — survives new array references
  // that React Query creates on every render/refetch.
  const scopeKey = useMemo(
    () => contributions.map((c) => c.id).join(","),
    [contributions]
  );

  const [selectionState, setSelectionState] = useState(() => ({
    scopeKey,
    keys: new Set(),
  }));

  // Selectable contributions exclude terminal statuses
  const selectableContributions = contributions.filter(
    (c) => !TERMINAL_STATUSES.includes(c.status)
  );
  const selectableIds = selectableContributions.map((c) => c.id);

  // Reset selection when the page / data set changes (scopeKey differs),
  // but keep it when the same data just re-renders with a new array reference.
  const selectedKeys =
    selectionState.scopeKey === scopeKey ? selectionState.keys : new Set();

  const isAllSelected =
    selectableIds.length > 0 &&
    selectableIds.every((id) => selectedKeys.has(id));

  const isIndeterminate = selectedKeys.size > 0 && !isAllSelected;

  const toggleAll = useCallback(() => {
    setSelectionState({
      scopeKey,
      keys: isAllSelected ? new Set() : new Set(selectableIds),
    });
  }, [scopeKey, isAllSelected, selectableIds]);

  const toggleOne = useCallback(
    (id) => {
      setSelectionState((prev) => {
        const baseKeys =
          prev.scopeKey === scopeKey ? prev.keys : new Set();
        const next = new Set(baseKeys);
        next.has(id) ? next.delete(id) : next.add(id);
        return { scopeKey, keys: next };
      });
    },
    [scopeKey]
  );

  const clearSelection = useCallback(
    () => setSelectionState({ scopeKey, keys: new Set() }),
    [scopeKey]
  );

  const isSelectable = useCallback(
    (contribution) => !TERMINAL_STATUSES.includes(contribution.status),
    []
  );

  return {
    selectedKeys,
    selectedCount: selectedKeys.size,
    isAllSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    clearSelection,
    isSelectable,
  };
};