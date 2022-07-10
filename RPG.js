'use strict';
//パラメーター要素：
let grow = 0;//「LVアップ条件」->grow
let encounter = 0;//「エンカウント確率」->encounter
let power = 0;//「勝敗確率」->power
let Escaping = 0;//「逃走確率」->escape
//リロード禁止  ブラウザバック禁止
history.pushState(null, null, location.href);
window.addEventListener('popstate', (e) => {
  history.go(1);
});
const continueBtn  =document.getElementById('continue');
let start =document.getElementById('start');
var SelectCharacter =document.getElementById('SelectCharacter');
start.addEventListener('click',function(){
  document.getElementById('firstPage').style.display ='none';
  SelectCharacter.style.display ='block';
  start.innerHTML='';
  continueBtn.removeAttribute('hidden');
})
const character = document.getElementsByClassName('.character')
document.getElementById('inputName').addEventListener('change', () => {
  document.getElementById('inputName').disabled = true;
  document.getElementById('GoField').disabled = false;
});
var CH = '';
document.querySelectorAll('.CH').forEach(characters => {
  characters.addEventListener('click', function (e) {
    console.log(e.target.parentNode.id)
    let Character = e.target.parentNode.id;
    if (Character === 'Elna') {
      CH = 'Elna';
      grow = 60;
      encounter = 60;
      power = 60;
      Escaping = 80;
    } else if (Character === 'Frank') {
      CH = 'Frank';
      grow = 70;
      encounter = 50;
      power = 70;
      Escaping = 50;
    } else if (Character === 'Elvin') {
      CH = 'Elvin';
      grow = 50;
      encounter = 70;
      power = 90;
      Escaping = 30;
    }
  }, { once: true })
});//class構文

const Flat = document.getElementById('Flat');
const Filed = document.getElementById('field');
const Forest = document.getElementById('Forest');
const Swamp = document.getElementById('Swamp');
let message =document.getElementById('message');
const GoField =document.getElementById('GoField')
FirstFiled(GoField);
FirstFiled(continueBtn);
function FirstFiled(clickArea){
  clickArea.addEventListener('click', () => {
    document.getElementById('firstPage').style.display ='none';
    SelectCharacter.style.display ='none';
    Flat.style.display = "block";
    Filed.style.display = "block";
    console.log(CH)
  });
}

let cnt = 0; //歩数カウント
let sumCnt = 0; //エンカウント歩数
let x = 0; //x軸カウント
let y = 0; //y軸カウント
let level = 1; //level初期値
let defeatedEnemies = 0; //敵を倒した回数カウント
let array = []; //空の配列用意
let sum = 0; //エンカウントした歩数
let monsterHT = 0;
let monsterRate = 0; //モンスターの出現確率
let fieldRate =0;

document.querySelectorAll('.walk').forEach(walks => {
  walks.addEventListener('click', function (e) {
    cnt++; //歩くごとに歩数カウント上げていく
    sumCnt++;
    var averageEnemies = cnt;
    var appearanceRate = 50;
    if ((y === 10 && x === 10 && cnt === 20) || (y === -10 && x === 15 && cnt === 25)) {
      Flat.style.display = 'none';
      Swamp.style.display = 'none';
      Forest.style.display = 'block';
      fieldRate =10;
      appearanceRate = encounter;
    } else if ((y === 50 && x === 60) || (y === -40 && x === 45)) {
      Flat.style.display = 'none';
      Swamp.style.display = 'block';
      Forest.style.display = 'none';
      fieldRate = 20;
      appearanceRate = encounter + 10;
    } else if ((y === 30 && x === 40 && cnt === 70) || (y === 20 && x === -10 && cnt === 30)) {
      Flat.style.display = 'block';
      Swamp.style.display = 'none';
      Forest.style.display = 'none';
      fieldRate = 0;
      appearanceRate = encounter + 10;
    }
    AppearMonster(appearanceRate);
    document.getElementById('level').innerHTML = level;//レベル
    document.getElementById('CutWalk').innerHTML = cnt;//総歩数
    document.getElementById('Yaxis').innerHTML = x; //y軸歩数表示
    document.getElementById('Xaxis').innerHTML = y; //X軸歩数表示
    document.getElementById('averageEnemies').innerHTML = averageEnemies;
    document.getElementById('defeatedEnemies').innerHTML =defeatedEnemies;
    var way = e.target.id;
    if (way === 'forward') { //前
      console.log(x, y);
      y += 1;
    } else if (way === 'left') { //左
      x = x - 1;
    } else if (way === 'right') { //右
      x = x + 1;
    } else if (way === 'back') { //後ろ
      y = y + 1;
    }

    if (grow > 100) {
      grow === 0;
      level++;
      power += 10;
      message.innerHTML = 'レベルが上がった';
    }
  })

  const FlatMonster =document.getElementById('FlatMonster');
  const ForestMonster =document.getElementById('ForestMonster');
  const SwampMonster =document.getElementById('SwampMonster');
  function AppearMonster(appearanceRate) {
    var Appear = appearanceRate +fieldRate;
    console.log(Appear,appearanceRate,fieldRate)
    var showMonster = Math.floor(Math.random() * 200);
    if (showMonster <Appear ) {
      console.log('出現');
      var logs = document.createElement('p');
      logs.innerHTML = sumCnt;
      var appearEnemies = document.getElementById('appearEnemies');
      appearEnemies.appendChild(logs);
      FlatMonster.innerHTML = '<img src="css/imges/monster.png">';
      ForestMonster.innerHTML = '<img src="css/imges/monster.png">';
      SwampMonster.innerHTML = '<img src="css/imges/monster.png">';
      monsterRate++;
      document.getElementById('WayTable').style.display = 'none';
      Judgement();
    }
  }

  function Judgement() {
    document.getElementById('fight').addEventListener('click', function () {
      var Attack = 0;
      Attack = Math.floor(Math.random() * 100);
      console.log(Attack);

      console.log(power);
      if (power> Attack) {
        console.log('a'+defeatedEnemies)
        message.innerHTML =`モンスターの攻撃 ${Attack}`+"<p>戦いに勝利した。</p>";
        document.getElementById('WayTable').style.display = 'block';
        FlatMonster.innerHTML = '';
        ForestMonster.innerHTML = '';
        SwampMonster.innerHTML = '';
        setTimeout(function(){
          message.innerHTML ='';
        }, 2*1000);
        defeatedEnemies +=1; //勝った回数
      } else if (power < Attack) {
        message.innerHTML = '勇者は死んだ。';
        setTimeout(function(){
          document.getElementById('Loser').style.display = 'block';
          document.getElementById('field').style.display ='none';
        },3*1000);
        setTimeout(function(){
          message.innerHTML ='';
          document.getElementById('firstPage').style.display ='block';
          document.getElementById('Loser').style.display = 'none';
          document.getElementById('WayTable').style.display = 'block';
          FlatMonster.innerHTML = '';
          ForestMonster.innerHTML = '';
          SwampMonster.innerHTML = '';
        }, 5*1000);
      }
    })
    document.getElementById('escape').addEventListener('click', function () {
      var escape = Math.floor(Math.random() * 100)
      if (escape > Escaping) {
        message.innerHTML = '逃げられない';
      } else if (escape < Escaping) {
        message.innerHTML = '逃げれた';
        document.getElementById('WayTable').style.display = 'block';
        FlatMonster.innerHTML = '';
        ForestMonster.innerHTML = '';
        SwampMonster.innerHTML = '';
      }
    })
  }
})


