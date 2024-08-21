const modelToDoList = require("./../models/toDoList/main");

const firstToDoList = (userId) => {
    const itens = [
        {
            title: "Go to the doctor",
            description: "Have a complete health checkup and take all possible tests before traveling.",
            color: "#FFFD00",
            date: new Date().getTime() + 2629743000,
            position: 0,
            status: 1,
            userId
        },
        {
            title: "Apply for a visa",
            description: "Ensure that I have the appropriate visa for my destination country.",
            color: "#FFDC6A",
            date: new Date().getTime() + 2629743000,
            position: 1,
            status: 1,
            userId
        },
        {
            title: "Purchase travel insurance",
            description: "Buy comprehensive travel insurance to cover health, travel, and personal belongings.",
            color: "#FF7600",
            date: new Date().getTime() + 2629743000,
            position: 2,
            status: 1,
            userId
        },
        {
            title: "Book accommodation",
            description: "Arrange my accommodation in advance, whether it’s a dormitory, apartment, or host family.",
            color: "#FC0101",
            date: new Date().getTime() + 2629743000,
            position: 3,
            status: 1,
            userId
        },
        {
            title: "Attend pre-departure orientation",
            description: "Participate in any orientation sessions provided by my exchange program or school.",
            color: "#4B0277",
            date: new Date().getTime() + 2629743000,
            position: 4,
            status: 1,
            userId
        },
        {
            title: "Set up a bank account",
            description: "Open a bank account that I can use internationally or set up an account in the destination country.",
            color: "#025EB1",
            date: new Date().getTime() + 2629743000,
            position: 5,
            status: 1,
            userId
        },
        {
            title: "Pack appropriately",
            description: "Pack clothes and essentials according to the climate and customs of the destination country.",
            color: "#049FC5",
            date: new Date().getTime() + 2629743000,
            position: 6,
            status: 1,
            userId
        },
        {
            title: "Learn basic phrases",
            description: "Learn basic phrases in the language of the destination country to help with daily interactions.",
            color: "#0D7608",
            date: new Date().getTime() + 2629743000,
            position: 7,
            status: 1,
            userId
        },
        {
            title: "Copy important documents",
            description: "Make copies of my passport, visa, insurance, and other important documents.",
            color: "#14AA00",
            date: new Date().getTime() + 2629743000,
            position: 8,
            status: 1,
            userId
        },
        {
            title: "Notify my bank",
            description: "Inform my bank about my travel plans to avoid any issues with my cards abroad.",
            color: "#8AC40A",
            date: new Date().getTime() + 2629743000,
            position: 9,
            status: 1,
            userId
        }
    ];
    modelToDoList
        .bulkCreate(itens)
        .then(() => {
            return { result: "success" };
        })
        .catch((error) => {
            console.error("Error adding items:", error);
            return error;
        });
};

module.exports = firstToDoList;
