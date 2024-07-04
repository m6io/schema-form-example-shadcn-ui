import React, { useState, useEffect } from "react";
import { JSONSchema7, FormProvider } from "@react-formgen/json-schema";
import { Layout } from "./components/site/Layout";
import {
  shadcnCustomFields,
  ShadcnFormComponent,
} from "./components/templates";

const App: React.FC = () => {
  const [schema, setSchema] = useState<JSONSchema7 | null>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      const response = await fetch("/schema.json");
      const schema = await response.json();
      setSchema(schema);
    };

    fetchSchema();
  }, []);

  const initialData = {
    firstName: "John Doe",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    homepage: "https://example.com",
    birthday: "1990-01-01",
    is_active: true,
    address: {
      street_address: "123 Main St",
      city: "Somewhere",
      state: "CA",
    },
  };

  return (
    <Layout>
      <div className="max-w-2xl pb-10">
        {schema && (
          <FormProvider schema={schema} initialData={initialData}>
            <ShadcnFormComponent
              onSubmit={(data) => console.log("Form submitted:", data)}
              onError={(errors) => console.error("Form errors:", errors)}
              customFields={shadcnCustomFields}
            />
          </FormProvider>
        )}
      </div>
    </Layout>
  );
};

export default App;
