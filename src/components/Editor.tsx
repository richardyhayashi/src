'use client';

import React from 'react';
import { useTheme } from 'next-themes';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';

import { useEdgeStore } from '@/lib/edgestore';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    //editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    //onEditorContentChange: (editor) => {
    //  onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    //},
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={resolvedTheme == 'dark' ? 'dark' : 'light'}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
