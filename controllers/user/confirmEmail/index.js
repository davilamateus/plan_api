const express = require("express");
const modelConfirmEmail = require("./../../../models/confirmEmail");
const modelUser = require("./../../../models/users");

const confirmEmail = (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelConfirmEmail
            .findOne({
                where: {
                    token
                }
            })
            .then((data) => {
                if (data.valid) {
                    modelConfirmEmail
                        .update(
                            {
                                valid: 0
                            },
                            {
                                where: {
                                    id: data.id
                                }
                            }
                        )
                        .then(() => {
                            modelUser
                                .update(
                                    {
                                        status: 1
                                    },
                                    {
                                        where: {
                                            id: data.userId
                                        }
                                    }
                                )
                                .then(() => {
                                    res.status(200).json({ result: "Success" });
                                })
                                .catch(() => {
                                    res.status(404).json({ result: "Not found." });
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(400).json(error);
                        });
                } else {
                    res.status(203).json({ result: "Used" });
                }
            })
            .catch(() => {
                res.status(404).json({ result: "Not found." });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { confirmEmail };
