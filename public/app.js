const firebaseConfig = {
  apiKey: "AIzaSyAo6lFis9NMUBEfXyV1dNZnKpA5PmTfh2g",
  authDomain: "todo-app-database-57d8f.firebaseapp.com",
  databaseURL: "https://todo-app-database-57d8f-default-rtdb.firebaseio.com",
  projectId: "todo-app-database-57d8f",
  storageBucket: "todo-app-database-57d8f.appspot.com",
  messagingSenderId: "1081974837238",
  appId: "1:1081974837238:web:74c7cf098ee3c3b9cdc1d7",
  measurementId: "G-JNLEJ5MGRG",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var list = document.getElementById("list");
firebase
  .database()
  .ref("todo")
  .on("child_added", function (data) {
    var list = document.getElementById("list");
    var li = document.createElement("li");
    var litext = document.createTextNode(data.val().value);
    li.appendChild(litext);

    ////////////////////////////dlet btn////////////////////
    var delbtn = document.createElement("button");
    var deltext = document.createTextNode("Delet");
    delbtn.setAttribute("class", "btn");
    delbtn.setAttribute("id", data.val().key);
    delbtn.setAttribute("onclick", "deletItem(this)");
    delbtn.appendChild(deltext);

    ////////////////edit/////////////////////

    var editbtn = document.createElement("button");
    var edittext = document.createTextNode("edit");
    editbtn.setAttribute("class", "btna");
    editbtn.setAttribute("id", data.val().key);

    editbtn.setAttribute("onclick", "editItem(this)");
    editbtn.appendChild(edittext);

    li.appendChild(delbtn);
    li.appendChild(editbtn);

    list.appendChild(li);
  });
var inp = document.getElementById("input");
function fendertodos() {
  var render = firebase.database().ref("todo");
  var key = render.push().key;
  var todo = {
    value: inp.value,
    key: key,
  };
  render.child(key).set(todo);
  inp.value = "";
}
function deletItem(e) {
  firebase.database().ref("todo").child(e.id).remove();
  e.parentNode.remove();
  console.log(e.id);
}
function editItem(e) {
  var val = prompt("Enter Update Value", e.parentNode.firstChild.nodeValue);
  var edittodo = {
    value: val,
    key: e.id,
  };
  firebase.database().ref("todo").child(e.id).set(edittodo);
  e.parentNode.firstChild.nodeValue = val;
}
function deletAll() {
  list.innerHTML = "";
}
