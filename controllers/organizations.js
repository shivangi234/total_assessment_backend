const db = require('../config/db');


const createOrganization = async(req, res)=>{
    const { org_code,org_name,org_type,website_adderess,contact_no,location,logo_url,admin_first_name,admin_last_name,user_name,email,phone_no,created_by,createdOn,updated_by,updatedOn,record_status,lastUpdated,primary_org
    } = req.body;
    console.log('Request Body:', req.body);
    try {
       const data = await db("organizationmaster").insert({
        org_code ,
        org_name,
        org_type,
        website_adderess,
        contact_no,
        location,
        logo_url,
        admin_first_name,
        admin_last_name,
        user_name,
        email,
        phone_no,
        created_by ,
        created_on: createdOn,
        updated_by,
        updated_on : updatedOn,
        record_status,
        last_updated: lastUpdated,
        primary_org,
       
      }).returning('id');
        res.status(200).json({ message: "Organization created successfully",data });
    } catch (error) {
          res.status(500).json({ error: "Error retrieving data" });
    }
}

 const getOrganizations =async (req,res)=>{
   try {
     const organization = await db("organizationmaster").select().where("record_status", 1) .orderBy("id", "asc");
     res.status(200).json({ message: "Data get successfully",organization });
   } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
   }
}


module.exports={createOrganization,getOrganizations};
