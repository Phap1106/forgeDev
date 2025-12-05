// src/components/MarkdownContent.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

type Props = { content: string };

export function MarkdownContent({ content }: Props) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
