import User from "../models/UserModel.js";
import * as yup from "yup";


export const addDataSchema = yup.object({
    body: yup.object({
        name: yup.string().min(5).max(32),
        email:yup.string().email(),
        gender:yup.string().min(1),
    }),
    params:yup.object({
        id:yup.number(),
    }),
});

export const editDataSchema = yup.object({
    body: yup.object({
        name: yup.string().min(5).max(32),
    })
})

export const validate = (schema) => async(req,res,next) =>{
    try{
        await schema.validate({
            body:req.body,
            params:req.params,
        });
        return next();
    } catch(err){
        return res.status(500).json({ type:err.name,message:err.message });
    }
};


export const getUsers = async (req,res) =>{
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    }  catch(error) {
        console.log(error.message);
    }
}

export const getUserById = async(req,res) =>{
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response)
    } catch(error){
        console.log(error.message)
    }
}

export const createUser = async(req,res) =>{
    try{
        await User.create(req.body);
        res.status(201).json({msg:"User Created"});
    } catch(error){
        console.log(error.message);
    }
}

export const updateUser = async(req,res) =>{
    try{
        await User.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg:"User Updated"})
    } catch(error){
        console.log(error.message)
    }
}

export const deleteUser = async(req,res) =>{
    try{
        await User.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg:"User Deleted"})
    } catch(error){
        console.log(error.message)
    }
}