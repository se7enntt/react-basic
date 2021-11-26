require('dotenv').config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Seven Nguyen 👻" <se7en.ntt@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend) //html body
  });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh trên tranng web của tôi</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu thông tin bên trên là đúng sự thật. Vui lòng click vào đường dẫn bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank" > Click here </a>
        </div>

        <div>Xin chân thành cảm ơn</div>
        `
    }
    else {
        result = `
        <h3>Xin chào ${dataSend.patientName} - English Version</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh trên tranng web của tôi</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu thông tin bên trên là đúng sự thật. Vui lòng click vào đường dẫn bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank" > Click here </a>
        </div>

        <div>Xin chân thành cảm ơn</div>
        `
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh trên tranng web của tôi</p>
        `
    }
    else {
        result = `
        <h3>Xin chào ${dataSend.patientName} - English Version</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh trên tranng web của tôi</p>

        <div>Xin chân thành cảm ơn</div>
        `
    }
    return result;
}

let sendAttachment = async(dataSend) => {
  // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_APP, // generated ethereal user
    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
  },
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Seven Nguyen 👻" <se7en.ntt@gmail.com>', // sender address
  to: dataSend.email, // list of receivers
  subject: "Kết quả đặt lịch khám bệnh", // Subject line
  text: "Hello world?", // plain text body
  html: getBodyHTMLEmailRemedy(dataSend), //html body
  attachments: [
    {
      //encoded string as an attachment 
      filename:`remedy-${dataSend.patientId}-${new Date().getDate()}.png`,
      content: dataSend.imageBase64.split("base64,")[1],
      encoding: 'base64'
    }
  ]
});
}


module.exports = {
    sendSimpleEmail,
    sendAttachment
}