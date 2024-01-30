"use client";

import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Swal from "sweetalert2";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Register2page() {
  const currentYear = new Date().getFullYear();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    countryCode: "",
    contact: "",
    gender: "",
    dateofbirth: "",
    Yearofpassing: "",
    MartialStatus: "",
    Currentprofession: "",
    Professiondescription: "",
    Address: "",
    Pincode: "",
    City: "",
    State: "",
    Foundestoflifeandschool: "",
    Suggestion: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    countryCode: "",
    contact: "",
    gender: "",
    dateofbirth: "",
    Yearofpassing: "",
    MartialStatus: "",
    Currentprofession: "",
    Professiondescription: "",
    Address: "",
    Pincode: "",
    City: "",
    State: "",
    Foundestoflifeandschool: "",
    Suggestion: "",
  });

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const countryCodes = ["+1", "+91", "+44", "+33"];

  const handleFormChange = (field: any, value: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));

    let errorMessage = "";
    if (field === "firstname") {
      if (value.trim() === "") {
        errorMessage = "First Name is required";
      } else if (!/^[a-zA-Z\s\-',.]*$/.test(value)) {
        errorMessage = "First Name should only contain letters";
      }
    } else if (field === "lastname") {
      if (value.trim() === "") {
        errorMessage = "Last Name is required";
      } else if (!/^[a-zA-Z\s\-',.]*$/.test(value)) {
        errorMessage = "Last Name contains invalid characters";
      }
    } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Invalid Email";
    } else if (field === "contact" && !/^\d{10}$/.test(value)) {
      errorMessage = "Invalid Contact Number";
    }
    if (field === "countryCode") {
      if (!/^\+\d{1,4}$/.test(value)) {
        errorMessage = "Invalid Country Code";
      }
    } else if (field === "gender" && value === "") {
      errorMessage = "Gender is required";
    } else if (field === "dateofbirth") {
      if (value.trim() === "") {
        errorMessage = "Date of Birth is required";
      } else {
        const birthYear = new Date(value).getFullYear();
        const currentYear = new Date().getFullYear();
        if (birthYear < 1950 || birthYear > 2018) {
          errorMessage = "Invalid Date of Birth";
        }
      }
    } else if (field === "Yearofpassing") {
      const selectedYear = parseInt(value);
      if (
        isNaN(selectedYear) ||
        selectedYear < 1950 ||
        selectedYear > currentYear
      ) {
        errorMessage =
          "Year of Passing should be between 1950 and the current year";
      }
    } else if (field === "MartialStatus" && value === "") {
      errorMessage = "MartialStatus is required";
    } else if (field === "Currentprofession" && value.trim() === "") {
      errorMessage = "Current profession is required";
    } else if (field === "Professiondescription" && value.trim() === "") {
      errorMessage = "Profession description is required";
    } else if (field === "Address" && value.trim() === "") {
      errorMessage = "Address is required";
    } else if (field === "Pincode" && !/^\d{6}$/.test(value)) {
      errorMessage = "Pincode is required";
    } else if (field === "City" && value.trim() === "") {
      errorMessage = "City is required";
    } else if (field === "State" && value.trim() === "") {
      errorMessage = "State is required";
    } else if (field === "Foundestoflifeandschool" && value.trim() === "") {
      errorMessage = "Foundest of life and school is required";
    } else if (field === "Suggestion" && value.trim() === "") {
      errorMessage = "Suggestion is required";
    }

    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const nextStep = () => {
    if (activeStep < 2) setActiveStep((currentStep) => currentStep + 1);
  };

  const prevStep = () => {
    if (activeStep !== 0) setActiveStep((currentStep) => currentStep - 1);
  };

  const handleFormSubmit = async () => {
    const {
      firstname,
      lastname,
      email,
      countryCode,
      contact,
      gender,
      dateofbirth,
      Yearofpassing,
      MartialStatus,
      Currentprofession,
      Professiondescription,
      Address,
      Pincode,
      City,
      State,
      Foundestoflifeandschool,
      Suggestion,
    } = formData;

    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        countryCode,
        contact,
        gender,
        dateofbirth,
        Yearofpassing,
        MartialStatus,
        Currentprofession,
        Professiondescription,
        Address,
        Pincode,
        City,
        State,
        Foundestoflifeandschool,
        Suggestion,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const customId = responseData.id;
      Swal.fire({
        icon: "success",
        title: "Form Submitted",
        text: `Your form has been successfully submitted! Your custom ID is: ${customId}`,
      });
    } else {
      // Show SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting the form. Please try again later.",
      });
    }

    console.log(formData);
  };

  const getStepContent = (step: any) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className=" bg-white ">
              <div>
                <img
                  src="v1.png"
                  alt="12"
                  className=" md:w-[40%] md:ml-[60%] w-[60%] ml-[40%] "
                />
                <img
                  src="Form1.gif"
                  alt="13"
                  className="md:w-[18%] md:ml-[75%] md:-mt-[25%] w-[30%] ml-[69%] -mt-[34%]"
                />
              </div>
              <div className="w-full md:hidden">
                <Stepper
                  orientation="horizontal"
                  activeStep={activeStep}
                  className="w-[100%]  !bg-transparent  ml-2 mt-9  "
                  id="custom-stepper1"
                >
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 1</p>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 2</p>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 3</p>
                  </Step>
                </Stepper>
              </div>
              <div>
                <h2 className="md:p-2 md:flex justify-center md:mr-20 md:text-3xl text-cyan-800 md: mt-3  text-2xl nb  ml-20 ">
                  REGISTER FORM
                </h2>
              </div>
              <div className="p-2 ml-5">
                <div className="flex">
                  <div className="w-[100%] ">
                    <label className="text-base text-black">First Name</label>
                    <br />
                    <input
                      placeholder="Enter Your First Name"
                      value={formData.firstname}
                      onChange={(e) =>
                        handleFormChange("firstname", e.target.value)
                      }
                      className="md:w-[80%] w-[89%]  text-xs md:text-sm p-2 rounded-md border focus:outline-none"
                    />
                    <p className="text-red-500">{formErrors.firstname}</p>
                  </div>
                  <div className="w-[100%]">
                    <label className="text-base text-black">Last Name</label>
                    <br />
                    <input
                      placeholder="Enter Your Last Name"
                      value={formData.lastname}
                      onChange={(e) =>
                        handleFormChange("lastname", e.target.value)
                      }
                      className="md:w-[80%] w-[89%]  text-xs md:text-sm p-2 rounded-md border focus:outline-none"
                    />
                    <p className="text-red-500">{formErrors.lastname}</p>
                  </div>
                </div>
                <div>
                  <label className="text-base text-black">E-Mail</label>
                  <br />
                  <input
                    placeholder="Enter Your E-Mail"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className="md:w-[90%] w-[94%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">{formErrors.email}</p>
                </div>
                <div>
                  <label className="text-base text-black">Contact No</label>
                  <br />
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) =>
                        handleFormChange("countryCode", e.target.value)
                      }
                      className="w-[15%] md:w-[10%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                    >
                      {countryCodes.map((code, index) => (
                        <option key={index} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <input
                      placeholder="Enter Your Contact No"
                      value={formData.contact}
                      onChange={(e) =>
                        handleFormChange("contact", e.target.value)
                      }
                      className=" md:w-[79%] w-[75%] p-2 rounded-md border  text-xs md:text-sm focus:outline-none"
                    />
                  </div>
                  <p className="text-red-500">{formErrors.contact}</p>
                  <p className="text-red-500">{formErrors.countryCode}</p>
                </div>
                <div>
                  <RadioGroup
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleFormChange("gender", e.target.value)}
                  >
                    <label className="text-base text-black">Gender</label>
                    <div className="flex">
                      <div>
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          value="others"
                          control={<Radio />}
                          label="Others"
                        />
                      </div>
                    </div>
                  </RadioGroup>
                  <p className="text-red-500">{formErrors.gender}</p>
                </div>
                <div>
                  <input
                    placeholder="Enter Your Date Of Birth"
                    type="date"
                    value={formData.dateofbirth}
                    onChange={(e) =>
                      handleFormChange("dateofbirth", e.target.value)
                    }
                    className="md:w-[90%] w-[92%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">{formErrors.dateofbirth}</p>
                </div>
              </div>
              <div className="p-1 flex justify-end">
                <button
                  className="border border-black text-black p-2 rounded-md hover:bg-black hover:text-white mr-9  md:mr-20 md:px-6"
                  color="primary"
                  onClick={nextStep}
                  disabled={activeStep === 2}
                >
                  Save & Next
                </button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className=" bg-white">
              <div>
                <img
                  src="v2.png"
                  alt="12"
                  className="md:w-[54%] md:ml-[46%] md:-mt-24 w-[65%] -mt-12 ml-[35%] "
                />
                <img
                  src="Form2.gif"
                  alt="13"
                  className="md:w-[20%] md:ml-[72%] md:-mt-[27%] w-[28%] ml-[60%] -mt-[37%]"
                />
              </div>
              <div className="w-full md:hidden">
                <Stepper
                  orientation="horizontal"
                  activeStep={activeStep}
                  className="w-[100%]  !bg-transparent  ml-2 mt-8  "
                  id="custom-stepper1"
                >
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 1</p>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 2</p>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 3</p>
                  </Step>
                </Stepper>
              </div>
              <div className="p-2 ml-5 mt-11 ">
                <div>
                  <label className="text-base text-black">
                    Year Of Passing
                  </label>
                  <br />
                  <select
                    value={formData.Yearofpassing}
                    onChange={(e) =>
                      handleFormChange("Yearofpassing", e.target.value)
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {Array.from({ length: currentYear - 1949 }, (_, index) => {
                      const year = currentYear - index;
                      return (
                        <option
                          key={year}
                          value={year}
                          className="bg-white text-gray-800 w-[10%]"
                        >
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <p className="text-red-500">{formErrors.Yearofpassing}</p>
                </div>
                <div>
                  <RadioGroup
                    name="Martial Status"
                    value={formData.MartialStatus}
                    onChange={(e) =>
                      handleFormChange("MartialStatus", e.target.value)
                    }
                  >
                    <label className="text-base text-black">
                      Martial Status
                    </label>
                    <div className="flex">
                      <div>
                        <FormControlLabel
                          value="Married"
                          control={<Radio />}
                          label="Married"
                        />
                      </div>
                      <div>
                        <FormControlLabel
                          value="Unmarried"
                          control={<Radio />}
                          label="Unmarried"
                        />
                      </div>
                    </div>
                  </RadioGroup>
                  <p className="text-red-500">{formErrors.MartialStatus}</p>
                </div>
                <div>
                  <label className="text-base text-black">
                    Current Profession
                  </label>
                  <br />
                  <input
                    placeholder="Enter Your Current Profession"
                    value={formData.Currentprofession}
                    onChange={(e) =>
                      handleFormChange("Currentprofession", e.target.value)
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">{formErrors.Currentprofession}</p>
                </div>
                <div>
                  <label className="text-base text-black">
                    Profession Description
                  </label>
                  <br />
                  <textarea
                    placeholder="Enter Your Professiondescription"
                    value={formData.Professiondescription}
                    onChange={(e) =>
                      handleFormChange("Professiondescription", e.target.value)
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">
                    {formErrors.Professiondescription}
                  </p>
                </div>
                <div className=" flex justify-between pr-2 pt-2 ">
                  <button
                    className="border border-black text-black p-2 rounded-md  hover:bg-black hover:text-white md:mr-20 md:px-6 px-6"
                    color="primary"
                    onClick={prevStep}
                    disabled={activeStep === 0}
                  >
                    Back
                  </button>

                  <button
                    className="border border-black text-black p-2 rounded-md  hover:bg-black hover:text-white mr-6 md:mr-16 md:px-6 px-6"
                    color="primary"
                    onClick={nextStep}
                    disabled={activeStep === 2}
                  >
                    Save & Next
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className=" bg-white">
              <div>
                <img
                  src="v3.png"
                  alt="12"
                  className="md:w-[33%] md:ml-[67%] w-[60%] ml-[40%]"
                />
                <img
                  src="Form3.gif"
                  alt="13"
                  className="md:w-[18%] md:ml-[76%] md:-mt-[25%] w-[38%] ml-[60%] -mt-[42%]"
                />
              </div>
              <div className="w-full md:hidden">
                <Stepper
                  orientation="horizontal"
                  activeStep={activeStep}
                  className="w-[100%]  !bg-transparent  ml-2 mt-5  "
                  id="custom-stepper1"
                >
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 1</p>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 2</p>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                    <p className="text-xs text-blue-900"> STEP 3</p>
                  </Step>
                </Stepper>
              </div>
              <div className="md:p-2 md:ml-5 md:mt-10 p-3 ml-2">
                <div>
                  <label className="text-base text-black">Address</label>
                  <br />
                  <input
                    placeholder="Enter Your Street Address"
                    value={formData.Address}
                    onChange={(e) =>
                      handleFormChange("Address", e.target.value)
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">{formErrors.Address}</p>
                </div>
                <div className="flex">
                  <div className="w-[100%]">
                    <label className="text-base text-black">State</label>
                    <br />
                    <input
                      type="text"
                      list="indianStates"
                      value={formData.State}
                      onChange={(e) =>
                        handleFormChange("State", e.target.value)
                      }
                      className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                      placeholder="Search or select state"
                    />
                    <datalist id="indianStates">
                      {indianStates.map((state, index) => (
                        <option key={index} value={state} />
                      ))}
                    </datalist>
                    <p className="text-red-500">{formErrors.State}</p>
                  </div>
                  <div className="w-[100%]">
                    <label className="text-base text-black">City</label>
                    <br />
                    <input
                      placeholder="Enter Your City"
                      value={formData.City}
                      onChange={(e) => handleFormChange("City", e.target.value)}
                      className="w-[80%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                    />
                    <p className="text-red-500">{formErrors.City}</p>
                  </div>
                </div>
                <div>
                  <label className="text-base text-black">Pincode</label>
                  <br />
                  <input
                    placeholder="Enter Your Pincode"
                    value={formData.Pincode}
                    onChange={(e) =>
                      handleFormChange("Pincode", e.target.value)
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">{formErrors.Pincode}</p>
                </div>
                <div>
                  <label className="text-base text-black">
                    Foundest Of Life And School
                  </label>
                  <br />
                  <input
                    placeholder="Enter Your Foundest Of Life And School"
                    value={formData.Foundestoflifeandschool}
                    onChange={(e) =>
                      handleFormChange(
                        "Foundestoflifeandschool",
                        e.target.value
                      )
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">
                    {formErrors.Foundestoflifeandschool}
                  </p>
                </div>
                <div>
                  <label className="text-base text-black">Suggestion</label>
                  <br />
                  <textarea
                    placeholder="Enter Your Suggestion"
                    value={formData.Suggestion}
                    onChange={(e) =>
                      handleFormChange("Suggestion", e.target.value)
                    }
                    className="w-[90%] p-2 rounded-md border text-xs md:text-sm focus:outline-none"
                  />
                  <p className="text-red-500">{formErrors.Suggestion}</p>
                </div>

                <div className=" flex justify-between pr-2 pt-2">
                  <button
                    className="border border-black text-black p-2 rounded-md  hover:bg-black hover:text-white md:mr-20 md:px-6 px-6"
                    color="primary"
                    onClick={prevStep}
                    disabled={activeStep === 0}
                  >
                    Back
                  </button>
                  {activeStep === 2 && (
                    <button
                      className="border border-black text-black p-2 rounded-md hover:bg-black hover:text-white md:mr-16 md:px-6 px-6 mr-6"
                      onClick={handleFormSubmit}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section className="bg-black w-full h-screen ">
        <div className=" flex  w-[90%] h-screen  mx-auto  ">
          <div className=" hidden md:block md:p-4 bg-[url('/k1.png')] bg-center w-1/3 ">
            <div>
              <img src="s1.png" alt="12" className="  md:w-[30%]" />
            </div>
            <Stepper
              orientation="vertical"
              activeStep={activeStep}
              className="w-[40%] ml-28 mt-[20%] !bg-transparent  "
              id="custom-stepper"
            >
              <Step>
                <StepLabel>
                  <p className="text-base text-white"> STEP 1</p>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel className="-mt-2">
                  <p className="text-base text-white"> STEP 2</p>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel className="-mt-2">
                  <p className="text-base text-white"> STEP 3</p>
                </StepLabel>
              </Step>
            </Stepper>
          </div>

          <div className="flex-1 w-full h-[100%]   bg-white">
            {getStepContent(activeStep)}
          </div>
        </div>
      </section>
    </>
  );
}
