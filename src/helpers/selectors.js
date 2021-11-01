export const getAppointmentsForDay=(state,day)=>{
  const dayObj=state.days.find(elem => elem.name === day)//checking the days.name ===  day which we provide
  if(!dayObj){
    return[];
  }
  const appointmentIDs=dayObj.appointments;//it save the appointments of the day
  const appointmentsForDay=[];//make new array
 for(const id in state.appointments){//loop through the key in appointments
   if(appointmentIDs.includes(Number(id))){//checks if the id includes in the appointments
     appointmentsForDay.push(state.appointments[id]);//then push the whole object into new array
   }
 }
 return appointmentsForDay;

}

export const getInterviewersForDay = (state, day) => {
  const dayObj = state.days.find(elem => elem.name === day);

  if (!dayObj) {
    return [];
  }

  const interviewerIds = dayObj.interviewers;

  const interviewersForDay = [];

  for (const id in state.interviewers) {
    if (interviewerIds.includes(Number(id))) {
      interviewersForDay.push(state.interviewers[id])
    }
  }

  return interviewersForDay;
}


export const getInterview =(state,interview)=>{
  if(!interview){
    return null;
  }
  const interviewerId=interview.interviewer;
  for(const id in state.interviewers){
    if(Number(id)===interviewerId){
      return(
        {
          student:interview.student,
          interviewer:state.interviewers[id]
        }
      )
    }
  }
}