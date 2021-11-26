import doctorService from '../services/doctorService'


let getTopDoctorHome = async(req,res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
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

let getAllDoctors = async(req,res) => {
    try {
        let response = await doctorService.getAllDoctors();
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

let postInfoDoctors = async(req,res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body);
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

let getDetailDoctorById = async(req,res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let bulkCreateSchedule = async(req,res) => {
    try {
        let response = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let getScheduleByDate = async(req,res) => {
    try {
        let response = await doctorService.getScheduleByDate(req.query.doctorId,req.query.date);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let getExtraDoctorInforById = async(req,res) => {
    try {
        let response = await doctorService.getExtraDoctorInforById(req.query.doctorId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let getProfileDoctorById = async(req,res) => {
    try {
        let response = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let getListPatientForDoctor = async(req,res) => {
    try {
        let response = await doctorService.getListPatientForDoctor(req.query.doctorId,req.query.date);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server'
        }) 
    }
}

let sendRemedy = async(req,res) => {
    try {
        let response = await doctorService.sendRemedy(req.body);
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
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors:getAllDoctors,
    postInfoDoctors:postInfoDoctors,
    getDetailDoctorById:getDetailDoctorById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleByDate:getScheduleByDate,
    getExtraDoctorInforById:getExtraDoctorInforById,
    getProfileDoctorById:getProfileDoctorById,
    getListPatientForDoctor:getListPatientForDoctor,
    sendRemedy:sendRemedy
}