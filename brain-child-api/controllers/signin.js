const handleSignin = (req,res, db, bcrypt)=>{
    const {email, password}= req.body; 
    if( !email  || !password){
        return res.json('bad credentials').status(404);
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data=> {
        const isValid= bcrypt.compareSync(password, data[0].hash);

        if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(err=> res.json('error signing in/ couldn\'t get user').status(404))
        } else{
            res.json('wrong credentials').status(400)
        }
    })
    .catch(err=>  res.json('wrong credentials').status(404))
}

module.exports={
    handleSignin: handleSignin
}