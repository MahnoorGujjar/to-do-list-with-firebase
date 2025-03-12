
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue, remove } from
"https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA-lFuR1JkxV-gT8TZZmx-SMLXQELIKnR8",
    authDomain: "sign-up-log-in-form-2771e.firebaseapp.com",
    databaseURL: "https://sign-up-log-in-form-2771e-default-rtdb.firebaseio.com",
    projectId: "sign-up-log-in-form-2771e",
    storageBucket: "sign-up-log-in-form-2771e.firebasestorage.app",
    messagingSenderId: "462822975889",
    appId: "1:462822975889:web:a42cb2fea3f2d5cba35230",
    measurementId: "G-0NTX7HNVYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

window.addTask = function () {
    let task = taskInput.value.trim();
    if (task) push(ref(db, "tasks"), task)
    taskInput.value = "";     //will empty the input after we add task
};


onValue(ref(db, "tasks"), (snapshot) => {
    taskList.innerHTML = "";
    let tasks = snapshot.val();
    if (!tasks) return;        // if user didnt give any value then return nothing

    let keys = Object.keys(tasks);
    for (let i = 0; i < keys.length; i++) {    //loop is liye chla rhe ta k hmra code one by one save ho na k erray k format m nlk obj ki format m ho
        let key = keys[i];

        let li = document.createElement('li'); // li ka element create kiya h tak hmre input  di hui value li k andr print ho
        let btn = document.createElement('button');  // task ko delete krne k liye delete nam ka button bnyenge

        li.textContent = tasks[key];
        btn.textContent = "Delete";
        btn.onclick = () => remove(ref(db, "tasks/" + key)); // is func m btaya k remove krdo db m ref m tasks m keys hn delete krdo

        li.appendChild(btn); // li k andr btn bnaya delete k nam s append child k through li k andr btn ko add kiya
        taskList.appendChild(li);

    };
});