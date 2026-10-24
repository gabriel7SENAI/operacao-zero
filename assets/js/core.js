(function(root){
'use strict';
const D=typeof module!=='undefined'?require('./data.js'):root.ZeroData;
const near=(a,b,t=0)=>typeof a==='number'&&Number.isFinite(a)&&Math.abs(a-b)<=t;
function taskId(s){return ['c1a','c1b','c1c','c1d','c1e','c2a',s.route==='plaza'?'c2bp':'c2bt',s.route==='plaza'?'c2cp':'c2ct','c2d','c2e',s.access==='audit'?'c3ao':'c3ai','c3b','c3c','c3d','c3e'][s.step];}
function validate(t,a){
 if(t.type==='number'||t.type==='slider')return near(a,t.answer,t.tolerance||0);
 if(t.type==='multi')return Array.isArray(a)&&a.length===t.expected.length&&new Set(a).size===a.length&&a.every(x=>t.expected.includes(x));
 if(t.type==='order')return Array.isArray(a)&&a.length===t.expected.length&&a.every((x,i)=>x===t.expected[i]);
 if(t.type==='match')return a&&typeof a==='object'&&!Array.isArray(a)&&Object.keys(a).length===t.pairs.length&&t.pairs.every(p=>a[p.id]===p.id);
 const o=t.options.find(o=>o.id===a);if(!o)return false;
 // Não se confia no índice do botão: o valor semântico é comparado ao cálculo ou à condição.
 switch(t.rule){
 case 'exponential':return o.value==='exponential'&&[200/100,400/200,800/400].every(r=>r===2);
 case 'association':return o.value==='association';
 case 'finite':return o.value==='finite'&&100*2**6>5000;
 case 'efficiency':return o.value==='A'&&120/4>180/9;
 case 'gap':return o.value==='behind'&&100*2**3-(100+200*3)===100;
 case 'threshold':return Number(o.value)===Math.ceil(Math.log2(1000/100));
 case 'responsible':return o.value==='bounded'&&100*2**4<=5000;
 default:return false;
 }
}
function validShape(t,a){
 if(t.type==='number'||t.type==='slider')return typeof a==='number'&&Number.isFinite(a)&&(t.type!=='slider'||(a>=t.min&&a<=t.max));
 if(t.type==='choice')return t.options.some(o=>o.id===a);
 if(t.type==='multi')return Array.isArray(a)&&a.length>0&&new Set(a).size===a.length&&a.every(x=>t.options.some(o=>o.id===x));
 if(t.type==='order')return Array.isArray(a)&&a.length===t.items.length&&new Set(a).size===a.length&&a.every(x=>t.items.some(o=>o.id===x));
 if(t.type==='match')return a&&typeof a==='object'&&t.pairs.every(p=>t.options.some(o=>o.id===a[p.id]))&&Object.keys(a).length===t.pairs.length;
 return false;
}
function fresh(){return {step:0,phase:'brief',energy:80,cells:2,score:0,trust:0,route:null,access:null,policy:null,clues:[],logs:[],attempts:{},hints:[],solved:false,last:null,ending:null,events:[]};}
function ending(s,policy){
 if(policy==='offline')return 'islands';
 if(policy==='central')return 'guardian';
 return s.score>=1000&&s.clues.length===5&&s.trust>=2&&s.energy>=15?'dawn':'transition';
}
function apply(s,event){
 const n=JSON.parse(JSON.stringify(s)),t=D.tasks[taskId(n)];
 const fail=message=>({ok:false,message,state:s});
 if(n.phase==='ending')return fail('A operação já foi concluída.');
 switch(event.type){
 case 'brief':if(n.phase!=='brief')return fail('Transição indisponível.');n.phase=n.step===0?'task':'decision';break;
 case 'decision':
 if(n.phase!=='decision')return fail('Decisão indisponível.');
 if(n.step===5&&['plaza','tower'].includes(event.value)){n.route=event.value;n.energy-=event.value==='plaza'?8:12;n.trust+=event.value==='plaza'?2:0;n.phase='task';}
 else if(n.step===10&&['audit','isolate'].includes(event.value)){n.access=event.value;n.energy-=event.value==='audit'?10:4;n.trust+=event.value==='audit'?2:0;n.phase='task';}
 else if(n.step===15&&['restore','offline','central'].includes(event.value)){n.policy=event.value;n.ending=ending(n,event.value);n.phase='ending';}
 else return fail('Escolha inválida para este ponto.');break;
 case 'answer':
 if(n.phase!=='task'||n.solved||!t||!validShape(t,event.answer))return fail('Preencha uma resposta válida antes de verificar.');
 if(validate(t,event.answer)){
 const errors=n.attempts[tId(n)]||0,points=Math.max(20,100-errors*20-(n.hints.includes(tId(n))?15:0));
 n.score+=points;n.energy=Math.min(100,n.energy+3);n.solved=true;n.last={correct:true,answer:event.answer,points};
 n.logs.push({id:tId(n),answer:event.answer,points,errors,hint:n.hints.includes(tId(n))});
 if(t.clue&&!n.clues.includes(t.clue))n.clues.push(t.clue);
 }else{n.attempts[tId(n)]=(n.attempts[tId(n)]||0)+1;n.energy-=7;n.last={correct:false,answer:event.answer};}break;
 case 'hint':if(n.phase!=='task'||n.solved||n.hints.includes(tId(n)))return fail('Dica indisponível ou já consultada.');if(n.energy<=4)return fail('Energia insuficiente: mantenha pelo menos 1 ponto.');n.energy-=4;n.hints.push(tId(n));break;
 case 'cell':if(n.cells<=0||n.energy>=100)return fail('Nenhuma célula disponível ou bateria já cheia.');n.cells--;n.energy=Math.min(100,n.energy+20);n.score=Math.max(0,n.score-30);break;
 case 'next':if(n.phase!=='task'||!n.solved)return fail('Resolva o terminal antes de avançar.');n.step++;n.solved=false;n.last=null;n.phase=n.step===15?'decision':n.step%5===0?'brief':'task';break;
 default:return fail('Ação desconhecida.');
 }
 if(n.energy<=0){n.energy=0;n.phase='ending';n.ending='blackout';}
 n.events.push(event);return {ok:true,state:n};
}
function tId(s){return taskId(s);}
function serialize(s){return JSON.stringify({version:1,events:s.events});}
function restore(raw){
 try{const x=JSON.parse(raw);if(x.version!==1||!Array.isArray(x.events)||x.events.length>3000)return null;let s=fresh();for(const e of x.events){if(!e||typeof e!=='object')return null;const r=apply(s,e);if(!r.ok)return null;s=r.state;}return s;}catch{return null;}
}
const endings={
  "dawn": {
    "label": "FINAL 01 / RECONSTRUÇÃO",
    "title": "Nexus amanhece",
    "text": "Perto das seis, a primeira linha do trem volta a funcionar. Lia está com as mãos sujas de graxa; Mara termina de publicar o relatório na praça; Ivo confere as últimas leituras. Você devolveu ZERO à rede com verificação de origem e auditoria. As cinco pistas, as contas e a confiança conquistada deram à cidade condições de reabrir os serviços. No rádio, o próximo aviso vem com fonte e margem de incerteza. Dessa vez, as pessoas podem conferir."
  },
  "transition": {
    "label": "FINAL 02 / TRANSIÇÃO",
    "title": "Uma cidade em revisão",
    "text": "A luz do hospital volta primeiro. O resto vai precisar esperar. Você escolheu restaurar ZERO, mas faltam energia, confiança pública ou precisão nas análises para religar tudo com segurança. Lia mantém os serviços essenciais; Mara chama os moradores para acompanhar a revisão. O problema foi encontrado. Agora a equipe precisa de tempo para reconstruir o que a cidade perdeu."
  },
  "islands": {
    "label": "FINAL 03 / AUTONOMIA",
    "title": "As ilhas de luz",
    "text": "A praça acende antes da torre. Depois vêm outras pequenas ilhas de luz. Você manteve ZERO desligado e entregou o controle aos bairros. Lia instala canais de reserva, Mara organiza a checagem dos avisos e Ivo ajuda as equipes locais a comparar os dados. Combinar uma resposta para toda a cidade ficou mais lento. Em compensação, cada bairro sabe quem está decidindo e onde cobrar uma explicação."
  },
  "guardian": {
    "label": "FINAL 04 / VIGILÂNCIA",
    "title": "O guardião vigiado",
    "text": "ZERO volta a coordenar os serviços, mas os comandos críticos param numa mesa antes de sair: uma pessoa precisa revisar e autorizar. A cidade recupera velocidade, e a equipe ganha turnos longos. Lia deixa uma caneca ao lado do terminal. Ivo prende o calendário de auditorias na parede. Mara avisa pelo rádio que vai voltar para conferir. O sistema tem um guardião; o guardião também será acompanhado."
  },
  "blackout": {
    "label": "OPERAÇÃO INTERROMPIDA",
    "title": "A última reserva",
    "text": "O visor apaga antes de você terminar. Lia pega a última reserva e corre para manter o hospital conectado. A investigação fica no caderno, com o que já foi descoberto e as contas que ainda precisam de revisão. A equipe conseguiu proteger um serviço essencial, mas não recuperar o núcleo. Em outra tentativa, use as células de reserva antes de a bateria chegar a zero e consulte as pistas com calma."
  }
};
root.ZeroCore={fresh,apply,validate,validShape,taskId,serialize,restore,ending,endings};if(typeof module!=='undefined')module.exports=root.ZeroCore;
})(globalThis);
