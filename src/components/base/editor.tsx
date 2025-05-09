import * as monaco from "monaco-editor";
import React, { useRef, useEffect, useState } from "react";
import { toast } from "sonner";

interface CodeEditorCoreProps {
  prefix: string;
  language: string;
  starterCode: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function useCodeEditorCore({
  prefix,
  language,
  starterCode,
}: CodeEditorCoreProps) {
  const LS_CODE = `${prefix}code`;
  
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(LS_CODE) || starterCode;
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    localStorage.setItem(LS_CODE, value);
  }, [value, LS_CODE]);

  const handleReset = () => {
    // Reset the state
    setValue(starterCode);
    
    // Update the editor content if it exists
    if (monacoEditorRef.current) {
      monacoEditorRef.current.setValue(starterCode);
    }
    
    // Clear localStorage
    localStorage.setItem(LS_CODE, starterCode);
    
    toast.info("Editor has been reset to default code");
  };

  useEffect(() => {
    if (!editorRef.current) return;

    if (language === "html") {
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
    }

    const editor = monaco.editor.create(editorRef.current, {
      value,
      language,
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
    editor.onDidChangeModelContent(() => {
      setValue(editor.getValue());
    });
    return () => {
      editor.dispose();
    };
  }, []);

  return {
    editorRef,
    value,
    handleReset,
  };
}
