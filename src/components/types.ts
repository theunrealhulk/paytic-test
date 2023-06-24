export type DropZoneItem = {
    id: string;
    position: string;
    value?: any;
    type?: string;
  };

  export type DropZoneProps = {
    title?: string;
    onStateChange?: (newState: DropZoneItem[]) => void;
  };
  
  export type DropZoneState = {
    data: DropZoneItem[];
  };