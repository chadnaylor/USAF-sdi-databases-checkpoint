
const fs = require("fs")
const bodyParser = require("body-parser")

const express = require('express')
const app = express()
const port = 3001
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(bodyParser.json())

const emails = JSON.parse(fs.readFileSync("emails.JSON"))


app.get('/emails', (req, res) => {
    knex
        .select('*')
        .from('e_mails')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
        );
})
app.get('/emails/:id', (req, res) => {
    const {id} = req.params;
    knex
    .select('*')
    .from('e_mails')
    .where('id', id)
    .then(data => res.status(200).json(data))
    .catch(err =>
        res.status(404).json({
            message:
                'The data you are looking for could not be found. Please try again'
        })
    );
});
app.get('/search',(req,res) => {
    const query = decodeURIComponent(req.query.query)
    const filteredEmails = emails.filter(email => email.subject.includes(query))
    
    knex
    .select('*')
    .from('e_mails')
    .where('subject', 'like', `%${query}%`)
    .then(data => res.status(200).json(data))
    .catch(err =>
        res.status(404).json({
            message:
                'The data you are looking for could not be found. Please try again'
        })
    );

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
});

app.post('/send',function(req,res){
    let result;
    const emailSender = req.body;
    if(emailSender.sender && emailSender.recipient && emailSender.subject && emailSender.message){
       
        emails.push({ sender: emailSender.sender, recipient: emailSender.recipient, subject: emailSender.subject, email: emailSender.message, })

        result = {
            "status": "success",
            "message": "The message was successfully sent"
        }
    }else{ 
        result = {
            "status": "failed",
            "message": "The message was not sent"
        }
        res.status(400);
    }

    res.json(result);
});


app.listen(port, () => console.log(`Coolest app ever listening at http://localhost:${port}`))