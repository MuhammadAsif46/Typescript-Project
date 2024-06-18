"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main-container");
// resuable func:
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data->", data);
    return data;
}
// define func:
// let display the card UI:
const showResultUI = (singleUser) => {
    const { avatar_url, login, url, location } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `
    <div class="card">
        <img src="${avatar_url}" alt="${login}" />
        <hr />
        <div class="card-footer">
            <img src="${avatar_url}" alt="${login}" />
            <a href="${url}"> GitHub </a>
        </div>
    </div>
    `);
};
const fetchUserData = (url) => {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
};
// default func call:
fetchUserData("https://api.github.com/users");
