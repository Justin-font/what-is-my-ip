const nodemailer = require("nodemailer"); // send email
const request = require('request'); // made http request
const schedule = require('node-schedule'); // made action each seconds / minutes / hours
var curent_ip = '0.0.0.0' // your curent ip default is 0.0.0.0
var j = schedule.scheduleJob('*/5 * * * * *', function () { // jobs here every 5 seconds node-schedule docs for more info
    var ip_url = "https://api.ipify.org/?format=json"
    request(ip_url, { json: true }, (err, res, body) => { // get your ip 
        var ip = body.ip
        if (err) { return console.log(err); }
        if (curent_ip != ip) { // if your ip change then it send an email
            console.log(ip, curent_ip)
            var smtpTransport = nodemailer.createTransport({  // set the stmp server here is gmail
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "YOUR GMAIL EMAIL", //  sender email acount
                    pass: "YOUR GMAIL  PASSWORD" // sender password acount
                }
            });

            var mail = { // mail seting
                from: "YOUR GMAIL EMAIL", // email from ( you)
                to: "YOUR TARGET EMAIL", // email to
                subject: ip, // subject here the ip
                text: ip // text here the ip
            }
            smtpTransport.sendMail(mail, function (error, response) {
                if (error) {
                    console.log("Mail send error");
                    console.log(error);
                } else {
                    console.log("Mail send succes")
                }
                smtpTransport.close();
            })
            curent_ip = ip
        }

    });

});

