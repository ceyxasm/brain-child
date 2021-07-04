const handleProfileGet= (req,res, db)=>{
    const {id}=req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user=> {
        if( user.length){
            res.json(user[0])
        }else{
            res.json('user not found').status(404)
        }
    }).catch(err => res.json('error getting user').status('404'))
}

module.exports={
    handleProfileGet: handleProfileGet
};