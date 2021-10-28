import React,{useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props){
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
//Reset form and goes to previous appointment visual mode
//called when user cancels out of an appointment form
const reset=()=>{
  setStudent("");
  setInterviewer(null);
}
const cancel=()=>{
  reset();
  props.onCancel();
}
const validate=()=>{
  
}
  return(
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form  onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={event=>setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
       <Button confirm onClick={validate}>Save</Button> 
    </section>
  </section>
</main>

  )
}