import { useFormContext, StringSchema } from "@m6oss/schema-form";
import { ShadcnErrorMessage } from "./ShadcnErrorMessage";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export const ShadcnTextField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if the schema has oneOf or enum options.
  if (schema.enum || schema.oneOf) {
    return <ShadcnSelectField schema={schema} path={path} />;
  } // Check if the schema has a format of date, datetime, or date-time. If so, return the ShadcnDateField component.
  else if (
    schema.format &&
    ["date", "datetime", "date-time"].includes(schema.format)
  ) {
    return <ShadcnDateField schema={schema} path={path} />;
  } // Check if the schema has a uiSchema of textarea. If so, return the ShadcnTextareaField component.
  else if (schema.uiSchema === "textarea") {
    return <ShadcnTextareaField schema={schema} path={path} />;
  }
  return <ShadcnInputField schema={schema} path={path} />;
};

/**
 * Input Field Component Template
 * @param {StringSchema} schema - The schema for the input field.
 * @param {string[]} path - The path to the input field in the form data.
 * @returns {JSX.Element} - The input field component.
 * @example
 * <ShadcnInputField schema={schema} path={path} />
 */
const ShadcnInputField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? null;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(path, event.target.value);
  };

  const inputType =
    schema.format && ["password", "email", "url"].includes(schema.format)
      ? schema.format
      : schema.uiSchema === "tel"
        ? "tel"
        : "text";

  return (
    <div className="space-y-2 flex flex-col">
      {schema.title && <Label>{schema.title}</Label>}
      <Input
        type={inputType}
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        list={
          Array.isArray(schema.examples)
            ? `${path.join("-")}-datalist`
            : undefined
        }
        className="w-48"
      />
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as string} />
          ))}
        </datalist>
      )}
      <ShadcnErrorMessage path={path} />
    </div>
  );
};

/**
 * Textarea Field Component Template
 * @param {StringSchema} schema - The schema for the textarea field.
 * @param {string[]} path - The path to the textarea field in the form data.
 * @returns {JSX.Element} - The textarea field component.
 * @example
 * <ShadcnTextareaField schema={schema} path={path} />
 */
const ShadcnTextareaField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? null;
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(path, event.target.value);
  };

  return (
    <div className="space-y-2 flex flex-col">
      {schema.title && <Label>{schema.title}</Label>}
      <Textarea
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        className="resize-none"
      />
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      <ShadcnErrorMessage path={path} />
    </div>
  );
};

/**
 * Select Field Component Template
 * @param {StringSchema} schema - The schema for the select field.
 * @param {string[]} path - The path to the select field in the form data.
 * @returns {JSX.Element} - The select field component.
 * @example
 * <ShadcnSelectField schema={schema} path={path} />
 */
const ShadcnSelectField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? "";

  return (
    <div className="space-y-2 flex flex-col">
      {schema.title && <Label>{schema.title}</Label>}
      <Select
        value={valueAtPath}
        onValueChange={(value) => setFormData(path, value)}
      >
        <SelectTrigger value="">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {schema.enum
            ? schema.enum.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))
            : schema.oneOf?.map((option) => (
                <SelectItem key={option.const} value={option.const}>
                  {option.title}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      <ShadcnErrorMessage path={path} />
    </div>
  );
};

/**
 * Date Field Component Template
 * @param {StringSchema} schema - The schema for the date field.
 * @param {string[]} path - The path to the date field in the form data.
 * @returns {JSX.Element} - The date field component.
 * @example
 * <ShadcnDateField schema={schema} path={path} />
 */
const ShadcnDateField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? "";

  return (
    <div className="space-y-2 flex flex-col">
      {schema.title && <Label>{schema.title}</Label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !valueAtPath && "text-muted-foreground"
            )}
          >
            {valueAtPath ? (
              format(valueAtPath, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={valueAtPath}
            onSelect={(date: Date | undefined) => setFormData(path, date)}
            disabled={(date: Date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      <ShadcnErrorMessage path={path} />
    </div>
  );
};
