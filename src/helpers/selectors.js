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