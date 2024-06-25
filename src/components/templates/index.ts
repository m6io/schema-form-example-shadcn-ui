import { CustomFields } from "@m6oss/schema-form";
import { ShadcnArrayField } from "./ShadcnArrayField";
import { ShadcnBooleanField } from "./ShadcnBooleanField";
import { ShadcnNumberField } from "./ShadcnNumberField";
import { ShadcnObjectField } from "./ShadcnObjectField";
import { ShadcnTextField } from "./ShadcnTextField";
import { ShadcnFormComponent } from "./ShadcnFormComponent";

/**
 * Custom Fields Object
 */
const shadcnCustomFields: CustomFields = {
  ArrayField: ShadcnArrayField,
  BooleanField: ShadcnBooleanField,
  NumberField: ShadcnNumberField,
  ObjectField: ShadcnObjectField,
  TextField: ShadcnTextField,
};

export { shadcnCustomFields, ShadcnFormComponent };
