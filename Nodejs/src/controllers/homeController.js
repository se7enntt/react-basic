import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async(req, res) => {
    // return res.render('homepage.ejs');

    try {
        let data = await db.User.findAll();
        // console.log('--------------------------');
        // console.log(data);
        // console.log('--------------------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        }); 
    }catch(e) {
        console.log(e);
    }
    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('test/crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log("Create user: " + message);
    // console.log(req.body);
    return res.send('CRUD from server');
}

let displayGETCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-----------------------');
    console.log(data);
    console.log('-----------------------');
    return res.render('test/displayCRUD.ejs', {
        dataTable: data,
    });
}

let getEditCRUD = async(req, res) => {
    let userId = req.query.id;
    if(userId) {
        let userData =  await CRUDService.getUserInfoById(userId);
        //Check user data not found

        //Found userdata
        return res.render('test/editCRUD.ejs', {
            user: userData,
        });
    }
    else {
        res.send("User not found");
    }
}

let putCRUD = async(req,res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('test/displayCRUD.ejs', {
        dataTable: allUsers,
    });
} 

let deleteCRUD = async(req,res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send("Deleted successfully");
    }
    else {
        return res.send("User can't found");
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGETCRUD:displayGETCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD,
}