import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
            try {
                navigate("/login");
            } catch (error) {
                console.error("Upload error:", error);
            }
        };

    const handleSignup = async () => {
        try {
            navigate("/signup");
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h4">Home</Typography>
                <form>
                    <Button type="submit" variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSignup} fullWidth sx={{ mt: 2 }}>
                        SignUp
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
