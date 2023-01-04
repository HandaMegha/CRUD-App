import React from "react";
import {useState, useEffect} from "react";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import { Button, Table } from "semantic-ui-react";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('created', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setUsers(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
    },[]);

    const getTableContent = () => {
        return(
            users && users.map(user => {
                return(
                    <Table.Row key={user.id} className="form-data">
                        <Table.Cell>{user.data.first_name + ' ' + user.data.last_name}</Table.Cell>
                        <Table.Cell>{user.data.email}</Table.Cell>
                        <Table.Cell>{user.data.phone}</Table.Cell>
                        <Table.Cell>
                            <Button icon className="edit-btn">Edit</Button>
                            <Button icon className="delete-btn">Delete</Button>
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
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {getTableContent()}
                </Table.Body>
            </Table>
        )
    }

    return(
        <div className="container">
            {getTableHeader()}
        </div>
    )
}

export default UsersList;