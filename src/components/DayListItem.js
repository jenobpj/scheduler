import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  //Build a class based on the props
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  //return message based on the number of spots remaining"
  function formatSpots() {
    let spotsAvailability = " ";
    if (props.spots === 0) {
      spotsAvailability = "no spots remaining";
    } else if (props.spots === 1) {
      spotsAvailability = "1 spot remaining";
    } else {
      spotsAvailability = `${props.spots} spots remaining`;
    }
    return spotsAvailability;
  }
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
