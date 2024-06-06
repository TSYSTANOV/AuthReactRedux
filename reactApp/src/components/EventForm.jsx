import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Select, Row, Button, Checkbox, DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { fetchGuests, fetchPostEvents } from "../redux/EventSlice";
import { useDispatch, useSelector } from "react-redux";

function EventForm({ modalOpen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorisation);
  const { guests, isLoading, error } = useSelector((state) => state.events);
  const [eventInfo, setEventInfo] = useState({
    author: user,
    date: "",
    title: "",
    guest: "",
  });

  useEffect(() => {
    dispatch(fetchGuests());
  }, []);
  useEffect(() => {
    let id = null;
    if (error) {
      id = setTimeout(() => {
        modalOpen(false);
      }, 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [error]);
  const submit = () => {
    dispatch(fetchPostEvents(eventInfo));
    setEventInfo({ author: user, date: "", title: "", guest: "" });
    modalOpen(false);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={submit}
    >
      <Form.Item
        name="title"
        value={eventInfo.title}
        onChange={(e) => {
          setEventInfo((prev) => {
            return { ...prev, title: e.target.value };
          });
        }}
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <Input placeholder="Title Event" />
      </Form.Item>
      <Form.Item
        name="date"
        rules={[
          {
            required: true,
            message: "Required",
          },
        ]}
      >
        <DatePicker
          value={eventInfo.date}
          onChange={(e) => {
            if (e) {
              setEventInfo((prev) => {
                return { ...prev, date: e.$d.toLocaleDateString() };
              });
            }
          }}
        />
      </Form.Item>
      {error ? (
        <div>Error to get guests, please try again...</div>
      ) : (
        <Form.Item
          name="guest"
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              setEventInfo((prev) => {
                return { ...prev, guest: value };
              });
            }}
            loading={isLoading}
            style={{
              width: 200,
            }}
            options={guests.map((item) => {
              return {
                value: item.username,
                label: item.username,
              };
            })}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Row justify="end">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Add Event
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}
export { EventForm };
