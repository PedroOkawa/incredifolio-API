const path = require('path');
const multer = require('multer');
var output = 'public/images/';

module.exports = {
    /* MULTER UPLOAD MODULE */
    output: output,
    upload: multer({ storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, output);
            },
            filename: function (req, file, cb) {
                var extname = path.extname(file.originalname).toLowerCase();
                cb(null, Date.now() + extname);
            }
        }),
    	fileFilter: function (req, file, cb) {
        	var filetypes = /jpeg|jpg|png/;
        	var mimetype = filetypes.test(file.mimetype);
        	var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    	    if (mimetype && extname) {
    	      return cb(null, true);
    	    }

    		return cb(new Error('Only JPG\'s and PNG\' are allowed'));
    	},
        limits: { fileSize: 1028 * 100 }
    }),

}