import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon?: string;
};

const ExperimentCard: React.FC<Props> = ({
  title,
  description,
  category,
  path,
  icon,
}) => {
  return (
    <Link href={path} className="block">
      <article className="group h-full rounded-lg border border-gray-200 dark:border-white/[.06] p-4 bg-card-bg hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon ?? "🔬"}</div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted">{category}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">{description}</p>
      </article>
    </Link>
  );
};

export default ExperimentCard;
