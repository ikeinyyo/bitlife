import { NavBar } from "../../../components/NavBar";

const PerceptronPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="app-container py-8">
        <h1 className="text-2xl font-semibold">Perceptron</h1>
        <p className="text-muted mt-4">
          Placeholder page for the Perceptron experiment.
        </p>
      </main>
    </div>
  );
};

export default PerceptronPage;
