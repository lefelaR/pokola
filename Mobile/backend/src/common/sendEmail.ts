const AWS = require("aws-sdk");
const SES = new AWS.SES({region: "eu-central-1"});


export const sendEmail = async (to, from, subject, text)=>{
    const params = {
          Destination: {
            ToAddresses: [ `${to}` ],
              },
              Message: {
              Body: {
                Text: { Data: `${text}` },
              }, 
              Subject: { Data: `${subject}` },
            },
          
            Source: `${from}`,
          };
  

        try{
         const result = SES.sendEmail(params).promise();
            return   result;
        }catch(res){
          console.log(res);
          return res.message;
        }  
  
}
