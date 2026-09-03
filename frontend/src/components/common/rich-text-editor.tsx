"use client";
import dynamic from "next/dynamic";
import { forwardRef,useImperativeHandle,useMemo,useRef } from "react";
import "./rich-text-editor.css";
const ReactQuill=dynamic(()=>import("react-quill-new").then(module=>module.default),{ssr:false});
export type RichTextEditorRef={focus:()=>void;getEditor:()=>unknown};
type RichTextEditorProps={value:string;onChange:(value:string)=>void;label?:string;placeholder?:string;disabled?:boolean;required?:boolean;maxLength?:number;minHeight?:string;className?:string};
const plainText=(html:string)=>html.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();
export const RichTextEditor=forwardRef<RichTextEditorRef,RichTextEditorProps>(function RichTextEditor({value,onChange,label,placeholder,disabled=false,required=false,maxLength,minHeight="150px",className=""},outerRef){
 const wrapperRef=useRef<HTMLDivElement|null>(null);useImperativeHandle(outerRef,()=>({focus:()=>wrapperRef.current?.querySelector<HTMLElement>(".ql-editor")?.focus(),getEditor:()=>wrapperRef.current?.querySelector(".ql-editor")??null}));
 const modules=useMemo(()=>({toolbar:[[{header:[2,3,false]}],["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],["link"],[{color:[]}],["clean"]]}),[]);
 const formats=useMemo(()=>["header","bold","italic","underline","strike","list","link","color"],[]);
 const change=(html:string)=>{const normalized=html==="<p><br></p>"?"":html;if(maxLength&&plainText(normalized).length>maxLength)return;onChange(normalized)};
 return <div ref={wrapperRef} className={className}>{label&&<label className="mb-2 block text-sm font-semibold text-brand-navy">{label}{required&&<span className="text-red-500"> *</span>}</label>}<input className="sr-only" tabIndex={-1} aria-hidden="true" required={required} value={plainText(value)} onChange={()=>{}}/><div className="rich-text-editor" style={{"--editor-min-height":minHeight} as React.CSSProperties}><ReactQuill theme="snow" value={value} onChange={change} readOnly={disabled} placeholder={placeholder} modules={modules} formats={formats}/></div>{maxLength&&<p className="mt-1 text-right text-xs text-slate-400">{plainText(value).length}/{maxLength}</p>}</div>
});
export default RichTextEditor;
