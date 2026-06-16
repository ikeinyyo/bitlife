<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Component style guidelines

Goal: steer development toward small, composable components organized by feature.

- **Composition over inheritance:** Whenever possible, create small components and reuse them via composition (props, children, HOCs, or hooks) rather than inheritance or monolithic components.
- **Arrow functions (fat arrow):** Keep components as arrow functions and prefer fat-arrow methods inside components too. Example patterns:

  const MyComponent: React.FC<MyProps> = ({ propA }) => {
  const handleClick = () => {
  console.log(propA);
  };

  return (
  <div onClick={handleClick}>{propA}</div>
  );
  };

  const useExample = () => {
  const doSomething = () => {
  return true;
  };

  return {
  doSomething,
  };
  };

- **Feature-based structure:** Add a `/features` folder at the project root. Each feature should group its components and resources:

  /features
  /myFeature
  /MyComponent
  MyComponent.tsx
  MyComponent.module.css
  index.ts
  /Subcomponent
  Subcomponent.tsx
  index.ts
  - Each feature may nest subcomponents in their own folders as needed.
  - Keep styles and tests colocated with the component.
  - Export from `index.ts` and prefer named exports to ease refactors.

- **Additional conventions:**
  - Use PascalCase for component and folder names.
  - One primary component per file when possible.
  - Place types and interfaces in a `types.ts` or `interfaces.ts` file inside the feature.
  - Avoid `default` exports to make renames and searches easier.
  - Place feature-specific hooks in `features/<feature>/hooks`.
  - Put tests next to the component (`MyComponent.test.tsx`).

These guidelines are a starting point; we can expand them with concrete examples, ESLint/Prettier rules, and folder templates if you want me to apply them automatically.
