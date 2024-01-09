<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin DashBoard</title>
    <style>
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

        /* li a:hover:not(.active) {
            background-color: #111;
        } */

        .active {
            background-color: #04AA6D;
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

        h2 {
            text-align: center;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: white;
            padding: 30px 0;
        }

        table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        tr:hover {
            background-color: #ddd;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        th,
        td {
            padding: 17px;
            text-align: left;
            border-bottom: 1px solid #ddd;
            border: 0.5px solid #ddd;
            font-size: 17px;
        }

        th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #04AA6D;
            color: white;
        }

        tbody,
        thead,
        tr {
            border-color: inherit;
            border-style: solid;
            border-width: 0;
            border-radius: 6px;
        }

        div#responseContainer {
            width: 86%;
            border-radius: 0px;
        }

        .p-6.text-gray-900.dark\:text-gray-100 {
            display: flex;
            justify-content: center;
            margin-bottom: 40px;
        }

        .export {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        button.excel {
            margin-bottom: 0.4em;
            font-size: 17px;
            width: 243px;
            border-radius: 4px;
            background-color: #0080001f;
        }

        input {
            font-size: 18px;
            padding: 10px 10px 10px 5px;
            display: block;
            width: 100px;
            border: none;
            border-bottom: 1px solid #757575;
        }

        input:focus~label,
        input:valid~label {
            top: -20px;
            font-size: 14px;
            color: #5264AE;
        }

        button {
            background-color: #607D8B;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 20%;
            opacity: 0.9;
        }

        input:focus~.bar:before,
        input:focus~.bar:after {
            width: 50%;
        }

        div#excel {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-bottom: 17px;
        }

        .bar {
            position: relative;
            display: block;
            width: 300px;
        }

        .bar:before,
        .bar:after {
            content: '';
            height: 2px;
            width: 0;
            bottom: 1px;
            position: absolute;
            background: #5264AE;
            transition: 0.2s ease all;
            -moz-transition: 0.2s ease all;
            -webkit-transition: 0.2s ease all;
        }

        label.input-group-addon {
            margin-top: 10px;
        }

        .td-div {
            display: flex;
        }
        input.file {
    width: 110px;
}.pagination > li {
  display: inline-block;
  padding-left: 0;
}
.pagination > li > a, .pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  color: #2c689c;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
  font-size: 18px;
}
.pagination {
  display: flex;
  justify-content: center;
}
    </style>
</head>

<body>
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/admin.js'])
    <div id="admin"></div>
</body>

</html>
