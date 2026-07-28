import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        api.get("profile/")
            .then((response) => {
                setUser(response.data);
            })
            .catch(() => {
                console.log("Not Logged In");
            });

    }, []);

    if (!user)
        return <h2>Loading...</h2>;

    return (
        <div>
            <h1>Profile</h1>

            <p>Username : {user.username}</p>

            <p>Email : {user.email}</p>
        </div>
    );
}

export default Profile;