import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import CoursesCalculate from "./components/CoursesCalculate";

// Layout variable
const CourseListLayout = ({ courseList }) =>
  courseList.map((courseItem, index) => {
    return (
      // Todo: add .row into layout
      <div className="col-4 p-3" key={`course-item-${index}`}>
        <div className="d-flex flex-column justify-content-center align-items-center p-3">
          <div className="h4">{courseItem.ccy}</div>
          <div className="list-group list-group-horizontal">
            <li className="list-group-item d-flex flex-column justify-content-center align-items-center p-3">
              <div className="h5">to buy</div>
              <p className="font-weight-bold mb-0">{courseItem.buy}</p>
            </li>
            <li className="list-group-item d-flex flex-column justify-content-center align-items-center p-3">
              <div className="h5">to sale</div>
              <p className="font-weight-bold mb-0">{courseItem.sale}</p>
            </li>
          </div>
        </div>
      </div>
    );
  });

function App() {
  // Variables
  const [courseList, setCourseList] = useState([]);
  const mounted = useRef(false);

  // Fetch request on load page one time
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      (async function fetchCourse() {
        // Todo: fix two requests on create app
        try {
          const { data } = await axios.get(
            "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
          );
          setCourseList(data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  return (
    <div className="App container mt-5 mb-5">
      <header>
        <h2 className="text-center">Current course</h2>
        {courseList && (
          <div className="row">
            <CourseListLayout courseList={courseList} />
          </div>
        )}
      </header>
      <hr />
      <main className="mt-3">
        <CoursesCalculate courseList={courseList} />
      </main>
    </div>
  );
}

export default App;
