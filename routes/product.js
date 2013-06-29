var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("productlistdb09");
    db.collection('productlist', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'productlist' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

 
exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('productlist', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};
exports.findByBarcode = function(req, res) {
    var barCode = parseInt(req.params.barCode);
    console.log('findByBarcode: ' + barCode);
    db.collection('productlist', function(err, collection) {
        collection.findOne({'barCode': barCode},function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.findByProductName = function(req, res) {
    var productName = req.params.productName;
    console.log('findByProductName: ' + productName);
    db.collection('productlist', function(err, collection) {
        collection.findOne({'productName': productName},function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};




/*exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByManager: ' + id);
    db.collection('productlist', function(err, collection) {
        collection.find({'managerId': id}).toArray(function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.findAll = function(req, res) {
	console.log(req.params);
    var name = req.query["name"];
    db.collection('productlist', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};*/
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    console.log("Populating employee database...");
    /*var productlist = [
        {"id": 1, "firstName": "James", "lastName": "King", "fullName": "James King", "managerId": 0, managerName: "", "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
        {"id": 2, "firstName": "Julie", "lastName": "Taylor", "fullName": "Julie Taylor", "managerId": 1, managerName: "James King", "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
        {"id": 3, "firstName": "Eugene", "lastName": "Lee", "fullName": "Eugene Lee", "managerId": 1, managerName: "James King", "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
        {"id": 4, "firstName": "John", "lastName": "Williams", "fullName": "John Williams", "managerId": 1, managerName: "James King", "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
        {"id": 5, "firstName": "Ray", "lastName": "Moore", "fullName": "Ray Moore", "managerId": 1, managerName: "James King", "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
        {"id": 6, "firstName": "Paul", "lastName": "Jones", "fullName": "Paul Jones", "managerId": 4, managerName: "John Williams", "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
        {"id": 7, "firstName": "Paula", "lastName": "Gates", "fullName": "Paula Gates", "managerId": 4, managerName: "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
        {"id": 8, "firstName": "Lisa", "lastName": "Wong", "fullName": "Lisa Wong", "managerId": 2, managerName: "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
        {"id": 9, "firstName": "Gary", "lastName": "Donovan", "fullName": "Gary Donovan", "managerId": 2, managerName: "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
        {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "fullName": "Kathleen Byrne", "managerId": 5, managerName: "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
        {"id": 11, "firstName": "Amy", "lastName": "Jones", "fullName": "Amy Jones", "managerId": 5, managerName: "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
        {"id": 12, "firstName": "Steven", "lastName": "Wells", "fullName": "Steven Wells", "managerId": 4, managerName: "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
    ];*/
     var productlist = [
        {"id": 1, "barCode": 100, "modelNo": 200, "imageName": "test.jpg", "objName": "switch1_obj.obj", "objCount": 3, "productName": "switch1", "productType": "Regulator", "segment": "Residential", "country": "India", "solutionID": 0},
        {"id": 2, "barCode": 101, "modelNo": 201, "imageName": "test.jpg", "objName": "switch2_obj.obj", "objCount": 3, "productName": "switch2", "productType": "Switch", "segment": "Residential", "country": "Italy", "solutionID": 0},
        {"id": 3, "barCode": 102, "modelNo": 202, "imageName": "test.jpg", "objName": "switch3_obj.obj", "objCount": 3, "productName": "switch3", "productType": "Socket", "segment": "Residential", "country": "France", "solutionID": 0},
        {"id": 4, "barCode": 103, "modelNo": 203, "imageName": "test.jpg", "objName": "switch4_obj.obj", "objCount": 3, "productName": "switch4", "productType": "Switch", "segment": "Residential", "country": "France", "solutionID": 1},
        {"id": 5, "barCode": 104, "modelNo": 204, "imageName": "test.jpg", "objName": "switch5_obj.obj", "objCount": 3, "productName": "switch5", "productType": "Switch", "segment": "Residential", "country": "France", "solutionID": 1},
        {"id": 6, "barCode": 105, "modelNo": 205, "imageName": "test.jpg", "objName": "switch6_obj.obj", "objCount": 3, "productName": "switch6", "productType": "Switch", "segment": "Residential", "country": "France", "solutionID": 1},
        {"id": 7, "barCode": 106, "modelNo": 206, "imageName": "test.jpg", "objName": "switch7_obj.obj", "objCount": 3, "productName": "switch7", "productType": "Switch", "segment": "Residential", "country": "India", "solutionID": 1},
        {"id": 8, "barCode": 107, "modelNo": 207, "imageName": "test.jpg", "objName": "switch8_obj.obj", "objCount": 3, "productName": "switch8", "productType": "Switch", "segment": "Residential", "country": "Denmark", "solutionID": 1},
        {"id": 9, "barCode": 108, "modelNo": 208, "imageName": "test.jpg", "objName": "switch9_obj.obj", "objCount": 3, "productName": "switch9", "productType": "Switch", "segment": "Residential", "country": "Italy", "solutionID": 1},
        {"id": 10, "barCode": 109, "modelNo": 209, "imageName": "test.jpg", "objName": "switch10_obj.obj", "objCount": 3, "productName": "switch10", "productType": "Switch", "segment": "Residential", "country": "Denmark", "solutionID": 1}		
    ];
    db.collection('productlist', function(err, collection) {
        collection.insert(productlist, {safe:true}, function(err, result) {});
    });
 
};
