import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import "./list.css"
import {format} from "date-fns"
import { DateRange } from 'react-date-range'
import SearchItem from '../components/SearchItem'
function List() {
    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [options, setOptions] = useState(location.state.options)
    const [openDate, setOpenDate] = useState(false)
  return (
    <div>
        <Navbar />
        <Header type="list" />
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className="lsTitle">
                        Search
                    </h1>
                    <div className="lsItem">
                        <label htmlFor="">Destination</label>
                        <input type="text" placeholder={destination} />
                    </div>
                    <div className="lsItem">
                        <label htmlFor="">Check-in Date</label>
                        <span onClick={() => setOpenDate(!openDate)}>
                            {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
                        </span>
                       {openDate && <DateRange 
                        onChange={item => setDate([item.selection])}
                        minDate={new Date()}
                        ranges={date}
                        />}
                    </div>
                    <div className="lsItem">
                        <label htmlFor="">Options</label>
                        <div className="lsOptionItem">
                            <span className="lsOptionText">
                                Min Price <small>Per night</small>
                            </span>
                            <input type="text" className="lsOptionInput" />
                        </div>
                        <div className="lsOptionItem">
                            <span className="lsOptionText">
                                Max Price <small>Per night</small>
                            </span>
                            <input type="text" className="lsOptionInput" />
                        </div>
                        <div className="lsOptionItem">
                            <span className="lsOptionText">
                                Adult
                            </span>
                            <input type="number" min={1} className="lsOptionInput" placeholder={options.adults} />
                        </div>
                        <div className="lsOptionItem">
                            <span className="lsOptionText">
                                Children
                            </span>
                            <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                        </div>
                        <div className="lsOptionItem">
                            <span className="lsOptionText">
                                Room
                            </span>
                            <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                        </div>
                    </div>
                    <button>Search</button>
                </div>
                <div className="listResult">
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                </div>
            </div>
        </div>
    </div>
  )
}

export default List