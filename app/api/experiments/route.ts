import { NextResponse } from "next/server";
import {
  experiments as allExperiments,
  categories as fixedCategories,
} from "../../experiments/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams;

  const category = params.get("category");
  const query = params.get("query") || "";
  const sortBy = (params.get("sortBy") || "title") as
    | "title"
    | "category"
    | "difficulty"
    | "status";
  const sortDir = (params.get("sortDir") || "asc") as "asc" | "desc";
  const includeHidden = params.get("includeHidden") === "true";

  let items = [...allExperiments];

  // status: exclude hidden items unless explicitly requested
  if (!includeHidden) {
    items = items.filter((e) => e.status !== "hidden");
  }

  if (category) {
    items = items.filter((e) => e.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    items = items.filter((e) =>
      (e.title + " " + e.description).toLowerCase().includes(q),
    );
  }

  if (sortBy) {
    items.sort((a, b) => {
      if (sortBy === "difficulty") {
        const A = parseInt(a.difficulty || "0", 10) || 0;
        const B = parseInt(b.difficulty || "0", 10) || 0;
        return sortDir === "asc" ? A - B : B - A;
      }

      if (sortBy === "status") {
        const order: Record<string, number> = {
          hidden: 0,
          draft: 1,
          published: 2,
        };
        const A = order[(a.status as string) || "hidden"] ?? 0;
        const B = order[(b.status as string) || "hidden"] ?? 0;
        return sortDir === "asc" ? A - B : B - A;
      }

      const A = (a[sortBy] || "").toString().toLowerCase();
      const B = (b[sortBy] || "").toString().toLowerCase();
      const cmp = A.localeCompare(B);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

  return NextResponse.json({ experiments: items, categories: fixedCategories });
}
