import patientService from '../services/patientService'

let postBookAppointment = async(req,res) => {
    try {
        let response = await patientService.postBookAppointment(req.body);
        // console.log("Response: ", response.data)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let postVerifyBookAppointment = async(req,res) => {
    try {
        let response = await patientService.postVerifyBookAppointment(req.body);
        // console.log("Response: ", response.data)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}