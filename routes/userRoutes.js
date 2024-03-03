const express = require("express");
const router = express.Router();
const user = require('../models/userModel');


// POST
router.post("/", async (req, res) => {
    const { fname, lname, email, age, address } = req.body;

    try {
        const existingUser = await user.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const userAdded = await user.create({
            fname: fname,
            lname: lname,
            email: email,
            age: age,
            address: address
        });

        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});


// router.post("/", async (req, res) => {
//     const { fname, lname, email, age, address } = req.body;

//     try {
//         const userAdded = await user.create({
//             fname: fname,
//             lname: lname,
//             email: email,
//             age: age,
//             address: address
//         });

//         res.status(201).json(userAdded);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: error.message });
//     }
// });

// GET all users
router.get("/", async (req, res) => {
    try {
        const showAll = await user.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// GET single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await user.findById(id);
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await user.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// PUT (update) user
// router.patch("/:id", async (req, res) => {
//     const { id } = req.params;
//     const { fname, lname, email, age, address } = req.body;
//     try {
//         const updatUser = await user.findByIdAndUpdate(id,req.body,{
//             new:true
//         });
//         res.status(200).json(updatUser);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;



// PUT (update) user
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, age, address } = req.body;
    try {
        const updatedUser = await user.findByIdAndUpdate(id, {
            fname: fname,
            lname: lname,
            email: email,
            age: age,
            address: address
        }, {
            new: true
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
