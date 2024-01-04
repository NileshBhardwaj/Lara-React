import React from "react";
import { Link } from "react-router-dom";
function Logout() {

    const url = "/logOut";
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return axios
            .get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        fetchInfo();
    }, []);
    return (
        <div>gsdf</div>
    );
}

export default Logout;
