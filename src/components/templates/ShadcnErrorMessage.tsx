import { useFormContext } from "@m6oss/schema-form";

/**
 * Error Message Component Template
 * @param {string[]} path - The path to the error in the form data.
 * @returns {JSX.Element} - The error message component.
 * @example
 * <ShadcnErrorMessage path={path} />
 *
 */
export const ShadcnErrorMessage: React.FC<{
  path: string[];
}> = ({ path }) => {
  const errors = useFormContext((state) => state.errors);
  if (!errors) return null;

  const fullPath = `/${path.join("/")}`;
  const error = errors.find((error) => {
    if (error.instancePath === fullPath) {
      return true;
    }
    if (error.keyword === "required" && error.params.missingProperty) {
      const missingPath = `${error.instancePath}/${error.params.missingProperty}`;
      return missingPath === fullPath;
    }
    return false;
  });

  if (!error) return null;

  return (
    <p className="text-sm font-medium text-destructive">{error.message}</p>
  );
};
