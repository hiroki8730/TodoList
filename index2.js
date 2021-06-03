const taskTexts = [];
const taskElement = document.getElementById("task");
const addButton = document.getElementById("add-button");
const tBody = document.getElementById("todo-list");
const check = document.getElementById("check");
const defRadioStatus = {
    "all": "全て",
    "active": "作業中",
    "complete": "完了"
};
check.addEventListener("change", showTodos);

addButton.addEventListener('click', () => {
    const taskValue = taskElement.value;
    if (taskValue.length > 0) {
        const todos = taskElement.value;
        taskTexts.push(getTodoList(todos));
        taskElement.value = "";
        showTodos();
    } else {
        alert("文字を入力してください");
    }
});

function showTodos() {
    const radioStatus = check.status.value;
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    } // 最後のnodeまで子要素を削除し続ける...?


    taskTexts.forEach((taskText, index) => {
        console.log(taskText.progressButton.textContent);
        if (defRadioStatus[radioStatus] === "全て" || defRadioStatus[radioStatus] === taskText.progressButton.textContent) {
            const tr = document.createElement("tr");
            const tdNum = document.createElement("td");
            tdNum.textContent = index + 1;
            tr.appendChild(tdNum);
            for (key in taskText) { // keyがtaskTextに入っていたら発火
                tr.appendChild(taskText[key]); // オブジェクトの値をtrの中に入れた
            }
            tBody.appendChild(tr);
        }

    });
}

function getTodoList(todo) {
    const tdComment = document.createElement("td");
    tdComment.textContent = todo;
    // td要素をつくって、その中の文字をtodoとした
    const tdProgress = document.createElement("td");
    const progressButton = document.createElement("button");
    progressButton.textContent = "作業中";
    tdProgress.appendChild(progressButton);

    display(progressButton);

    const tdRemove = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "削除";
    tdRemove.appendChild(removeButton);
    // td要素を作って、その中に削除ボタンを追加し
    removeButton.addEventListener("click", () => {
        deleteTodo(todoElements);
    });
    const todoElements = {
        todo: tdComment,
        progressButton: progressButton,
        deleteButton: removeButton
    }; // オブジェクト
    // console.log(getTodoList());
    return todoElements;
}

function deleteTodo(todoDict) {
    taskTexts.splice(todoDict, 1);
    showTodos();
}

function display(progressButton) {
    progressButton.addEventListener('click', () => {
        if (progressButton.textContent === "作業中") {
            progressButton.textContent = "完了";
        } else {
            progressButton.textContent = "作業中";
        }
    })
}

