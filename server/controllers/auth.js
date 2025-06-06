const prisma = require('../config/prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.register =async(req,res)=>{
    //code
    try{
        const {email,password} = req.body

        //Step 1 Validate body
        // if(!email || !password){
        //     return res.status(400).json({message:'Email is required!!!!!'})

        // } 
        if(!email){
            return res.status(400).json({message:'Email is required!!!!!'})

        } 
        if(!password){
            return res.status(400).json({message:'Password is required!!!!!'})

        }  
        
        //Step  2 Check Email in DB already?
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(user){
            return res.status(400).json({message: "Email already exists!!! "})
        }

        // Step 3 HashPassword
        const hashPassword = await bcrypt.hash(password,10)
        console.log(hashPassword)

        //Step 4 Register
        await prisma.user.create({
            data:{
                email:email,
                password:hashPassword
            }
        })

        res.send('Register Success')
    }catch (err){
        console.log(err)
        res.status(500).json({message:"Server Error"})
        
    }






   
}

exports.login = async(req,res)=>{
    try{

        const {email,password} = req.body

        //Step 1 Check Email
        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({message:'User not found or not Enabled'})
        }
        //Step 2 Chek password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Invalid Password'})
        }

        //Step 3 Create Payload
        const payload = {
            id:user.id,
            email:user.email,
            role:user.role
        }

        
        //Step 4 Generate Token
        jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'},
            (err,token)=>{
                if(err){
                    return res.status(500).json({message:"Server Error"})
                }
                res.json({payload,token})
            }
        )
        
        
    }catch (err){
        console.log(err)
        res.status(500).json({message:"Server Error"})
        
    }
}

exports.currentuser = async(req,res)=>{
    try{
        const user = await prisma.user.findFirst({
            where:{ email:req.user.email},
            select:{
                id:true,
                email:true,
                name:true,
                role:true,
                address:true
            }
        })
        res.json({user})
    }catch (err){
        console.log(err)
        res.status(500).json({message:"Server Error"})
        
    }
}

