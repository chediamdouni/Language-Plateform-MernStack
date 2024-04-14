import React, { useState } from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
import { IoIosSchool } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSlack } from "react-icons/ai";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface TutorSchedule {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
}

interface CalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

const TuteurProfile: React.FC<CalendarState> = () => {
  // const [schedule, setSchedule] = useState<TutorSchedule[]>([]);
  // const [newScheduleItem, setNewScheduleItem] = useState<TutorSchedule>({
  //   id: 0,
  //   day: "",
  //   startTime: "",
  //   endTime: "",
  // });

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setNewScheduleItem({ ...newScheduleItem, [name]: value });
  // };

  // const addScheduleItem = () => {
  //   setSchedule([...schedule, newScheduleItem]);
  //   setNewScheduleItem({
  //     id: newScheduleItem.id + 1,
  //     day: "",
  //     startTime: "",
  //     endTime: "",
  //   });
  // };

  // const removeScheduleItem = (id: number) => {
  //   const updatedSchedule = schedule.filter((item) => item.id !== id);
  //   setSchedule(updatedSchedule);
  // };
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo: any) {
    let title = prompt("Veuillez entrer un nouveau titre pour votre événement");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo: any) {
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer l'événement '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events);
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <TuteurLayout>
      <div className="flex justify-center mt-6 p-6 font-korto font-sans">
        <div className="w-2/3 mr-2 bg-blue-200">
          <div className="flex justify-center ">
            <img src="" alt="tuteur Profile" className="w-64" />
            <div>
              <div className="text-xl font-bold">Theodora D.</div>
              <div className="text-base my-2">
                Build your Future: I will make you fluent in English with
                customized classes. * IELTS Examiner for 5 years and 8 years as
                a 1-1 Online English Tutor * Native Speaker * SAT Exam
                Preparation
              </div>
              <div className="text-gray-400">
                <div className="flex gap-2 items-center text-base">
                  <IoIosSchool color="black" />
                  Teaches English lessons Speaks French (B1),
                </div>
                <div className="flex gap-2 items-center text-base">
                  <AiOutlineSlack color="black" />
                  English (Native),
                </div>
                <div className="flex gap-2 items-center text-base">
                  <BsFillPersonFill color="black" />
                  Greek (B1) 5,689 lessons taught
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 my-6">
            <div className="font-bold">Recent View</div>
            <div>
              So far I had 4 lessons for IELTS speaking test. Theodora gave
              feedback on my English speaking and taught me how to improve. I
              think the lessons are useful!
            </div>
            <div className="underline">View all reviews</div>
          </div>
          <div>
            <div>
              <h2>Modifier l'horaire</h2>
              <div>
                <input
                  type="text"
                  name="day"
                  placeholder="Jour"
                  value={newScheduleItem.day}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="startTime"
                  placeholder="Heure de début"
                  value={newScheduleItem.startTime}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="endTime"
                  placeholder="Heure de fin"
                  value={newScheduleItem.endTime}
                  onChange={handleInputChange}
                />
                <button onClick={addScheduleItem}>Ajouter</button>
              </div>
              <h2>Horaires disponibles</h2>
              <ul>
                {schedule.map((item) => (
                  <li key={item.id}>
                    <span>{item.day}</span>
                    <span>
                      {item.startTime} - {item.endTime}
                    </span>
                    <button onClick={() => removeScheduleItem(item.id)}>
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <CalendarComponent schedule={schedule} /> */}
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          />
        </div>
        <div className="w-1/3 ml-2 bg-blue-200">aaaaaa</div>
      </div>
    </TuteurLayout>
  );
};
export default TuteurProfile;
