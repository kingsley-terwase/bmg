import React from "react";
import { Box } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Heading,
  Link,
  List,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  minHeight = "250px",
  maxHeight = "600px",
  disabled = false,
  toolbar = [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "link",
    "|",
    "bulletedList",
    "numberedList",
  ],
  onReady,
  onFocus,
  onBlur,
  sx = {},
}) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        overflow: "hidden",
        "& .ck-editor__editable": {
          minHeight: minHeight,
          maxHeight: maxHeight,
          overflowY: "auto",
        },
        "& .ck-editor__editable.ck-focused": {
          borderColor: "primary.main",
        },
        ...sx,
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value}
        disabled={disabled}
        onReady={(editor) => {
          if (placeholder) {
            editor.editing.view.change((writer) => {
              const root = editor.editing.view.document.getRoot();
              writer.setAttribute("data-placeholder", placeholder, root);
            });
          }
          if (onReady) {
            onReady(editor);
          }
        }}
        onChange={handleEditorChange}
        onFocus={onFocus}
        onBlur={onBlur}
        config={{
          licenseKey: "GPL",
          plugins: [Essentials, Paragraph, Bold, Italic, Heading, Link, List],
          toolbar: toolbar,
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
              },
            ],
          },
        }}
      />
    </Box>
  );
};

export default RichTextEditor;
