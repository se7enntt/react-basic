import db from '../models/index';
import _ from 'lodash';
import emailService from './emailService';
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import { raw } from 'body-parser';

let createClinic = async(data) => {
    
    return new Promise(async(resolve,reject) => {
        try { 
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64) {
                resolve({
                    errCode:1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name:data.name,
                    address:data.address,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown,
                    image:data.imageBase64
                });
                resolve({
                    errCode:0,
                    errMessage: 'OK'
                })
            }
        }
        catch {
            reject(e)
        }
    })
}

let getAllClinic = async() => {
    
    return new Promise(async(resolve,reject) => {
        try {
            let data = await db.Clinic.findAll();
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

let getDetailClinicById = async(inputId) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameádsadsadter'
                })
            }
            else {
                let data = {};
                data = await db.Clinic.findOne({
                where: {
                    id: inputId
                },
                        attributes: ['name','address','descriptionHTML','descriptionMarkdown']
                     })
     
                     if (data) {
                        let doctorClinic = {}
                        doctorClinic = await db.Doctor_Infor.findAll({
                            where: {clinicId: inputId},
                            attributes: ['doctorId','provinceId']
                        })
                        
                        data.doctorClinic = doctorClinic;
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
    createClinic,
    getAllClinic,
    getDetailClinicById
}