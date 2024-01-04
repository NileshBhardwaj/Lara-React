import React from 'react';
import { createRoot } from 'react-dom/client';

function Test() {

    return(
<div id="form">
<label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required/>
</div>
    );
}
export default Test;
ReactDOM.render()