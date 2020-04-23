import React ,{Component} from "react";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
export default class Contact extends Component{
    constructor(props){
        super(props)
        this.state={
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            status:false
        }
    }
    handleChange= (event)=>{
        this.setState({[event.target.name]:event.target.value});
    }
    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
        <Button variant="contained" onClick={this.props.saveContact.bind(this, this.state)} color="primary">
        Save
        </Button> </Grid>
    </Grid>
  </div>
  </form></>)
    }
}