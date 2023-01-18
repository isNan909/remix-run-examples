import { useState } from "react";
import { Form } from "@remix-run/react";
import { json } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import stylesheetQuill from "react-quill/dist/quill.snow.css";
import { TextEditor } from "~/components/textEditor.client";
import { FallbackComponent } from "~/components/fallback-component"

import type { ActionArgs, LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheetQuill }];
}

export const action = async ({ request }: ActionArgs)  => {
  const form = await request.formData();

  const textEditorValue = form.get("textEditor");
  return json({textEditorValue});
};

export default function Index() {
  const [textEditor, setTextEditor] = useState("");
  return (
    <Form method="post">
      <ClientOnly fallback={<FallbackComponent />}>
        {() => (
          <TextEditor
            theme="snow"
            placeholder="Write description"
            onChange={setTextEditor}
            value={textEditor}
          />
        )}
      </ClientOnly>
      <input
        type="hidden"
        name="textEditor"
        value={textEditor}
      />
      <br />
      <button type="submit">Submit</button>
    </Form>
  );
}
