<html>
	<head>
		<title><?php
            if (!isset($_GET['module'])) {
                echo "GameBets";
            } else {
                echo $_GET['module'];
            }
            ?></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="view/css/main.css" />
  		
  		<!-- Datepicker -->
	    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
	  	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	    
	    <!--<link rel="stylesheet" href="/resources/demos/style.css">-->
	   
	</head>
	
	<body>