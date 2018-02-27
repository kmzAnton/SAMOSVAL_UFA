module.exports = function(data){
  var db = require('../db.js');
  var functions = {};
  function Info(){
    this.title = '';
    this.error_msg = '';
  };
  var getAgent = function(ua) {
    var $ = {active: false};

    if (/mobile/i.test(ua)) {
        $.active = 'mobile';
    }
    if (/like Mac OS X/.test(ua)) {
        $.active = 'iOS';
    }
    if (/Android/.test(ua)) {
        $.active = 'Android';
    }
    if (/webOS\//.test(ua)) {
        $.active = 'webOS';
    }
    if (/(Intel|PPC) Mac OS X/.test(ua)) {
        $.active = 'Safari';
    }
    if (/Windows NT/.test(ua)) {
        $.active = 'IE';
    }
    if (/MSIE/.test(ua)) {
        $.active = 'IE';
    }
    if (/Trident/.test(ua)) {
        $.active = 'IE';
    }
    if (/Edge\/\d+/.test(ua)) {
        $.active = 'IE Edge';
    }

    return $.active;
};
  
  
  functions.calculator = function(req,res){
    var info = new Info();
    info.title = 'Online Calculator'
    
    db.connect(function(err){
      if(err){console.log(err)}
      var dbase = db.getDb().collection('samosval_ufa_dbase');
      dbase.find().toArray().then(function(resp){
        if(resp){
          resp.forEach(function(item){
            item.zone.materials.forEach(function(elem){
              if(elem.desc.length>=75){
                // console.log('last step');
                elem.short_desc = elem.desc.slice(0, 75);
              }
            });
          });
          // console.log('in dbase');
          res.render('page/calc',{info:info, data: resp});
        }else{
          console.log('no dbase');
          res.sendStatus(400);
        }
      });
    });
  }
  
  functions.getPrice = function(req,res){
    var zone = Number(req.body.zone), mat = req.body.mat, vol = req.body.vol;
    var newReq = {
      zone: zone,
      material: mat,
      volume: vol,
      reqId: req.headers['x-forwarded-for'].split(',')[0],
      userAgent: getAgent(req.headers['user-agent']),
      reqDate: (new Date()).toString()
    };
    console.log(newReq);
    
    db.connect(function(err){
      
      var dbaseReq=db.getDb().collection('samosval_ufa_requests');
      dbaseReq.save(newReq).then(function(){console.log('newReq is saved in dbase')});
      
      var dbaseFind = db.getDb().collection('samosval_ufa_dbase');
      dbaseFind.findOne({zone_name:zone}).then(function(resp){
        resp.zone.materials.forEach(function(item){
          if(item.name==mat){
            item.vol.forEach(function(elem){
              if(elem.amount===Number(vol)){
                res.end(elem.price.toString());
              }
            });
          }
        });
      });
    });
    
  }
  
  return functions;
}