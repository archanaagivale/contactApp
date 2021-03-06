import React, { Component } from 'react';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';
import _ from 'lodash';
import Contact from './Contact';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';

export default class ContactGrid extends Component {
    body = (
        <div>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>

        </div>
    );
   
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            displayview:"list",
            contact: {},
            columns: [
                { title: 'First Name', field: 'firstname' },
                { title: 'Last Name', field: 'lastname' },
                { title: 'Email', field: 'email' },
                {title: 'Phone',field: 'phone'},
                {
                    title: 'Status',
                    field: 'status',
                    lookup: { "active":'active', "inactive":'inactive' },
                  },

            ],
            data: [
                { id: '1', firstname: 'Mario', lastname: 'Speedwagon',status:"active", email: "mario@gmail.com", phone: "999999999" },
                { id: '2', firstname: 'Petey', lastname: 'Cruiser',status:"active", email: "petey@gmail.com", phone: "8888888888" },
                { id: '1', firstname: 'Anna', lastname: 'Sthesia',status:"active", email: "anna@gmail.com", phone: "777744444" },
                { id: '2', firstname: 'Paul', lastname: 'Cruiser',status:"inactive", email: "paul@gmail.com", phone: "1111111111" },
                { id: '1', firstname: 'Nick', lastname: 'Forcewind',status:"active", email: "nick@gmail.com", phone: "9988888888" },
                { id: '2', firstname: 'Ira', lastname: 'Membrit',status:"inactive", email: "ira@gmail.com", phone: "6666666666" },
            ]
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    saveContact = (newData, action, event) => {
        const data = [...this.state.data];
        debugger;
        if (action == "edit") {
            let oldData = _.filter(this.state.data, { id: newData.id });
            data[data.indexOf(oldData[0])] = newData;
        }
        else {
            data.push(newData);
        }
        this.setState({ data });
        this.handleClose();
    }
    deleteContact = (event) => {
        let id = event.target.parentElement.id;
        const data = [...this.state.data];
        _.remove(data, function (item) {
            return item.id == id;
        });
        this.setState({ data: data });
        /* this.setState((prevState) => {
             const data = [...prevState.data];
             _.remove(data, function(item) {
                 return item.id == id;
               });
         return { ...prevState, data };
     })*/

    }
    editContact = (event) => {
        let id = event.target.parentElement.id;
        let obj = _.filter(this.state.data, { id: id });
        this.setState({ contact: obj[0] });
        this.handleOpen();
    }
    changeStatus = (event) => {
        debugger;
        const data = [...this.state.data];
            let oldData = _.filter(this.state.data, { id: event.target.id });
            let newData=oldData[0];
            newData.status=event.target.checked ? "active" :"inactive"
            data[data.indexOf(oldData[0])] = newData;
    
        this.setState({ data });
    }
    addContact = (event) => {
        this.setState({ contact: {} });
        this.handleOpen();
    }
    changeView=(event)=>{
        this.setState({ displayview: this.state.displayview=="list" ?"table" :"list" });
    }
    render() {
        return (
            <>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Contact contact={this.state.contact} saveContact={this.saveContact} />
                </Modal>
                 {this.state.displayview==="list" ? ( 
                <Grid container style={{ width: "90%", marginLeft: "5%" }} >
                    <Grid container style={{ marginTop: "20px", borderBottom: "1px solid #ccc" }} >
                        <Typography variant="h6" component="h2">
                            Contact List
                    </Typography>
                        <Button style={{ marginLeft: "40px" }} color="primary" onClick={this.addContact}><span class="material-icons">
                            add
</span> Contact</Button>
<Button className="gridview-btn" color="primary" onClick={this.changeView}>
                       
                       <span class="material-icons">view_module</span>
                        </Button>
                    </Grid>
                   
                  { this.state.data.map((item, index) => (
                        <Box className="contactBox" key={index} width={210} marginRight={0.5} my={5} >
                            <Box  >
                                <div class="c-avtar">
                                    <Avatar>{item.firstname.charAt(0)}</Avatar>
                                    </div>
                                <Typography title={item.firstname}  gutterBottom variant="body2" className="contact-info">
                                    {item.firstname}  {item.lastname}
                                </Typography>
                                <Typography title={item.email} variant="body2" color="textSecondary" className="contact-info">
                                    {item.email}
                                </Typography>
                                <Typography title={item.phone} variant="body2" color="textSecondary" className="contact-info">
                                    {item.phone}
                                </Typography>
                                <Typography id={item.id} variant="body2" color="textSecondary" style={{ textAlign: "center" }}>
                                    <span class="material-icons" style={{ cursor: "pointer" }} onClick={this.editContact}>
                                        edit
                            </span>
                                    <span class="material-icons" style={{ cursor: "pointer" }} onClick={this.deleteContact}>
                                        delete
                            </span>
                                </Typography>
                            <Typography id={item.id} title={item.status} className="box-switch"  id={item.id} variant="body2" color="textSecondary">
                                <Switch
                                    id={item.id}
                                    checked={item.status=="active" ? true :false}
                                    onChange={this.changeStatus}
                                    name="status"
                                    color="primary"
                                />
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                
                </Grid>
                ) :( <>
                <Button className="listview-btn" color="primary" onClick={this.changeView}>
                       
                <span onClick={this.changeView} class="material-icons">
                view_list
                </span>
                        </Button>
               <MaterialTable style={{ width: "90%", marginLeft: "5%",boxShadow:"none" }} 
                    title="Contacts"
                    columns={this.state.columns}
                    data={this.state.data}
                    editable={{
                        onRowAdd: (newData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                              });
                            }, 600);
                          }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              if (oldData) {
                                this.setState((prevState) => {
                                  const data = [...prevState.data];
                                  data[data.indexOf(oldData)] = newData;
                                  return { ...prevState, data };
                                });
                              }
                            }, 600);
                          }),
                        onRowDelete: (oldData) =>
                          new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                              });
                            }, 600);
                          }),
                      }}/></>
                    )}
            </>
        );
    }
}

