// shows the list of reservation
import { useState } from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import './ShowReservations.css';
import firebase from '../../classes/firebase';

const ShowReservations = (props) => {
  // list of reservations
  var allReser = props.allReserves;
  // user instance
  const userBookings = props.userBookings;
  // callback function to call when the operation is done
  const callbackFn = props.callbackFn;
  if (allReser == null)
    allReser = [];
  if (allReser[0] === "dummy")
    allReser.shift();
    // states
  const [allReservesArr, setAllResArr] = useState(allReser);
  const [isModelOpen, setModelOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUpdatingDone, setIsupdatingDone] = useState(false);
  const [confirmDate, setConfirmDate] = useState(new Date());

  const updateFireDb = firebase.database().ref('allbookings').child(userBookings[0].id);

  const Spinner = () => <div className="myspinner"></div>;

  // alert to display sucess/error messages
  const ShowAlert = () => <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      Successfully cancelled reservation for — <strong>{confirmDate.toDateString()}</strong>
    </Alert>
  </Stack>;

  // self explanatory
  const removeReservation = (event) => {
    setIsSending(true);
    var tempxx = allReservesArr.filter((thisDat) => (
      thisDat !== confirmDate.toJSON()
    ));

    // calling database to update data
    updateFireDb.update({
      bookings: tempxx,
      noOfBookingsMade: userBookings[0].noOfBookingsMade - 1
    }).then((dat) => {
      setAllResArr(tempxx);
      setIsupdatingDone(true);
      setIsSending(false);
      callbackFn();
    });
  }

  // rendering one booking information
  const myTableRow = allReservesArr.map((reserveDat, i) => {
    const thisDate = new Date(reserveDat);
    return (
      <li className="table-row" key={i}>
        <div className="coll-1">{i + 1}</div>
        <div className="coll-2">{thisDate.toDateString()}</div>
        <div className="coll-3">{thisDate.toTimeString().substring(0, 17)}</div>
        <div className="coll-4">Standard package, no additional equipments selected</div>
        <div className="coll-5 btnCls"><button className="btn btn-danger" onClick={() => {
          setModelOpen(true);
          setIsSending(false);
          setIsupdatingDone(false);
          setConfirmDate(thisDate);
        }}>Cancel</button></div>
      </li>
    )
  });

  // rendering the view
  return (
    <div>
      <div className="col-12">
        <h2 className="tableheadh2">Upcoming reservations </h2>
        <ul className="reservationTable">
          <li className="table-header">
            <div className="coll-1">S.N.</div>
            <div className="coll-2">Date</div>
            <div className="coll-3">Time</div>
            <div className="coll-4">Add-ons</div>
            <div className="coll-5">Cancel</div>
          </li>

          {myTableRow}


        </ul>
      </div>

      <Modal
        centered
        fullscreen
        size="lg"
        isOpen={isModelOpen}>
        <ModalHeader >
          Are you sure you want to cancel your reservation?
        </ModalHeader>

        <ModalBody>
          {isUpdatingDone && <ShowAlert />}
          {isSending && <Spinner />}
          <div className="container divadfjsl">
            <div className="row">
              Selected Date: <span className="asdfsdl">{confirmDate.toDateString()}</span>, at <span className="asdfsdl">{confirmDate.toTimeString()}</span>

            </div>
          </div>



        </ModalBody>
        <ModalFooter>
          {!isUpdatingDone && !isSending && <Button color="primary" onClick={removeReservation}>
            Confirm
          </Button>}

          {' '}
          <Button onClick={() => {
            setModelOpen(false);
          }}>
            {!isUpdatingDone && !isSending && "Cancel"}
            {!isUpdatingDone && isSending && "Making Changes ..."}
            {isUpdatingDone && !isSending && "Close"}
          </Button>
        </ModalFooter>
      </Modal>


    </div>
  );
}

export default ShowReservations;
