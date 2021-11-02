import React, { useEffect } from "react";
import axios from "axios"
import "components/Application.scss";
import DayList from "components/DayList"
import  { useState } from "react";
import Appointment from "components/Appointment";
import { getAppointmentsForDay,getInterviewersForDay,getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  
const { state, setDay, bookInterview, cancelInterview } = useApplicationData()

  const appointmentsForDay=getAppointmentsForDay(state,state.day);
  const interviewersForDay=getInterviewersForDay(state,state.day);

  const schedule = appointmentsForDay.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log("days",interviewersForDay)
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}   //At first glance, you might think we're just using the onChange event and value property, right? No! We are choosing the name of our props to be the same as those keywords.
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}
