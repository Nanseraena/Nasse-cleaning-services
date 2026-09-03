"use client";
import { useMemo } from "react";
import DOMPurify from "dompurify";
import "./rich-text-editor.css";
export function RichTextContent({html,className=""}:{html:string;className?:string}){const safe=useMemo(()=>DOMPurify.sanitize(html,{USE_PROFILES:{html:true}}),[html]);return <div className={`rich-text-content ${className}`} dangerouslySetInnerHTML={{__html:safe}}/>}
