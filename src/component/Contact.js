import React ,{Component} from "react";
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
export default class Contact extends Component{
     ObjectId = (
        m = Math,
        d = Date,
        h = 16,
        s = s => m.floor(s).toString(h)
      ) =>
        s(d.now() / 1000) +
        " ".repeat(h).replace(/./g, () => s(m.random() * h));
    constructor(props){
        super(props)
        this.state={
            action : _.isEmpty(this.props.contact) ? "add" :"edit",
            id:this.props.contact.id || this.ObjectId(),
            firstname:this.props.contact.firstname || "",
            lastname:this.props.contact.lastname ||"",
            email:this.props.contact.email ||"",
            phone:this.props.contact.phone ||"",
            status:this.props.contact.status || false
        }
    }
    handleChange= (event)=>{
        this.setState({[event.target.name]:event.target.value});
    }
    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked ? "active" :"inactive"});
      };
    render(){
    return (<>
    <form  style={this.props.style} noValidate autoComplete="off">
     <div >
      <Grid container spacing={3}>
        <Grid item xs={12}>
      <TextField name="firstname" required value={this.state.firstname} onChange={this.handleChange} fullWidth label="First Name" />
        </Grid>
        <Grid item xs={12}>
      <TextField name="lastname" required value={this.state.lastname} onChange={this.handleChange} fullWidth label="Last Name" />
        </Grid>
        <Grid item xs={12}>
      <TextField name="email" required value={this.state.email} onChange={this.handleChange} fullWidth type="email" label="Email" />
        </Grid>
        <Grid item xs={12}>
      <TextField name="phone" required value={this.state.phone} onChange={this.handleChange} fullWidth label="Phone" />
        </Grid>
        <Grid item xs={12} >
        <FormControlLabel
        control={
          <Switch
            checked={this.state.status}
            onChange={this.handleSwitchChange}
            name="status"
            color="primary"
          />
        }
        label="Status"
      />
       </Grid>
        <Grid item xs={12} style={{textAlign:"center"}} >
        <Button variant="contained" onClick={this.props.saveContact.bind(this, this.state,this.state.action)} color="primary">
        Save
        </Button> </Grid>
    </Grid>
  </div>
  </form></>)
    }
}