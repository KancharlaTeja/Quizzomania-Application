const express = require("express");
const { userLogin,userSignup,userMarks} = require('./mongo')
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended :true}));

app.use(cors(
    {
        methods:['POST','GET'],
        credintials:true
    }
));

app.get('/',async (req,res)=>{
    res.send('Hello')
})

//===============================================


app.post("/", async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ status: 'unfill' });
    }
    const user = await userSignup.findOne({ email: email })
  
    if (user)
     {
  
        if (user.password === password)
        {
            const user_had = await userLogin.findOne({email:user.email})
            if(user_had){
                //await LoginSchema1.create({ email: email, password: password })
                res.json({ status: 'success', email: user.email })
        }
              else{
                await userLogin.create({ email: email, password: password })
                res.json({ status: 'success', email: user.email })
              }
  
        }
        else {
          res.json({ status: 'incorrectpassword' })
        }
    }
    else {
      res.json({ status: 'notsignup' })
    }
  
  })
//======================================  
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.json({ status: 'unfill' });
    }
  
    const data1 = {
      name: name,
      email: email,
      password: password
    }
    const dat={
        email:email,
        marks:0
    }
    
    const check2 = await userSignup.findOne({ email: email })
    if (check2) {
      return res.json({ status: 'exists' })
    }
    else {
      await userSignup.create(data1)
      await userMarks.create(dat)
      res.json({ status: 'success' })
    }
  })
//=======================================================
app.post("/task", async (req, res) => {
    const em3 = req.body.email.trim()
    const finalScore = req.body.finalScore;
 
    const check3 = await userMarks.findOne({ email: em3 })
    if(check3){
        try{
            check3.marks = finalScore;
            await check3.save();
            console.log(check3.marks)
            res.json({status:'success',marks:check3.marks})
        }
        catch(error){
            return res.json({status:'error'})
        }
    }
  });
  //========================================================

  app.post("/End", async (req, res) => {
    try {
        const { email } = req.body;
        const allUsers = await userMarks.find({}).sort({ marks: -1 });

        const emails = allUsers.map(user => user.email);
        const marks = allUsers.map(user => user.marks);

        
        const names = [];
        for (const email of emails) {
            const user = await userSignup.findOne({ email });
            if (user) {
                names.push( user.name ); 
            }
        }

       
       

        res.json({ status: 'success', emails, names, marks, email }); 
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

  
  //========================================================
  app.listen(8000, () => {
    console.log('Server listening on port 8000');
  });
  