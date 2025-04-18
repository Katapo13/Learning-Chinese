const User = require ('../models/User')
const Role = require ('../models/Role')
const bsrypt = require ('bcryptjs')

class authController{
    async register(req, res){
        try{
            const {email, userName, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message: "There is already a user with this email"})
            }
            const hashPassword = bsrypt.hashSync(password, 10)
            const userRole = await Role.findOne({value:"user"})
            const user = new User({email, userName, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message:"User successfully registered"})
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try{

        }catch(e){
            
        }
    }

    async getUsers(req, res){
        try {
            
        
        
          } catch (e) {
            res.status(500).json({ message: "Server error" });
          }
    }
}

module.exports = new authController()