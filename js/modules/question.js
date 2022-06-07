import { Modal, Shuffle } from "./common.js";

export const Question = (q) => {
    const titleArea = document.getElementById("q-title");
    titleArea.innerHTML = q.number;

    const pArea = document.getElementById("q-paragraph");
    pArea.innerHTML = q.paragraph;

    const selectArea = document.getElementById("question-selector-area");
    selectArea.innerHTML = "";
    const sel = Shuffle(q.selectors);
    sel.map((s, idx) => {
        var sel = select(s, idx);
        selectArea.appendChild(sel);
    });

    const level = document.getElementById("level");
    let star = "";
    for (let i = 0; i < q.level; i++) {
        star = star + "★";
    }
    level.innerHTML = `難易度: ${ star }`
}

const select = (ans, idx) => {
    const select = document.createElement("div");
    select.className = "flex justify-center items-center";

    const btn = document.createElement("button");
    btn.className = "bg-tertiary border-2 border-stroke rounded-md shadow-lg hover:animate-bounce p-2 flex flex-col justify-start items-center w-96 h-full";
    btn.id = `btn-${idx}`;
    btn.onclick = async() => {
        await selectAnswer(btn.id);
    }
    btn.value = ans;
    const p = document.createElement("p");
    p.className = "text-xl font-black py-4";
    p.innerHTML = ans;
    btn.appendChild(p);
    select.appendChild(btn);

    return select;
}

const selectAnswer = async(btnId) => {
    // 解答の取得
    const b = document.getElementById(btnId);
    const value = b.value;
    let correct = false;

    // 問題の取得
    const qNum = document.getElementById("q-title").innerText;
    const currentQ = document.questions[qNum - 1];

    // 解答の検証
    if (value == currentQ.answer) {
        correct = true;
    }
    //　結果の表示
    const body = document.getElementById("q-body");
    if (correct) {
        await Modal(ContentCorrect("正解!"), body, 1);
    } else {
        await Modal(ContentIncorrect("残念！不正解。"), body, 1);
    }

    // 結果の記録
    document.questions[qNum - 1].yourAnswer = value;
    let time = document.getElementById("time-second").innerHTML;
    let spanTime = 0;
    if (document.mytime) {
        spanTime = time - document.mytime;
    } else {
        spanTime = time;
    }
    document.mytime = time;

    document.questions[qNum - 1].time = spanTime;
    if (correct) {
        document.questions[qNum - 1].score = document.questions[qNum - 1].level / time * 100;
    } else {
        document.questions[qNum - 1].score = 0;
    }
    
    // 次の問題の生成 or ページ遷移
    if (document.questions[qNum]) {
        const nextQ = document.questions[qNum];
        Question(nextQ);
    } else {
        await Modal(Content("全ての問題が終了しました。結果のページに移動します。"), body, 3);
        const dataStr = JSON.stringify(document.questions);
        sessionStorage.setItem("questions", dataStr);
        window.location.href = `./result.html`;
    }
}

const Content = (text) => {
    const div = document.createElement("div");
    div.className = "border-2 border-stroke p-4 rounded bg-highlight mb-4 w-2/3";
    const p = document.createElement("p");
    p.className = "text-xl font-bold";
    p.innerHTML = text;
    div.appendChild(p);

    return div;
}
const ContentCorrect = (text) => {
    const div = document.createElement("div");
    div.className = "border-2 border-stroke p-4 rounded bg-highlight mb-4 w-2/3";
    const p = document.createElement("p");
    p.className = "text-7xl font-bold text-center text-secondary";
    p.innerHTML = text;
    div.appendChild(p);

    return div;
}
const ContentIncorrect = (text) => {
    const div = document.createElement("div");
    div.className = "border-2 border-stroke p-4 rounded bg-highlight mb-4 w-2/3";
    const p = document.createElement("p");
    p.className = "text-7xl font-bold text-center text-tertiary";
    p.innerHTML = text;
    div.appendChild(p);

    return div;
}