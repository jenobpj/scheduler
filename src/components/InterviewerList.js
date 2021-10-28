import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
export default function InterviewerList(props) {
  const interviewListItems = props.interviewers.map((interview) => (
    <InterviewerListItem
      key={interview.id}
      name={interview.name}
      avatar={interview.avatar}
      setInterviewer={() => props.onChange(interview.id)}
      selected={interview.id === props.value}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewListItems}</ul>
    </section>
  );
}
