const fs=require('fs');
const c=fs.readFileSync('style.css','utf8');
let d=0,err=0,pos=-1;
for(let i=0;i<c.length;i++){
  if(c[i]==='{')d++;
  if(c[i]==='}'){d--;if(d<0){pos=i;err++;}}
}
if(d>0)console.log('Unclosed:',d);
else if(err===0)console.log('OK');
else console.log('Errors at',pos);