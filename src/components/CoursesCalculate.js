import React, { useEffect, useState } from "react";

const defaultAmountCourseSelect = "UAH";
const defaultCalculatedCourseSelect = "UAH";

function getCourse({ courseList, courseSelect }) {
  const saleCourse = courseList.find(
    (courseItem) => courseItem.ccy === courseSelect
  );
  if (saleCourse) return saleCourse;
  return null;
}

function CoursesCalculate(props) {
  // Variables: Form - input
  const [saleFormValue, setSaleFormValue] = useState(0);
  const [buyFormValue, setBuyFormValue] = useState(0);

  // Variables: Form - select
  const [saleCourseFormSelect, setSaleCourseFormSelect] = useState(
    defaultAmountCourseSelect
  );
  const [buyCourseFormSelect, setBuyCourseFormSelect] = useState(
    defaultCalculatedCourseSelect
  );

  function calculateAmountInput(inputValue) {
    const buySelect = buyCourseFormSelect;

    if (saleCourseFormSelect === buyCourseFormSelect) {
      setBuyFormValue(inputValue);
      return;
    }

    const saleCourse = getCourse({
      courseList: props.courseList,
      courseSelect: buySelect,
    });

    const buyCourse = getCourse({
      courseList: props.courseList,
      courseSelect: saleCourseFormSelect,
    });

    if (saleCourse && buyCourse) {
      setBuyFormValue((saleFormValue / saleCourse.sale) * buyCourse.buy);
      return;
    }

    if (saleCourse !== null) {
      const course = saleCourse.sale;

      setBuyFormValue(inputValue / course);
      return;
    }

    if (buyCourse !== null) {
      setBuyFormValue(saleFormValue * buyCourse.buy);
      return;
    }
  }

  // Handlers: Form to sale input
  function handlerAmountInput(e) {
    const inputValue = e.target.value;
    setSaleFormValue(inputValue);
  }

  // Handlers: Form to sale select
  function handlerSaleSelect(e) {
    const inputValue = e.target.value;
    setSaleCourseFormSelect(inputValue);
  }

  // Handlers: Form to buy select
  function handlerBuySelect(e) {
    const inputValue = e.target.value;
    setBuyCourseFormSelect(inputValue);
  }

  useEffect(() => {
    calculateAmountInput(saleFormValue);
  }, [saleFormValue, saleCourseFormSelect, buyCourseFormSelect]);

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <div>
        <div className="h4">To sale</div>
        <select
          onChange={handlerSaleSelect}
          className="form-control"
          id="exampleFormControlSelect1"
        >
          <option>UAH</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        <input
          className="form-control mt-2"
          type="number"
          value={saleFormValue}
          onChange={handlerAmountInput}
        />
      </div>
      <img className="mx-3" src="changeIcon.svg" />
      <div>
        <div className="h4">To buy</div>
        <select
          onChange={handlerBuySelect}
          className="form-control"
          id="exampleFormControlSelect1"
        >
          <option>UAH</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        <input
          className="form-control mt-2"
          type="number"
          value={buyFormValue}
          disabled
        />
      </div>
    </div>
  );
}

export default CoursesCalculate;
