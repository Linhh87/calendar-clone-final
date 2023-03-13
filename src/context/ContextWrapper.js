import dayjs from 'dayjs'
import React, {useEffect, useState, useReducer, useMemo} from 'react'
import GlobalContext from './GlobalContext'

function savedEventReducer(state, {type, payload}){
    switch (type) {
        case 'push':
            return[...state, payload];

        case "update":
            return state.map(evt => evt.id === payload.id ? payload : evt);
        case 'delete':
            return state.filter(evt => evt.id !== payload.id);
        default:
            throw new Error ();
    }
}

function initEvent() {
    const storageEvent = localStorage.getItem('savedEvent');
    const parsedEvent = storageEvent ? JSON.parse(storageEvent):[];
    return parsedEvent
}
export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModel, setShowEventModel] = useState(false);
    const [selectedEvent, setSelectedEvents] = useState(null);
    const [labels, setLabels] = useState([])
    const [savedEvents,dispatchCalEvent] = useReducer(savedEventReducer, [],initEvent );
    const filteredEvents = useMemo(() => {
        return savedEvents
        .filter((evt) => labels.filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
        )}, [savedEvents, labels])
    useEffect(() =>{
        localStorage.setItem('saveEvent', JSON.stringify(savedEvents))
    }, [savedEvents]);

    useEffect(() =>{
        setLabels((prevLabels) => {
            return [...new Set( savedEvents.map(evt => evt.label) )].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                }
            })
        })
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex (smallCalendarMonth);
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        if(!showEventModel){
            setSelectedEvents(null);
        }
    }, [showEventModel])

    function updateLabel(label) {
        setLabels (labels.map((lbl) => lbl.label === label.label ? label :lbl))
    }
    return (
    
        <GlobalContext.Provider 
        value={{monthIndex, 
        setMonthIndex, 
        setSmallCalendarMonth, 
        smallCalendarMonth, 
        daySelected,
        setDaySelected,
        showEventModel,
        setShowEventModel,
        dispatchCalEvent,
        savedEvents,
        selectedEvent, 
        setSelectedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
