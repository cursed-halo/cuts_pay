import {nodemailer} from nodemailer;
 function otpMail()
{
    console.log("i am called");
    Email.send({
        Host:"smtp.gmail.com",
        Username:"abhishekpaul.cse2019@nsec.ac.in",
        Password:"Welcome@1234",
        To:"paul.apaul.abhishek.ap@gmail.com",
        From:"abhishekpaul.cse2019@nsec.ac.in",
        Subject: "Otp",
        Body: "1234",
    }).then(
        message=>alert("emil sent successfully")
    );
}