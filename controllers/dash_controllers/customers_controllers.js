const customers_schema = require('../../modals/customers_schema');


//all customers controllers//

const getAllcustomers= async(req,res)=>{

    let find;
    const searchValue= req?.query?.searchData
    const page= req?.query?.page ? parseInt(req?.query?.page) : 1
    const limit= req?.query?.limit ? parseInt(req?.query?.limit) : 7
    const startIndex= (page - 1) * limit
    
    // getting all customers//
        if(!searchValue){
                find= await customers_schema.find({}).sort({ createdAt: -1 }).limit(limit).skip(startIndex)
        
        
        
        
            }else{
            
                //search//
        
                const searchRegex = new RegExp(searchValue,'i')
                find= await customers_schema.find({customer_Name:{$regex:searchRegex}}).sort({ createdAt: -1 }).limit(limit).skip(startIndex)
        
            }

            // console.log()

// find= await customers_schema.find({})

const getAllcustomersCount= await  customers_schema.find({}).countDocuments()
const getlimitcount= await getAllcustomersCount/limit
console.log("count",getlimitcount);



    console.log("all customer=>",find);
    res.status(200).send({status:true,message:"all customers",data:find,totalCount:getAllcustomersCount,limitCount:getlimitcount})
}

// const ram= await customers_schema.findById({customer_Name}).then(function)                 

              //search//

const searchCustomers= async(req,res)=>{
   const searchValue= req?.params?.search
   console.log("searchValue=>",searchValue);
   const searchRegex = new RegExp(searchValue,'i')
   console.log("searchRegex=>",searchRegex);
   try {
    const find= await customers_schema.find({customer_Name:{$regex:searchRegex}})

    // if(!find?.length){
    //     const find= await customers_schema.find({customer_Name:{$regex:searchRegex}})
    // }
    
    res.status(200).send({status:true,message:"search result",data:find})
   } catch (error) {
    res.status(404).send({message:"something wemt wrong!!"})
    
   }

}

const getcustomerbyId=async(req,res)=>{
    const id=req?.params?.id
    console.log(id);
    const edit= await customers_schema.findById(id)
    console.log("edit=>",edit);
    res.status(200).send({status:true,message:"costumer found",data:edit})
}

// const searchCustomers=async(req,res)=>{
//     const searchValue= req.params.search
//     // const searchRegexx= new RegExp(searchValue,"i")

   
//    try {
//     const find= await customers_schema.find({email:searchValue})
//     res.status(200).send({status:true,message:"search result",data:find})
//    } catch (error) {
//     res.status(500).send({message:"no found"})
//    }
// }


const createcustomers= async(req,res)=>{
    console.log("created ");
    console.log("body=>",req.body);
    const create= new customers_schema({
     ...req.body
    })
    const result= await create.save()
    res.status(200).send({status:true,message:"create succesfully",data:result})

}
  



const deletecustomers= async(req,res)=>{
    const id= req?.params?.id
    const deleted= await customers_schema.findByIdAndDelete(id)
    console.log("delete successfully",deleted);
    res.status(200).send({status:true,message:"deleted sucessfully",})

}

const updatecustomers= async(req,res)=>{
    console.log("updated successfully");
    console.log("body=>",req.body);
    const id= req.params.id
    const updated= await customers_schema.findByIdAndUpdate(id,{$set:{...req.body}})
    console.log("updated=>",updated);
    res.status(200).send({status:true,message:"updated sucessfully"})
    
}



module.exports ={createcustomers,deletecustomers,updatecustomers,getAllcustomers,searchCustomers,getcustomerbyId}