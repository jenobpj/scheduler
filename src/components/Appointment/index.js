import React from "react";
import "./Styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("interviewers", props.interviewers);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  function destroy() {
    transition(DELETE, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this interview?"
          onConfirm={destroy}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message="Could not cancel appointment" onClose={back} />
      )}
    </article>
  );
}
