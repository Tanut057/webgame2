function checkCookie() {
    var username = "";
    if (getCookie("username") == false) {
      document.cookie = "username=Guest";
      document.cookie = "img=avatar.png";
    }
  }
  
  checkCookie();
  window.onload = pageLoad;
  
  function getCookie(name) {
    var value = "";
    try {
      value = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name))
        .split("=")[1];
      return value;
    } catch (err) {
      return false;
    }
  }
  
  async function pageLoad() {
    if (getCookie("username") == "Guest") {
      document.getElementById("username").innerText = 'Guest';
    }
  
    toggleElement();
    document.getElementById("displayPic").onclick = fileUpload;
    document.getElementById("fileField").onchange = fileSubmit;
  
    var username = getCookie("username");
  
    document.getElementById("username").innerHTML = username;
    showImg("img/" + getCookie("img"));
  }
  
  function toggleElement() {
    var loginAndRegisterButton = document.getElementById("RegisterAndLoginButton");
    var logoutButton = document.getElementById("LogoutButton");
    if (getCookie("username") != "Guest") {
      loginAndRegisterButton.style.display = "none";
      logoutButton.style.display = "block";
    }
    else {
      loginAndRegisterButton.style.display = "block";
      logoutButton.style.display = "none";
    }
  }
  
  async function getData(tablename, textmsg) {
    var msg = document.getElementById(textmsg).value;
    document.getElementById(textmsg).value = "";
    await writePost(msg, tablename);
    await readPost(tablename);
  }
  
  function fileUpload() {
    document.getElementById("fileField").click();
  }
  
  function fileSubmit() {
    document.getElementById("formId").submit();
  }
  
  // แสดงรูปในพื้นที่ที่กำหนด
  function showImg(filename) {
    if (filename !== "") {
      var showpic = document.getElementById("displayPic");
      showpic.innerHTML = "";
      var temp = document.createElement("img");
      temp.src = filename;
      showpic.appendChild(temp);
    }
  }
  
  async function readLeaderboardName(tablename) {
    let response = await fetch("/readLeaderboardname", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tablename: tablename,
      }),
    });
    let content = await response.json();
    showLeaderboardName(content, tablename);
  }
  
  // complete it
  async function readPost(tablename) {
    let response = await fetch("/readComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tablename: tablename,
      }),
    });
    let content = await response.json();
    showPost(content, tablename);
  }
  
  // complete it
  async function writePost(msg, tablename) {
    let response = await fetch("/writeComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: getCookie("username"),
        message: msg,
        tablename: tablename,
      }),
    });
  }
  
  async function useLikeButton(tablename,numberOfPos) {
    await likeButtonClick(tablename,numberOfPos)
    console.log("reload");
    await reloadPage();
  }
  
  async function likeButtonClick(tablename,numberOfPos) {
    let response = await fetch("/addLikeToUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tablename: tablename,
        numberOfLike: 1,
        numberOfPos : numberOfPos,
      }),
    });
  }
  
  
  function reloadPage() {
    location.reload();
  }
  
  // แสดง post ที่อ่านมาได้ ลงในพื้นที่ที่กำหนด
  function showPost(data, tablename) {
    var keys = Object.keys(data);
    var divTag = document.getElementById(tablename + "_" + "feed-container");
    divTag.innerHTML = "";
    for (var i = keys.length - 1; i >= 0; i--) {
      var temp = document.createElement("div");
      temp.className = "newsfeed";
      divTag.appendChild(temp);
      var temp1 = document.createElement("div");
      temp1.className = "postmsg";
      temp1.innerHTML = data[keys[i]]["comment_text"];
      temp.appendChild(temp1);
      var temp1 = document.createElement("div");
      temp1.className = "postuser";
  
      temp1.innerHTML = "Posted by: " + data[keys[i]]["username"];
      temp.appendChild(temp1);
    }
  }
  function showLeaderboardName(data, tablename) {
    var numberOfLeaderboard = 3;
    var keys = Object.keys(data);
    if(keys.length < numberOfLeaderboard){
      numberOfLeaderboard = keys.length;
    }
    for (var i = 0; i < numberOfLeaderboard; i++) {
      var currentnum = i+1;
      console.log(tablename + "_" + currentnum);
      var divTag = document.getElementById(tablename + "_" + currentnum);
      divTag.innerHTML = "";
      var temp = document.createElement("div");
      temp.className = "LeaderBoardNumber";
      divTag.appendChild(temp);
      var temp1 = document.createElement("H1");
      temp1.className = "LeaderBoardNumber" + currentnum;
      temp1.innerHTML = data[keys[i]]["username"] + "  " + "Score : " + data[keys[i]]["score"] + "  " + "Like : " + data[keys[i]]["like_love"]
      temp.appendChild(temp1);
    }
  }
  
  