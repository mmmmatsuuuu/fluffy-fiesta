import { Modal } from "./common.js";
import { MyRound } from "./common.js";

document.addEventListener("DOMContentLoaded", function() {
    let total = 0;

    // データの読み込み
    const questions = JSON.parse(sessionStorage.getItem("questions"));

    // データの表示
    const div = document.getElementById("result-area");
    
    questions.map(q => {
        const d = document.createElement("div");
        d.className = "border-2 border-stroke p-4 rounded bg-main mb-4";
        const table = document.createElement("table");
        var tr = result(q);
        table.appendChild(tr);
        d.appendChild(table);
        div.appendChild(d);
        total += q.score;

    });
    total = MyRound(total, 3);
    const ts = document.getElementById("score");
    ts.value = total;

    // 
});

const submitBtn = document.getElementById("submit");

submitBtn.onclick = () => {
    submitBtn.disabled = true;
    const form = document.getElementById("form");
    const formData = new FormData(form);
    const action = form.getAttribute("action");
    const option = {
        method: "POST",
        body: formData,
    }
    console.log(formData);
    fetch(action, option)
    .then(async(e) => {
        const body = document.getElementById("q-body");
        if (e.status == 200) {
            await Modal(ModalContent("登録が完了しました。トップページに戻ります。"), body, 3);
            window.location.href = "/fluffy-fiesta/";
        } else {
            await Modal(ModalContent("登録に失敗しました。もう一度挑戦してください。トップページに戻ります。"), body, 3);
            window.location.href = "/fluffy-fiesta/";
        }
    });
}

const ModalContent = (text) => {
    const div = document.createElement("div");
    div.className = "border-2 border-stroke p-4 rounded bg-highlight mb-4 w-2/3";
    const p = document.createElement("p");
    p.className = "text-xl font-bold";
    p.innerHTML = text;
    div.appendChild(p);

    return div;
}

const result = (q) => {
    const tbody = document.createElement("tbody");

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.className = "text-xl font-bold";
    td.innerHTML = `問題番号`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.className = "text-xl font-bold";
    td.innerHTML = q.number;
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `難易度`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.level;
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `問題文`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.paragraph;
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `答え`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.answer;
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `あなたの答え`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.yourAnswer;
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `かかった時間`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.time + " 秒";
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `解説`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.explanation;
    if (q.explanation_img) {
        var img = document.createElement("img");
        img.src = q.explanation_img;
        img.alt = "解説画像";
        td.appendChild(img);
    }
    tr.appendChild(td);
    tbody.appendChild(tr);

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = `スコア`;
    tr.appendChild(td);
    var td = document.createElement("td");
    td.innerHTML = q.score;
    tr.appendChild(td);
    tbody.appendChild(tr);

    return tbody;

}