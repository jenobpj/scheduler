import React, { useEffect } from "react";
import axios from "axios"
import "components/Application.scss";
import DayList from "components/DayList"
import  { useState } from "react";
import Appointment from "components/Appointment";
import { getAppointmentsForDay,getInterview,getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(()=>{
   Promise.all([
     axios.get("/api/days"),
     axios.get("/api/appointments"),
     axios.get("/api/interviewers")
   ]).then(all=>{
     setState(prev =>({...prev,days:all[0].data,appointments:all[1].data,interviewers:all[2].data}));
   })
  },[])


  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(response => setState(state => ({ ...state, appointments })));
  
  }




  const appointmentsForDay=getAppointmentsForDay(state,state.day)
  const interviewersForDay = getInterviewersForDay(state, state.day); 
  const schedule = appointmentsForDay.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
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
