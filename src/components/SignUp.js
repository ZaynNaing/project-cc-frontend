import React from "react";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "../api/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/signup", formData).then(response => {
                localStorage.setItem("token", JSON.stringify(response.data.user));
                navigate("/profile");
            })
            alert("Signup Successful!");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h4">Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignUp;
