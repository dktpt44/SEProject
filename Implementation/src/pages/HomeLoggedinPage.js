
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import firebase from '../classes/firebase';

import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';

import AuthContext from "../store/auth-context";
import "./HomeLoggedinPage.css";

const FIREBASE_DOMAIN = 'https://seprojectgroup-default-rtdb.firebaseio.com/';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const HomeLoggedinPage = () => {
  const authContxt = useContext(AuthContext);
  const [allBookings, setAllBookings] = useState([{ key: 1, abc: 1 }]);
  const [userBookings, setUserBookings] = useState([{ key: 1, abc: 1, bookings: ["abc"] }]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModelOpen, setModelOpen] = useState(false);
  const userEmail = authContxt.email;
  const [mytabvalue, setmyValue] = useState(0);

  const [pickedDate, setPickedDate] = useState(new Date());
  const [pickedTime, setPickedTime] = useState(new Date());
  const [confirmDate, setConfirmDate] = useState(new Date());
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 20);

  const handleTabChange = (event, newValue) => {
    setmyValue(newValue);
  };

  const makeReservation = (event) => {
    event.preventDefault();
    const reseDate = new Date(pickedDate.getFullYear(), pickedDate.getMonth(), pickedDate.getDate(), pickedTime.getHours(), 0, 0);
    setConfirmDate(reseDate);
    // console.log(new Date(reseDate.toJSON()));
    setModelOpen(true);
  };

  const confirmReservation = (event) => {



  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`${FIREBASE_DOMAIN}/allbookings.json`)
      .then(response => response.json())
      .then((data) => {
        const allTasks = [];
        for (const key in data) {
          const taskObj = {
            id: key,
            ...data[key],
          };
          allTasks.push(taskObj);
        }
        setAllBookings(allTasks);
        let userTasks = allTasks.filter(function (value) {
          return value.email === userEmail;
        });
        setUserBookings(userTasks);
        setIsLoading(false);
        console.log(userBookings[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    // testing update
    // const todo

    fetch(`${FIREBASE_DOMAIN}/allbookings.json/${userBookings[0].id}`, {
      method: 'PATCH',
      body: JSON.stringify({name: "New Name"}),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .catch(() => {
        console.log("ERRor!");
      });

      // update firebase-db


  }, []);

  return (
    <div className="container conta">
      <div className="row">

        <p className="dashboardhead"> Dashboard</p>
      </div>
      <div className="row itemsdashboard">
        <div className="col-3 blackDiv">
          <p className="insideDivHead">
            Reservations
          </p>
          <div className="row">
            <div className="col-3 offset-1">
              <p className="insideDivDesc">
                {userBookings[0].bookings.length - 1}
              </p>
            </div>
            <div className="col-6 offset-2 imgClass">
              <i className="fas fa-clipboard-list fa-3x"></i>
            </div>

          </div>

        </div>
        <div className="col-3 purpDiv">
          <p className="insideDivHead">
            All time reservations
          </p>
          <div className="row">
            <div className="col-3 offset-1">
              <p className="insideDivDesc">
                {userBookings[0].noOfBookingsMade}
              </p>
            </div>
            <div className="col-6 offset-2 imgClass">
              <i className="fas fa-clipboard-list fa-3x"></i>
            </div>

          </div>

        </div>
        <div className="col-3 redDiv">
          <p className="insideDivHead">
            Membership Reservation Left
          </p>
          <div className="row">
            <div className="col-3 offset-1">
              <p className="insideDivDesc">
                {userBookings[0].isMembershipActive && <span> {14 - userBookings[0].bookings.length + 1} </span>}
                {!userBookings[0].isMembershipActive && <span>0</span>}
              </p>
            </div>
            <div className="col-6 offset-2 imgClass">
              <i className="fas fa-clipboard-list fa-3x"></i>
            </div>

          </div>

        </div>

      </div>
      <div className="row newBooking">
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={mytabvalue} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab label="Make Reservation" {...a11yProps(0)} />
                  <Tab label="My Reservations" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <TabPanel value={mytabvalue} index={0}>
                <div className="row">
                  <div className="col-7 borderAround1">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <StaticDatePicker
                        orientation="landscape"
                        openTo="day"
                        value={pickedDate}
                        minDate={new Date()}
                        maxDate={maxDate}
                        onChange={(newValue) => {
                          setPickedDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="col-4 borderAround2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <StaticTimePicker
                        displayStaticWrapperAs="mobile"
                        value={pickedTime}
                        minutesStep={60}
                        onChange={(newValue) => {
                          setPickedTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 submitBtnDvi">
                    <button className="btn btn-primary" onClick={makeReservation}>
                      Make Reservation
                    </button>
                  </div>
                </div>

              </TabPanel>
              <TabPanel value={mytabvalue} index={1}>
                <p>
                  Explore the sky with google Sky
                </p>
              </TabPanel>
            </Box>
          </CardContent>

        </Card>
      </div>
      <div>
        <Modal
          centered
          fullscreen=""
          size="xl"
          isOpen={isModelOpen}>
          <ModalHeader >
            Please make a payment
          </ModalHeader>
          <ModalBody>
            Selected Date: <span className="asdfsdl">{confirmDate.toDateString()}</span>, at <span className="asdfsdl">{confirmDate.toTimeString()}</span>




            <div class="container">
              <div class="row">

                <div class="col-12 mt-4">
                  <div class="card p-3">
                    <p class="mb-0 fw-bold h4">Payment Methods</p>
                  </div>
                </div>
              </div>
              <div className="row">

                <div class="col-12">
                  <div class="">

                    <div class="card-body border p-0">
                      <div class="row">
                        <div class="col-md-5 marginTopClass">
                          <div class="card p-3">
                            <div class="img-box"> <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="" /> </div>
                            <div class="number"> <label class="fw-bold" for="">**** **** **** 1060</label> </div>
                            <div class="d-flex align-items-center justify-content-between"> <small><span class="fw-bold">Expiry date:</span><span>10/24</span></small> <small><span class="fw-bold">Name: </span><span>{userBookings[0].name}</span></small> </div>
                          </div>
                        </div>
                        <div class="col-md-5 offset-md-1 marginTopClass">
                          <div class="card p-3">
                            <div class="img-box"> <img src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png" alt="" /> </div>
                            <div class="number"> <label class="fw-bold">**** **** **** 1060</label> </div>
                            <div class="d-flex align-items-center justify-content-between"> <small><span class="fw-bold">Expiry date:</span><span>10/24</span></small> <small><span class="fw-bold">Name: </span><span>{userBookings[0].name}</span></small> </div>
                          </div>
                        </div>
                      </div>

                      <div class="collapse show p-3 pt-0" id="collapseExample">
                        <div class="row">
                          <div class="col-lg-5 mb-lg-0 mb-3">
                            <p class="h4 mb-0">Summary</p>
                            <p class="mb-0"><span class="fw-bold">Product:</span><span class="c-green"> One Hour Court Booking</span> </p>
                            <p class="mb-0"> <span class="fw-bold">Price:</span> <span class="c-green">:$19.99</span> </p>
                            <p class="mb-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque nihil neque quisquam aut repellendus, dicta vero? Animi dicta cupiditate, facilis provident quibusdam ab quis, iste harum ipsum hic, nemo qui!</p>
                          </div>
                          <div class="col-lg-7">
                            <form action="" class="form">
                              <div class="row">
                                <div class="col-12">
                                  <div class="form__div"> <input type="text" class="form-control" placeholder=" " /> <label for="" class="form__label">Card Number</label> </div>
                                </div>
                                <div class="col-6">
                                  <div class="form__div"> <input type="text" class="form-control" placeholder=" " /> <label for="" class="form__label">MM / yy</label> </div>
                                </div>
                                <div class="col-6">
                                  <div class="form__div"> <input type="password" class="form-control" placeholder=" " /> <label for="" class="form__label">cvv code</label> </div>
                                </div>
                                <div class="col-12">
                                  <div class="form__div"> <input type="text" class="form-control" placeholder=" " /> <label for="" class="form__label">name on the card</label> </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={confirmReservation}
            >
              Confirm
            </Button>
            {' '}
            <Button onClick={() => {
              setModelOpen(false);
            }}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default HomeLoggedinPage;
