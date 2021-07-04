const clarifai=require('clarifai');

const app = new clarifai.App({
    apiKey: "f57678098ab6447ab5bb8d0f99dde6ce",
  });

const handleApiCall= (req, res)=> {
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err=> res.json('api failure').status(404))
  }


const handleImage= (req,res, db)=>{
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]); 
    }).catch(err=>{ res.json('error incrementing entries').status(404); })
}

module.exports={
    handleImage,
    handleApiCall
};