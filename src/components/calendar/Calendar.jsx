import { useRef, memo } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const Calendar = (props) => {
  const calendarRef = useRef(null);
  const { events } = props;

  const navigate = useNavigate();

  const calendarOptions = {
    events: events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    height: "82vh",
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,

    eventClick({ event: clickedEvent }) {
      console.log(clickedEvent);
      navigate("/admin/tasks/update", {
        state: { taskId: clickedEvent._def.publicId, sprintId: clickedEvent._def.extendedProps.sprintId },
      });
    },

    dateClick(info) {},
    eventDrop({ event: droppedEvent }) {},

    eventResize({ event: resizedEvent }) {},

    ref: calendarRef,
    direction: "ltr",
  };

  return <FullCalendar {...calendarOptions} />;
};

export default memo(Calendar);
