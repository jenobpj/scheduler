import React from "react";
import "./Styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
const EMPTY="EMPTY";
const SHOW ="SHOW";

function showing(props){
  return( props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> :<Empty/>)}
  
export default function Appointment(props) {
  
  return (<article className="appointment">
   <Header time={props.time}/> 
   {showing(props)}
  </article>);
}
