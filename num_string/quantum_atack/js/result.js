const URL = "";

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
    const ts = document.getElementById("total-score");
    ts.value = total;

    // 
});

document.getElementById("submit").addEventListener("click", async() => {
    const name = document.getElementById("name").value;
    const score = document.getElementById("total-score").value;
    const data = {
        name: name,
        score: score,
    }

    console.log(data);
    
    const method = "POST";
    const body = JSON.stringify(data);
    const headers = {
    'Accept': 'application/json',
    "Content-Type" : "application/json",
    };
    const result = await fetch(URL, {method, headers, body})
    .then((res)=> res.json())
    .then(data => {
        return data;
    })
    .catch(console.error);
    
    const qBody = document.getElementById("q-body");
    if (result.message == "success") {
        await Modal("登録が完了しました", qBody, 3);
        // window.location.href = "/";
    } else {
        await Modal("登録が失敗しました。", qBody, 3);
    
    }
});

const Modal = async(text, parentDOM, time) => {
    const bg = document.createElement("div");
    bg.className = "fixed top-0 left-0 z-50 w-screen h-screen bg-paragraph/70 flex justify-center items-center p-8";
    const p = document.createElement("p");
    p.innerHTML = text;
    p.className = "text-white text-5xl font-bold";
    bg.appendChild(p);
    parentDOM.appendChild(bg);

    await delay(time);

    parentDOM.removeChild(bg);
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