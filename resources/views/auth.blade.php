<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="shortcut icon" href="../public/images/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="">
    <title>Welcome</title>
    <style>
        body {
            font-family: "Oswald", sans-serif;
            -webkit-font-smoothing: antialiased;
            background-color: black font-smoothing: antialiased;
        }

        h1 {
            line-height: .95;
            color: #66fcf1;
            font-weight: 900;
            font-size: 150px;
            text-transform: uppercase;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            pointer-events: none;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        .center {
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 581px;
            height: 50%;
        }

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            /* background-color: #333; */
            /* background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%); */
        }

        li {
            float: left;
        }

        li a {
            display: block;
            color: black;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 20px;
        }



        .active {
            background-color: #04AA6D;
        }

        ul,
        dl {
            margin-top: 0;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        * {
            box-sizing: border-box
        }

        /* Full-width input fields */
        input[type=text],
        input[type=password] {
            width: 100%;
            padding: 15px;
            margin: 5px 0 22px 0;
            display: inline-block;
            border: none;
            background: #f1f1f1;
        }

        input[type=text]:focus,
        input[type=password]:focus {
            background-color: #ddd;
            outline: none;
        }

        hr {
            border: 1px solid #f1f1f1;
            margin-bottom: 25px;
        }

        /* Set a style for all buttons */
        button {
            background-color: #04AA6D;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 100%;
            opacity: 0.9;
        }

        button:hover {
            opacity: 1;
        }

        /* Extra styles for the cancel button */
        .cancelbtn {
            padding: 14px 20px;
            background-color: #f44336;
        }

        /* Float cancel and signup buttons and add an equal width */
        .cancelbtn,
        .signupbtn {
            float: left;
            width: 50%;
        }

        /* Add padding to container elements */
        .container {
            padding: 16px;
        }

        /* Clear floats */
        .clearfix::after {
            content: "";
            clear: both;
            display: table;
        }

        /* Change styles for cancel button and signup button on extra small screens */
        @media screen and (max-width: 300px) {

            .cancelbtn,
            .signupbtn {
                width: 100%;
            }
        }

        .clearfix {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        button.signupbtn {
            border-radius: 8px;
            font-size: 17px;
        }

        button#log-button {
            font-size: 17px;
            border-radius: 4px;
        }

        h2 {
            display: flex;
            justify-content: center;
        }
    </style>
</head>

<body background-color: black;>

    <div id=welcome></div>
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/index.js'])
</body>

</html>