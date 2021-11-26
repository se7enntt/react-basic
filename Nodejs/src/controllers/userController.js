import userService from '../services/userService';

let handleLogin = async(req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode:1,
            message: 'Missing input parameter !'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);
    //check email exist
    //compare password
    //return userInfo
    //access_token: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData : {}
    })
}

let handleGetAllUsers = async(req,res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode:1,
            message: 'Missing input parameter !'
        })
    }
    let users = await userService.getUserId(id);

    return res.status(200).json ({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async(req,res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditUser = async(req,res) => {
    let data = req.body;
    let message = await userService.handleEditUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async(req,res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter", 
        })
    }
    let message = await userService.handleDeleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCode = async(req,res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        // console.log(data);
        return res.status(200).json(data);
    }catch (e) {
        console.log('Get all code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server',
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode:getAllCode,
}