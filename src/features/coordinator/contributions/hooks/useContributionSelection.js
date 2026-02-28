import { useState, useCallback, useMemo } from "react";

const TERMINAL_STATUSES = ["selected", "rejected"];

export const useContributionSelection = (contributions) => {
  /**
   * Normalize all IDs to string immediately
   * This avoids number/string mismatch everywhere.
   */
  const normalizedContributions = useMemo(
    () =>
      contributions.map((c) => ({
        ...c,
        _id: String(c.id),
      })),
    [contributions]
  );

  /**
   * Scope key changes when page/data set changes.
   * Prevents old selections leaking into new page.
   */
  const scopeKey = useMemo(
    () => normalizedContributions.map((c) => c._id).join(","),
    [normalizedContributions]
  );

  const [selectionState, setSelectionState] = useState(() => ({
    scopeKey,
    keys: new Set(),
  }));

  /**
   * Reset automatically when dataset changes
   */
  const selectedKeys =
    selectionState.scopeKey === scopeKey
      ? selectionState.keys
      : new Set();

  /**
   * Filter selectable contributions
   */
  const selectableIds = useMemo(
    () =>
      normalizedContributions
        .filter((c) => !TERMINAL_STATUSES.includes(c.status))
        .map((c) => c._id),
    [normalizedContributions]
  );

  const isAllSelected =
    selectableIds.length > 0 &&
    selectableIds.every((id) => selectedKeys.has(id));

  const isIndeterminate =
    selectedKeys.size > 0 && !isAllSelected;

  /**
   * Toggle all
   */
  const toggleAll = useCallback(() => {
    setSelectionState({
      scopeKey,
      keys: isAllSelected
        ? new Set()
        : new Set(selectableIds),
    });
  }, [scopeKey, isAllSelected, selectableIds]);

  /**
   * Toggle single
   */
  const toggleOne = useCallback(
    (id) => {
      const normalizedId = String(id);

      setSelectionState((prev) => {
        const base =
          prev.scopeKey === scopeKey
            ? prev.keys
            : new Set();

        const next = new Set(base);

        if (next.has(normalizedId)) {
          next.delete(normalizedId);
        } else {
          next.add(normalizedId);
        }

        return { scopeKey, keys: next };
      });
    },
    [scopeKey]
  );

  const clearSelection = useCallback(() => {
    setSelectionState({
      scopeKey,
      keys: new Set(),
    });
  }, [scopeKey]);

  const isSelectable = useCallback(
    (contribution) =>
      !TERMINAL_STATUSES.includes(contribution.status),
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