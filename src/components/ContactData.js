import React, { useState } from "react";
import { Container, Button, Form, } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const api = "http://localhost:9292/messages";

const initialState = {
    name: "",
    email: "",
    message: "",
};

function ContactData() {
    const [state, setState] = useState(initialState);
    const [editMode] = useState(false);

    const { name, email, message } = state;

    // function to handle the change event
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // functon to handle our submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast.error("Please fill all the input fields!!");
        } else {
            axios.post(api, state);
            toast.success("Message Successfully Sent!!");
            setState({ name: "", email: "", message: "" });
            // call to update automatic after POST without refreshing browsers
            setTimeout(() => 500);
        }
    };
    return (
        <div>
            <ToastContainer />
            <Container>
            </Container>
        </div>
    );
}

export default ContactData;