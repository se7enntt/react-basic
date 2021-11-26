import db from '../models/index';
// import bcrypt, { compare } from 'bcryptjs';
import bcrypt from 'bcryptjs';
import { response } from 'express';
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email,password) => {
    return new Promise(async(resolve,reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {

                //user already exist 
                //compare password

                let user = await db.User.findOne({
                    attributes: ['id','email', 'password','roleId','firstName','lastName'],
                    where: {email: email},
                    raw:true,
                });
                if (user) {
                    // compare password
                     let check = await bcrypt.compareSync(password, user.password); //false
                     if(check) {
                         userData.errCode=0;
                         userData.errMessage="ok";
                         delete user.password; 
                         userData.user = user;
                     }
                     else {
                        userData.errCode=3;
                        userData.errMessage="Wrong password";
                     }
                }
                else {
                    userData.errCode=2;
                    userData.errMessage=`User doesn't exists~`;
                }  
            }
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exist in system. Please try another email !"
            }
            resolve(userData);
        } catch(e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch(e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            // var hashpassword = await bcrypt.hashSync("B4c0/\/",salt);
            var hashpassword = await bcrypt.hashSync(password,salt);
            resolve(hashpassword);
        } catch(e) {
            reject(e);
        }
        
    });
}

let getUserId = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            }
            if (userId && userId !=='All') {
                users = await db.User.findOne ({
                    where: { id: userId},
                    attributes: {
                        exclude: ['password']
                    }
                })
            } 
            resolve(users);
        } catch(e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async(resolve,reject) => {
        console.log(data.phonenumber);
        try {
            // check if email exist ???
            let emailcheck = await checkUserEmail(data.email);
            if (emailcheck === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, plz try another email'
                })
            } else {
                
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                email : data.email,
                password : hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.avatar,
                })
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            }
            
        }catch(e) {
            reject(e);
        }
    })
}

let handleDeleteUser = async(userId) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if (!user) {
                resolve({
                    errCode:2,
                    errMessage: 'The user is not exist',
                })
            }
            await db.User.destroy({
                where: {id:userId}
            })
            resolve({
                errCode:0,
                errMessage: 'The user has been deleted',
            })
        }catch(e) {
            reject(e);
        }
    })
}

let handleEditUser = async(data) => {
    return new Promise(async(resolve,reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    message: 'Missing input parameters',
                })
            }
            let user = await db.User.findOne({
                where: { id : data.id },
                raw: false,
            });
            if (user) {
                user.lastName = data.lastName;
                user.firstName = data.firstName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update successfully',
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'User does not exist',
                })
            }
        }catch(e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve,reject) => {
        try {
            if (!typeInput) {
                resolve ({
                    errCode:1,
                    errMessage: 'Missing required parameter',
                })
                
            }
            else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                where: {type: typeInput}  
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
            
            
        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    handleUserLogin:handleUserLogin,
    getUserId:getUserId,
    createNewUser:createNewUser,
    handleDeleteUser:handleDeleteUser,
    handleEditUser:handleEditUser,
    getAllCodeService:getAllCodeService,
}