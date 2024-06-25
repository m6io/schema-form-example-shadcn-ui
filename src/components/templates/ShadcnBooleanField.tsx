import { BooleanSchema } from "@m6oss/schema-form";
import { useFormContext } from "@m6oss/schema-form";
import { ShadcnErrorMessage } from "./ShadcnErrorMessage";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";

/**
 * Boolean Field Component Template
 * @param {BooleanSchema} schema - The schema for the boolean field.
 * @param {string[]} path - The path to the boolean field in the form data.
 * @returns {JSX.Element} - The boolean field component.
 * @example
 * <ShadcnBooleanField schema={schema} path={path} />
 *
 */
export const ShadcnBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if no oneOf options. This is the default boolean field.
  if (!schema.oneOf) {
    return <ShadcnCheckboxBooleanField schema={schema} path={path} />;
  }

  // Return the appropriate boolean field based on the uiSchema.
  switch (schema.uiSchema) {
    case "radio":
      return <ShadcnRadioBooleanField schema={schema} path={path} />;
    case "switch":
      return <ShadcnSwitchBooleanField schema={schema} path={path} />;
    default: // in the case that the uiSchema does not match radio or switch
      return <ShadcnCheckboxBooleanField schema={schema} path={path} />;
  }
};

/**
 * Radio Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": "radio",
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "Yes"
 *        },
 *        {
 *          "const": false,
 *          "title": "No"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the radio boolean field.
 * @param {string[]} path - The path to the radio boolean field in the form data.
 * @returns {JSX.Element} - The radio boolean field component.
 * @example
 * <ShadcnRadioBooleanField schema={schema} path={path} />
 *
 */
export const ShadcnRadioBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? false;

  if (!schema.oneOf || schema.uiSchema !== "radio") {
    return;
  } else {
    return (
      <div className="flex flex-col space-y-2">
        {schema.title && <Label>{schema.title}</Label>}
        <RadioGroup
          onValueChange={(value) => setFormData(path, value === "true")} // if value is 'true' then set value to true, else false
          defaultValue={valueAtPath}
          className="flex flex-col space-y-1"
        >
          {schema.oneOf.map((option) => (
            <div className={"flex items-center space-x-3 space-y-0"}>
              <RadioGroupItem
                key={option.title}
                value={option.const.toString()}
              />
              <Label className="font-normal">{option.title}</Label>
            </div>
          ))}
        </RadioGroup>

        {schema.description && (
          <p className="text-sm text-muted-foreground">{schema.description}</p>
        )}
        <ShadcnErrorMessage path={path} />
      </div>
    );
  }
};

/**
 * Switch Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": "switch",
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "On"
 *        },
 *        {
 *          "const": false,
 *          "title": "Off"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the switch boolean field.
 * @param {string[]} path - The path to the switch boolean field in the form data.
 * @returns {JSX.Element} - The switch boolean field component.
 * @example
 * <ShadcnSwitchBooleanField schema={schema} path={path} />
 *
 */
export const ShadcnSwitchBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? false;

  if (!schema.oneOf || schema.uiSchema !== "switch") {
    return;
  } else {
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 space-y-2">
          <div className="space-y-0.5">
            {schema.title && (
              <Label className="text-base">{schema.title}</Label>
            )}

            {schema.description && (
              <p className="text-sm text-muted-foreground">
                {schema.description}
              </p>
            )}
          </div>
          <Switch
            checked={valueAtPath}
            onCheckedChange={(checked) => setFormData(path, checked)}
            disabled={schema.readOnly ?? false}
            aria-readonly={schema.readOnly ?? false}
          />
        </div>

        <ShadcnErrorMessage path={path} />
      </div>
    );
  }
};

/**
 * Checkbox Boolean Field Component Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean"
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the checkbox boolean field.
 * @param {string[]} path - The path to the checkbox boolean field in the form data.
 * @returns {JSX.Element} - The checkbox boolean field component.
 * @example
 * <ShadcnCheckboxBooleanField schema={schema} path={path} />
 *
 */
export const ShadcnCheckboxBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const formData = useFormContext((state) => state.formData);
  const setFormData = useFormContext((state) => state.setFormData);
  const valueAtPath = path.reduce((acc, key) => acc?.[key], formData) ?? false;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox
          checked={valueAtPath}
          onCheckedChange={(checked) => setFormData(path, checked)}
        />
        <div className="space-y-1 leading-none">
          {schema.title && <Label>{schema.title}</Label>}
          {schema.description && (
            <p className="text-sm text-muted-foreground">
              {schema.description}
            </p>
          )}
        </div>
      </div>
      <ShadcnErrorMessage path={path} />
    </div>
  );
};
