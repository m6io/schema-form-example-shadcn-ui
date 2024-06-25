import { Navbar } from "./Navbar";
import { ScreenWidthIndicator } from "./ScreenWidthIndicator";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background relative min-h-screen">
      <Navbar />
      <main className="p-4 sm:px-8 lg:px-44">
        <div className="mx-auto max-w-3xl space-y-20">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            @m6oss/schema-form - shadcn/ui Example
          </h1>
          {children}
        </div>
      </main>
      <ScreenWidthIndicator />
    </div>
  );
};
