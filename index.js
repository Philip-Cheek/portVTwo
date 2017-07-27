var path = require('path'),               nodemailer = require('nodemailer'),
	helmet = require('helmet'),           express = require('express'),
    bodyParser = require('body-parser'),  cookieParser = require('cookie-parser'),
	csrf = require('csurf'),              cors = require('cors');

const app = express(),
	  cookieOptions = { 
	    key: 'XSRF-TOKEN', secure: false,
  		httpOnly: false,   maxAge: 3600
	  }, 

      transporter = nodemailer.createTransport({
	  	service: 'Gmail',
		auth: { user: '', pass: '' }
	  }),
	  
	  corsOptions = {
      	origin: 'http://localhost:4200',
        optionsSuccessStatus: 200 
	  },

	  port = process.env.PORT || 8080,
      csrfProtection = csrf({ cookie: cookieOptions });


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(csrfProtection);
app.use(express.static(path.join(__dirname, 'dist')));

router.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('*', (req, res) => {
  res.type('text/html');
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.post('/sendMail', function(req, res){
	console.log('sendmail');
	console.log(req.body);
	if (req.body.person && req.body.email){
		var mailOptions = {
		    from: req.body.email, 
		    to: '', 
		    subject: 'IMPORTANT! FROM PORTFOLIO SITE!! FROM ' + req.body.person, 
		    text: '🐴 PORTFOLIO MESSAGE: 🐴 ' + req.body.message,
		    html: '<b>' + 'Person: ' + req.body.person + ' 🐴 + Email: ' + req.body.email + '🐴 + message: ' + req.body.message + '</b>'
		};
	
		transporter.sendMail(mailOptions, function(error, info){
			if (error){
				res.json({'status': false});
			}else{
				res.json({'status': true});
			}
		});
	}
});

app.listen(port);