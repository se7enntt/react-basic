import db from '../models/index';
// import bcrypt, { compare } from 'bcryptjs';

let createNewSpecialty = async(data) => {
    
    return new Promise(async(resolve,reject) => {
        try {
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                await db.Speciality.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown : data.descriptionMarkdown


                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        }catch(e) {
            reject(e);
        }
    })
}

let getAllSpecialty = async() => {
    
    return new Promise(async(resolve,reject) => {
        try {
            let data = await db.Speciality.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    if (item.image) {
                        item.image = Buffer.from(item.image, 'base64').toString('binary');
                        return item; 
                    }
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })
                
        }catch(e) {
            reject(e);
        }
    })
}

let getDetailSpecialtyById = async(inputId,location) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameádsadsadter'
                })
            }
            else {
                let data = {};
                data = await db.Speciality.findOne({
                where: {
                    id: inputId
                },
                        attributes: ['descriptionHTML','descriptionMarkdown']
                     })
     
                     if (data) {
                        let doctorSpecialty = {}
                         if (location === 'ALL') {
                            doctorSpecialty = await db.Doctor_Infor.findAll({
                                where: {specialtyId: inputId},
                                attributes: ['doctorId','provinceId']
                            })
                         } else {
                            doctorSpecialty = await db.Doctor_Infor.findAll({
                                where: {specialtyId: inputId,
                                        provinceId: location},
                                attributes: ['doctorId','provinceId']
                            })
                         }
                        
                         data.doctorSpecialty = doctorSpecialty;
                     } else data = {}
                     resolve({
                         errCode: 0,
                         errMessage: 'OK',
                         data
                     })
                }
                
        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById
}