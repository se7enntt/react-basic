import specialtyService from '../services/specialtyService'

let createNewSpecialty = async(req,res) => {
    try {
        let response = await specialtyService.createNewSpecialty(req.body);
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

let getAllSpecialty = async(req,res) => {
    try {
        let response = await specialtyService.getAllSpecialty();
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

let getDetailSpecialtyById = async(req,res) => {
    try {
        let response = await specialtyService.getDetailSpecialtyById(req.query.id,req.query.location);
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
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById
}