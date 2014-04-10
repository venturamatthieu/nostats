
/*
 * GET home page.
 */

exports.index= function(req, res){
  res.render('scripts/index/index', { title: 'Express Home Page' });
};