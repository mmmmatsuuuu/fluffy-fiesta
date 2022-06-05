import { loadPage } from "./modules/loader.js";
import { TimeCounter } from "./modules/time.js";
import { Question } from "./modules/question.js";

const URL = "https://script.google.com/macros/s/AKfycbxIUv3O1a60Ux7bAMkOquZ3ih_9isWicsy_AIBMpGub4JX889Aj2J1oB7bYye6Bsw_Ryw/exec";

let questions = [];

document.addEventListener("DOMContentLoaded", async function() {
    // 初期値
    const qBody = document.getElementById("q-body");
    
    // ロードページの表示と問題の読み込み
    const datas = await loadPage(URL, qBody);
    questions = datas.datas;
    document.questions = questions;

    // タイマーの起動
    TimeCounter();

    // 解答処理
    Question(questions[0]);

    console.log(document.questions);
});
