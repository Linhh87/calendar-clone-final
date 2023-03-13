import React from "react";  

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModel:false,
    setShowEventModel: () => {},
    dispatchEvent: (type, payload) => {},
    savedEvents:[],
    selectedEvent: null,
    setSelectedEvents: () => {}, 
    setLabels: () => {},
    labels: [],
    updateLabel: () =>{},
    filteredEvents: []
})

export default GlobalContext