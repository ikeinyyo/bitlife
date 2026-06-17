"use client";

import { useEffect, useState } from "react";
import type { Experiment } from "../experiments/data";

type Params = {
  query?: string;
  category?: string | null;
  sortBy?: "title" | "category" | "difficulty" | "status";
  sortDir?: "asc" | "desc";
  includeHidden?: boolean;
};

const useExperiments = (params: Params) => {
  const [data, setData] = useState<Experiment[] | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const qs = new URLSearchParams();
    if (params.query) qs.set("query", params.query);
    if (params.category) qs.set("category", params.category);
    if (params.sortBy) qs.set("sortBy", params.sortBy);
    if (params.sortDir) qs.set("sortDir", params.sortDir);
    if (typeof params.includeHidden !== "undefined")
      qs.set("includeHidden", String(params.includeHidden));

    fetch(`/api/experiments?${qs.toString()}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`API error ${r.status}`);
        return r.json();
      })
      .then((json) => {
        setData(json.experiments || []);
        setCategories(json.categories || null);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Unknown error");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [
    params.query,
    params.category,
    params.sortBy,
    params.sortDir,
    params.includeHidden,
  ]);

  return { data, categories, loading, error };
};

export default useExperiments;
