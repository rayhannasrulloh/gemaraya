// src/react-quill.d.ts

declare module 'react-quill-new' {
  import React from 'react';

  // Kita mendefinisikan "kontrak" props apa saja yang diterima oleh ReactQuill
  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (content: string, delta: any, source: string, editor: any) => void;
    modules?: any;
    formats?: string[];
    bounds?: string | HTMLElement;
    children?: React.ReactElement<any>;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}