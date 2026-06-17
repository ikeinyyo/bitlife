"use client";

import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/navigation";
import useDebounce from "./hooks/useDebounce";
import useExperiments from "./hooks/useExperiments";
import type { Experiment } from "./experiments/data";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [category, setCategory] = useState<string | null>(null);
  const [hideHidden, setHideHidden] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<
    "title" | "category" | "difficulty" | "status"
  >("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const {
    data: experiments,
    categories: apiCategories,
    loading,
  } = useExperiments({
    query: debouncedQuery,
    category: category || undefined,
    sortBy,
    sortDir,
    includeHidden: !hideHidden,
  });

  const router = useRouter();

  const toggleSort = (col: "title" | "category" | "difficulty" | "status") => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  const categories =
    apiCategories && apiCategories.length > 0
      ? apiCategories
      : experiments
        ? Array.from(new Set(experiments.map((e) => e.category)))
        : [];

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
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <button
              onClick={() => setCategory(null)}
              className={`inline-flex h-11 items-center justify-center whitespace-nowrap px-3 rounded-md ${category === null ? "btn-accent" : "border"}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`inline-flex h-11 items-center justify-center whitespace-nowrap px-3 rounded-md ${category === c ? "btn-accent" : "border"}`}
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
              className="border rounded-md px-3 h-11 w-64"
            />

            <button
              type="button"
              onClick={() => setHideHidden((s) => !s)}
              aria-pressed={hideHidden}
              title="Toggle hiding hidden experiments"
              className={`inline-flex h-11 items-center gap-2 text-sm px-3 rounded-md border focus:outline-none transition-colors ${
                hideHidden
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)]"
                  : "bg-transparent text-[var(--foreground)] border-gray-300"
              }`}
            >
              {hideHidden ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-7 1.06-2.28 2.86-4.12 4.99-5.19" />
                  <path d="M1 1l22 22" />
                  <path d="M9.88 9.88A3 3 0 0 0 14 14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </section>

        <section>
          {loading || !experiments ? (
            <p className="text-muted">Loading experiments…</p>
          ) : experiments.length === 0 ? (
            <p className="text-muted">No experiments found.</p>
          ) : (
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-white/[.06] w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full w-full table-auto">
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
                        onClick={() => toggleSort("difficulty")}
                        className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium cursor-pointer border-b border-[var(--accent)]/40"
                      >
                        Difficulty{" "}
                        {sortBy === "difficulty"
                          ? sortDir === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </th>
                      <th
                        onClick={() => toggleSort("status")}
                        className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium cursor-pointer border-b border-[var(--accent)]/40"
                      >
                        Status{" "}
                        {sortBy === "status"
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
                    {experiments.map((e: Experiment) => (
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
                              {e.tags && e.tags.length > 0 ? (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {e.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-foreground)]"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-4 py-3 align-top">
                          {e.difficulty ? (
                            <div className="text-xs px-2 py-0.5 rounded-md border text-muted inline-block">
                              {e.difficulty}
                            </div>
                          ) : (
                            <span className="text-sm text-muted">—</span>
                          )}
                        </td>
                        <td className="hidden md:table-cell px-4 py-3 align-top">
                          {e.status ? (
                            <span
                              title={e.status}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                e.status === "published"
                                  ? "bg-green-600 text-white"
                                  : e.status === "draft"
                                    ? "bg-yellow-400 text-black"
                                    : "bg-gray-500 text-white"
                              }`}
                            >
                              {e.status}
                            </span>
                          ) : (
                            <span className="text-sm text-muted">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="text-sm">{e.category}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
