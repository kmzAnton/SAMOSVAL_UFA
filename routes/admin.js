module.exports = function(req,res){
  var functions = {};
  function Info(){
    this.title = '';
    this.error_msg = '';
  };
  var db = require('../db.js');
  
  functions.login = function(req,res){
    var info = new Info();
    info.title = 'Login page';
    res.render('page/login.ejs',{info:info});
  }
  
  functions.admin_page = function(req,res){
    var info = new Info();
    info.title = 'Admin page';
    
    db.connect(function(err){
      if(err){console.log(err)}
      var dbase = db.getDb().collection('samosval_ufa_dbase');
      dbase.find().toArray().then(function(resp){
        if(resp){
          resp.forEach(function(item){
            item.zone.materials.forEach(function(elem){
              if(elem.desc.length>=75){
                elem.short_desc = elem.desc.slice(0, 75);
              }
            });
          });
          console.log('in dbase');
          res.render('page/admin.ejs',{info:info, data: resp});
        }else{
          console.log('no dbase');
          res.sendStatus(400);
        }
      });
    });
  }
  
  functions.getMaterials = function(req,res){
    var zone_num = req.body.zone_num;
    var mat = req.body.mat;
    
    db.connect(function(err){
      if(err){console.log(err)}
      var dbase = db.getDb().collection('samosval_ufa_dbase');
      dbase.findOne({zone_name: Number(zone_num), "zone.materials": {$elemMatch: {header: mat}}})
        .then(function(resp){
          resp.zone.materials.forEach(function(item, ind){
            if(item.header==mat){
              // console.log(resp.zone.materials[ind]);
              res.end(JSON.stringify(resp.zone.materials[ind]));
            }
          });
        });
      
    });
    
  }
  
  functions.editDb = function(req,res){
    var name = req.body.inputName;
    var zone_num = Number(req.body.inputZone);
    var desc = req.body.inputDesc;
    var newVol = [];
    console.log(req.body);
    
    for(var i=0; i<4; i++){
      // console.log(req.body["subOptions+"+i]);
      if(req.body["subOptions+"+i]=="true"){
        newVol.push({
          amount:Number(req.body["inputAmount+"+i]),
          isAvail: true,
          price: Number(req.body["inputPrice+"+i])
        });
      }else{
        newVol.push({
          amount:Number(req.body["inputAmount+"+i]),
          isAvail: false,
          price: Number(req.body["inputPrice+"+i])
        });
      }
    }
    // res.redirect('/admin');
    
    db.connect(function(err){
      if(err){console.log(err);}
      var dbase = db.getDb().collection('samosval_ufa_dbase');
      dbase.findOne({zone_name: zone_num})
        .then(function(resp){
          // console.log(resp);
          resp.zone.materials.forEach(function(item, ind){
            if(item.name==name){
              item.header=req.body.inputHeader;
              item.desc=desc;
              // console.log(req.body.options);
              if(req.body.options=="true"){item.isAvail=true}
              else{item.isAvail=false}
              item.vol=newVol;
              
              dbase.replaceOne(
                {zone_name:zone_num},
                resp
              );
            }
          });
          
          console.log('replaced');
          res.redirect('/admin');
        });
    });
  }
  
  
  return functions
}