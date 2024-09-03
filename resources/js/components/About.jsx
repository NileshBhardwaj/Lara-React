import axios from "axios";
import React, { useState, useEffect } from "react";

function About() {
  const [formdata, setform] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
    country: "",
    state: "",
    city: "",
  });

  // Set the state for the Countries

  const [countries, setContry] = useState([]);

  // Set the state for the states

  const [states, setState] = useState([]);

  // set the state for the

  const [city, setCity] = useState([]);

  const setformdata = (e) => {
    // ...formdata : create a new object of the formdata
    setform({ ...formdata, [e.target.name]: [e.target.value] });
  };

  const submitContatctUs = (e) => {
    console.log(formdata);
    e.preventDefault();
  };

  const getCountries = () => {
    axios
      .get("/getCountries")
      .then(function (response) {
        // console.log(response);
        setContry(response.data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  useEffect(() => {
    getCountries();
  }, []);

  const handleCountryChange = (event) => {
    const id = event.target.value;
    axios
      .post("/getStates", {
        id: id,
      })
      .then(function (response) {
        // console.log(response);
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleStateChange = (event) => {
    const stateId = event.target.value;
    axios
      .post("/getCity", {
        stateId: stateId,
      })
      .then(function (response) {
        setCity(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-4 display-5 text-center">Contact</h2>
              <p className="text-secondary mb-5 text-center">
                The best way to contact us is to use our contact form below.
                Please fill out all of the fields and we will get back to you as
                soon as possible.
              </p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9">
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <form onSubmit={submitContatctUs}>
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                    <div className="col-12">
                      <label htmlFor="fullname" className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        onChange={setformdata}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          onChange={setformdata}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          onChange={setformdata}
                        />
                      </div>
                    </div>

                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="country"
                      onChange={handleCountryChange}
                    >
                      <option selected>Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>

                    <select
                      className="form-select"
                      name="state"
                      aria-label="Default select example"
                      onChange={handleStateChange}
                    >
                      <option selected>Select State</option>

                      {states.map((state, index) => (
                        <option key={index} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>

                    <select
                      className="form-select"
                      name="city"
                      aria-label="Default select example"
                    >
                      <option selected>Select State</option>
                      {city.map((cities, index) => (
                        <option key={index} value={cities.id}>
                          {cities.name}
                        </option>
                      ))}
                    </select>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="3"
                        onChange={setformdata}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default About;
