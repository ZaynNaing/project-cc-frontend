import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("/login", formData);
            localStorage.setItem("token", JSON.stringify(response.data.user));
            alert("Login Successful!");
            navigate("/profile");
        } catch (error) {
            setError("Invalid email or password");
            console.error("Login error:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h4">Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
                    <TextField fullWidth margin="normal" label="Password" type="password" name="password" onChange={handleChange} />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
