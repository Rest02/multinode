import React from "react";
import { AuthLayout } from "../../components/Auth/AuthLayout";
import { LoginForm } from "../../components/Auth/LoginForm";

export default function LoginPage() {
    return (
        <AuthLayout
            title="Access System"
            subtitle="Encrypted tunnel established. Enter credentials."
        >
            <LoginForm />
        </AuthLayout>
    );
}
