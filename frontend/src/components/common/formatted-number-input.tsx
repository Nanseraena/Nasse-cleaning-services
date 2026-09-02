"use client";
import { InputHTMLAttributes,useEffect,useRef,useState } from "react";

type FormattedNumberInputProps=Omit<InputHTMLAttributes<HTMLInputElement>,"type"|"inputMode"|"value"|"onChange">&{value:string|number;onValueChange:(value:number)=>void};
const formatNumber=(value:string|number)=>new Intl.NumberFormat("en-UG",{maximumFractionDigits:0}).format(Number(value));

export function FormattedNumberInput({value,onValueChange,className="",min,max,...props}:FormattedNumberInputProps){
 const inputRef=useRef<HTMLInputElement>(null);const [inputValue,setInputValue]=useState(()=>value!==undefined&&value!==null&&String(value)!=="0"&&String(value)!==""?formatNumber(value):"");
 useEffect(()=>{setInputValue(value!==undefined&&value!==null&&String(value)!=="0"&&String(value)!==""?formatNumber(value):"")},[value]);
 const validate=(numeric:number|null)=>{const input=inputRef.current;if(!input)return;let message="";if(numeric!==null&&min!==undefined&&numeric<Number(min))message=`Value must be at least ${formatNumber(String(min))}.`;if(numeric!==null&&max!==undefined&&numeric>Number(max))message=`Value must be no more than ${formatNumber(String(max))}.`;input.setCustomValidity(message)};
 const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{const digits=event.target.value.replace(/,/g,"").replace(/\D+/g,"");if(!digits){setInputValue("");validate(null);onValueChange(0);return}const numeric=parseInt(digits,10);setInputValue(event.target.value);validate(numeric);if(!Number.isNaN(numeric))onValueChange(numeric)};
 const handleBlur=()=>{setInputValue(value!==undefined&&value!==null&&String(value)!=="0"&&String(value)!==""?formatNumber(value):"");validate(value===""||String(value)==="0"?null:Number(value))};
 return <input {...props} ref={inputRef} type="text" inputMode="numeric" min={min} max={max} className={className} value={inputValue} onChange={handleChange} onBlur={handleBlur}/>;
}
export default FormattedNumberInput;
