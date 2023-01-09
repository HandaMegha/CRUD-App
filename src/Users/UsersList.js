import React from "react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, where, doc, updateDoc } from "firebase/firestore";
import { db} from "../firebase";
import { Button, Icon, Table, Confirm, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [deleteValue, setDeleteValue] = useState(true);
    const [open, setOpen] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'users'), where("isDeleted", "==", false), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setUsers(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
    },[]);

    const deleteUser = (id) => {
        setDeleteValue(false)
        setOpen(true)
        setCurrentUserId(id)
    }

    const confirmDelete = (id) => {
        return (
            <Confirm open={open}
                    content='Are you sure want to delete this User?'
                    onCancel={close}
                    className="delete-popup"
                    cancelButton='No, cancel it!'
                    confirmButton="Yes, delete it!"
                    onConfirm={() => renderDeleteUser(id)} />
        )
    }

    const close = () => {
        setOpen(false)
        setDeleteValue(true)
    }

    const renderDeleteUser = (id) => {
        deleteUserData(id)
        setOpen(false)
    }

    const deleteUserData = async () => {
        try{
            const UserDocRef = doc(db, "users", currentUserId);
            await updateDoc(UserDocRef, {
                isDeleted: true
            });
            notify.show("User Deleted Successfully", "success");
        }
        catch(error){
            notify.show("Error While Deleting User", "error");
        }
    }

    const getTableContent = () => {
        return(
            users && users.map(user => {
                return(
                    <Table.Row key={user.id} className="form-data">
                        <Table.Cell>{user.data.firstname + ' ' + user.data.lastname}</Table.Cell>
                        <Table.Cell>{user.data.email}</Table.Cell>
                        <Table.Cell>{user.data.address}</Table.Cell>
                        <Table.Cell>{user.data.phone}</Table.Cell>
                        <Table.Cell>
                            <Link to={{ pathname: `/editUser/${user.id}`}}>
                                <Button icon className="edit-btn">Edit</Button>
                            </Link>
                            <Button icon onClick={() => deleteUser(user.id)} className="delete-btn">Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                )
            })
        )
    }

    const getTableHeader = () => {
        return(
            <Table basic>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {getTableContent()}
                </Table.Body>
                {deleteValue === false ? confirmDelete(currentUserId) : null}
            </Table>
        )
    }

    return(
        <div className="container">
            <Link to="/home">
                <Icon name="arrow left" />
                Back to Home
            </Link>
            <Link to="/addUser">
                <Button primary floated='right' className="add-btn">
                    <Icon name="plus" />
                    Add User
                </Button>
            </Link>
            {users && users.length !== 0 ? getTableHeader() : <Loader active>Loading</Loader>}
        </div>
    )
}

export default UsersList;