const getUsername = document.querySelector("#user") as HTMLInputElement;
const formSubmit = document.querySelector("#form") as HTMLFormElement;
const main_container = document.querySelector(".main-container") as HTMLElement;

// so lets define the contract of an object:

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  location: string;
  url: string;
}

// resuable func:

async function myCustomFetcher<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Network response was not ok - status: ${response.status}`);
  }

  const data = await response.json();
  //   console.log("data->", data);

  return data;
}

// define func:
// let display the card UI:

const showResultUI = (singleUser: UserData) => {
  const { avatar_url, login, url } = singleUser;
  main_container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card">
        <img src="${avatar_url}" alt="${login}" />
        <hr />
        <div class="card-footer">
            <img src="${avatar_url}" alt="${login}" />
            <a href="${url}"> GitHub </a>
        </div>
    </div>
    `
  );
};

function fetchUserData(url: string) {
  myCustomFetcher<UserData[]>(url, {}).then((userInfo) => {
    for (const singleUser of userInfo) {
      showResultUI(singleUser);
      console.log("login " + singleUser.login);
    }
  });
}

// default func call:
fetchUserData("https://api.github.com/users");

// lets perform search functionalty:

formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchResult = getUsername.value.toLowerCase();

  try {
    const url = "https://api.github.com/users";

    const allUserData = await myCustomFetcher<UserData[]>(url, {});

    const matchingUser = allUserData.filter((user) => {
        console.log(user);
        
       return user.login.toLowerCase().includes(searchResult);
    });

    // we need to clear the previous data:
    main_container.innerHTML = "";

    if (matchingUser.length === 0) {
      main_container.insertAdjacentHTML(
        "beforeend",
        `<p class="empty-msg">No matching users found:<p/>`
      );
    } else {
      for (const singleUser of matchingUser) {
        console.log("hello");
        
        showResultUI(singleUser);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
