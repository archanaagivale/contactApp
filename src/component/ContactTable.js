import React ,{Component}from 'react';
import MaterialTable from 'material-table';
import Modal from '@material-ui/core/Modal';
import Contact from './Contact';

class ContactTable extends Component {
   body = (
    <div>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>

    </div>
  );
  modelPopup=( {
    position: 'absolute',
    width: 400,
    height: Audio,
    backgroundColor: "#fff",
    border: '2px solid #fff'
  })
    constructor(props){
        super(props)
        this.state={
          open:false,
            columns: [
                { title: 'First Name', field: 'firstname' },
                { title: 'Last Name', field: 'lastname' },
                { title: 'Email', field: 'email'},
                {
                  title: 'Phone',
                  field: 'phone'
                },
              ],
              data: [
                { firstname: 'Archana', lastname: 'Harad', email: "archanaagivale30@gmail.com", phone: "999999999" },
                { firstname: 'Aarvi', lastname: 'Agivale', email: "archana@gmail.com", phone: "999999999" }
              ]
        }
    }
     handleOpen = () => {
      this.setState({open:true});
    };
  
     handleClose = () => {
      this.setState({open:false});
    };
    saveContact =(newData,event)=>{
      const data=[...this.state.data];
      debugger;
      data.push(newData);
      this.setState({data:data});
      this.handleClose();
    }
    render(){
    return (
    <>
     <button type="button" onClick={this.handleOpen}>
        Open Modal
      </button>
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <Contact style={this.modelPopup} saveContact={this.saveContact}/>
      </Modal>
    <MaterialTable
    title="Contacts"
    columns={this.state.columns}
    data={this.state.data}/>
    </>
  );
    }
}

export default ContactTable;
