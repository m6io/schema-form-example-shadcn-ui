import { NumberSchema } from "@m6oss/schema-form";
import { useFormContext } from "@m6oss/schema-form";
import { ShadcnErrorMessage } from "./ShadcnErrorMessage";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

/**
 * Number Field Component Template
 * @param {NumberSchema} schema - The schema for the number field.
 * @param {string[]} path - The path to the number field in the form data.
 * @returns {JSX.Element} - The number field component.
 * @example
 * <ShadcnNumberField schema={schema} path={path} />
 *
 */
export const ShadcnNumberField: React.FC<{
  schema: NumberSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? null;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(path, event.target.value ? Number(event.target.value) : null);
  };

  return (
    <div className="flex flex-col space-y-2">
      {schema.title && <Label>{schema.title}</Label>}
      <Input
        type="number"
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        list={
          Array.isArray(schema.examples)
            ? `${path.join("-")}-datalist`
            : undefined
        }
        className="w-24"
      />
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as number} />
          ))}
        </datalist>
      )}
      <ShadcnErrorMessage path={path} />
    </div>
  );
};
