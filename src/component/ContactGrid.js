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
export default class ContactGrid extends Component {
    body = (
        <div>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>

        </div>
    );
    modelPopup = ({
        position: "absolute",
        padding:"10px",
        width: 500,
        maxWidth: 500,
        backgroundColor: "#fff",
        border: '2px solid #fff',
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`
    })
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            contact:{},
            columns: [
                { title: 'First Name', field: 'firstname' },
                { title: 'Last Name', field: 'lastname' },
                { title: 'Email', field: 'email' },
                {
                    title: 'Phone',
                    field: 'phone'
                },
            ],
            data: [
                { id:'1',firstname: 'Archana', lastname: 'Harad', email: "archanaagivale30@gmail.com", phone: "999999999" },
                { id:'2', firstname: 'Aarvi', lastname: 'Agivale', email: "archana@gmail.com", phone: "999999999" }
            ]
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    saveContact = (newData, action,event) => {
          const data=[...this.state.data];
          debugger;
          if(action=="edit"){
            let oldData=_.filter(this.state.data,{id:newData.id});
            data[data.indexOf(oldData[0])] = newData;
          }
          else
          {
              data.push(newData);
          }
          this.setState({data});
          this.handleClose();
    }
    deleteContact=(event) =>{
        let id=event.target.parentElement.id;
        const data=[...this.state.data];
        _.remove(data, function(item) {
            return item.id == id;
          });
          this.setState({data:data});
       /* this.setState((prevState) => {
            const data = [...prevState.data];
            _.remove(data, function(item) {
                return item.id == id;
              });
        return { ...prevState, data };
    })*/
       
    }
    editContact=(event) =>{
        let id=event.target.parentElement.id;
        let obj=_.filter(this.state.data,{id:id});
        this.setState({ contact: obj[0] });
        this.handleOpen();
    }
    addContact=(event) =>{
        this.setState({ contact: {}});
        this.handleOpen();
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
       <Contact style={this.modelPopup} contact={this.state.contact} saveContact={this.saveContact}/>
      </Modal>
            <Grid container style={{ width: "90%", marginLeft: "5%" }} >
            <Grid container style={{ width: "90%", marginLeft: "5%" }} >
            <Typography variant="h6" component="h2">
                    Contact List
                    </Typography>
<Button color="primary" onClick={this.addContact}><span class="material-icons">
add
</span> Contact</Button>
            </Grid>
                {this.state.data.map((item, index) => (
                    <Box   style={{ borderRadius: "4px",padding:"10px",width:"260px", minHeigth:"150px", maxHeigth:"150px",marginTop: "15px", marginBottom: "0px", marginRight: "15px", boxShadow: "rgba(0, 0, 0, 0.1) 2px 4px 18px 0px" }} key={index} width={210} marginRight={0.5} my={5} >
                        <Box  >
                            <div style={{ margin: "5px", justifyContent: "center", display: "flex" }}><Avatar>H</Avatar></div>
                            <Typography gutterBottom variant="body2" style={{textAlign:"center"}}>
                                {item.firstname}  {item.lastname}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{textAlign:"center"}}>
                               {item.email}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{textAlign:"center"}}>
                               {item.phone}
                            </Typography>
                            <Typography id={item.id} variant="body2" color="textSecondary" style={{textAlign:"center"}}>
                            <span class="material-icons" style={{cursor:"pointer"}} onClick={this.editContact}>
                            edit
                            </span>
                            <span class="material-icons"  style={{cursor:"pointer"}} onClick={this.deleteContact}>
                            delete
                            </span>
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Grid>
                </>
        );
    }
}

