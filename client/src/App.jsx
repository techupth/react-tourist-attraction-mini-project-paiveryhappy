import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import copyIcon from "./image/--.png";

function App() {
  //สร้าง State ขึ้นมา
  const [tripList, setTripList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // สร้าง function เรียกข้อมูลจาก Server ด้วย axios
  async function getDataTrip() {
    const response = await axios.get(`http://localhost:4001/trips?keywords`);
    setTripList(response.data.data);
  }
  // ใช้ useEffect เพื่อรับcallback function getDataTrip มา render ที่component
  useEffect(() => {
    getDataTrip();
  }, []);

  // สร้าง Handler สำหรับกด onclick จากหมวดไปแสดงที่ input
  const handleAddTagToInput = (tag) => {
    const newInputText = searchInput ? searchInput.split(",") : [];
    newInputText.push(tag);
    setSearchInput(newInputText.join(","));
  };

  return (
    <section>
      <header className="text-center">
        <h1 className="text-7xl">เที่ยวไหนดี</h1>
      </header>
      <div className="search-trip">
        <label htmlFor="searchTrip">ค้นหาที่เที่ยว</label> <br />
        <input
          id="searchTrip"
          className="text-center"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          value={searchInput}
        />
      </div>
      {tripList.map((trip) => {
        return (
          <div key={trip.eid} className="card-list mt-12 flex w-full">
            <img src={trip.photos[0]} alt="" />
            <div className="px-5 relative trip-detail">
              <h2 className="text-2xl font-bold">{trip.title}</h2>
              <div>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis content-word">
                  {trip.description}
                </p>
                <p className="underline" id="read-more">
                  <a href={trip.url} target="_blank">
                    อ่านต่อ
                  </a>
                </p>
              </div>

              <div className="group flex">
                <p>หมวด</p>
                {trip.tags.map((tag, i) => {
                  return (
                    <div key={i}>
                      <span
                        onClick={(event) => {
                          event.preventDefault();
                          handleAddTagToInput(tag);
                        }}
                      >
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="image-card flex">
                <div className="pr-6 pt-5">
                  <img src={trip.photos[1]} alt="" />
                </div>
                <div className="pr-6 pt-5">
                  <img src={trip.photos[2]} alt="" />
                </div>
                <div className="pr-6 pt-5">
                  <img src={trip.photos[3]} alt="" />
                </div>
              </div>
              <button
                className="copy-icon"
                onClick={() => {
                  navigator.clipboard.writeText(trip.url);
                  alert("copied on clipboard");
                }}
              >
                <img src={copyIcon} alt="" />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default App;
