import { NavBar } from "../../components/NavBar";

const CreditsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="app-container py-8">
        <h1 className="text-2xl font-semibold">Credits</h1>
        <p className="text-muted mt-4">
          This project contains experiments for life generation.
        </p>
        <p className="text-muted mt-2">
          Add any credits or licensing information here.
        </p>
      </main>
    </div>
  );
};

export default CreditsPage;
