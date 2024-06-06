import { useEffect, useState } from "react";
import { EventCalendar } from "../components/EventCalendar";
import { Modal, Button, Row } from "antd";
import { EventForm } from "../components/EventForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/EventSlice";

function Event() {
  const [modalVisible, setModalVisible] = useState(false);
  const { events } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.authorisation);

  return (
    <div className="container">
      <EventCalendar events={events} user={user.username} />
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Add Event
        </Button>
      </Row>
      <Modal
        title="Add Event"
        open={modalVisible}
        onOk={() => {}}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={null}
      >
        <EventForm modalOpen={setModalVisible} />
      </Modal>
    </div>
  );
}
export { Event };
