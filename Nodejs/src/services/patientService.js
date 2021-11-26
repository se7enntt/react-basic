import db from '../models/index';
import _ from 'lodash';
import emailService from './emailService';
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import { raw } from 'body-parser';

let builUrlEmail = (doctorId,token) => {
    let result = '';

    result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
}

let postBookAppointment = async(data) => {
    
    return new Promise(async(resolve,reject) => {
        try {
            
            if(!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode:1,
                    errMessage: 'Missing parameter'
                })
            }else {
                
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: builUrlEmail(data.doctorId,token)

                });

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                    }
                })
                

                // console.log('Check appointment user: ', user[0]);
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {patientId: user[0].id},
                        defaults: {
                            statusId:'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            reason: data.reason,
                            token:token,
                        }
                    })
                }
                resolve({
                    errCode:0,
                    errMessage:'Save infor doctor succeed',
                })
            }
        }catch(e) {
            reject(e);
        }
    })
}

let postVerifyBookAppointment = async(data) => {
    
    return new Promise(async(resolve,reject) => {
        try { 
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing Parameter'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1',
                    },
                    raw:false
                })
                
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Updated appointment succeed'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been actived or does not exist'
                    })
                }
            }
        }
        catch {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}