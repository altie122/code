import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCodeEditorCore } from "../base/editor";

const LS_PREFIX = "homepage-hero-example-";
const LS_COMPLETED = `${LS_PREFIX}completed`;
const LS_CONGRATULATED = `${LS_PREFIX}congratulated`;

const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      background-color: #000000;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <!-- Add "<h1>Hello, world!</h1>" below -->
</body>
</html>
`;

export function ExampleCodeEditor() {
  const { editorRef, value, handleReset } = useCodeEditorCore({
    prefix: LS_PREFIX,
    language: "html",
    starterCode: DEFAULT_CODE,
  });

  const [completed, setCompleted] = useState<boolean>(() => {
    return localStorage.getItem(LS_COMPLETED) === "true";
  });
  const [congratulated, setCongratulated] = useState<boolean>(() => {
    return localStorage.getItem(LS_CONGRATULATED) === "true";
  });

  // Save to localStorage whenever completed or congratulated changes
  useEffect(() => {
    localStorage.setItem(LS_COMPLETED, String(completed));
    localStorage.setItem(LS_CONGRATULATED, String(congratulated));
  }, [completed, congratulated]);

  useEffect(() => {
    let completed = false;
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(value, "text/html");
      const h1s = doc.body.getElementsByTagName("h1");
      for (let i = 0; i < h1s.length; i++) {
        if (h1s[i].textContent?.trim() === "Hello, world!") {
          completed = true;
          break;
        }
      }
    } catch (e) {}
    setCompleted(completed);

    if (completed && !congratulated) {
      toast.success("Congratulations! Example code completed!", {
        action: {
          label: "Explore tutorials",
          onClick: () => (window.location.href = "/tutorials"),
        },
      });
      setCongratulated(true);
    }
  }, [value, congratulated]);

  const handleFullReset = () => {
    handleReset();
    setCompleted(false);
    setCongratulated(false);
    localStorage.setItem(LS_COMPLETED, "false");
    localStorage.setItem(LS_CONGRATULATED, "false");
  };

  return (
    <div className='flex flex-col rounded-t-xl border border-border shadow w-full'>
      <div className='flex flex-row justify-between items-center p-2'>
        <h2 className='prose-h2-nounderline'>Try it out!</h2>
        <Button variant='outline' onClick={handleFullReset}>
          Reset
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row">
        <iframe srcDoc={value} title='preview' className='h-160 w-full lg:order-2' />
        <div ref={editorRef} id='editor' className='h-160 w-full lg:order-1' />
      </div>
    </div>
  );
}
