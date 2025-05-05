declare module "react-quill" {
  import * as React from "react";

  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (value: string) => void;
    modules?: any;
    formats?: string[];
    className?: string;
  }

  declare class ReactQuill extends React.Component<ReactQuillProps> {}

  export default ReactQuill;
}
