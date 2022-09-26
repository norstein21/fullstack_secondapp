import User from "../models/UserModel.js";
import {Op} from "sequelize";


export const getUsers = async (req,res) =>{
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await User.count({
            where:{
                [Op.or] : [{
                    name:{
                        [Op.like]:'%'+search+'%'
                    }
                },
                {email:{
                    [Op.like]:'%'+search+'%'
                }}
            ]
            }
        });
        const totalPage = Math.ceil(totalRows/limit);
        const response = await User.findAll({
            where:{
                [Op.or]:[{name:{
                    [Op.like]:'%'+search+'%'
                }}, {email:{
                    [Op.like]:'%'+search+'%'
                }},
            ]
            },
            offset:offset,
            limit:limit,
            order:[
                ['id','DESC']
            ]
        });
        res.status(200).json({
            result:response, //penggunaan result disini harga mati
            page:page,
            limit:limit,
            totalRows:totalRows,
            totalPage:totalPage
        });
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