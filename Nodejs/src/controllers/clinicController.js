import clinicService from '../services/clinicService'

let createClinic = async(req,res) => {
    try {
        let response = await clinicService.createClinic(req.body);
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

let getAllClinic = async(req,res) => {
    try {
        let response = await clinicService.getAllClinic();
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

let getDetailClinicById = async(req,res) => {
    try {
        let response = await clinicService.getDetailClinicById(req.query.id);
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
    createClinic,
    getDetailClinicById,
    getAllClinic

}