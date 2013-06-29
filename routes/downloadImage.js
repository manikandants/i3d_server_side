

exports.findByImagePath = function(req, res) {
    console.log(req.params);
	var fileName = req.params.filename;
	var fullImagePath='./images/'+fileName;
    console.log('findByImagePath: ' + fullImagePath);
	res.download(fullImagePath); // Set disposition and send it.

};


exports.findByObjPath = function(req, res) {
    console.log(req.params);
	var fileName = req.params.filename;
	var fullObjPath='./objs/'+fileName;
    console.log('findByObjPath: ' + fullObjPath);
	res.download(fullObjPath); // Set disposition and send it.

};

