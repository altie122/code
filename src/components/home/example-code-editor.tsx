import * as monaco from "monaco-editor";
import React, { useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const LS_PREFIX = "homepage-hero-example-";
const LS_CODE = `${LS_PREFIX}code`;
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
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(LS_CODE) || DEFAULT_CODE;
  });
  const [completed, setCompleted] = useState<boolean>(() => {
    return localStorage.getItem(LS_COMPLETED) === "true";
  });
  const [congratulated, setCongratulated] = useState<boolean>(() => {
    return localStorage.getItem(LS_CONGRATULATED) === "true";
  });

  // Save to localStorage whenever value, completed, or congratulated changes
  useEffect(() => {
    localStorage.setItem(LS_CODE, value);
    localStorage.setItem(LS_COMPLETED, String(completed));
    localStorage.setItem(LS_CONGRATULATED, String(congratulated));
  }, [value, completed, congratulated]);

  const handleReset = () => {
    // Reset the state
    setValue(DEFAULT_CODE);
    setCompleted(false);
    setCongratulated(false);
    
    // Update the editor content if it exists
    if (monacoEditorRef.current) {
      monacoEditorRef.current.setValue(DEFAULT_CODE);
    }
    
    // Clear localStorage
    localStorage.setItem(LS_CODE, DEFAULT_CODE);
    localStorage.setItem(LS_COMPLETED, "false");
    localStorage.setItem(LS_CONGRATULATED, "false");
    
    toast.info("Editor has been reset to default code");
  };

  useEffect(() => {
    if (!editorRef.current) return;

    monaco.languages.html.htmlDefaults.setOptions({
      format: {
        tabSize: 2,
        insertSpaces: true,
        wrapLineLength: 120,
        unformatted: "",
        contentUnformatted: "pre,code,textarea",
        indentInnerHtml: false,
        preserveNewLines: true,
        maxPreserveNewLines: undefined,
        indentHandlebars: false,
        endWithNewline: false,
        extraLiners: "head, body, /html",
        wrapAttributes: "auto",
      },
      suggest: {
        html5: true,
      },
    });

    monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: [">"],
      provideCompletionItems: (model, position) => {
        const codePre: string = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });

        const tag = codePre.match(/.*<(\w+)>$/)?.[1];

        if (!tag) {
          return;
        }

        const word = model.getWordUntilPosition(position);

        return {
          suggestions: [
            {
              label: `</${tag}>`,
              kind: monaco.languages.CompletionItemKind.EnumMember,
              insertText: `$1</${tag}>`,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
              },
            },
          ],
        };
      },
    });

    const editor = monaco.editor.create(editorRef.current, {
      value,
      language: "html",
      automaticLayout: true,
      theme: "vs-dark",
      autoClosingBrackets: "always",
      autoClosingComments: "always",
      autoClosingOvertype: "always",
      autoClosingQuotes: "always",
      autoIndent: "advanced",
      wordBasedSuggestionsOnlySameLanguage: true,
      formatOnPaste: true,
      formatOnType: true,
    });

    monacoEditorRef.current = editor;

    // Update state when editor content changes
    editor.onDidChangeModelContent(() => {
      setValue(editor.getValue());
    });

    // Cleanup
    return () => {
      editor.dispose();
    };
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      toast.success("Congratulations! You have completed the example code!", {
        action: {
          label: "Check out our actual tutorials",
          onClick: () => (window.location.href = "/tutorials"),
        },
      });
      setCongratulated(true);
    }
  }, [value, congratulated]);

  return (
    <div className='flex flex-col rounded-t-xl border border-border shadow w-full'>
      <div className="flex flex-row justify-between items-center p-2">
        <h2 className='prose-h2-nounderline'>Try it out!</h2>
        <Button variant="outline" onClick={handleReset}>Reset</Button>
      </div>
      <iframe srcDoc={value} title='preview' className='h-80 w-full' />
      <div ref={editorRef} id='editor' className='h-80 w-full' />
    </div>
  );
}
