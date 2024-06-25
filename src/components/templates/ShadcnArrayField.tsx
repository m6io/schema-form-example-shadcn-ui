import { SchemaDefinitions, getZeroState } from "@m6oss/schema-form";
import {
  useFormContext,
  JSONSchema7,
  ArraySchema,
  CustomFields,
} from "@m6oss/schema-form";
import { renderField } from "@m6oss/schema-form";
import { ShadcnErrorMessage } from "./ShadcnErrorMessage";
import { HiX } from "react-icons/hi";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

/**
 * Array Field Component Template
 * @param {ArraySchema} schema - The schema for the array field.
 * @param {string[]} path - The path to the array field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The array field component.
 * @example
 * <ShadcnArrayField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 */
export const ShadcnArrayField: React.FC<{
  schema: ArraySchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? [];

  return (
    <div className="border-dashed rounded-xl border-2 border-gray-400 dark:border-gray-600 p-4 my-4 flex flex-col space-y-2">
      {schema.title && <Label>{schema.title}</Label>}
      {schema.description && (
        <small className="text-gray-500 dark:text-gray-400">
          {schema.description}
        </small>
      )}
      <br />
      {schema.items &&
        Array.isArray(valueAtPath) &&
        valueAtPath.map((_, index: number) => (
          <div className="relative p-4 my-2" key={index}>
            <Button
              variant={"destructive"}
              className="absolute top-4 right-0 rounded-full size-10 flex items-center justify-center"
              onClick={() => {
                const newArray = [...valueAtPath];
                newArray.splice(index, 1);
                setFormData(path, newArray);
              }}
            >
              <HiX />
            </Button>
            {renderField(
              schema.items as JSONSchema7,
              [...path, index.toString()],
              definitions,
              customFields
            )}
          </div>
        ))}
      <Button
        type="button"
        onClick={() => {
          setFormData(path, [
            ...valueAtPath,
            getZeroState(schema.items as JSONSchema7, definitions),
          ]);
        }}
      >
        Add Item
      </Button>
      <ShadcnErrorMessage path={path} />
    </div>
  );
};
