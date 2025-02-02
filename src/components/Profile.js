import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Avatar, TextField } from "@mui/material";
import axios from "../api/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ email: "", name: "", profileImage: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/profile", { 
                    params: { email: JSON.parse(token).email }
                 });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select an image first.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                "/imageupload",
                { email: JSON.parse(token).email, filename: selectedFile.name, contentType: selectedFile.type },
            );

            await axios.put(data.uploadURL, selectedFile, {
                headers: { "Content-Type": selectedFile.type },
            });

            await axios.put(
                "/profile",
                { email: JSON.parse(token).email, profileImage: data.imageUrl },
            );

            console.log(data);
            setUserData((prev) => ({ ...prev, profileImage: data.imageUrl }));
            setMessage("Profile image updated successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("Upload failed. Please try again.");
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h4">Profile</Typography>
                <Avatar src={userData.profileImage} sx={{ width: 100, height: 100, margin: "auto" }} />
                <Typography variant="h6">{userData.name}</Typography>
                <Typography variant="body1">{userData.email}</Typography>
                <Box mt={3}>
                    <TextField type="file" onChange={handleFileChange} fullWidth />
                    {message && <Typography color="success.main">{message}</Typography>}
                    <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
                        Upload Profile Image
                    </Button>
                </Box>
                <Typography
                    variant="body2"
                    color="primary"
                    sx={{ mt: 3, cursor: "pointer", textDecoration: "underline" }}
                    onClick={handleSignOut}>
                    Sign out
                </Typography>
            </Box>
        </Container>
    );
};

export default Profile;
