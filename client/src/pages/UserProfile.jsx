import React, { useEffect, useState } from "react";
import API from "../api"; // adjust path if needed
import "../style/userProfile.css";

export default function ProfileSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        memberSince: "",
        avatar: ""
    });

    /* Fetch profile */
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await API.get("/api/user/profile");

                setProfile({
                    name: data.name,
                    email: data.email,
                    memberSince: data.memberSince,
                    avatar: data.avatar
                });
            } catch (err) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Local preview
        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const { data } = await API.put("/api/user/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setProfile((prev) => ({
                ...prev,
                avatar: data.avatar
            }));

            setPreview(null);
        } catch (err) {
            alert("Failed to upload image");
        }
    };

    /* Update profile */
    const handleSave = async () => {
        setSaving(true);
        setError("");

        try {
            await API.put("/api/user/profile", {
                name: profile.name
            });
        } catch (err) {
            setError("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="profile-page">Loading profile…</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h1 className="page-title">Profile Settings</h1>

                {/* Personal Information */}
                <div className="us-card">
                    <h2 className="us-card-title">Personal Information</h2>
                    <p className="us-card-subtitle">Update your profile details</p>

                    <div className="profile-header">
                        <div className="avatar-wrapper">
                            <input
                                type="file"
                                accept="image/*"
                                id="avatarUpload"
                                hidden
                                onChange={handleAvatarChange}
                            />

                            <label htmlFor="avatarUpload" className="avatar clickable">
                                {preview || profile.avatar ? (
                                    <img
                                        src={preview || profile.avatar}
                                        alt="Avatar"
                                        className="avatar-img"
                                    />
                                ) : (
                                    <span>👤</span>
                                )}
                                <span className="avatar-edit">Change</span>
                            </label>
                        </div>

                        <div>
                            <p className="profile-name">{profile.name}</p>
                            <p className="profile-email">{profile.email}</p>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <p className="info-text">📧 {profile.email}</p>
                    </div>

                    <div className="form-group">
                        <label>Member Since</label>
                        <p className="info-text">📅 {profile.memberSince}</p>
                    </div>

                    {error && <p style={{ color: "red", marginBottom: 8 }}>{error}</p>}

                    <button
                        className="btn-primary"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                {/* Account */}
                <div className="card">
                    <h2 className="card-title">Account</h2>
                    <p className="card-subtitle">Manage your account settings</p>

                    <div className="account-row">
                        <div>
                            <p className="account-title">Log out</p>
                            <p className="account-desc">Sign out of your account</p>
                        </div>
                        <button className="btn-outline">Log out</button>
                    </div>

                    <div className="account-row">
                        <div>
                            <p className="account-title delete-title">Delete Account</p>
                            <p className="account-desc">
                                Permanently delete your account and all data
                            </p>
                        </div>
                        <button className="btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
