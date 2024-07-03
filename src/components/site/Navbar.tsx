import { HiMiniSun, HiMiniMoon } from "react-icons/hi2";
import { SiYoutube, SiGithub } from "react-icons/si";
import { useTheme } from "./useTheme";

// A navbar component that will be used to house app-wide navigation and settings
export function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-10 w-full border-b">
      <div className="flex h-16 items-center px-4 sm:px-8 lg:px-44">
        <div className="mx-auto w-full max-w-3xl space-y-20">
          <div className="flex justify-between">
            <div className="flex flex-1 items-center justify-start">
              {/* Link and site name/icon */}

              <a
                className="inline-flex h-10 items-center justify-center text-lg font-bold text-primary"
                href="/"
              >
                @react-formgen/json-schema
              </a>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <nav className="flex items-center space-x-1">
                <ThemeToggle />
                <a
                  href="https://www.youtube.com/@m6io"
                  target="_blank"
                  className="text-primary size-10 p-2 hover:text-[#ff0000] dark:hover:text-[#ff0000]" // Brand color from https://brandcolors.net/b/youtube
                >
                  <SiYoutube className="h-full w-full" />
                </a>
                <a
                  href="https://github.com/m6io/react-formgen"
                  target="_blank"
                  className="text-primary size-10 p-2 hover:text-[#4078c0] dark:hover:text-[#4078c0]" // Brand color from https://brandcolors.net/b/github
                >
                  <SiGithub className="h-full w-full" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className="size-10 p-2 hover:text-amber-500 dark:hover:text-amber-400"
      onClick={() => toggleDarkMode()}
    >
      {isDarkMode ? (
        <HiMiniMoon className="h-full w-full" />
      ) : (
        <HiMiniSun className="h-full w-full" />
      )}
    </button>
  );
}
