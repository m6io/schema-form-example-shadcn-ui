import { CustomFields } from "@react-formgen/json-schema";
import { ShadcnArrayField } from "./ShadcnArrayField";
import { ShadcnBooleanField } from "./ShadcnBooleanField";
import { ShadcnNumberField } from "./ShadcnNumberField";
import { ShadcnObjectField } from "./ShadcnObjectField";
import { ShadcnStringField } from "./ShadcnStringField";
import { ShadcnFormComponent } from "./ShadcnFormComponent";

/**
 * Custom Fields Object
 */
const shadcnCustomFields: CustomFields = {
  ArrayField: ShadcnArrayField,
  BooleanField: ShadcnBooleanField,
  NumberField: ShadcnNumberField,
  ObjectField: ShadcnObjectField,
  StringField: ShadcnStringField,
};

export { shadcnCustomFields, ShadcnFormComponent };
