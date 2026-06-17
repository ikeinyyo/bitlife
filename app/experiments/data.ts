export type Experiment = {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon?: string;
  difficulty?: string; // e.g. "101"
  tags?: string[];
  status?: "draft" | "published" | "hidden";
};

export const experiments: Experiment[] = [
  {
    id: "game-of-life",
    title: "Game of Life",
    description: "Conway's Game of Life — cellular automaton experiments.",
    category: "Simulation",
    path: "/experiments/game-of-life",
    icon: "🟩",
    difficulty: "101",
    tags: ["simulation", "cellular"],
    status: "published",
  },
  {
    id: "perceptron",
    title: "Perceptron",
    description: "Simple perceptron demo and visualization.",
    category: "Machine Learning",
    path: "/experiments/perceptron",
    icon: "🧠",
    difficulty: "201",
    tags: ["ml", "neural-network"],
    status: "hidden",
  },
];

export const categories = [
  "Simulation",
  "Machine Learning",
  "Visualization",
  "Tools",
];
