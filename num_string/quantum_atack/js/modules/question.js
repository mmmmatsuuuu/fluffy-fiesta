export const Question = (q) => {
    const titleArea = document.getElementById("q-title");
    titleArea.innerHTML = q.number;

    const pArea = document.getElementById("q-paragraph");
    pArea.innerHTML = q.paragraph;

    const selectArea = document.getElementById("question-selector-area");
    selectArea.innerHTML = "";
    q.selectors.map((s, idx) => {
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
    console.log(qNum);
    const currentQ = document.questions[qNum - 1];
    console.log(currentQ);
    console.log(value);


    // 解答の検証
    if (value == currentQ.answer) {
        correct = true;
    }
    //　結果の表示
    const body = document.getElementById("q-body");
    if (correct) {
        await Modal("正解!", body, 1);
    } else {
        await Modal("残念！不正解。", body, 1);
    }

    // 結果の記録
    document.questions[qNum - 1].yourAnswer = value;
    let time = document.getElementById("time-second").innerHTML;
    if (document.questions[qNum - 2]) {
        time = time - document.questions[qNum - 2].time;
    }
    document.questions[qNum - 1].time = time;
    if (correct) {
        document.questions[qNum - 1].score = document.questions[qNum - 1].level / time * 100;
    } else {
        document.questions[qNum - 1].score = 0;
    }
    
    console.log(document.questions);

    // 次の問題の生成 or ページ遷移
    if (document.questions[qNum]) {
        const nextQ = document.questions[qNum];
        Question(nextQ);
    } else {
        await Modal("全ての問題が終了しました。結果のページに移動します。", body, 3);
        const dataStr = JSON.stringify(document.questions);
        sessionStorage.setItem("questions", dataStr);
        window.location.href = `./result.html`;
    }
}

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

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}