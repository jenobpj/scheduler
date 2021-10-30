import React, { useEffect } from "react";
import axios from "axios"
import "components/Application.scss";
import DayList from "components/DayList"
import  { useState } from "react";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];
const interview = appointments.map(appointment => (
  <Appointment
    key={appointment.id}
    {...appointment}
  />
  
));
export default function Application(props) {
  const [day, setDay] = useState([]);
  useEffect(()=>{
   axios.get('/api/days')
   .then(res =>{
     setDay(res.data)
   })
  },[])
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
  days={day}
  value={day}   //At first glance, you might think we're just using the onChange event and value property, right? No! We are choosing the name of our props to be the same as those keywords.
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {interview}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}