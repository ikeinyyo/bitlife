export type Experiment = {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  icon?: string;
};

export const experiments: Experiment[] = [
  {
    id: "game-of-life",
    title: "Game of Life",
    description: "Conway's Game of Life — cellular automaton experiments.",
    category: "Simulation",
    path: "/experiments/game-of-life",
    icon: "🟩",
  },
  {
    id: "perceptron",
    title: "Perceptron",
    description: "Simple perceptron demo and visualization.",
    category: "Machine Learning",
    path: "/experiments/perceptron",
    icon: "🧠",
  },
];

export const categories = Array.from(
  new Set(experiments.map((e) => e.category)),
);
