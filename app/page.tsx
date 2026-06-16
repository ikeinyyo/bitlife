"use client";

import React, { useMemo, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/navigation";
import { experiments, categories, Experiment } from "./experiments/data";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"title" | "category" | null>("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    return experiments.filter((e) => {
      if (category && e.category !== category) return false;
      const text = (e.title + " " + e.description).toLowerCase();
      if (query && !text.includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, category]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    const items = [...filtered];
    items.sort((a, b) => {
      const A = (a[sortBy] || "").toString().toLowerCase();
      const B = (b[sortBy] || "").toString().toLowerCase();
      const cmp = A.localeCompare(B);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return items;
  }, [filtered, sortBy, sortDir]);

  const toggleSort = (col: "title" | "category") => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="app-container py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Experiments</h1>
          <p className="text-muted mt-2">
            A playground of life-generation experiments.
          </p>
        </header>

        <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`px-3 py-1 rounded-md ${category === null ? "btn-accent" : "border"}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-md ${category === c ? "btn-accent" : "border"}`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search experiments"
              className="border rounded-md px-3 py-2 w-64"
            />
          </div>
        </section>

        <section>
          {sorted.length === 0 ? (
            <p className="text-muted">No experiments found.</p>
          ) : (
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-white/[.06] w-full">
              <table className="min-w-full w-full table-fixed">
                <colgroup>
                  <col className="w-[65%]" />
                  <col className="w-[35%]" />
                </colgroup>
                <thead className="table-header">
                  <tr>
                    <th
                      onClick={() => toggleSort("title")}
                      className="px-4 py-3 text-left text-sm font-medium cursor-pointer border-b border-[var(--accent)]/40"
                    >
                      Experiment{" "}
                      {sortBy === "title"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                    <th
                      onClick={() => toggleSort("category")}
                      className="px-4 py-3 text-left text-sm font-medium cursor-pointer border-b border-[var(--accent)]/40"
                    >
                      Category{" "}
                      {sortBy === "category"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((e: Experiment) => (
                    <tr
                      key={e.id}
                      className="border-t border-[var(--accent)]/30 dark:border-[var(--accent)]/20 table-row cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[.03]"
                      onClick={() => router.push(e.path)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{e.icon ?? "🔬"}</div>
                          <div>
                            <div className="text-sm font-semibold">
                              {e.title}
                            </div>
                            <div className="text-sm text-muted">
                              {e.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="text-sm">{e.category}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
