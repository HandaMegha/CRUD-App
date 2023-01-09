import React, { useEffect, useState } from "react";
import { Icon, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Validate from "./Validate";
import { isEmpty } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { notify } from "react-notify-toast";

const AddEditUser = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
    });
    const [errors, setErrors] = useState("");

    const getUser = async(id) => {
        const userDocRef = doc(db, 'users', id);
        const docSnap = await getDoc(userDocRef);
        const currentUser = docSnap.data();
        setData({
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
            address: currentUser.address,
            phone: currentUser.phone,
        })
    }

    useEffect(() => {
        if(!isEmpty(id)){
            getUser(id);
        }
    },[id])

    const handleChange = (event) => {
        const target = event.target;
        const { name, value } = target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validateData = Validate(data);
        setErrors(validateData);
        if(isEmpty(validateData)){
            data['created'] = new Date();
            if(!isEmpty(id)){
                try{
                    const UserDocRef = doc(db, "users", id);
                    await updateDoc(UserDocRef, data);
                    navigate("/usersList");
                    notify.show("User Updated Successfully", "success");
                }
                catch(error){
                    notify.show("Error While Updating User", "error");
                }
            }
            else{
                data['isDeleted'] = false;
                try{
                    await addDoc(collection(db, "users"), data);
                    navigate("/usersList");
                    notify.show("User Created Successfully", "success");
                }
                catch(error){
                    notify.show("Error While Creating User", "error");
                }
            }
        } 
    }

    return(
        <div className="container">
            <Link to="/usersList">
                <Icon name="arrow left" />
                Back to Users List
            </Link>
            <Form className="form-container">
                <Form.Group widths='equal'>
                    <Form.Input
                        error={errors.firstname}
                        fluid
                        label="First Name"
                        name="firstname"
                        placeholder="Enter First Name"
                        onChange={handleChange}
                        value={data.firstname}
                    />
                    <Form.Input
                        error={errors.lastname}
                        fluid
                        label="Last Name"
                        name="lastname"
                        placeholder="Enter Last Name"
                        onChange={handleChange}
                        value={data.lastname}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        error={errors.email}
                        fluid
                        label="Email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        value={data.email}
                    />
                    <Form.Input
                        error={errors.address}
                        fluid
                        label="Address"
                        name="address"
                        placeholder="Enter Address"
                        onChange={handleChange}
                        value={data.address}
                    />
                </Form.Group>
                <Form.Group widths='2'>
                    <Form.Input
                        error={errors.phone}
                        fluid
                        label="Phone"
                        name="phone"
                        placeholder="Enter Phone No"
                        onChange={handleChange}
                        value={data.phone}
                    />
                </Form.Group>
                <Button type='submit' primary onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default AddEditUser;