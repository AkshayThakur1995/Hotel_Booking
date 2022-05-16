import React, {useState} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "./header.css"
import { DateRange } from 'react-date-range';
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';
function Header({type}) {
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [openDate, setOpenDate] = useState(false) 
      const [destination, setDestination] = useState("")
      const [openOptions, setopenOptions] = useState(false) 
      const [options, setOptions] = useState({
          adults:1,
          children:0,
          room:1
      })

      const handleOption = (name, operation) => {
          setOptions(prev => {
              return {
                  ...prev, [name] : operation === "dec"  ? options[name] - 1 : options[name] + 1
              }
          })
      }
      const navigate = useNavigate()
      const handleSearch = () => {
        navigate("/hotels", {state: {destination,date,options}} )
      }

  return (
    <div className='header'>
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
            <i className="fa-solid fa-bed"></i>
            <span>Stays</span>
            </div>
            <div className="headerListItem">
            <i className="fa-solid fa-plane"></i>
            <span>Flights</span>
            </div>
            <div className="headerListItem">
            <i className="fa-solid fa-car"></i>
            <span>Car rentals</span>
            </div>
            <div className="headerListItem">
            <i className="fa-solid fa-mountain-city"></i>
            <span>Attractions</span>
            </div>
            <div className="headerListItem">
            <i className="fa-solid fa-taxi"></i>
            <span>Airport taxis</span>
            </div>
        </div>
        { type !== "list" &&  <> <h1 className="headerTitle">
            A lifetime of discounts and fun
        </h1>
        <p className="headerDesc">
            Get rewarded for your traverls - unlock instant saving of 105 OR MORE WITH FREE Bookng account
        </p>
        <button className="headerBtn">Sign in / Register</button>
        <div className="headerSearch">
            <div className="headerSearchItem">
            <i className="fa-solid fa-bed headerIcon"></i>
            <input type="text" placeholder='where are you going' className='headerSearchInput' onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div  className="headerSearchItem">
            <i className="fa-solid fa-calendar-days headerIcon"></i>
            <span onClick={() => setOpenDate(!openDate)}  className='headerSearchtext'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
            {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()}
                />}
            </div>
            <div className="headerSearchItem" >
            <i className="fa-solid fa-person headerIcon"></i>
            <span className='headerSearchtext' onClick={() => setopenOptions(!openOptions)}>
                {`${options.adults} adult - ${options.children} children - ${options.room} room`}</span>
                {openOptions && <div className="options">
                    <div className="optionItem">
                        <span className="optionText">
                            Adults
                        </span>
                        <div className="optionCounter" >
                        <button disabled={options.adults 
                        <= 1
                        }  className="optionCounterButton" onClick={() => handleOption("adults", "dec")}>-</button>
                        <span className='optionCounterNumber'>{options.adults} </span>
                        <button className="optionCounterButton" onClick={() => handleOption("adults", "inc")}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">
                            Children
                        </span>
                        <div className="optionCounter">
                        <button disabled={options.children 
                        <= 0}className="optionCounterButton" onClick={() => handleOption("children", "dec")}>-</button>
                        <span className='optionCounterNumber'>{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("children", "inc")}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">
                            Room
                        </span>
                        <div className="optionCounter">
                        <button disabled={options.room 
                        <= 1}className="optionCounterButton" onClick={() => handleOption("room", "dec")}>-</button>
                        <span className='optionCounterNumber'>{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption("room", "inc")}>+</button>
                        </div>
                    </div>
                </div>}
            
            </div>
            <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>Search</button>
            </div>
        </div></>}
        </div>
    </div>
  )
}

export default Header