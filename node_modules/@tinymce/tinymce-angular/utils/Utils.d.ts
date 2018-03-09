import { EditorComponent } from '../editor/editor.component';
export declare const bindHandlers: (ctx: EditorComponent, editor: any) => void;
export declare const uuid: (prefix: string) => string;
export declare const isTextarea: (element?: Element) => element is HTMLTextAreaElement;
export declare const mergePlugins: (initPlugins: string | string[], inputPlugins?: string | string[]) => string[];
