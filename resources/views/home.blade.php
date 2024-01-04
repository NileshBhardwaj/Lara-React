<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Lara-Reat</title>

    <style>
        @import url(http://fonts.googleapis.com/css?family=Calibri:400,300,700);
        @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');


        body {
            background-color: #eee;
            font-family: 'Calibri', sans-serif !important;
        }

        .mt-100 {
            margin-top: 100px;

        }


        .card {
            margin-bottom: 30px;
            border: 0;
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
            letter-spacing: .5px;
            border-radius: 8px;
            -webkit-box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, .05);
            box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, .05);
        }

        .card .card-header {
            background-color: #fff;
            border-bottom: none;
            padding: 24px;
            border-bottom: 1px solid #f6f7fb;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .card-header:first-child {
            border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
        }



        .card .card-body {
            padding: 30px;
            background-color: transparent;
        }

        .btn-primary,
        .btn-primary.disabled,
        .btn-primary:disabled {
            background-color: #4466f2 !important;
            border-color: #4466f2 !important;
        }

        * {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }


        body {
            font-family: 'Roboto', sans-serif;
        }

        a {
            text-decoration: none;
        }

        .product-card {
            width: 380px;
            position: relative;
            box-shadow: 0 2px 7px #dfdfdf;
            margin: 50px auto;
            background: #fafafa;
        }

        .badge {
            position: absolute;
            left: 0;
            top: 20px;
            text-transform: uppercase;
            font-size: 13px;
            font-weight: 700;
            background: red;
            color: #fff;
            padding: 3px 10px;
        }

        .product-tumb {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 300px;
            padding: 50px;
            background: #f0f0f0;
        }

        .product-tumb img {
            max-width: 100%;
            max-height: 100%;
        }

        .product-details {
            padding: 30px;
        }

        .product-catagory {
            display: block;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            color: #ccc;
            margin-bottom: 18px;
        }

        .product-details h4 a {
            font-weight: 500;
            display: block;
            margin-bottom: 18px;
            text-transform: uppercase;
            color: #363636;
            text-decoration: none;
            transition: 0.3s;
        }

        .product-details h4 a:hover {
            color: #fbb72c;
        }

        .product-details p {
            font-size: 15px;
            line-height: 22px;
            margin-bottom: 18px;
            color: #999;
        }

        .product-bottom-details {
            overflow: hidden;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }

        .product-bottom-details div {
            float: left;
            width: 50%;
        }

        .product-price {
            font-size: 18px;
            color: #fbb72c;
            font-weight: 600;
        }

        .product-price small {
            font-size: 80%;
            font-weight: 400;
            text-decoration: line-through;
            display: inline-block;
            margin-right: 5px;
        }

        .product-links {
            text-align: right;
        }

        .product-links a {
            display: inline-block;
            margin-left: 5px;
            color: #e1e1e1;
            transition: 0.3s;
            font-size: 17px;
        }

        .product-links a:hover {
            color: #fbb72c;
        }

        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            /* background-color: #333; */
            background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
        }

        li {
            float: left;
        }

        li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        li a:hover:not(.active) {
            background-color: #111;
        }

        .active {
            background-color: #04AA6D;
        }

        .product {
            display: inline-block;
            width: 30%;
            height: 50px;
            border: 1px solid green;
        }

        .footer {
            /* position: fixed; */
            left: 0;
            bottom: 0;
            width: 100%;
            height: auto;
            overflow: hidden;
            position: fixed;
            bottom: 0px;

            color: white;
            text-align: center;
            background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
        }


        h1 {
            display: flex;
            color: #646764;
            flex-direction: row;
            justify-content: space-around;
        }

        /* form {border: 3px solid #f1f1f1;} */

        input[type=text],
        input[type=password] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
            . border-radius: 4px;
        }

        button {
            background-color: #04AA6D;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 100%;
        }

        button:hover {
            opacity: 0.8;
        }

        .cancelbtn {
            width: auto;
            padding: 10px 18px;
            background-color: #f44336;
        }

        .imgcontainer {
            text-align: center;
            margin: 24px 0 12px 0;
        }

        img.avatar {
            width: 40%;
            border-radius: 50%;
        }

        .container {
            padding: 16px;
            /* margin-top: 100px; */
        }

        span.psw {
            float: right;
            padding-top: 16px;
        }

        /* Change styles for span and cancel button on extra small screens */
        @media screen and (max-width: 300px) {
            span.psw {
                display: block;
                float: none;
            }

            .cancelbtn {
                width: 100%;
            }
        }

        label {
            margin-top: 9px;
            display: flex;
            justify-content: space-between;
        }

        .vh-100 {
            /* height: 100%; */
        }

        button#remove {
            background-color: black;
            border-radius: 4px;
            height: 45px;
            width: 49px;
        }

        #remove-div {
            margin-left: 1088px;
        }

        button#decrease {
            width: 49px;
            margin-left: 4px;
            background-color: red;
            border-radius: 4px;
            height: 45px;
        }

        button#add {
            width: 49px;
            margin-left: 4px;
            height: 45px;
            border-radius: 4px;
        }

        #strong {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        #excel {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 361px;
            margin-left: 1446px;
        }

        a.backtohome {
            font-size: 19px;
            color: aliceblue;
        }
    </style>
</head>

<body>
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    <div id=app></div>

    <div id="footer"></div>
</body>

</html>