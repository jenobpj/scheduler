export const getAppointmentsForDay=(state,day)=>{
  const dayObj=state.days.find(elem => elem.name === day)
  return dayObj
}