(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Sh(i){const e=new Set;for(const t of[i.levels,i.walls,i.openings,i.slabs,i.roofs??[],i.stairs,i.rooms,i.furniture])for(const n of t)e.add(n.id);for(const t of i.axes.x)e.add(t.id);for(const t of i.axes.y)e.add(t.id);for(const t of Object.keys(i.styles.openings))e.add(t);for(const t of Object.keys(i.finishes))e.add(t);return i.underlay&&e.add(i.underlay.id),e}const Mh=/^[A-Za-z0-9_-]{1,32}$/,bh=new Set(["__proto__","constructor","prototype"]);function Yo(i){return typeof i=="string"&&Mh.test(i)&&!bh.has(i)}function Eh(i,e){const t=Sh(i);let n=1;for(;t.has(`${e}${n}`);)n++;return`${e}${n}`}const re=(i,e,t,n,s,r,a,o={})=>({id:i,label:e,labelEn:t,category:n,footprint:{w:s,d:r,h:a},...o}),Ts=[re("giuong-1m","Cama 1 plaza 1,0 m","Single bed 1.0m","giuong",1e3,2e3,400,{clearance:{sides:600}}),re("giuong-1m2","Cama 1½ plaza 1,2 m","Single bed 1.2m","giuong",1200,2e3,400,{clearance:{sides:600}}),re("giuong-1m4","Cama 2 plazas 1,4 m","Double bed 1.4m","giuong",1400,2e3,400,{clearance:{sides:600}}),re("giuong-1m6","Cama queen 1,6 m","Double bed 1.6m","giuong",1600,2e3,400,{clearance:{sides:600}}),re("giuong-1m8","Cama king 1,8 m","Double bed 1.8m","giuong",1800,2e3,400,{clearance:{sides:600}}),re("giuong-2m","Cama super king 2,0 m","King bed 2.0m","giuong",2e3,2200,400,{clearance:{sides:600}}),re("giuong-tang-1m","Camarote infantil 1,0 m","Kids bunk bed 1.0m","giuong-tang",1e3,2e3,1600,{clearance:{sides:600}}),re("giuong-tang-1m2","Camarote 1,2 m","Bunk bed 1.2m","giuong-tang",1200,2e3,1700,{clearance:{sides:600}}),re("noi-em-be","Cuna","Baby crib","giuong",650,1200,900,{clearance:{sides:500}}),re("tu-dau-giuong-40","Velador 40 cm","Nightstand 40cm","tu-dau-giuong",400,400,450),re("tu-dau-giuong-50","Velador 50 cm","Nightstand 50cm","tu-dau-giuong",500,400,500),re("tu-ao-1m","Ropero 1,0 m","Wardrobe 1.0m","tu-ao",1e3,550,2200,{clearance:{front:600}}),re("tu-ao-1m2","Ropero 1,2 m","Wardrobe 1.2m","tu-ao",1200,550,2200,{clearance:{front:600}}),re("tu-ao-1m6","Ropero 1,6 m","Wardrobe 1.6m","tu-ao",1600,600,2400,{clearance:{front:600}}),re("tu-ao-2m","Ropero 2,0 m","Wardrobe 2.0m","tu-ao",2e3,600,2400,{clearance:{front:600}}),re("tu-ao-2m4","Ropero 2,4 m puertas correderas","Sliding-door wardrobe 2.4m","tu-ao",2400,650,2400,{clearance:{front:550}}),re("ban-trang-diem","Tocador","Dressing table","ban-trang-diem",1e3,450,750,{clearance:{front:600}}),re("sofa-don","Sillón individual","Armchair","sofa",900,850,800),re("sofa-2s","Sofá 2 cuerpos","2-seat sofa","sofa",1500,850,800),re("sofa-3s-01","Sofá 3 cuerpos","3-seat sofa","sofa",1800,850,800),re("sofa-3s-22","Sofá 3 cuerpos grande","Large 3-seat sofa","sofa",2200,900,800),re("sofa-goc-l","Sofá esquinero en L","L-shaped corner sofa","sofa",2600,1600,800),re("ban-tra-vuong","Mesa de centro cuadrada 60","Square coffee table 60","ban-tra",600,600,420),re("ban-tra-chu-nhat","Mesa de centro 1,1 m","Coffee table 1.1m","ban-tra",1100,550,420),re("ban-tra-tron","Mesa de centro redonda 70","Round coffee table 70","ban-tra",700,700,450),re("ke-tv-1200","Mueble TV 1,2 m","TV stand 1.2m","ke-tv",1200,400,500),re("ke-tv-1600","Mueble TV 1,6 m","TV stand 1.6m","ke-tv",1600,450,500),re("ke-tv-2000","Mueble TV 2,0 m","TV stand 2.0m","ke-tv",2e3,450,500),re("tu-giay-800","Zapatero 80 cm","Shoe cabinet 80cm","tu-giay",800,350,1e3),re("tu-giay-1200","Zapatero 1,2 m","Shoe cabinet 1.2m","tu-giay",1200,350,1100),re("ban-an-2","Mesa de comedor 2 personas","Dining table for 2","ban-an",800,800,750,{clearance:{front:800}}),re("ban-an-4","Mesa de comedor 4 personas","Dining table for 4","ban-an",1400,800,750,{clearance:{front:800}}),re("ban-an-6","Mesa de comedor 6 personas","Dining table for 6","ban-an",1800,900,750,{clearance:{front:800}}),re("ban-an-8","Mesa de comedor 8 personas","Dining table for 8","ban-an",2200,1e3,750,{clearance:{front:800}}),re("ban-an-tron-1m","Mesa de comedor redonda 1,0 m","Round dining table 1.0m","ban-an",1e3,1e3,750,{clearance:{front:800}}),re("ghe-an","Silla de comedor","Dining chair","ghe-an",450,500,900),re("ghe-bang-an","Banca de comedor 1,4 m","Dining bench 1.4m","ghe-an",1400,350,450),re("tu-bep-duoi-06","Mueble base de cocina 60 (módulo)","Base kitchen cabinet 60 (module)","tu-bep-duoi",600,600,850,{clearance:{front:900}}),re("tu-bep-duoi-12","Mueble base de cocina 1,2 m","Base kitchen run 1.2m","tu-bep-duoi",1200,600,850,{clearance:{front:900}}),re("tu-bep-duoi-18","Mueble base de cocina 1,8 m (con lavaplatos)","Base kitchen run 1.8m (with sink)","tu-bep-duoi",1800,600,850,{clearance:{front:900}}),re("tu-bep-duoi-24","Mueble base de cocina 2,4 m (lavaplatos + encimera)","Base kitchen run 2.4m (sink + cooktop)","tu-bep-duoi",2400,600,850,{clearance:{front:900}}),re("tu-bep-duoi-30","Mueble base de cocina 3,0 m (lavaplatos + encimera)","Base kitchen run 3.0m (sink + cooktop)","tu-bep-duoi",3e3,600,850,{clearance:{front:900}}),re("tu-bep-goc","Mueble base de cocina en L 1,8×1,8 m","L-shaped base kitchen 1.8×1.8m","tu-bep-duoi",1800,1800,850,{clearance:{front:900}}),re("tu-bep-tren-06","Mueble aéreo de cocina 0,6 m","Wall kitchen cabinet 0.6m","tu-bep-tren",600,350,700,{mountHeight:1450}),re("tu-bep-tren-12","Mueble aéreo de cocina 1,2 m","Wall kitchen cabinet 1.2m","tu-bep-tren",1200,350,700,{mountHeight:1450}),re("tu-bep-tren-18","Mueble aéreo de cocina 1,8 m","Wall kitchen cabinet 1.8m","tu-bep-tren",1800,350,700,{mountHeight:1450}),re("tu-bep-tren-24","Mueble aéreo de cocina 2,4 m","Wall kitchen cabinet 2.4m","tu-bep-tren",2400,350,700,{mountHeight:1450}),re("bep-4","Cocina 4 platos con horno","Range 4 burners + oven","bep",600,600,900,{clearance:{front:900}}),re("tu-lanh-mini","Frigobar","Mini fridge","tu-lanh",500,550,850),re("tu-lanh","Refrigerador 2 puertas","Two-door fridge","tu-lanh",700,700,1700,{clearance:{front:700}}),re("tu-lanh-sbs","Refrigerador side by side","Side-by-side fridge","tu-lanh",900,750,1800,{clearance:{front:700}}),re("ban-hoc","Escritorio 1,0 m","Desk 1.0m","ban-lam-viec",1e3,500,750,{clearance:{front:750}}),re("ban-lam-viec-1m2","Escritorio 1,2 m","Desk 1.2m","ban-lam-viec",1200,600,750,{clearance:{front:750}}),re("ban-lam-viec-1m4","Escritorio 1,4 m","Desk 1.4m","ban-lam-viec",1400,700,750,{clearance:{front:750}}),re("ghe-xoay","Silla de oficina giratoria","Office swivel chair","ghe-xoay",600,600,1e3),re("ke-sach-600","Librero 60 cm","Bookshelf 60cm","ke-sach",600,300,1800),re("ke-sach-800","Librero 80 cm","Bookshelf 80cm","ke-sach",800,300,2e3),re("ke-sach-1200","Librero 1,2 m","Bookshelf 1.2m","ke-sach",1200,350,2e3),re("bon-cau","WC dos piezas","Two-piece toilet","bon-cau",400,700,780,{clearance:{front:500,sides:200}}),re("bon-cau-1-khoi","WC una pieza","One-piece toilet","bon-cau",420,740,700,{clearance:{front:500,sides:200}}),re("lavabo","Lavamanos","Washbasin","lavabo",550,420,850,{clearance:{front:550}}),re("lavabo-tu","Vanitorio 80 cm","Vanity basin 80cm","lavabo",800,480,850,{clearance:{front:550}}),re("lavabo-doi","Vanitorio doble 1,2 m","Double vanity 1.2m","lavabo",1200,500,850,{clearance:{front:550}}),re("voi-sen","Receptáculo de ducha 90","Walk-in shower 90","voi-sen",900,900,2e3),re("voi-sen-80","Receptáculo de ducha 80","Walk-in shower 80","voi-sen",800,800,2e3),re("bon-tam-15","Tina 1,5 m","Bathtub 1.5m","bon-tam",1500,750,600,{clearance:{front:600}}),re("bon-tam-17","Tina 1,7 m","Bathtub 1.7m","bon-tam",1700,800,600,{clearance:{front:600}}),re("guong-wc","Espejo de baño 60","Bathroom mirror 60","guong",600,50,800,{mountHeight:1e3}),re("binh-nong-lanh","Termo eléctrico 20 L","Water heater 20L","binh-nong-lanh",500,300,350,{mountHeight:1900}),re("may-giat","Lavadora carga frontal","Front-load washer","may-giat",600,600,850,{clearance:{front:600}}),re("may-giat-cua-tren","Lavadora carga superior","Top-load washer","may-giat",550,600,950,{clearance:{front:400}}),re("may-say","Secadora (sobre la lavadora)","Dryer (stacks on washer)","may-giat",600,600,850),re("may-lanh-treo","Aire acondicionado split de muro","Wall-mounted AC unit","may-lanh",800,250,300,{mountHeight:2500}),re("may-lanh-dung","Aire acondicionado de piso","Floor-standing AC","may-lanh",500,350,1800),re("quat-cay","Ventilador de pie","Pedestal fan","quat-cay",400,400,1300),re("den-cay","Lámpara de pie","Floor lamp","den-cay",350,350,1600),re("cay-canh-nho","Planta en macetero pequeña","Potted plant (small)","cay-canh",350,350,900),re("cay-canh-lon","Planta en macetero grande","Potted plant (large)","cay-canh",550,550,1700),re("guong-toan-than","Espejo de cuerpo entero","Full-length mirror","guong",500,50,1600,{mountHeight:200}),re("xe-may","Scooter","Scooter","xe-may",700,1900,1100,{clearance:{sides:300}}),re("xe-may-so","Motocicleta","Motorbike","xe-may",650,1850,1050,{clearance:{sides:300}}),re("xe-dap","Bicicleta","Bicycle","xe-dap",450,1700,1e3),re("o-to-hatchback","Auto hatchback (estacionamiento)","Hatchback car (parking spot)","o-to",1800,4e3,1500,{clearance:{front:600,sides:500}}),re("o-to-sedan","Auto sedán (estacionamiento)","Sedan (parking spot)","o-to",1850,4600,1500,{clearance:{front:600,sides:500}}),re("ban-tho","Altar de pie 1,07 m","Ancestral altar 1.07m","ban-tho",1070,610,1270,{clearance:{front:900}}),re("ban-tho-1m53","Altar de pie 1,53 m","Ancestral altar 1.53m","ban-tho",1530,810,1270,{clearance:{front:900}}),re("ban-tho-treo","Altar de muro 81 cm","Wall-mounted altar 81cm","ban-tho",810,480,610,{mountHeight:1550})],Th=[["giuong-1m6","-go-soi"," — roble"," — oak"],["giuong-1m6","-go-oc-cho"," — nogal"," — walnut"],["giuong-1m8","-go-soi"," — roble"," — oak"],["tu-ao-2m","-trang"," — blanco"," — milk white"],["tu-ao-2m","-go-oc-cho"," — nogal"," — walnut"],["tu-ao-1m6","-trang"," — blanco"," — milk white"],["sofa-3s-01","-xam"," — tela gris"," — grey fabric"],["sofa-3s-01","-da-nau"," — cuero café"," — brown leather"],["sofa-goc-l","-xam"," — tela gris"," — grey fabric"],["ban-an-4","-go-soi"," — roble"," — oak"],["ban-an-6","-go-soi"," — roble"," — oak"],["ghe-an","-den"," — patas metálicas negras"," — black steel legs"],["ke-tv-1600","-trang"," — blanco"," — milk white"],["ke-tv-2000","-go-oc-cho"," — nogal"," — walnut"],["ban-lam-viec-1m2","-trang"," — blanco"," — milk white"],["ke-sach-800","-trang"," — blanco"," — milk white"],["tu-bep-duoi-24","-trang"," — blanco brillante"," — gloss white"],["tu-bep-duoi-30","-xanh-reu"," — verde musgo"," — moss green"],["tu-bep-tren-18","-trang"," — blanco brillante"," — gloss white"],["ban-tra-chu-nhat","-da"," — cubierta de piedra"," — stone top"]];for(const[i,e,t,n]of Th){const s=Ts.find(r=>r.id===i);s&&Ts.push({...s,id:`${i}${e}`,label:`${s.label}${t}`,labelEn:`${s.labelEn}${n}`})}const wh=new Map(Ts.map(i=>[i.id,i]));function Hr(i){return wh.get(i)}[...new Set(Ts.map(i=>i.category))];const Ah=i=>i.some(e=>e.severity==="block"),rn=(i,e)=>[i[0]+e[0],i[1]+e[1]],Kt=(i,e)=>[i[0]-e[0],i[1]-e[1]],_n=(i,e)=>[i[0]*e,i[1]*e],hn=(i,e)=>i[0]*e[0]+i[1]*e[1],tu=i=>Math.hypot(i[0],i[1]),nu=(i,e)=>tu(Kt(i,e));function Ch(i){const e=tu(i);return e===0?[0,0]:[i[0]/e,i[1]/e]}const Rh=i=>[-i[1],i[0]];function Sn(i,e){const t=e*Math.PI/180,n=Math.cos(t),s=Math.sin(t);return[i[0]*n-i[1]*s,i[0]*s+i[1]*n]}function Ph(i,e,t){const n=Kt(t,e),s=Kt(i,e),r=hn(n,n);if(r===0)return Math.hypot(s[0],s[1]);const a=Math.max(0,Math.min(1,hn(s,n)/r)),o=[e[0]+n[0]*a,e[1]+n[1]*a];return Math.hypot(i[0]-o[0],i[1]-o[1])}function Lh(i){let e=0;for(let t=0;t<i.length;t++){const n=i[t],s=i[(t+1)%i.length];e+=n[0]*s[1]-s[0]*n[1]}return e/2}const Dh=i=>Math.abs(Lh(i)),Ih=i=>Math.round(Dh(i)/1e5)/10;function iu(i,e){const t=e.length;let n=!1;for(let s=0,r=t-1;s<t;r=s++){const[a,o]=e[s],[l,c]=e[r],u=Math.min(a,l),h=Math.max(a,l),d=Math.min(o,c),f=Math.max(o,c),g=(l-a)*(i[1]-o)-(c-o)*(i[0]-a);if(Math.abs(g)<1e-6&&i[0]>=u-1e-6&&i[0]<=h+1e-6&&i[1]>=d-1e-6&&i[1]<=f+1e-6)return!0;if(o>i[1]!=c>i[1]){const _=(l-a)*(i[1]-o)/(c-o)+a;i[0]<_&&(n=!n)}}return n}function Uh(i){let e=1/0,t=1/0,n=-1/0,s=-1/0;for(const[r,a]of i)r<e&&(e=r),a<t&&(t=a),r>n&&(n=r),a>s&&(s=a);return{minX:e,minY:t,maxX:n,maxY:s}}const Nh=0;function $o(i,e){return i.walls.find(t=>t.id===e)}function Fh(i,e){return i.rooms.filter(t=>t.level===e)}function Qr(i){return i.roofs??[]}function Rl(i,e){const t=i.site.terrain?.elevations;if(!t||t.length===0)return Nh;const n=i.site.boundary;let s=0,r=0;for(let a=0;a<n.length;a++){const o=t[a]??t[t.length-1],l=(e[0]-n[a][0])**2+(e[1]-n[a][1])**2;if(l<1)return o;const c=1/l;s+=c*o,r+=c}return s/r}function su(i,e,t){return Fh(i,e).filter(n=>iu(t,n.polygon))}function Oh(i,e,t){return su(i,e,t).every(n=>n.use==="san"||n.use==="ban-cong"||n.use==="gieng-troi")}const Ir=i=>nu(i.from,i.to),xi=i=>Ch(Kt(i.to,i.from)),Fs=i=>Rh(xi(i));function Ga(i,e){return rn(i.from,_n(xi(i),e))}function Bh(i){const e=_n(Fs(i),i.thickness/2);return[rn(i.from,e),rn(i.to,e),Kt(i.to,e),Kt(i.from,e)]}function ru(i,e){return Ga(i,e.offset+e.width/2)}function kh(i,e,t=150){const n=ru(i,e),s=_n(Fs(i),i.thickness/2+t);return[rn(n,s),Kt(n,s)]}function zh(i,e){const t=xi(e),n=(a,o)=>{let l=0;for(const c of i){if(c===e||c.id===e.id||au(c,e))continue;const u=Bh(c);if(Vh(a,u))for(let h=0;h<u.length;h++){const d=Gh(a,o,u[h],u[(h+1)%u.length]);d!==null&&d>l&&(l=d)}}return l},s=n(e.from,_n(t,-1)),r=n(e.to,t);return s===0&&r===0?{wall:e,shift:0}:{wall:{...e,from:rn(e.from,_n(t,-s)),to:rn(e.to,_n(t,r))},shift:s}}function Vh(i,e){let t=0;for(let n=0;n<e.length;n++){const s=e[n],r=e[(n+1)%e.length],a=nu(s,r)||1,o=((r[0]-s[0])*(i[1]-s[1])-(r[1]-s[1])*(i[0]-s[0]))/a;if(Math.abs(o)<=.5)continue;const l=Math.sign(o);if(t===0)t=l;else if(l!==t)return!1}return!0}function Gh(i,e,t,n){const s=Kt(n,t),r=e[0]*s[1]-e[1]*s[0];if(Math.abs(r)<1e-9)return null;const a=Kt(t,i),o=(a[0]*s[1]-a[1]*s[0])/r,l=(a[0]*e[1]-a[1]*e[0])/r;return o<-1e-6||l<-1e-6||l>1+1e-6?null:Math.max(0,o)}function au(i,e,t=.5){const n=xi(i),s=xi(e);return Math.abs(n[0]*s[1]-n[1]*s[0])<Math.sin(t*Math.PI/180)}function Hh(i,e,t){const n=[],s=t.map(a=>({u0:Math.max(0,a.offset),u1:Math.min(i,a.offset+a.width),sill:Math.max(0,a.sill),top:Math.min(e,Math.max(0,a.sill)+a.height)})).filter(a=>a.u1>a.u0&&a.top>a.sill).sort((a,o)=>a.u0-o.u0);let r=0;for(const a of s){const o=Math.max(r,a.u0);o>=a.u1||(o>r&&n.push({u0:r,u1:o,z0:0,z1:e,part:"than"}),a.sill>0&&n.push({u0:o,u1:a.u1,z0:0,z1:a.sill,part:"bau"}),a.top<e&&n.push({u0:o,u1:a.u1,z0:a.top,z1:e,part:"lanh-to"}),r=a.u1)}return r<i&&n.push({u0:r,u1:i,z0:0,z1:e,part:"than"}),n}const Wh=new Set(["ngu","wc","kho","lam-viec","bep-an","tho"]),Xh=new Set(["san","ban-cong","gieng-troi"]);function Pl(i,e,t){const n=su(i,e,t);if(n.length===0)return{kind:"exterior",name:"el exterior"};const s=n.find(a=>Wh.has(a.use));if(s)return{kind:"private",name:s.name};const r=n.find(a=>!Xh.has(a.use));return r?{kind:"common",name:r.name}:{kind:"open",name:n[0].name}}function Ll(i,e){const t=$o(i,e.wall),n=i.site.boundary;if(!t||n.length<3)return!1;const s=ru(t,e),r=o=>Ph(s,n[o],n[(o+1)%n.length]),a=i.site.front??0;for(let o=0;o<n.length;o++)if(o!==a&&r(o)<r(a))return!1;return!0}function qh(i,e){const t=$o(i,e.wall);if(!t||e.kind!=="door")return null;const[n,s]=kh(t,e),r=Pl(i,t.level,n),a=Pl(i,t.level,s),o=c=>c==="plus"?{side:c,toward:r.name,from:a.name}:{side:c,toward:a.name,from:r.name},l=c=>c.kind==="private"||c.kind==="common";return r.kind==="open"&&l(a)?o("plus"):a.kind==="open"&&l(r)?o("minus"):r.kind==="exterior"&&l(a)?o(Ll(i,e)?"minus":"plus"):a.kind==="exterior"&&l(r)?o(Ll(i,e)?"plus":"minus"):r.kind==="private"&&a.kind==="common"?o("plus"):a.kind==="private"&&r.kind==="common"?o("minus"):null}function Yh(i,e){const t=$o(i,e.wall);if(!t||e.kind!=="door")return"in-L";const n=qh(i,e)?.side==="minus"?"out":"in",s=e.offset<=Ir(t)-(e.offset+e.width)?"L":"R";return`${n}-${s}`}function $h(i){return[[-i.halfW,-i.halfD],[i.halfW,-i.halfD],[i.halfW,i.halfD],[-i.halfW,i.halfD]].map(t=>rn(i.center,Sn(t,i.rotation)))}function jh(i,e){const t=i.width,n=i.tread,s=i.steps-1,r=e.height/i.steps,a=f=>rn(i.origin,Sn(f,i.rotation)),o=(f,g,_,m)=>[[f,g],[_,g],[_,m],[f,m]].map(p=>a(p));if(i.type==="1-ve"){const f=s*n;return{riser:r,treadsTotal:s,flights:[{treads:s,firstStep:1,rect:o(0,0,t,f),start:a([t/2,0]),dir:Sn([0,1],i.rotation)}],footprint:o(0,0,t,f),topExit:{at:a([t/2,f]),dir:Sn([0,1],i.rotation)}}}const l=i.landing??t,c=Math.ceil(s/2),u=s-c,h=c*n,d=u*n;return i.type==="2-ve-U"?{riser:r,treadsTotal:s,flights:[{treads:c,firstStep:1,rect:o(0,0,t,h),start:a([t/2,0]),dir:Sn([0,1],i.rotation)},{treads:u,firstStep:c+1,rect:o(-t,h-d,0,h),start:a([-t/2,h]),dir:Sn([0,-1],i.rotation)}],landing:o(-t,h,t,h+l),footprint:o(-t,Math.min(0,h-d),t,h+l),topExit:{at:a([-t/2,h-d]),dir:Sn([0,-1],i.rotation)}}:{riser:r,treadsTotal:s,flights:[{treads:c,firstStep:1,rect:o(0,0,t,h),start:a([t/2,0]),dir:Sn([0,1],i.rotation)},{treads:u,firstStep:c+1,rect:o(-d,h,0,h+l),start:a([0,h+l/2]),dir:Sn([-1,0],i.rotation)}],landing:o(0,h,t,h+l),footprint:o(-d,0,t,h+l),topExit:{at:a([-d,h+l/2]),dir:Sn([-1,0],i.rotation)}}}const Kh=i=>i*Math.PI/180;function Zh(i,e){const t=e.elevation+e.height,n=Math.tan(Kh(i.pitch)),s=Uh(i.outline),r=s.maxX-s.minX,a=s.maxY-s.minY,o=i.ridgeAxis??(r>=a?"x":"y");return i.kind==="shed"?td(i,t,n,o,s):i.kind==="hip"?nd(i,t,n,o,s):ed(i,t,n,o,s)}function Jh(i){let e=0,t=0,n=0;for(let s=0;s<i.length;s++){const[r,a,o]=i[s],[l,c,u]=i[(s+1)%i.length];e+=(a-c)*(o+u),t+=(o-u)*(r+l),n+=(r-l)*(a+c)}return Math.hypot(e,t,n)/2/1e6}const jo=i=>Math.round(i.reduce((e,t)=>e+Jh(t),0)*10)/10,ou=(i,e)=>i.map(t=>[t[0],t[1],e(t)]);function Dl(i,e){const t=[];for(let n=0;n<i.length;n++){const s=i[n],r=i[(n+1)%i.length],a=e(s),o=e(r);if(a>=0&&t.push(s),a>=0!=o>=0){const l=a/(a-o);t.push([s[0]+(r[0]-s[0])*l,s[1]+(r[1]-s[1])*l])}}return t}function Qh(i,e,t){const n=[];for(let r=0;r<i.length;r++){const a=i[r],o=i[(r+1)%i.length],[l,c]=e==="x"?[a[1],o[1]]:[a[0],o[0]];if(l<=t&&c>t||c<=t&&l>t){const u=(t-l)/(c-l);n.push(e==="x"?a[0]+(o[0]-a[0])*u:a[1]+(o[1]-a[1])*u)}}n.sort((r,a)=>r-a);const s=[];for(let r=0;r+1<n.length;r+=2){const a=e==="x"?[n[r],t]:[t,n[r]],o=e==="x"?[n[r+1],t]:[t,n[r+1]];s.push([a,o])}return s}function ed(i,e,t,n,s){const r=n==="x"?(s.minY+s.maxY)/2:(s.minX+s.maxX)/2,a=n==="x"?(s.maxY-s.minY)/2:(s.maxX-s.minX)/2,o=e+a*t,l=f=>Math.abs((n==="x"?f[1]:f[0])-r),c=f=>Math.min(o,Math.max(e,e+(a-l(f))*t)),u=Dl(i.outline,f=>(n==="x"?f[1]:f[0])-r),h=Dl(i.outline,f=>r-(n==="x"?f[1]:f[0])),d=[u,h].filter(f=>f.length>=3).map(f=>ou(f,c));return{baseZ:e,ridgeZ:o,creases:Qh(i.outline,n,r),faces:d,zAt:c,areaM2:jo(d)}}function td(i,e,t,n,s){const[r,a]=n==="x"?[s.minY,s.maxY]:[s.minX,s.maxX],o=a-r,l=i.highSide??"min",c=e+o*t,u=d=>{const f=n==="x"?d[1]:d[0],g=l==="min"?a-f:f-r;return Math.min(c,Math.max(e,e+g*t))},h=[ou(i.outline,u)];return{baseZ:e,ridgeZ:c,creases:[],faces:h,zAt:u,areaM2:jo(h)}}function nd(i,e,t,n,s){const r=Math.min(s.maxX-s.minX,s.maxY-s.minY)/2,a=e+r*t,o=b=>{const M=Math.min(b[0]-s.minX,s.maxX-b[0],b[1]-s.minY,s.maxY-b[1]);return Math.min(a,Math.max(e,e+M*t))},l=(s.minY+s.maxY)/2,c=(s.minX+s.maxX)/2,u=n==="x"?[s.minX+r,l]:[c,s.minY+r],h=n==="x"?[s.maxX-r,l]:[c,s.maxY-r],d=[s.minX,s.minY],f=[s.maxX,s.minY],g=[s.maxX,s.maxY],_=[s.minX,s.maxY],m=b=>[b[0],b[1],o(b)],p=n==="x"?[[m(d),m(f),m(h),m(u)],[m(g),m(_),m(u),m(h)],[m(f),m(g),m(h)],[m(_),m(d),m(u)]]:[[m(f),m(g),m(h),m(u)],[m(_),m(d),m(u),m(h)],[m(d),m(f),m(u)],[m(g),m(_),m(h)]],T=[[d,u],[_,u],[f,h],[g,h],...Math.hypot(h[0]-u[0],h[1]-u[1])>1?[[u,h]]:[]];return{baseZ:e,ridgeZ:a,creases:T,faces:p,zAt:o,areaM2:jo(p)}}const id={level:"piso",wall:"muro",opening:"vano",slab:"losa",roof:"techo",stair:"escalera",room:"recinto",furniture:"mueble",axis:"eje",style:"tipo de vano",finish:"terminación",underlay:"calco"},sd={level:"levels",wall:"walls",opening:"openings",slab:"slabs",roof:"roofs",stair:"stairs",room:"rooms",furniture:"furniture"};function Il(i){return typeof i=="string"?i:Array.isArray(i)||typeof i=="object"&&i!==null?JSON.stringify(i):String(i)}function rd(i,e,t){const n=sd[e];return n?(i[n]??[]).find(r=>r.id===t)??null:e==="axis"?[...i.axes.x,...i.axes.y].find(s=>s.id===t)??null:e==="style"?i.styles.openings[t]??null:e==="finish"?i.finishes[t]??null:e==="underlay"&&i.underlay?.id===t?i.underlay:null}function ad(i,e){const t=id[i.entity]??i.entity;if(i.op==="add"){const n=String(i.data.id??"?");return`agrega ${i.entity==="opening"?i.data.kind==="window"?"ventana":"puerta":t} ${n}`}if(i.op==="update"){const n=Object.keys(i.data).filter(a=>a!=="id"),s=e?rd(e,i.entity,i.id):null,r=n.map(a=>{const o=Il(i.data[a]);if(!s||!(a in s))return`${a}: ${o}`;const l=Il(s[a]);return l===o?`${a}: ${o} (sin cambio)`:`${a}: ${l} → ${o}`}).join(", ");return`modifica ${t} ${i.id} (${r})`}return`elimina ${t} ${i.id}`}function Ul(i,e){return i.map(t=>ad(t,e)).join("; ")}const lu={level:"levels",wall:"walls",opening:"openings",slab:"slabs",roof:"roofs",stair:"stairs",room:"rooms",furniture:"furniture"},nt=(i,e,t,n)=>({rule:i,severity:e,entities:t,message:n}),Ko=i=>nt("OPS-02","block",[],`ID inválido ${JSON.stringify(i)}: solo letras, números, "_" o "-" (1–32 caracteres).`);function od(i,e,t,n={}){if(e!==i.meta.revision)return{ok:!1,currentRevision:i.meta.revision,errors:[nt("REV-01","block",[],`baseRevision ${e} está desactualizada: la revisión actual es ${i.meta.revision}. Llama a get_changes_since(${e}) para ver los cambios y reenvía.`)]};if(t.length===0)return{ok:!1,currentRevision:i.meta.revision,errors:[nt("OPS-00","block",[],"Lote vacío: no hay ops que aplicar.")]};const s=structuredClone(i),r=[];for(const a of t){const o=ld(s,a);if(o){r.push(o);break}}if(r.length===0&&n.validate){const a=n.validate(s);return Ah(a)?{ok:!1,currentRevision:i.meta.revision,errors:a.filter(o=>o.severity==="block")}:(s.meta.revision=e+1,{ok:!0,project:s,revision:s.meta.revision,warnings:a,summary:Ul(t,i)})}return r.length>0?{ok:!1,currentRevision:i.meta.revision,errors:r}:(s.meta.revision=e+1,{ok:!0,project:s,revision:s.meta.revision,warnings:[],summary:Ul(t,i)})}function ld(i,e){switch(e.entity){case"style":return Fl(i,e,"style");case"finish":return Fl(i,e,"finish");case"axis":return hd(i,e);case"underlay":return ud(i,e);default:return cd(i,e)}}function Zo(i){const e=new Set;for(const t of Object.values(lu))for(const n of i[t]??[])e.add(n.id);for(const t of i.axes.x)e.add(t.id);for(const t of i.axes.y)e.add(t.id);for(const t of Object.keys(i.styles.openings))e.add(t);for(const t of Object.keys(i.finishes))e.add(t);return i.underlay&&e.add(i.underlay.id),e}function cd(i,e){const t=e.entity,n=lu[t];if(!n)return nt("OPS-01","block",[],`Tipo de entidad no válido: ${String(e.entity)}.`);n==="roofs"&&(i.roofs??=[]);const s=i[n];if(e.op==="add"){const a=e.data.id;if(typeof a!="string"||a.length===0)return nt("OPS-02","block",[],`Op add ${t} sin data.id (el cliente debe asignar el ID).`);if(!Yo(a))return Ko(a);if(Zo(i).has(a))return nt("OPS-02","block",[a],`El ID ${a} ya existe: elige otro (p. ej. con nextId).`);const o=Nl(i,t,e.data,a);return o||(s.push(structuredClone(e.data)),null)}const r=s.findIndex(a=>a.id===e.id);if(r<0)return nt("OPS-03","block",[e.id],`No se encuentra ${t} ${e.id}.`);if(e.op==="update"){if("id"in e.data&&e.data.id!==e.id)return nt("OPS-03","block",[e.id],`No se puede cambiar el id con update (${e.id} → ${String(e.data.id)}).`);const a={...s[r],...structuredClone(e.data),id:e.id},o=Nl(i,t,a,e.id);return o||(s[r]=a,null)}return t==="level"&&[...i.walls,...i.rooms,...i.slabs,...i.roofs??[],...i.stairs,...i.furniture].some(o=>o.level===e.id)?nt("OPS-04","block",[e.id],`El piso ${e.id} aún tiene entidades: elimínalas o muévelas antes.`):(t==="wall"&&(i.openings=i.openings.filter(a=>a.wall!==e.id)),s.splice(r,1),null)}function Nl(i,e,t,n){const s=new Set(i.levels.map(r=>r.id));if(e!=="level"&&e!=="opening"){const r=t.level;if(typeof r!="string"||!s.has(r))return nt("OPS-05","block",[n],`${e} ${n} apunta a un piso inexistente: ${String(r)}.`)}if(e==="opening"){const r=t.wall;if(typeof r!="string"||!i.walls.some(o=>o.id===r))return nt("OPS-06","block",[n],`El vano ${n} está anclado a un muro inexistente: ${String(r)}.`);const a=t.style;if(typeof a!="string"||!(a in i.styles.openings))return nt("OPS-06","block",[n],`El vano ${n} usa un tipo inexistente: ${String(a)}.`)}if(e==="furniture"){const r=t.asset;if(typeof r!="string"||!Hr(r))return nt("OPS-07","block",[n],`El mueble ${n} usa una pieza que no está en el catálogo: ${String(r)}.`)}return null}function Fl(i,e,t){const n=t==="style"?i.styles.openings:i.finishes;if(e.op==="add"){const{id:s,...r}=e.data;return typeof s!="string"||s.length===0?nt("OPS-02","block",[],`Op add ${t} sin data.id.`):Yo(s)?Zo(i).has(s)?nt("OPS-02","block",[s],`El ID ${s} ya existe.`):(n[s]=structuredClone(r),null):Ko(s)}if(!(e.id in n))return nt("OPS-03","block",[e.id],`No se encuentra ${t} ${e.id}.`);if(e.op==="update"){const{id:s,...r}=e.data;return n[e.id]={...n[e.id],...structuredClone(r)},null}return t==="style"&&i.openings.some(s=>s.style===e.id)?nt("OPS-05","block",[e.id],`El tipo ${e.id} está en uso por un vano.`):t==="finish"&&i.rooms.some(s=>Object.values(s.finish??{}).includes(e.id))?nt("OPS-05","block",[e.id],`La terminación ${e.id} está en uso por un recinto.`):(delete n[e.id],null)}function Ol(i){return typeof i=="string"&&i.length>0&&!/[\\/:]/.test(i)&&i!=="."&&i!==".."}function ud(i,e){if(e.op==="add"){if(i.underlay)return nt("OPS-02","block",[i.underlay.id],"Ya hay un calco: usa update para cambiar ubicación/archivo, o delete y luego add.");const t=e.data;return t.id!=="U1"?nt("OPS-02","block",[],'El calco es único: data.id debe ser "U1".'):t.kind!=="dxf"&&t.kind!=="image"?nt("OPS-08","block",["U1"],'El calco requiere data.kind = "dxf" | "image".'):Ol(t.source)?typeof t.scale!="number"||!(t.scale>0)?nt("OPS-08","block",["U1"],"El calco requiere data.scale > 0 (mm del modelo por unidad de origen)."):t.level!==void 0&&!i.levels.some(n=>n.id===t.level)?nt("OPS-05","block",["U1"],`El calco apunta a un piso inexistente: ${String(t.level)}.`):(i.underlay=structuredClone(e.data),null):nt("OPS-08","block",["U1"],"Underlay: data.source debe ser solo un nombre de archivo dentro de .arquitecto/underlay/.")}if(!i.underlay||i.underlay.id!==e.id)return nt("OPS-03","block",[e.id],`No se encuentra el calco ${e.id}.`);if(e.op==="update"){if("id"in e.data&&e.data.id!==e.id)return nt("OPS-03","block",[e.id],`No se puede cambiar el id con update (${e.id} → ${String(e.data.id)}).`);const t={...i.underlay,...structuredClone(e.data),id:e.id};return Ol(t.source)?t.level!==void 0&&!i.levels.some(n=>n.id===t.level)?nt("OPS-05","block",[e.id],`El calco apunta a un piso inexistente: ${String(t.level)}.`):(i.underlay=t,null):nt("OPS-08","block",[e.id],"Underlay: data.source debe ser solo un nombre de archivo dentro de .arquitecto/underlay/.")}return delete i.underlay,null}function hd(i,e){if(e.op==="add"){const{id:t,dir:n}=e.data;return typeof t!="string"||t.length===0?nt("OPS-02","block",[],"Op add axis sin data.id."):Yo(t)?n!=="x"&&n!=="y"?nt("OPS-08","block",[t],`El eje ${t} requiere data.dir = "x" | "y".`):Zo(i).has(t)?nt("OPS-02","block",[t],`El ID ${t} ya existe.`):(i.axes[n].push(structuredClone(e.data)),null):Ko(t)}for(const t of["x","y"]){const n=i.axes[t].findIndex(s=>s.id===e.id);if(n>=0)return e.op==="update"?i.axes[t][n]={...i.axes[t][n],...structuredClone(e.data),id:e.id}:i.axes[t].splice(n,1),null}return nt("OPS-03","block",[e.id],`No se encuentra el eje ${e.id}.`)}const dd={id:"geo",title:"Geometría y topología (núcleo)",kind:"core"},fd=[{id:"GEO-01",title:"El vano queda completo dentro del largo del muro",severity:"block",source:{vanBan:"geometría intrínseca",verified:!0},message:"El vano {opening} (ancho {width}, offset {offset}) se sale del muro {wall} (largo {len})."},{id:"GEO-02",title:"Dos vanos del mismo muro no se superponen",severity:"block",source:{vanBan:"geometría intrínseca",verified:!0},message:"{a} y {b} se superponen {overlap}mm en el muro {wall}."},{id:"GEO-03",title:"Dos muros paralelos no se montan",severity:"error",source:{vanBan:"geometría intrínseca",verified:!0},message:"Los muros {a} y {b} son paralelos y se montan: ejes a {dist}mm < {minDist}mm (suma de medios espesores)."},{id:"GEO-04",title:"Los muebles no se montan entre sí ni sobre muros",severity:"error",params:{tolerance:10},source:{vanBan:"geometría intrínseca",verified:!0},message:"{a} se monta sobre {b} ({depth}mm)."},{id:"GEO-05",title:"Polígono cerrado y sin autointersecciones",severity:"block",source:{vanBan:"geometría intrínseca",verified:!0},message:"El polígono de {entity} se autointersecta o está degenerado: corrige el orden de los vértices."},{id:"GEO-06",title:"El barrido de la puerta no choca con muros ni muebles",severity:"warn",params:{tolerance:10},source:{vanBan:"práctica de diseño",verified:!0},message:"El barrido de la puerta {opening} choca con {obstacle}."},{id:"GEO-07",title:"El tramo superior y el descanso de la escalera quedan dentro del vano de la losa superior",severity:"warn",source:{vanBan:"TCVN 13967:2024 (altura libre de escalera ≥ 2000)",dieu:"5.11",verified:!0},message:"Escalera {stair}: la parte expuesta (tramo superior/descanso) no queda dentro del vano de la losa {slab}; quien suba chocará con la cabeza (altura libre ≥ 2000mm). La v2 revisará la altura libre exacta."},{id:"GEO-08",title:"Los muros quedan dentro del deslinde (distanciamientos → PLN-01/02)",severity:"error",source:{vanBan:"geometría intrínseca",verified:!0},message:"El muro {wall} {detail}."},{id:"GEO-09",title:"Las puertas abren hacia el lado que fija la regla de apertura",severity:"warn",source:{vanBan:"estándar de dibujo del proyecto (no es norma)",verified:!0},message:"La puerta {opening} abre hacia {hacia}; debería abrir hacia {recinto} (interiores: hacia el recinto; a patio, terraza o salida trasera: hacia afuera; principal: hacia adentro)."}],pd={pack:dd,rules:fd},md={id:"std-generic",title:"Pack métrico genérico (PACK DE MUESTRA)",kind:"standard",region:"generic",standard:'Pack de muestra de Arquitecto: umbrales provisorios, NO es una norma real. Se reemplaza por la OGUC al crear la región "cl" (E4).'},gd=[{id:"GEN-CEIL-01",title:"Altura libre mínima de piso a cielo (genérica)",severity:"warn",evaluator:"STD-03",params:{phong_o:2400,bep_an:2400,wc:2100,kho:2e3},source:{vanBan:"PACK DE MUESTRA: valores provisorios, sin cotejar con ninguna norma. Una región real debe citar la fuente de cada regla.",verified:!1},message:"Recinto {ten} ({room}) en {level}: altura libre {clear}mm, menor que el mínimo {min}mm."}],_d={pack:md,rules:gd},vd={id:"uk-approved-docs",title:"England — Building Regulations Approved Documents + NDSS",kind:"standard",region:"uk",standard:"UK Approved Documents K (stairs), M (access) — Open Government Licence; Nationally Described Space Standard (bedroom areas)"},xd=[{id:"UK-AREA-01",title:"Minimum bedroom areas (NDSS)",severity:"warn",evaluator:"STD-01",params:{ngu_don:7.5,ngu_doi:11.5,khach:0,bep_an:0,wc:0,kho:0},source:{vanBan:"Nationally Described Space Standard (technical housing standards) — single bedroom 7.5m², double 11.5m². SIN cotejar con el texto oficial; NDSS solo es obligatorio donde lo adopta el local plan",verified:!1},message:"Bedroom {ten} ({room}) is {area}m² — below the NDSS minimum of {min}m² ({loai})."},{id:"UK-CORR-01",title:"Minimum corridor/landing width",severity:"error",evaluator:"STD-04",params:{min:900},source:{vanBan:"Approved Document M vol.1 (access within dwellings) — corridor width. SIN cotejar con el texto oficial (M4 tiene excepciones locales 750/775)",verified:!1},message:"Corridor {ten} ({room}) is {width}mm wide — below the {min}mm minimum."},{id:"UK-DOOR-01",title:"Minimum door widths (approach)",severity:"error",evaluator:"STD-05",params:{chinh:775,chinh_khuyen:838,phong:750,wc:700},source:{vanBan:"Approved Document M vol.1 — clear opening widths (M4(1) visitable dwellings). SIN cotejar; ojo: el modelo mide el VANO, el ancho libre real es ~60-80 mm menor según el marco",verified:!1},message:"Door {opening} ({loai}) is {width}mm — below the {min}mm minimum."},{id:"UK-STAIR-01",title:"Private stair dimensions (Part K)",severity:"error",evaluator:"STD-06",params:{riser_min:150,riser_max:220,riser_khuyen:220,tread_min:220,ve_min:800,ve_khuyen:850,buoc_min:550,buoc_max:700},source:{vanBan:"Approved Document K — private stair: rise 150–220, going ≥220, 2R+G 550–700. SIN cotejar con el texto oficial; Part K no fija ancho mínimo de tramo en escaleras privadas: 800 es una recomendación de práctica",verified:!1},message:"Stair {stair}: {detail}."},{id:"UK-LIGHT-01",title:"Habitable rooms should have natural light",severity:"warn",evaluator:"STD-09",source:{vanBan:"Approved Document F/O (ventilation, overheating) — práctica de diseño; SIN cotejar las cláusulas cuantitativas",verified:!1},message:"Room {ten} ({room}) has no window or skylight for natural light."}],yd={pack:vd,rules:xd},Sd={id:"cl-oguc",title:"Chile — OGUC (MVP vivienda)",kind:"standard",region:"cl",standard:"Ordenanza General de Urbanismo y Construcciones, D.S. N°47/1992 MINVU, texto actualizado por D.S. N°5 (D.O. 22-05-2026). Fuentes y citas: docs/oguc-sources.md"},Md=[{id:"CL-ALT-01",title:"Altura mínima de piso a cielo en locales habitables",severity:"error",evaluator:"CL-ALT-01",params:{min:2300},source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026)",dieu:"4.1.1",verified:!0},message:"Local habitable {ten} ({room}) en {level}: altura libre {clear}mm, menor que {min}mm (OGUC 4.1.1).",note:"Altura aproximada desde el modelo (altura de piso − espesor de la losa superior); no modela «obra terminada» ni las excepciones bajo vigas o techumbre inclinada."},{id:"CL-VEN-01",title:"Al menos una ventana al exterior en locales habitables",severity:"error",evaluator:"CL-VEN-01",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026)",dieu:"4.1.2",verified:!0},message:"Local habitable {ten} ({room}) sin ventana que dé aire y luz del exterior (OGUC 4.1.2).",note:"Cuenta ventanas hacia el exterior del deslinde, un patio dentro del sitio o un patio de luz. El modelo no distingue ventanas fijas selladas (excepción del mismo artículo, no aplicable a dormitorios)."},{id:"CL-VEN-02",title:"Distancia libre de 1,5 m frente a la ventana de dormitorios",severity:"error",status:"planned",params:{min:1500},source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026)",dieu:"4.1.2",verified:!1},message:"Dormitorio {ten} ({room}): distancia libre frente a la ventana {dist}mm, menor que {min}mm (OGUC 4.1.2, sin validar).",note:"PENDIENTE: no se ejecuta. El modelo no tiene datos de construcciones vecinas para medir la distancia libre."},{id:"CL-INDET",title:"Regla no evaluable con los datos del modelo",severity:"info",message:"Indeterminado — {regla} en {ten} ({room}): {motivo}. No se declara cumplimiento."}],bd={pack:Sd,rules:Md},Ed={id:"cl-cip",title:"Chile — Normas urbanísticas del CIP (valores declarados)",kind:"planning",region:"cl",standard:"OGUC art. 1.4.4 (contenido del Certificado de Informaciones Previas). Los valores los declara el usuario desde el CIP de su predio en brief.dat.quy_hoach / site.edges. Fuentes: docs/oguc-sources.md"},Td=[{id:"CL-CIP-ANT",title:"Antejardín declarado en el CIP",severity:"error",evaluator:"CL-CIP-ANT",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026); valor del CIP declarado por el usuario",dieu:"1.4.4",verified:!0},message:"Muro {wall} a {dist}mm del deslinde frontal: invade el antejardín de {lui}mm declarado del CIP (OGUC 1.4.4).",note:"Dato: brief.dat.quy_hoach.khoang_lui_truoc (mm) o site.setbacks.front."},{id:"CL-CIP-FON",title:"Distanciamiento al deslinde de fondo declarado en el CIP",severity:"error",evaluator:"CL-CIP-FON",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026); valor del CIP declarado por el usuario",dieu:"1.4.4",verified:!0},message:"Muro {wall} a {dist}mm del deslinde de fondo: menor que el distanciamiento de {lui}mm declarado del CIP (OGUC 1.4.4).",note:"Dato: brief.dat.quy_hoach.khoang_lui_sau (mm) o site.setbacks.back. No calcula distanciamientos por altura ni rasantes (OGUC 2.6.3)."},{id:"CL-CIP-COS",title:"Coeficiente de ocupación del suelo declarado en el CIP",severity:"error",evaluator:"CL-CIP-COS",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026); valor del CIP declarado por el usuario",dieu:"1.4.4",verified:!0},message:"Ocupación del primer piso {pct}%: supera el coeficiente de ocupación del suelo de {max}% declarado del CIP (OGUC 1.4.4).",note:"Dato: brief.dat.quy_hoach.mat_do_max en % (un coeficiente 0,6 del CIP se declara como 60). Ocupación = losa del primer piso / superficie del sitio."},{id:"CL-CIP-PIS",title:"Altura máxima en número de pisos declarada en el CIP",severity:"error",evaluator:"CL-CIP-PIS",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026); valor del CIP declarado por el usuario",dieu:"1.4.4",verified:!0},message:"{n} pisos: supera el máximo de {max} pisos declarado del CIP (OGUC 1.4.4).",note:"Dato: brief.dat.quy_hoach.tang_max."},{id:"CL-CIP-ALT",title:"Altura máxima de edificación declarada en el CIP",severity:"error",evaluator:"CL-CIP-ALT",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026); valor del CIP declarado por el usuario",dieu:"1.4.4",verified:!0},message:"Altura de la edificación +{top}mm: supera la altura máxima de {max}mm declarada del CIP (OGUC 1.4.4).",note:"Dato: brief.dat.quy_hoach.chieu_cao_max (mm)."},{id:"CL-CIP-DIS",title:"Distanciamientos por deslinde declarados en el CIP",severity:"error",evaluator:"CL-CIP-DIS",source:{vanBan:"OGUC — D.S. N°47/1992 MINVU (texto al D.O. 22-05-2026); valor del CIP declarado por el usuario",dieu:"1.4.4",verified:!0},message:"Muro {wall} a {dist}mm del deslinde #{edge}: menor que el distanciamiento de {lui}mm declarado para ese deslinde (OGUC 1.4.4).",note:"Dato: site.edges[i].setback (mm). No calcula rasantes ni adosamientos."}],wd={pack:Ed,rules:Td};function Os(i){return{...i.pack,rules:i.rules}}const cu=[Os(pd)],Ad=new Map(cu.map(i=>[i.id,i]));function Wr(i){Ad.set(i.id,i)}Wr(Os(_d));Wr(Os(yd));Wr(Os(bd));Wr(Os(wd));const Cd=new Map;function uu(i){Cd.set(i.id,i)}uu({id:"uk",title:"United Kingdom (England)",units:"metric",packs:["uk-approved-docs"]});uu({id:"cl",title:"Chile",units:"metric",packs:["cl-oguc","cl-cip"]});const Rd=cu.flatMap(i=>i.rules);new Map(Rd.map(i=>[i.id,i]));class Pd{model=null;issues=[];activeLevel=null;view="split";selection=null;handlers=new Map;on(e,t){this.handlers.has(e)||this.handlers.set(e,new Set),this.handlers.get(e).add(t)}emit(e,t){for(const n of this.handlers.get(e)??[])n(t)}get revision(){return this.model?.meta.revision??-1}setSnapshot(e){this.model=e.model;const t=[...e.model.levels].sort((n,s)=>n.elevation-s.elevation);(!this.activeLevel||!t.some(n=>n.id===this.activeLevel))&&(this.activeLevel=t[0]?.id??null),this.emit("snapshot",{model:e.model})}applyPatch(e){if(!this.model){this.emit("resync",{});return}const t=od(this.model,e.revision-1,e.ops);if(!t.ok){this.emit("resync",{});return}this.model=t.project,this.emit("patch",{revision:e.revision,ops:e.ops,origin:e.origin,...e.note?{note:e.note}:{},...e.summary?{summary:e.summary}:{},changedIds:Ld(e.ops)})}setValidation(e){this.issues=e.issues,this.emit("validation",{revision:e.revision,issues:e.issues})}setLevel(e){e!==this.activeLevel&&(this.activeLevel=e,this.emit("level",{level:e}))}setView(e){e!==this.view&&(this.view=e,this.emit("view",{view:e}))}select(e){this.selection=e,this.emit("select",{id:e})}findEntity(e){const t=this.model;if(!t)return null;const n=[["Muro","wall",t.walls],["Vano","opening",t.openings],["Losa","slab",t.slabs],["Techo","roof",t.roofs??[]],["Escalera","stair",t.stairs],["Recinto","room",t.rooms],["Mueble","furniture",t.furniture],["Piso","level",t.levels]];for(const[s,r,a]of n){const o=a.find(l=>l.id===e);if(o)return{kind:s,entity:r,data:o}}return null}}function Ld(i){const e=new Set;for(const t of i)t.op==="add"?typeof t.data.id=="string"&&e.add(t.data.id):e.add(t.id);return[...e]}const Dd={"app.connecting":"connecting…","conn.on":"live","conn.connecting":"connecting…","conn.off":"connection lost — retrying…","view.plan":"Plan","view.3d":"3D","view.split":"Split","share.btn":"share","share.title":"Copy a VIEW-ONLY link for family — they see everything live but cannot edit; revoke with POST /share/rotate","share.copied":`View-only link copied — send it to your family:
{url}`,"share.error":"Could not fetch the share link — try reloading the page.","lang.title":"Cambiar la interfaz a español","tool.select":"Select / move — drag walls, doors, furniture; type a number while dragging for exact mm; Alt disables snapping; R rotates the selected furniture","tool.wall":"Draw wall — coming later","tool.door":"Place door — coming later","tool.window":"Place window — coming later","tool.room":"Draw room — coming later","tool.furniture":"Furniture — open the catalog, pick an item, then click the plan to place it; Esc/V to stop","tool.measure":"Measure — coming later","tool.locked":"View-only share link — editing disabled","pane2d.empty":"Waiting for a project — the drawing grows as Claude builds.","pane2d.hint":"drag an object — move · type while dragging — exact mm · Alt — no snap",fit2d:"fit view","fit2d.title":"Fit the drawing to the pane","walk.btn":"walk","walk.title":"Walk through the house — WASD to move, mouse to look, Shift to run, Esc to exit","walk.hint":"WASD — move · mouse — look · Shift — run · Esc — exit","sun.btn":"sun","sun.title":"Sun study by hour + month (latitude from the brief)","sun.hour":"hour","sun.month":"month","doors.btn":"open doors","doors.title":"Open or close every hinged door","roof.btn":"no roof","roof.title":"Hide or show the roof to look inside","levels.btn":"by floor","levels.title":"By floor: show only up to the active floor (pick it in the bottom bar), without the roof",reset3d:"reset view","reset3d.title":"Back to the default camera","hint3d.orbit":"drag — orbit · wheel — zoom · right-drag — pan","panel.props":"Properties","panel.issues":"Checks","props.empty":"Tap an object on the drawing to see its numbers.","props.empty.sub":"Drag to move — type a number while dragging for exact mm.","issues.clean":"Drawing is clean — no issues.","issues.pending":"No check results yet.","footer.levels":"Floor","footer.revision":"Revision","footer.conn":"Link","footer.claude":"Claude","footer.undo":"Undo","footer.snap":"Snap","undo.title":"Undo (Ctrl+Z) — your own actions only","redo.title":"Redo (Ctrl+Y)","snap.title":"Snap grid step (mm) — 0 disables","toast.claude":"Claude","toast.user":"You","toast.reject":"Rejected","toast.rejectFallback":"The server rejected the change.","toast.readonly":"You are on a view-only share link — look, don't touch.","toast.deleteUnsupported":"Deleting {kind} from the editor is not supported yet.","viewer.badge":"VIEW ONLY","hud.typing":"⏎ commit · Esc clear","hud.typable":"type a number for exact mm","hud.gap":"gap","catalog.title":"Furniture","catalog.search":"search: bed, sofa, motorbike…","catalog.empty":"No matching assets.","catalog.mounted":"wall-mounted","kind.wall":"Wall","kind.opening":"Opening","kind.slab":"Slab","kind.roof":"Roof","kind.stair":"Stair","kind.room":"Room","kind.furniture":"Furniture","kind.level":"Floor","note.place":"place {label}","note.rotate":"rotate {id}","note.delete":"delete {id}","note.drag":"drag {id}","note.typed":"{id}: typed {value}","note.prop":"edit {id}.{field}","note.undo":"undo: {label}","note.redo":"redo: {label}"},hu={"app.connecting":"conectando…","conn.on":"en vivo","conn.connecting":"conectando…","conn.off":"conexión perdida: reintentando…","view.plan":"Planta","view.3d":"3D","view.split":"Dividida","share.btn":"compartir","share.title":"Copia un link de SOLO LECTURA: se ve todo en vivo pero no se puede editar (solo funciona en este equipo)","share.copied":`Link de solo lectura copiado:
{url}`,"share.error":"No se pudo obtener el link compartido: prueba recargar la página.","lang.title":"Switch interface language to English","tool.select":"Seleccionar / mover: arrastra muros, puertas y muebles; mientras arrastras escribe un número para fijar la medida exacta; Alt desactiva el ajuste; R gira el mueble seleccionado","tool.wall":"Dibujar muro (próximamente)","tool.door":"Poner puerta (próximamente)","tool.window":"Poner ventana (próximamente)","tool.room":"Dibujar recinto (próximamente)","tool.furniture":"Mobiliario: abre el catálogo, elige una pieza y haz clic en la planta para ubicarla; Esc/V para terminar","tool.measure":"Medir (próximamente)","tool.locked":"Link de solo lectura: no se puede editar","pane2d.empty":"Esperando un proyecto: el plano crece a medida que Claude construye.","pane2d.hint":"arrastrar objeto: mover · escribir mientras arrastras: medida exacta · Alt: sin ajuste",fit2d:"ajustar","fit2d.title":"Ajustar el plano a la vista","walk.btn":"recorrer","walk.title":"Recorrer la casa: WASD para moverse, mouse para mirar, Shift para correr, Esc para salir","walk.hint":"WASD: moverse · mouse: mirar · Shift: correr · Esc: salir","sun.btn":"sol","sun.title":"Asoleamiento por hora y mes (latitud desde el brief)","sun.hour":"hora","sun.month":"mes","doors.btn":"abrir puertas","doors.title":"Abrir o cerrar todas las puertas abatibles","roof.btn":"sin techo","roof.title":"Quitar o poner la techumbre para ver el interior","levels.btn":"por piso","levels.title":"Ver por pisos: muestra solo hasta el piso activo (elígelo en la barra inferior), sin techo",reset3d:"vista inicial","reset3d.title":"Volver a la cámara por defecto","hint3d.orbit":"arrastrar: orbitar · rueda: zoom · botón derecho: desplazar","panel.props":"Propiedades","panel.issues":"Revisión","props.empty":"Toca un objeto del plano para ver sus datos.","props.empty.sub":"Arrastra para mover; mientras arrastras, escribe un número para la medida exacta.","issues.clean":"Plano limpio: sin observaciones.","issues.pending":"Aún no hay resultados de revisión.","footer.levels":"Piso","footer.revision":"Revisión","footer.conn":"Conexión","footer.claude":"Claude","footer.undo":"Deshacer","footer.snap":"Ajuste","undo.title":"Deshacer (Ctrl+Z): solo tus acciones","redo.title":"Rehacer (Ctrl+Y)","snap.title":"Paso de la grilla de ajuste (mm); 0 lo desactiva","toast.claude":"Claude","toast.user":"Tú","toast.reject":"Rechazado","toast.rejectFallback":"El servidor rechazó el cambio.","toast.readonly":"Estás en un link de solo lectura: puedes mirar, no editar.","toast.deleteUnsupported":"Aún no se puede eliminar {kind} desde el editor.","viewer.badge":"SOLO LECTURA","hud.typing":"⏎ fijar · Esc borrar","hud.typable":"escribe un número para la medida exacta","hud.gap":"holgura","catalog.title":"Mobiliario","catalog.search":"buscar: cama, sofá, mesa…","catalog.empty":"Ninguna pieza coincide.","catalog.mounted":"colgado","kind.wall":"Muro","kind.opening":"Vano","kind.slab":"Losa","kind.roof":"Techo","kind.stair":"Escalera","kind.room":"Recinto","kind.furniture":"Mueble","kind.level":"Piso","note.place":"ubicar {label}","note.rotate":"girar {id}","note.delete":"eliminar {id}","note.drag":"mover {id}","note.typed":"{id}: escrito {value}","note.prop":"editar {id}.{field}","note.undo":"deshacer: {label}","note.redo":"rehacer: {label}"},Id={es:hu,en:Dd},Ha=i=>i==="es"||i==="en";function Ud(i){return Ha(i.query)?i.query:Ha(i.saved)?i.saved:"es"}function Nd(){let i=null;if(typeof location<"u"&&(i=new URLSearchParams(location.search).get("lang"),Ha(i)))try{localStorage.setItem("arquitecto-lang",i)}catch{}let e=null;try{e=typeof localStorage<"u"?localStorage.getItem("arquitecto-lang"):null}catch{}return Ud({query:i,saved:e})}const Ei=Nd();function Fd(i,e,t){let n=Id[i][e]??hu[e]??e;if(t)for(const[s,r]of Object.entries(t))n=n.split(`{${s}}`).join(String(r));return n}function Ze(i,e){return Fd(Ei,i,e)}function Od(i=document){i===document&&(document.documentElement.lang=Ei);for(const e of i.querySelectorAll("[data-i18n]"))e.textContent=Ze(e.dataset.i18n);for(const e of i.querySelectorAll("[data-i18n-title]"))e.title=Ze(e.dataset.i18nTitle)}function Bd(){try{localStorage.setItem("arquitecto-lang",Ei==="en"?"es":"en")}catch{}const i=new URL(location.href);i.searchParams.delete("lang"),location.href=i.toString()}class kd{constructor(e,t){this.onPick=t,this.el=document.createElement("div"),this.el.id="catalog-panel",this.el.hidden=!0;const n=document.createElement("div");n.className="cat-head";const s=document.createElement("span");s.textContent=Ze("catalog.title"),s.className="cat-title",this.searchEl=document.createElement("input"),this.searchEl.type="search",this.searchEl.placeholder=Ze("catalog.search"),this.searchEl.className="cat-search",this.searchEl.addEventListener("input",()=>this.renderList()),this.searchEl.addEventListener("keydown",r=>r.stopPropagation()),n.append(s,this.searchEl),this.listEl=document.createElement("div"),this.listEl.className="cat-list",this.el.append(n,this.listEl),e.appendChild(this.el),this.renderList()}onPick;el;listEl;searchEl;picked=null;get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.searchEl.focus()}hide(){this.el.hidden=!0,this.setPicked(null)}setPicked(e){this.picked=e;for(const t of this.listEl.querySelectorAll(".cat-item"))t.classList.toggle("is-picked",t.dataset.asset===e)}renderList(){const e=this.searchEl.value.trim().toLowerCase(),t=s=>!e||`${s.id} ${s.label} ${s.labelEn??""} ${s.category}`.toLowerCase().includes(e);this.listEl.textContent="";let n=0;for(const s of Ts){if(!t(s)||n>=60)continue;n+=1;const r=document.createElement("button");r.className=`cat-item${s.id===this.picked?" is-picked":""}`,r.dataset.asset=s.id;const a=document.createElement("span");a.className="cat-name",a.textContent=Ei==="en"?s.labelEn:s.label;const o=document.createElement("span");o.className="cat-dims",o.textContent=`${s.footprint.w}×${s.footprint.d}${s.mountHeight!=null?` · ${Ze("catalog.mounted")}`:""}`,r.append(a,o),r.addEventListener("click",()=>{this.setPicked(s.id),this.onPick(s.id)}),this.listEl.appendChild(r)}if(n===0){const s=document.createElement("p");s.className="panel-empty",s.textContent=Ze("catalog.empty"),this.listEl.appendChild(s)}}}const vi=i=>Math.round(i).toLocaleString(Ei==="en"?"en-US":"es-CL"),Ws=(i,e,t)=>Math.min(t,Math.max(e,i)),Wa=([i,e])=>[Math.round(i),Math.round(e)];function zd(i,e,t){const n=Fs(e),s=hn(e.from,n),r=i.walls.filter(c=>c.id!==e.id&&c.level===e.level&&au(c,e)).map(c=>({id:c.id,pos:hn(c.from,n)})),a=r.filter(c=>Math.abs(c.pos-s)>e.thickness).reduce((c,u)=>!c||Math.abs(u.pos-s)<Math.abs(c.pos-s)?u:c,null);let o=0;const l=(c,u)=>{o=c;const h=_n(n,c),f=Math.abs(c)>=.5?{op:"update",entity:"wall",id:e.id,data:{from:Wa(rn(e.from,h)),to:Wa(rn(e.to,h))}}:null,g=a?{text:`→ ${a.id} · ${vi(Math.abs(s+c-a.pos))}`,typable:!0}:{text:`Δ ${vi(c)}`,typable:!0};return{delta:h,hud:g,op:f,...u?{alignWith:u}:{}}};return{ids:[e.id],previewIds:[e.id,...i.openings.filter(c=>c.wall===e.id).map(c=>c.id)],update(c,u){let h=hn(Kt(c,t),n),d;if(!u.noSnap){const f=s+h;let g=null;for(const _ of r)Math.abs(f-_.pos)<=u.tol&&(!g||Math.abs(f-_.pos)<Math.abs(f-g.pos))&&(g=_);g?(h=g.pos-s,d=g.id):u.grid>0&&(h=Math.round(f/u.grid)*u.grid-s)}return l(h,d)},typed(c){if(!Number.isFinite(c)||c<0)return null;if(a){const u=Math.sign(s+o-a.pos)||Math.sign(s-a.pos)||1;return l(a.pos+u*c-s)}return l((Math.sign(o)||1)*c)}}}function Vd(i,e,t,n){const s=xi(e),r=Ir(e),a=Math.max(0,r-t.width),o=Ws(hn(Kt(n,e.from),s)-t.offset,0,t.width);let l=t.offset;const c=u=>{l=u;const h=u,d=a-u,f=Math.abs(u-t.offset)>=.5;return{delta:_n(s,u-t.offset),hud:{text:`◁ ${vi(h)} · ${vi(d)} ▷`,typable:!0},op:f?{op:"update",entity:"opening",id:t.id,data:{offset:Math.round(u)}}:null}};return{ids:[t.id],previewIds:[t.id],update(u,h){const d=hn(Kt(u,e.from),s);let f=Ws(d-o,0,a);if(!h.noSnap&&h.grid>0&&a>0){const g=Ws(Math.round(f/h.grid)*h.grid,0,a),_=Ws(a-Math.round((a-f)/h.grid)*h.grid,0,a);f=Math.abs(g-f)<=Math.abs(_-f)?g:_}return c(f)},typed(u){if(!Number.isFinite(u)||u<0||u>a)return null;const h=l<=a-l;return c(h?u:a-u)}}}const Gd=600;function Hd(i,e,t){const n=Hr(e.asset),s=i.walls.filter(u=>u.level===e.level);let r=e.at,a=null;const o=u=>{if(!n)return null;const h=$h({center:u,halfW:n.footprint.w/2,halfD:n.footprint.d/2,rotation:e.rotation});let d=null;for(const f of s){const g=Fs(f),_=xi(f),m=hn(f.from,_),p=hn(f.to,_),[T,b]=[Math.min(m,p),Math.max(m,p)],M=h.map(x=>hn(x,_));if(Math.max(...M)<T||Math.min(...M)>b)continue;const w=hn(f.from,g),C=h.map(x=>hn(x,g)),[R,U]=[Math.min(...C),Math.max(...C)];for(const x of[1,-1]){const y=w+x*f.thickness/2,P=x===1?R-y:y-U,F={wallId:f.id,face:y,out:_n(g,x),n:g};P>-f.thickness&&(!d||Math.abs(P)<Math.abs(d.gap))&&(d={a:F,gap:P})}}return d},l=(u,h,d)=>{r=u,a=h;const f=h&&n?c(u):null,g=Math.abs(u[0]-e.at[0])>=.5||Math.abs(u[1]-e.at[1])>=.5,_=f?{text:`${Ze("hud.gap")} → ${f.a.wallId} · ${vi(Math.max(0,f.gap))}`,typable:!0}:{text:`${vi(u[0])}, ${vi(u[1])}`,typable:!1};return{delta:Kt(u,e.at),hud:_,op:g?{op:"update",entity:"furniture",id:e.id,data:{at:Wa(u)}}:null,...d&&h?{alignWith:h.wallId}:{}}},c=u=>{const h=o(u);return h&&h.gap<=Gd?h:null};return{ids:[e.id],previewIds:[e.id],update(u,h){let d=rn(e.at,Kt(u,t));!h.noSnap&&h.grid>0&&(d=[Math.round(d[0]/h.grid)*h.grid,Math.round(d[1]/h.grid)*h.grid]);let f=!1,g=null;if(!h.noSnap){const _=o(d);_&&(g=_.a,Math.abs(_.gap)<=h.tol&&(d=rn(d,_n(_.a.out,-_.gap)),f=!0))}return l(d,g??c(d)?.a??null,f)},typed(u){if(!Number.isFinite(u)||u<0)return null;const h=o(r),d=h?h.a:a;if(!h||!d)return null;const f=rn(r,_n(d.out,u-h.gap));return l(f,d,!0)}}}class Wd{el;valueEl;hintEl;constructor(e){this.el=document.createElement("div"),this.el.id="hud",this.el.hidden=!0,this.valueEl=document.createElement("span"),this.valueEl.className="hud-value",this.hintEl=document.createElement("span"),this.hintEl.className="hud-hint",this.el.append(this.valueEl,this.hintEl),e.appendChild(this.el)}show(e,t,n,s,r){this.el.hidden=!1,this.el.classList.toggle("typing",s!=null),this.valueEl.textContent=s!=null?`${s||"…"} mm`:n,this.hintEl.textContent=s!=null?Ze("hud.typing"):r?Ze("hud.typable"):"",this.el.style.left=`${e+18}px`,this.el.style.top=`${t+14}px`}shake(){this.el.classList.remove("shake"),this.el.getBoundingClientRect(),this.el.classList.add("shake")}hide(){this.el.hidden=!0,this.el.classList.remove("typing","shake")}}function Xd(i){const e=c=>{const u=i.getAttribute(c);if(u==null)return null;const h=Number(u);return Number.isFinite(h)?h:null},t=e("data-tf-scale"),n=e("data-tf-ox"),s=e("data-tf-oy"),r=e("data-tf-min-x"),a=e("data-tf-min-y"),o=e("data-tf-max-x"),l=e("data-tf-max-y");return t==null||n==null||s==null||r==null||a==null||o==null||l==null?null:{scale:t,rotated:i.getAttribute("data-tf-rotated")==="1",ox:n,oy:s,minX:r,minY:a,maxX:o,maxY:l}}function ea(i,[e,t]){return i.rotated?[i.minX+(t-i.oy)*i.scale,i.minY+(e-i.ox)*i.scale]:[i.minX+(e-i.ox)*i.scale,i.maxY-(t-i.oy)*i.scale]}function qd(i,[e,t]){return i.rotated?[t/i.scale,e/i.scale]:[e/i.scale,-t/i.scale]}function ta(i,e,t){const n=i.getScreenCTM();if(!n)return null;const s=new DOMPoint(e,t).matrixTransform(n.inverse());return[s.x,s.y]}function Yd(i,e){const t=i.getScreenCTM(),n=t?Math.hypot(t.a,t.b):1;return e.scale/(n||1)}const $d=8,jd=4;class Kd{constructor(e,t,n){this.viewport=e,this.paper=t,this.deps=n,this.hud=new Wd(e),e.addEventListener("wheel",s=>this.onWheel(s),{passive:!1}),e.addEventListener("pointerdown",s=>this.onPointerDown(s))}viewport;paper;deps;scale=1;tx=0;ty=0;currentLevel=null;seq=0;fitted=!1;selection=null;hud;dragging=!1;placing=null;get svg(){return this.paper.querySelector("svg")}async show(e,t){const n=++this.seq,s=this.deps.token?`&token=${encodeURIComponent(this.deps.token)}`:"",r=await fetch(`/plan/${encodeURIComponent(e)}.svg?rev=${t}${s}`);if(!r.ok||n!==this.seq)return;const a=await r.text();if(n!==this.seq)return;const o=this.currentLevel!==e;this.currentLevel=e,this.paper.innerHTML=a,this.applySelection(),(!this.fitted||o)&&this.fit()}fit(){this.paper.style.transform="none";const e=this.paper.getBoundingClientRect(),t=this.viewport.getBoundingClientRect();if(e.width===0||t.width===0){this.apply();return}this.scale=Math.min(t.width/e.width,t.height/e.height)*.92,this.tx=(t.width-e.width*this.scale)/2,this.ty=(t.height-e.height*this.scale)/2,this.fitted=!0,this.apply()}ensureFitted(){this.fitted||this.fit()}flash(e){for(const t of e)for(const n of this.paper.querySelectorAll(`[data-id="${CSS.escape(t)}"]`))n.classList.remove("flash-2d"),n.getBoundingClientRect?.(),n.classList.add("flash-2d"),setTimeout(()=>n.classList.remove("flash-2d"),1600)}setSelection(e){this.selection=e,this.applySelection()}applySelection(){for(const e of this.paper.querySelectorAll(".sel-2d"))e.classList.remove("sel-2d");if(this.selection)for(const e of this.paper.querySelectorAll(`[data-id="${CSS.escape(this.selection)}"]`))e.classList.add("sel-2d")}setPlacing(e){this.placing=e,this.viewport.classList.toggle("is-placing",e!=null)}get placingAsset(){return this.placing}clearPreview(){for(const e of this.paper.querySelectorAll("[data-preview]"))e.removeAttribute("transform"),e.removeAttribute("data-preview");this.clearAlign()}clearAlign(){for(const e of this.paper.querySelectorAll(".align-2d"))e.classList.remove("align-2d")}async capture(e=1600){const t=this.svg;if(!t)throw new Error("Aún no hay plano para capturar.");const n=new XMLSerializer().serializeToString(t),s=URL.createObjectURL(new Blob([n],{type:"image/svg+xml"}));try{const r=new Image;await new Promise((h,d)=>{r.onload=()=>h(),r.onerror=()=>d(new Error("No se pudo cargar el SVG para la captura.")),r.src=s});const a=r.naturalWidth||1600,o=r.naturalHeight||1130,l=e/a,c=document.createElement("canvas");c.width=Math.round(a*l),c.height=Math.round(o*l);const u=c.getContext("2d");return u.fillStyle="#ffffff",u.fillRect(0,0,c.width,c.height),u.drawImage(r,0,0,c.width,c.height),c.toDataURL("image/png").split(",")[1]}finally{URL.revokeObjectURL(s)}}apply(){this.paper.style.transform=`translate(${this.tx}px, ${this.ty}px) scale(${this.scale})`}onWheel(e){e.preventDefault();const t=this.viewport.getBoundingClientRect(),n=Math.exp(-e.deltaY*.0012),s=Math.min(10,Math.max(.05,this.scale*n)),r=(e.clientX-t.left-this.tx)/this.scale,a=(e.clientY-t.top-this.ty)/this.scale;this.tx=e.clientX-t.left-r*s,this.ty=e.clientY-t.top-a*s,this.scale=s,this.apply()}sessionFor(e,t){if(this.deps.readonly)return null;const n=this.deps.getModel();if(!n)return null;const s=n.walls.find(o=>o.id===e);if(s)return zd(n,s,t);const r=n.openings.find(o=>o.id===e);if(r){const o=n.walls.find(l=>l.id===r.wall);return o?Vd(n,o,r,t):null}const a=n.furniture.find(o=>o.id===e);return a?Hd(n,a,t):null}onPointerDown(e){if(e.button!==0)return;const t=e.clientX,n=e.clientY,s=this.tx,r=this.ty;let a=!1;const l=e.target.closest?.("[data-id]")?.getAttribute("data-id")??null;this.viewport.setPointerCapture(e.pointerId);const c=()=>{const y=this.svg,P=y?Xd(y):null;return y&&P?{svg:y,tf:P}:null};let u=null,h=!1,d=null,f=null,g=!1,_=[t,n];const m=()=>{const y=c();if(!y)return null;const P=ta(y.svg,t,n);return P?ea(y.tf,P):null},p=y=>{const P=c();if(!P||!u)return;const[F,B]=qd(P.tf,y.delta);for(const X of u.previewIds)for(const V of this.paper.querySelectorAll(`[data-id="${CSS.escape(X)}"]`))V.setAttribute("transform",`translate(${F} ${B})`),V.setAttribute("data-preview","1");if(this.clearAlign(),y.alignWith)for(const X of this.paper.querySelectorAll(`[data-id="${CSS.escape(y.alignWith)}"]`))X.classList.add("align-2d")},T=y=>{const P=c();return{grid:this.deps.getGrid(),tol:P?$d*Yd(P.svg,P.tf):40,noSnap:y}},b=y=>{const P=c();if(!P||!u)return;const F=ta(P.svg,y.clientX,y.clientY);F&&(d=u.update(ea(P.tf,F),T(y.altKey)),p(d),this.hud.show(y.clientX,y.clientY,d.hud?.text??"",f,d.hud?.typable??!1))},M=(y,P)=>{g=!0,R(),y?this.deps.onCommit(y,P):this.clearPreview(),this.deps.onDragIds([])},w=y=>{if(!(!u||!d)){if(/^[0-9]$/.test(y.key))f=(f??"")+y.key;else if(y.key==="Backspace")f=f?f.slice(0,-1):null;else if(y.key==="Enter"&&f){const P=u.typed(Number(f),T(y.altKey));if(!P){this.hud.shake(),y.preventDefault(),y.stopPropagation();return}p(P),M(P.op,Ze("note.typed",{id:String(l),value:f})),y.preventDefault(),y.stopPropagation();return}else if(y.key==="Escape")if(f!=null)f=null;else{M(null,""),y.preventDefault(),y.stopPropagation();return}else return;y.preventDefault(),y.stopPropagation(),this.hud.show(_[0],_[1],d.hud?.text??"",f,d.hud?.typable??!1)}},C=y=>{const P=y.clientX-t,F=y.clientY-n;if(_=[y.clientX,y.clientY],!a&&Math.abs(P)+Math.abs(F)>jd){if(a=!0,l&&!h&&!this.placing){h=!0;const B=m();B&&(u=this.sessionFor(l,B)),u&&(this.dragging=!0,this.deps.onSelect(l),this.deps.onDragIds(u.ids),window.addEventListener("keydown",w,!0))}u?this.viewport.classList.add("is-dragging"):this.viewport.classList.add("is-panning")}a&&(u?b(y):(this.tx=s+P,this.ty=r+F,this.apply()))},R=()=>{this.dragging=!1,this.viewport.removeEventListener("pointermove",C),this.viewport.removeEventListener("pointerup",U),this.viewport.removeEventListener("pointercancel",x),window.removeEventListener("keydown",w,!0),this.viewport.classList.remove("is-panning","is-dragging"),this.hud.hide()},U=()=>{if(!g){if(u&&a){M(d?.op??null,d?.op?`kéo ${l}`:"");return}if(R(),!a){if(this.placing){const y=c();if(y){const P=ta(y.svg,t,n);if(P){const F=ea(y.tf,P),B=this.deps.getGrid(),X=V=>B>0?Math.round(V/B)*B:Math.round(V);this.deps.onPlace(this.placing,[X(F[0]),X(F[1])])}}return}l&&this.deps.onSelect(l)}}},x=()=>{g||(u&&(this.clearPreview(),this.deps.onDragIds([])),R())};this.viewport.addEventListener("pointermove",C),this.viewport.addEventListener("pointerup",U),this.viewport.addEventListener("pointercancel",x)}}const Jo="182",ji={ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zd=0,Bl=1,Jd=2,Ar=1,du=2,_s=3,ri=0,jt=1,tn=2,Gn=0,Ki=1,kl=2,zl=3,Vl=4,Qd=5,pi=100,ef=101,tf=102,nf=103,sf=104,rf=200,af=201,of=202,lf=203,Xa=204,qa=205,cf=206,uf=207,hf=208,df=209,ff=210,pf=211,mf=212,gf=213,_f=214,Ya=0,$a=1,ja=2,Ji=3,Ka=4,Za=5,Ja=6,Qa=7,Qo=0,vf=1,xf=2,An=0,fu=1,pu=2,mu=3,gu=4,_u=5,vu=6,xu=7,yu=300,yi=301,Qi=302,eo=303,to=304,Xr=306,no=1e3,Vn=1001,io=1002,It=1003,yf=1004,Xs=1005,Bt=1006,na=1007,gi=1008,nn=1009,Su=1010,Mu=1011,ws=1012,el=1013,Pn=1014,En=1015,Xn=1016,tl=1017,nl=1018,As=1020,bu=35902,Eu=35899,Tu=1021,wu=1022,gn=1023,qn=1026,_i=1027,Au=1028,il=1029,es=1030,sl=1031,rl=1033,Cr=33776,Rr=33777,Pr=33778,Lr=33779,so=35840,ro=35841,ao=35842,oo=35843,lo=36196,co=37492,uo=37496,ho=37488,fo=37489,po=37490,mo=37491,go=37808,_o=37809,vo=37810,xo=37811,yo=37812,So=37813,Mo=37814,bo=37815,Eo=37816,To=37817,wo=37818,Ao=37819,Co=37820,Ro=37821,Po=36492,Lo=36494,Do=36495,Io=36283,Uo=36284,No=36285,Fo=36286,Sf=3200,Cu=0,Mf=1,ei="",ln="srgb",ts="srgb-linear",Ur="linear",rt="srgb",Ci=7680,Gl=519,bf=512,Ef=513,Tf=514,al=515,wf=516,Af=517,ol=518,Cf=519,Oo=35044,Hl="300 es",Tn=2e3,Nr=2001;function Ru(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Rf(){const i=Fr("canvas");return i.style.display="block",i}const Wl={};function Or(...i){const e="THREE."+i.shift();console.log(e,...i)}function ke(...i){const e="THREE."+i.shift();console.warn(e,...i)}function Qe(...i){const e="THREE."+i.shift();console.error(e,...i)}function Cs(...i){const e=i.join(" ");e in Wl||(Wl[e]=!0,ke(...i))}function Pf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ss=Math.PI/180,Bo=180/Math.PI;function Hn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Lf(i,e){return(i%e+e)%e}function ia(i,e,t){return(1-t)*i+t*e}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Df={DEG2RAD:Ss};class ee{constructor(e=0,t=0){ee.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Si{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o>=1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==g){let m=l*d+c*f+u*g+h*_;m<0&&(d=-d,f=-f,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){const T=Math.acos(m),b=Math.sin(T);p=Math.sin(p*T)/b,o=Math.sin(o*T)/b,l=l*p+d*o,c=c*p+f*o,u=u*p+g*o,h=h*p+_*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+g*o,h=h*p+_*o;const T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-o*f,e[t+2]=c*g+u*f+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>h){const f=2*Math.sqrt(1+n-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-n-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return sa.copy(this).projectOnVector(e),this.sub(sa)}reflect(e){return this.sub(sa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sa=new L,Xl=new Si;class Xe{constructor(e,t,n,s,r,a,o,l,c){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],T=s[1],b=s[4],M=s[7],w=s[2],C=s[5],R=s[8];return r[0]=a*_+o*T+l*w,r[3]=a*m+o*b+l*C,r[6]=a*p+o*M+l*R,r[1]=c*_+u*T+h*w,r[4]=c*m+u*b+h*C,r[7]=c*p+u*M+h*R,r[2]=d*_+f*T+g*w,r[5]=d*m+f*b+g*C,r[8]=d*p+f*M+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,f=c*r-a*l,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(s*c-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ra.makeScale(e,t)),this}rotate(e){return this.premultiply(ra.makeRotation(-e)),this}translate(e,t){return this.premultiply(ra.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ra=new Xe,ql=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yl=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function If(){const i={enabled:!0,workingColorSpace:ts,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(s.r=Wn(s.r),s.g=Wn(s.g),s.b=Wn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(s.r=Zi(s.r),s.g=Zi(s.g),s.b=Zi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ei?Ur:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Cs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Cs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ts]:{primaries:e,whitePoint:n,transfer:Ur,toXYZ:ql,fromXYZ:Yl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:ql,fromXYZ:Yl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),i}const et=If();function Wn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ri;class Uf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ri===void 0&&(Ri=Fr("canvas")),Ri.width=e.width,Ri.height=e.height;const s=Ri.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ri}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Wn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wn(t[n]/255)*255):t[n]=Wn(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Nf=0;class ll{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Hn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(aa(s[a].image)):r.push(aa(s[a]))}else r=aa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function aa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Uf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}let Ff=0;const oa=new L;class kt extends Ti{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=Vn,s=Vn,r=Bt,a=gi,o=gn,l=nn,c=kt.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Hn(),this.name="",this.source=new ll(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ee(0,0),this.repeat=new ee(1,1),this.center=new ee(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(oa).x}get height(){return this.source.getSize(oa).y}get depth(){return this.source.getSize(oa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case no:e.x=e.x-Math.floor(e.x);break;case Vn:e.x=e.x<0?0:1;break;case io:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case no:e.y=e.y-Math.floor(e.y);break;case Vn:e.y=e.y<0?0:1;break;case io:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=yu;kt.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,n=0,s=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,M=(f+1)/2,w=(p+1)/2,C=(u+d)/4,R=(h+_)/4,U=(g+m)/4;return b>M&&b>w?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=C/n,r=R/n):M>w?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=C/s,r=U/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=R/r,s=U/r),this.set(n,s,r,t),this}let T=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(h-_)/T,this.z=(d-u)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Of extends Ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);const s={width:e,height:t,depth:n.depth},r=new kt(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new ll(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cn extends Of{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Pu extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bf extends kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ni{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(e.matrixWorld),this.union(qs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(as),Ys.subVectors(this.max,as),Pi.subVectors(e.a,as),Li.subVectors(e.b,as),Di.subVectors(e.c,as),Yn.subVectors(Li,Pi),$n.subVectors(Di,Li),li.subVectors(Pi,Di);let t=[0,-Yn.z,Yn.y,0,-$n.z,$n.y,0,-li.z,li.y,Yn.z,0,-Yn.x,$n.z,0,-$n.x,li.z,0,-li.x,-Yn.y,Yn.x,0,-$n.y,$n.x,0,-li.y,li.x,0];return!la(t,Pi,Li,Di,Ys)||(t=[1,0,0,0,1,0,0,0,1],!la(t,Pi,Li,Di,Ys))?!1:($s.crossVectors(Yn,$n),t=[$s.x,$s.y,$s.z],la(t,Pi,Li,Di,Ys))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new L,new L,new L,new L,new L,new L,new L,new L],dn=new L,qs=new ni,Pi=new L,Li=new L,Di=new L,Yn=new L,$n=new L,li=new L,as=new L,Ys=new L,$s=new L,ci=new L;function la(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ci.fromArray(i,r);const o=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),l=e.dot(ci),c=t.dot(ci),u=n.dot(ci);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const kf=new ni,os=new L,ca=new L;class qr{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):kf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;os.subVectors(e,this.center);const t=os.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(os,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ca.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(os.copy(e.center).add(ca)),this.expandByPoint(os.copy(e.center).sub(ca))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Fn=new L,ua=new L,js=new L,jn=new L,ha=new L,Ks=new L,da=new L;class cl{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ua.copy(e).add(t).multiplyScalar(.5),js.copy(t).sub(e).normalize(),jn.copy(this.origin).sub(ua);const r=e.distanceTo(t)*.5,a=-this.direction.dot(js),o=jn.dot(this.direction),l=-jn.dot(js),c=jn.lengthSq(),u=Math.abs(1-a*a);let h,d,f,g;if(u>0)if(h=a*l-o,d=a*o-l,g=r*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ua).addScaledVector(js,d),f}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const n=Fn.dot(this.direction),s=Fn.dot(Fn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,n,s,r){ha.subVectors(t,e),Ks.subVectors(n,e),da.crossVectors(ha,Ks);let a=this.direction.dot(da),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;jn.subVectors(this.origin,e);const l=o*this.direction.dot(Ks.crossVectors(jn,Ks));if(l<0)return null;const c=o*this.direction.dot(ha.cross(jn));if(c<0||l+c>a)return null;const u=-o*jn.dot(da);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,n,s,r,a,o,l,c,u,h,d,f,g,_,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,d,f,g,_,m)}set(e,t,n,s,r,a,o,l,c,u,h,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Ii.setFromMatrixColumn(e,0).length(),r=1/Ii.setFromMatrixColumn(e,1).length(),a=1/Ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,g=o*u,_=o*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zf,e,Vf)}lookAt(e,t,n){const s=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Kn.crossVectors(n,Qt),Kn.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Kn.crossVectors(n,Qt)),Kn.normalize(),Zs.crossVectors(Qt,Kn),s[0]=Kn.x,s[4]=Zs.x,s[8]=Qt.x,s[1]=Kn.y,s[5]=Zs.y,s[9]=Qt.y,s[2]=Kn.z,s[6]=Zs.z,s[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],T=n[3],b=n[7],M=n[11],w=n[15],C=s[0],R=s[4],U=s[8],x=s[12],y=s[1],P=s[5],F=s[9],B=s[13],X=s[2],V=s[6],H=s[10],k=s[14],J=s[3],me=s[7],ce=s[11],de=s[15];return r[0]=a*C+o*y+l*X+c*J,r[4]=a*R+o*P+l*V+c*me,r[8]=a*U+o*F+l*H+c*ce,r[12]=a*x+o*B+l*k+c*de,r[1]=u*C+h*y+d*X+f*J,r[5]=u*R+h*P+d*V+f*me,r[9]=u*U+h*F+d*H+f*ce,r[13]=u*x+h*B+d*k+f*de,r[2]=g*C+_*y+m*X+p*J,r[6]=g*R+_*P+m*V+p*me,r[10]=g*U+_*F+m*H+p*ce,r[14]=g*x+_*B+m*k+p*de,r[3]=T*C+b*y+M*X+w*J,r[7]=T*R+b*P+M*V+w*me,r[11]=T*U+b*F+M*H+w*ce,r[15]=T*x+b*B+M*k+w*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15],T=l*f-c*d,b=o*f-c*h,M=o*d-l*h,w=a*f-c*u,C=a*d-l*u,R=a*h-o*u;return t*(_*T-m*b+p*M)-n*(g*T-m*w+p*C)+s*(g*b-_*w+p*R)-r*(g*M-_*C+m*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],T=h*m*c-_*d*c+_*l*f-o*m*f-h*l*p+o*d*p,b=g*d*c-u*m*c-g*l*f+a*m*f+u*l*p-a*d*p,M=u*_*c-g*h*c+g*o*f-a*_*f-u*o*p+a*h*p,w=g*h*l-u*_*l-g*o*d+a*_*d+u*o*m-a*h*m,C=t*T+n*b+s*M+r*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return e[0]=T*R,e[1]=(_*d*r-h*m*r-_*s*f+n*m*f+h*s*p-n*d*p)*R,e[2]=(o*m*r-_*l*r+_*s*c-n*m*c-o*s*p+n*l*p)*R,e[3]=(h*l*r-o*d*r-h*s*c+n*d*c+o*s*f-n*l*f)*R,e[4]=b*R,e[5]=(u*m*r-g*d*r+g*s*f-t*m*f-u*s*p+t*d*p)*R,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*R,e[7]=(a*d*r-u*l*r+u*s*c-t*d*c-a*s*f+t*l*f)*R,e[8]=M*R,e[9]=(g*h*r-u*_*r-g*n*f+t*_*f+u*n*p-t*h*p)*R,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*R,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*f-t*o*f)*R,e[12]=w*R,e[13]=(u*_*s-g*h*s+g*n*d-t*_*d-u*n*m+t*h*m)*R,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*m-t*o*m)*R,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*d+t*o*d)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,f=r*u,g=r*h,_=a*u,m=a*h,p=o*h,T=l*c,b=l*u,M=l*h,w=n.x,C=n.y,R=n.z;return s[0]=(1-(_+p))*w,s[1]=(f+M)*w,s[2]=(g-b)*w,s[3]=0,s[4]=(f-M)*C,s[5]=(1-(d+p))*C,s[6]=(m+T)*C,s[7]=0,s[8]=(g+b)*R,s[9]=(m-T)*R,s[10]=(1-(d+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;if(e.x=s[12],e.y=s[13],e.z=s[14],this.determinant()===0)return n.set(1,1,1),t.identity(),this;let r=Ii.set(s[0],s[1],s[2]).length();const a=Ii.set(s[4],s[5],s[6]).length(),o=Ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),fn.copy(this);const c=1/r,u=1/a,h=1/o;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=u,fn.elements[5]*=u,fn.elements[6]*=u,fn.elements[8]*=h,fn.elements[9]*=h,fn.elements[10]*=h,t.setFromRotationMatrix(fn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Tn,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let g,_;if(l)g=r/(a-r),_=a*r/(a-r);else if(o===Tn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Nr)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Tn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s);let g,_;if(l)g=1/(a-r),_=a/(a-r);else if(o===Tn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===Nr)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ii=new L,fn=new vt,zf=new L(0,0,0),Vf=new L(1,1,1),Kn=new L,Zs=new L,Qt=new L,$l=new vt,jl=new Si;class Ln{constructor(e=0,t=0,n=0,s=Ln.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $l.makeRotationFromQuaternion(e),this.setFromRotationMatrix($l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jl.setFromEuler(this),this.setFromQuaternion(jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ln.DEFAULT_ORDER="XYZ";class Lu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gf=0;const Kl=new L,Ui=new Si,On=new vt,Js=new L,ls=new L,Hf=new L,Wf=new Si,Zl=new L(1,0,0),Jl=new L(0,1,0),Ql=new L(0,0,1),ec={type:"added"},Xf={type:"removed"},Ni={type:"childadded",child:null},fa={type:"childremoved",child:null};class Ct extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new L,t=new Ln,n=new Si,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new Xe}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(Zl,e)}rotateY(e){return this.rotateOnAxis(Jl,e)}rotateZ(e){return this.rotateOnAxis(Ql,e)}translateOnAxis(e,t){return Kl.copy(e).applyQuaternion(this.quaternion),this.position.add(Kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zl,e)}translateY(e){return this.translateOnAxis(Jl,e)}translateZ(e){return this.translateOnAxis(Ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Js.copy(e):Js.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(ls,Js,this.up):On.lookAt(Js,ls,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(On),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ec),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xf),fa.child=e,this.dispatchEvent(fa),fa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ec),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,Hf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ct.DEFAULT_UP=new L(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new L,Bn=new L,pa=new L,kn=new L,Fi=new L,Oi=new L,tc=new L,ma=new L,ga=new L,_a=new L,va=new bt,xa=new bt,ya=new bt;class sn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),pn.subVectors(e,t),s.cross(pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){pn.subVectors(s,t),Bn.subVectors(n,t),pa.subVectors(e,t);const a=pn.dot(pn),o=pn.dot(Bn),l=pn.dot(pa),c=Bn.dot(Bn),u=Bn.dot(pa),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,g=(a*u-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(a,kn.y),l.addScaledVector(o,kn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return va.setScalar(0),xa.setScalar(0),ya.setScalar(0),va.fromBufferAttribute(e,t),xa.fromBufferAttribute(e,n),ya.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(va,r.x),a.addScaledVector(xa,r.y),a.addScaledVector(ya,r.z),a}static isFrontFacing(e,t,n,s){return pn.subVectors(n,t),Bn.subVectors(e,t),pn.cross(Bn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),pn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return sn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,n),Oi.subVectors(r,n),ma.subVectors(e,n);const l=Fi.dot(ma),c=Oi.dot(ma);if(l<=0&&c<=0)return t.copy(n);ga.subVectors(e,s);const u=Fi.dot(ga),h=Oi.dot(ga);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Fi,a);_a.subVectors(e,r);const f=Fi.dot(_a),g=Oi.dot(_a);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Oi,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return tc.subVectors(r,s),o=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(tc,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function Sa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Lf(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Sa(a,r,e+1/3),this.g=Sa(a,r,e),this.b=Sa(a,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=ln){function n(r){r!==void 0&&parseFloat(r)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const n=Du[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wn(e.r),this.g=Wn(e.g),this.b=Wn(e.b),this}copyLinearToSRGB(e){return this.r=Zi(e.r),this.g=Zi(e.g),this.b=Zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return et.workingToColorSpace(Ft.copy(this),e),Math.round(je(Ft.r*255,0,255))*65536+Math.round(je(Ft.g*255,0,255))*256+Math.round(je(Ft.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Ft.copy(this),t);const n=Ft.r,s=Ft.g,r=Ft.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=ln){et.workingToColorSpace(Ft.copy(this),e);const t=Ft.r,n=Ft.g,s=Ft.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(Qs);const n=ia(Zn.h,Qs.h,t),s=ia(Zn.s,Qs.s,t),r=ia(Zn.l,Qs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new qe;qe.NAMES=Du;let qf=0;class wi extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Hn(),this.name="",this.type="Material",this.blending=Ki,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=qa,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==ri&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xa&&(n.blendSrc=this.blendSrc),this.blendDst!==qa&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Iu extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new L,er=new ee;let Yf=0;class vn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Oo,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)er.fromBufferAttribute(this,t),er.applyMatrix3(e),this.setXY(t,er.x,er.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Oo&&(e.usage=this.usage),e}}class Uu extends vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Nu extends vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends vn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let $f=0;const on=new vt,Ma=new Ct,Bi=new L,en=new ni,cs=new ni,Lt=new L;class wt extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$f++}),this.uuid=Hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ru(e)?Nu:Uu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return Ma.lookAt(e),Ma.updateMatrix(),this.applyMatrix4(Ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Lt.addVectors(en.min,cs.min),en.expandByPoint(Lt),Lt.addVectors(en.max,cs.max),en.expandByPoint(Lt)):(en.expandByPoint(cs.min),en.expandByPoint(cs.max))}en.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Lt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Lt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Lt.fromBufferAttribute(o,c),l&&(Bi.fromBufferAttribute(e,c),Lt.add(Bi)),s=Math.max(s,n.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new vn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new L,l[U]=new L;const c=new L,u=new L,h=new L,d=new ee,f=new ee,g=new ee,_=new L,m=new L;function p(U,x,y){c.fromBufferAttribute(n,U),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,y),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,x),g.fromBufferAttribute(r,y),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(P),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(P),o[U].add(_),o[x].add(_),o[y].add(_),l[U].add(m),l[x].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let U=0,x=T.length;U<x;++U){const y=T[U],P=y.start,F=y.count;for(let B=P,X=P+F;B<X;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const b=new L,M=new L,w=new L,C=new L;function R(U){w.fromBufferAttribute(s,U),C.copy(w);const x=o[U];b.copy(x),b.sub(w.multiplyScalar(w.dot(x))).normalize(),M.crossVectors(C,x);const P=M.dot(l[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,P)}for(let U=0,x=T.length;U<x;++U){const y=T[U],P=y.start,F=y.count;for(let B=P,X=P+F;B<X;B+=3)R(e.getX(B+0)),R(e.getX(B+1)),R(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new vn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let p=0;p<u;p++)d[g++]=c[f++]}return new vn(d,u,h)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nc=new vt,ui=new cl,tr=new qr,ic=new L,nr=new L,ir=new L,sr=new L,ba=new L,rr=new L,sc=new L,ar=new L;class ft extends Ct{constructor(e=new wt,t=new Iu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){rr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(ba.fromBufferAttribute(h,e),a?rr.addScaledVector(ba,u):rr.addScaledVector(ba.sub(t),u))}t.add(rr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(r),ui.copy(e.ray).recast(e.near),!(tr.containsPoint(ui.origin)===!1&&(ui.intersectSphere(tr,ic)===null||ui.origin.distanceToSquared(ic)>(e.far-e.near)**2))&&(nc.copy(r).invert(),ui.copy(e.ray).applyMatrix4(nc),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ui)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=T,w=b;M<w;M+=3){const C=o.getX(M),R=o.getX(M+1),U=o.getX(M+2);s=or(this,p,e,n,c,u,h,C,R,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const T=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);s=or(this,a,e,n,c,u,h,T,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],T=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=T,w=b;M<w;M+=3){const C=M,R=M+1,U=M+2;s=or(this,p,e,n,c,u,h,C,R,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const T=m,b=m+1,M=m+2;s=or(this,a,e,n,c,u,h,T,b,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function jf(i,e,t,n,s,r,a,o){let l;if(e.side===jt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ri,o),l===null)return null;ar.copy(o),ar.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ar);return c<t.near||c>t.far?null:{distance:c,point:ar.clone(),object:i}}function or(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,nr),i.getVertexPosition(l,ir),i.getVertexPosition(c,sr);const u=jf(i,e,t,n,nr,ir,sr,sc);if(u){const h=new L;sn.getBarycoord(sc,nr,ir,sr,h),s&&(u.uv=sn.getInterpolatedAttribute(s,o,l,c,h,new ee)),r&&(u.uv1=sn.getInterpolatedAttribute(r,o,l,c,h,new ee)),a&&(u.normal=sn.getInterpolatedAttribute(a,o,l,c,h,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new L,materialIndex:0};sn.getNormal(nr,ir,sr,d.normal),u.face=d,u.barycoord=h}return u}class cn extends wt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(h,2));function g(_,m,p,T,b,M,w,C,R,U,x){const y=M/R,P=w/U,F=M/2,B=w/2,X=C/2,V=R+1,H=U+1;let k=0,J=0;const me=new L;for(let ce=0;ce<H;ce++){const de=ce*P-B;for(let Ge=0;Ge<V;Ge++){const ze=Ge*y-F;me[_]=ze*T,me[m]=de*b,me[p]=X,c.push(me.x,me.y,me.z),me[_]=0,me[m]=0,me[p]=C>0?1:-1,u.push(me.x,me.y,me.z),h.push(Ge/R),h.push(1-ce/U),k+=1}}for(let ce=0;ce<U;ce++)for(let de=0;de<R;de++){const Ge=d+de+V*ce,ze=d+de+V*(ce+1),at=d+(de+1)+V*(ce+1),ot=d+(de+1)+V*ce;l.push(Ge,ze,ot),l.push(ze,at,ot),J+=6}o.addGroup(f,J,x),f+=J,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ns(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Gt(i){const e={};for(let t=0;t<i.length;t++){const n=ns(i[t]);for(const s in n)e[s]=n[s]}return e}function Kf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Fu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Zf={clone:ns,merge:Gt};var Jf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dn extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jf,this.fragmentShader=Qf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=Kf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ou extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new L,rc=new ee,ac=new ee;class un extends Ou{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bo*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-e/Jn.z)}getViewSize(e,t){return this.getViewBounds(e,rc,ac),t.subVectors(ac,rc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ss*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ki=-90,zi=1;class ep extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new un(ki,zi,e,t);s.layers=this.layers,this.add(s);const r=new un(ki,zi,e,t);r.layers=this.layers,this.add(r);const a=new un(ki,zi,e,t);a.layers=this.layers,this.add(a);const o=new un(ki,zi,e,t);o.layers=this.layers,this.add(o);const l=new un(ki,zi,e,t);l.layers=this.layers,this.add(l);const c=new un(ki,zi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Bu extends kt{constructor(e=[],t=yi,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ku extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Bu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new cn(5,5,5),r=new Dn({name:"CubemapFromEquirect",uniforms:ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:Gn});r.uniforms.tEquirect.value=t;const a=new ft(s,r),o=t.minFilter;return t.minFilter===gi&&(t.minFilter=Bt),new ep(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}class Ht extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tp={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ht;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class np extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ip{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Oo,this.updateRanges=[],this.version=0,this.uuid=Hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new L;class Br{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),s=ut(s,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Or("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new vn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Br(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Or("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class zu extends wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Vi;const us=new L,Gi=new L,Hi=new L,Wi=new ee,hs=new ee,Vu=new vt,lr=new L,ds=new L,cr=new L,oc=new ee,Ta=new ee,lc=new ee;class sp extends Ct{constructor(e=new zu){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ip(t,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new Br(n,3,0,!1)),Vi.setAttribute("uv",new Br(n,2,3,!1))}this.geometry=Vi,this.material=e,this.center=new ee(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Qe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),Vu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Hi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Hi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ur(lr.set(-.5,-.5,0),Hi,a,Gi,s,r),ur(ds.set(.5,-.5,0),Hi,a,Gi,s,r),ur(cr.set(.5,.5,0),Hi,a,Gi,s,r),oc.set(0,0),Ta.set(1,0),lc.set(1,1);let o=e.ray.intersectTriangle(lr,ds,cr,!1,us);if(o===null&&(ur(ds.set(-.5,.5,0),Hi,a,Gi,s,r),Ta.set(0,1),o=e.ray.intersectTriangle(lr,cr,ds,!1,us),o===null))return;const l=e.ray.origin.distanceTo(us);l<e.near||l>e.far||t.push({distance:l,point:us.clone(),uv:sn.getInterpolation(us,lr,ds,cr,oc,Ta,lc,new ee),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ur(i,e,t,n,s,r){Wi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(hs.x=r*Wi.x-s*Wi.y,hs.y=s*Wi.x+r*Wi.y):hs.copy(Wi),i.copy(e),i.x+=hs.x,i.y+=hs.y,i.applyMatrix4(Vu)}class rp extends kt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=It,u=It,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wa=new L,ap=new L,op=new Xe;class Qn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=wa.subVectors(n,t).cross(ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(wa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||op.getNormalMatrix(e),s=this.coplanarPoint(wa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hi=new qr,lp=new ee(.5,.5),hr=new L;class ul{constructor(e=new Qn,t=new Qn,n=new Qn,s=new Qn,r=new Qn,a=new Qn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],g=r[8],_=r[9],m=r[10],p=r[11],T=r[12],b=r[13],M=r[14],w=r[15];if(s[0].setComponents(c-a,f-u,p-g,w-T).normalize(),s[1].setComponents(c+a,f+u,p+g,w+T).normalize(),s[2].setComponents(c+o,f+h,p+_,w+b).normalize(),s[3].setComponents(c-o,f-h,p-_,w-b).normalize(),n)s[4].setComponents(l,d,m,M).normalize(),s[5].setComponents(c-l,f-d,p-m,w-M).normalize();else if(s[4].setComponents(c-l,f-d,p-m,w-M).normalize(),t===Tn)s[5].setComponents(c+l,f+d,p+m,w+M).normalize();else if(t===Nr)s[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){hi.center.set(0,0,0);const t=lp.distanceTo(e.center);return hi.radius=.7071067811865476+t,hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(hr.x=s.normal.x>0?e.max.x:e.min.x,hr.y=s.normal.y>0?e.max.y:e.min.y,hr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $i extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const kr=new L,zr=new L,cc=new vt,fs=new cl,dr=new qr,Aa=new L,uc=new L;class hl extends Ct{constructor(e=new wt,t=new $i){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)kr.fromBufferAttribute(t,s-1),zr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=kr.distanceTo(zr);e.setAttribute("lineDistance",new _t(n,1))}else ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),dr.radius+=r,e.ray.intersectsSphere(dr)===!1)return;cc.copy(s).invert(),fs.copy(e.ray).applyMatrix4(cc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const p=u.getX(_),T=u.getX(_+1),b=fr(this,e,fs,l,p,T,_);b&&t.push(b)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=fr(this,e,fs,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const p=fr(this,e,fs,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=fr(this,e,fs,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function fr(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(kr.fromBufferAttribute(o,s),zr.fromBufferAttribute(o,r),t.distanceSqToSegment(kr,zr,Aa,uc)>n)return;Aa.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Aa);if(!(c<e.near||c>e.far))return{distance:c,point:uc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const hc=new L,dc=new L;class ko extends hl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)hc.fromBufferAttribute(t,s),dc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+hc.distanceTo(dc);e.setAttribute("lineDistance",new _t(n,1))}else ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class cp extends hl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class up extends kt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rs extends kt{constructor(e,t,n=Pn,s,r,a,o=It,l=It,c,u=qn,h=1){if(u!==qn&&u!==_i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ll(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class hp extends Rs{constructor(e,t=Pn,n=yi,s,r,a=It,o=It,l,c=qn){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Gu extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Bs extends wt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;T(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new _t(h,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(f,2));function T(){const M=new L,w=new L;let C=0;const R=(t-e)/n;for(let U=0;U<=r;U++){const x=[],y=U/r,P=y*(t-e)+e;for(let F=0;F<=s;F++){const B=F/s,X=B*l+o,V=Math.sin(X),H=Math.cos(X);w.x=P*V,w.y=-y*n+m,w.z=P*H,h.push(w.x,w.y,w.z),M.set(V,R,H).normalize(),d.push(M.x,M.y,M.z),f.push(B,1-y),x.push(g++)}_.push(x)}for(let U=0;U<s;U++)for(let x=0;x<r;x++){const y=_[x][U],P=_[x+1][U],F=_[x+1][U+1],B=_[x][U+1];(e>0||x!==0)&&(u.push(y,P,B),C+=3),(t>0||x!==r-1)&&(u.push(P,F,B),C+=3)}c.addGroup(p,C,0),p+=C}function b(M){const w=g,C=new ee,R=new L;let U=0;const x=M===!0?e:t,y=M===!0?1:-1;for(let F=1;F<=s;F++)h.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const P=g;for(let F=0;F<=s;F++){const X=F/s*l+o,V=Math.cos(X),H=Math.sin(X);R.x=x*H,R.y=m*y,R.z=x*V,h.push(R.x,R.y,R.z),d.push(0,y,0),C.x=V*.5+.5,C.y=H*.5*y+.5,f.push(C.x,C.y),g++}for(let F=0;F<s;F++){const B=w+F,X=P+F;M===!0?u.push(X,X+1,B):u.push(X+1,X,B),U+=3}c.addGroup(p,U,M===!0?1:2),p+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bs(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dl extends Bs{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new dl(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const pr=new L,mr=new L,Ca=new L,gr=new sn;class fc extends wt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Ss*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:_,b:m,c:p}=gr;if(_.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),gr.getNormal(Ca),h[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let T=0;T<3;T++){const b=(T+1)%3,M=h[T],w=h[b],C=gr[u[T]],R=gr[u[b]],U=`${M}_${w}`,x=`${w}_${M}`;x in d&&d[x]?(Ca.dot(d[x].normal)<=r&&(f.push(C.x,C.y,C.z),f.push(R.x,R.y,R.z)),d[x]=null):U in d||(d[U]={index0:c[T],index1:c[b],normal:Ca.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:m}=d[g];pr.fromBufferAttribute(o,_),mr.fromBufferAttribute(o,m),f.push(pr.x,pr.y,pr.z),f.push(mr.x,mr.y,mr.z)}this.setAttribute("position",new _t(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class In{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const u=n[s],d=n[s+1]-u,f=(a-u)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ee:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,s=[],r=[],a=[],o=new L,l=new vt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),h<=c&&(c=h,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(je(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class fl extends In{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ee){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*u-f*h+this.aX,c=d*h+f*u+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class dp extends fl{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function pl(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let d=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,f*=u,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const _r=new L,Ra=new pl,Pa=new pl,La=new pl;class fp extends In{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(_r.subVectors(s[0],s[1]).add(s[0]),c=_r);const h=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(_r.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=_r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),f),_=Math.pow(h.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ra.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,g,_,m),Pa.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,g,_,m),La.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Ra.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),Pa.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),La.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return n.set(Ra.calc(l),Pa.calc(l),La.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function pc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function pp(i,e){const t=1-i;return t*t*e}function mp(i,e){return 2*(1-i)*i*e}function gp(i,e){return i*i*e}function Ms(i,e,t,n){return pp(i,e)+mp(i,t)+gp(i,n)}function _p(i,e){const t=1-i;return t*t*t*e}function vp(i,e){const t=1-i;return 3*t*t*i*e}function xp(i,e){return 3*(1-i)*i*i*e}function yp(i,e){return i*i*i*e}function bs(i,e,t,n,s){return _p(i,e)+vp(i,t)+xp(i,n)+yp(i,s)}class Hu extends In{constructor(e=new ee,t=new ee,n=new ee,s=new ee){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new ee){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(bs(e,s.x,r.x,a.x,o.x),bs(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sp extends In{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(bs(e,s.x,r.x,a.x,o.x),bs(e,s.y,r.y,a.y,o.y),bs(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Wu extends In{constructor(e=new ee,t=new ee){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ee){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ee){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Mp extends In{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xu extends In{constructor(e=new ee,t=new ee,n=new ee){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ee){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ms(e,s.x,r.x,a.x),Ms(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bp extends In{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Ms(e,s.x,r.x,a.x),Ms(e,s.y,r.y,a.y),Ms(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qu extends In{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ee){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return n.set(pc(o,l.x,c.x,u.x,h.x),pc(o,l.y,c.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new ee().fromArray(s))}return this}}var zo=Object.freeze({__proto__:null,ArcCurve:dp,CatmullRomCurve3:fp,CubicBezierCurve:Hu,CubicBezierCurve3:Sp,EllipseCurve:fl,LineCurve:Wu,LineCurve3:Mp,QuadraticBezierCurve:Xu,QuadraticBezierCurve3:bp,SplineCurve:qu});class Ep extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new zo[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(t.push(u),n=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new zo[s.type]().fromJSON(s))}return this}}class Vo extends Ep{constructor(e){super(),this.type="Path",this.currentPoint=new ee,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Wu(this.currentPoint.clone(),new ee(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Xu(this.currentPoint.clone(),new ee(e,t),new ee(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Hu(this.currentPoint.clone(),new ee(e,t),new ee(n,s),new ee(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new qu(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){const c=new fl(e,t,n,s,r,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Yr extends Vo{constructor(e){super(e),this.uuid=Hn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Vo().fromJSON(s))}return this}}function Tp(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Yu(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Pp(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let u=o,h=l;for(let d=t;d<s;d+=t){const f=i[d],g=i[d+1];f<o&&(o=f),g<l&&(l=g),f>u&&(u=f),g>h&&(h=g)}c=Math.max(u-o,h-l),c=c!==0?32767/c:0}return Ps(r,a,t,o,l,c,0),a}function Yu(i,e,t,n,s){let r;if(s===Vp(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=mc(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=mc(a/n|0,i[a],i[a+1],r);return r&&is(r,r.next)&&(Ds(r),r=r.next),r}function Mi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(is(t,t.next)||yt(t.prev,t,t.next)===0)){if(Ds(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Ps(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Np(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Ap(i,n,s,r):wp(i)){e.push(l.i,i.i,c.i),Ds(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Cp(Mi(i),e),Ps(i,e,t,n,s,r,2)):a===2&&Rp(i,e,t,n,s,r):Ps(Mi(i),e,t,n,s,r,1);break}}}function wp(i){const e=i.prev,t=i,n=i.next;if(yt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,u=Math.min(s,r,a),h=Math.min(o,l,c),d=Math.max(s,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=h&&g.y<=f&&vs(s,o,r,l,a,c,g.x,g.y)&&yt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Ap(i,e,t,n){const s=i.prev,r=i,a=i.next;if(yt(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(u,h,d),_=Math.max(o,l,c),m=Math.max(u,h,d),p=Go(f,g,e,t,n),T=Go(_,m,e,t,n);let b=i.prevZ,M=i.nextZ;for(;b&&b.z>=p&&M&&M.z<=T;){if(b.x>=f&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==a&&vs(o,u,l,h,c,d,b.x,b.y)&&yt(b.prev,b,b.next)>=0||(b=b.prevZ,M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&vs(o,u,l,h,c,d,M.x,M.y)&&yt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==a&&vs(o,u,l,h,c,d,b.x,b.y)&&yt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;M&&M.z<=T;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&vs(o,u,l,h,c,d,M.x,M.y)&&yt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Cp(i,e){let t=i;do{const n=t.prev,s=t.next.next;!is(n,s)&&ju(n,t,t.next,s)&&Ls(n,s)&&Ls(s,n)&&(e.push(n.i,t.i,s.i),Ds(t),Ds(t.next),t=i=s),t=t.next}while(t!==i);return Mi(t)}function Rp(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Bp(a,o)){let l=Ku(a,o);a=Mi(a,a.next),l=Mi(l,l.next),Ps(a,e,t,n,s,r,0),Ps(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Pp(i,e,t,n){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=Yu(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Op(c))}s.sort(Lp);for(let r=0;r<s.length;r++)t=Dp(s[r],t);return t}function Lp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Dp(i,e){const t=Ip(i,e);if(!t)return e;const n=Ku(t,i);return Mi(n,n.next),Mi(t,t.next)}function Ip(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,a;if(is(i,t))return t;do{if(is(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const h=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=n&&h>r&&(r=h,a=t.x<t.next.x?t:t.next,h===n))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,l=a.x,c=a.y;let u=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&$u(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){const h=Math.abs(s-t.y)/(n-t.x);Ls(t,i)&&(h<u||h===u&&(t.x>a.x||t.x===a.x&&Up(a,t)))&&(a=t,u=h)}t=t.next}while(t!==o);return a}function Up(i,e){return yt(i.prev,i,e.prev)<0&&yt(e.next,i,i.next)<0}function Np(i,e,t,n){let s=i;do s.z===0&&(s.z=Go(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Fp(s)}function Fp(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Go(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Op(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function $u(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function vs(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&$u(i,e,t,n,s,r,a,o)}function Bp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!kp(i,e)&&(Ls(i,e)&&Ls(e,i)&&zp(i,e)&&(yt(i.prev,i,e.prev)||yt(i,e.prev,e))||is(i,e)&&yt(i.prev,i,i.next)>0&&yt(e.prev,e,e.next)>0)}function yt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function is(i,e){return i.x===e.x&&i.y===e.y}function ju(i,e,t,n){const s=xr(yt(i,e,t)),r=xr(yt(i,e,n)),a=xr(yt(t,n,i)),o=xr(yt(t,n,e));return!!(s!==r&&a!==o||s===0&&vr(i,t,e)||r===0&&vr(i,n,e)||a===0&&vr(t,i,n)||o===0&&vr(t,e,n))}function vr(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function xr(i){return i>0?1:i<0?-1:0}function kp(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ju(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ls(i,e){return yt(i.prev,i,i.next)<0?yt(i,e,i.next)>=0&&yt(i,i.prev,e)>=0:yt(i,e,i.prev)<0||yt(i,i.next,e)<0}function zp(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Ku(i,e){const t=Ho(i.i,i.x,i.y),n=Ho(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function mc(i,e,t,n){const s=Ho(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ds(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Ho(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vp(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Gp{static triangulate(e,t,n=2){return Tp(e,t,n)}}class wn{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return wn.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];gc(e),_c(n,e);let a=e.length;t.forEach(gc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,_c(n,t[l]);const o=Gp.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function gc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function _c(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Es extends wt{constructor(e=new Yr([new ee(.5,.5),new ee(-.5,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new _t(s,3)),this.setAttribute("uv",new _t(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:Hp;let b,M=!1,w,C,R,U;if(p){b=p.getSpacedPoints(u),M=!0,d=!1;const K=p.isCatmullRomCurve3?p.closed:!1;w=p.computeFrenetFrames(u,K),C=new L,R=new L,U=new L}d||(m=0,f=0,g=0,_=0);const x=o.extractPoints(c);let y=x.shape;const P=x.holes;if(!wn.isClockWise(y)){y=y.reverse();for(let K=0,ie=P.length;K<ie;K++){const Z=P[K];wn.isClockWise(Z)&&(P[K]=Z.reverse())}}function B(K){const Z=10000000000000001e-36;let _e=K[0];for(let A=1;A<=K.length;A++){const De=A%K.length,ye=K[De],Fe=ye.x-_e.x,oe=ye.y-_e.y,E=Fe*Fe+oe*oe,v=Math.max(Math.abs(ye.x),Math.abs(ye.y),Math.abs(_e.x),Math.abs(_e.y)),I=Z*v*v;if(E<=I){K.splice(De,1),A--;continue}_e=ye}}B(y),P.forEach(B);const X=P.length,V=y;for(let K=0;K<X;K++){const ie=P[K];y=y.concat(ie)}function H(K,ie,Z){return ie||Qe("ExtrudeGeometry: vec does not exist"),K.clone().addScaledVector(ie,Z)}const k=y.length;function J(K,ie,Z){let _e,A,De;const ye=K.x-ie.x,Fe=K.y-ie.y,oe=Z.x-K.x,E=Z.y-K.y,v=ye*ye+Fe*Fe,I=ye*E-Fe*oe;if(Math.abs(I)>Number.EPSILON){const W=Math.sqrt(v),$=Math.sqrt(oe*oe+E*E),q=ie.x-Fe/W,Ce=ie.y+ye/W,le=Z.x-E/$,we=Z.y+oe/$,Oe=((le-q)*E-(we-Ce)*oe)/(ye*E-Fe*oe);_e=q+ye*Oe-K.x,A=Ce+Fe*Oe-K.y;const ne=_e*_e+A*A;if(ne<=2)return new ee(_e,A);De=Math.sqrt(ne/2)}else{let W=!1;ye>Number.EPSILON?oe>Number.EPSILON&&(W=!0):ye<-Number.EPSILON?oe<-Number.EPSILON&&(W=!0):Math.sign(Fe)===Math.sign(E)&&(W=!0),W?(_e=-Fe,A=ye,De=Math.sqrt(v)):(_e=ye,A=Fe,De=Math.sqrt(v/2))}return new ee(_e/De,A/De)}const me=[];for(let K=0,ie=V.length,Z=ie-1,_e=K+1;K<ie;K++,Z++,_e++)Z===ie&&(Z=0),_e===ie&&(_e=0),me[K]=J(V[K],V[Z],V[_e]);const ce=[];let de,Ge=me.concat();for(let K=0,ie=X;K<ie;K++){const Z=P[K];de=[];for(let _e=0,A=Z.length,De=A-1,ye=_e+1;_e<A;_e++,De++,ye++)De===A&&(De=0),ye===A&&(ye=0),de[_e]=J(Z[_e],Z[De],Z[ye]);ce.push(de),Ge=Ge.concat(de)}let ze;if(m===0)ze=wn.triangulateShape(V,P);else{const K=[],ie=[];for(let Z=0;Z<m;Z++){const _e=Z/m,A=f*Math.cos(_e*Math.PI/2),De=g*Math.sin(_e*Math.PI/2)+_;for(let ye=0,Fe=V.length;ye<Fe;ye++){const oe=H(V[ye],me[ye],De);Ne(oe.x,oe.y,-A),_e===0&&K.push(oe)}for(let ye=0,Fe=X;ye<Fe;ye++){const oe=P[ye];de=ce[ye];const E=[];for(let v=0,I=oe.length;v<I;v++){const W=H(oe[v],de[v],De);Ne(W.x,W.y,-A),_e===0&&E.push(W)}_e===0&&ie.push(E)}}ze=wn.triangulateShape(K,ie)}const at=ze.length,ot=g+_;for(let K=0;K<k;K++){const ie=d?H(y[K],Ge[K],ot):y[K];M?(R.copy(w.normals[0]).multiplyScalar(ie.x),C.copy(w.binormals[0]).multiplyScalar(ie.y),U.copy(b[0]).add(R).add(C),Ne(U.x,U.y,U.z)):Ne(ie.x,ie.y,0)}for(let K=1;K<=u;K++)for(let ie=0;ie<k;ie++){const Z=d?H(y[ie],Ge[ie],ot):y[ie];M?(R.copy(w.normals[K]).multiplyScalar(Z.x),C.copy(w.binormals[K]).multiplyScalar(Z.y),U.copy(b[K]).add(R).add(C),Ne(U.x,U.y,U.z)):Ne(Z.x,Z.y,h/u*K)}for(let K=m-1;K>=0;K--){const ie=K/m,Z=f*Math.cos(ie*Math.PI/2),_e=g*Math.sin(ie*Math.PI/2)+_;for(let A=0,De=V.length;A<De;A++){const ye=H(V[A],me[A],_e);Ne(ye.x,ye.y,h+Z)}for(let A=0,De=P.length;A<De;A++){const ye=P[A];de=ce[A];for(let Fe=0,oe=ye.length;Fe<oe;Fe++){const E=H(ye[Fe],de[Fe],_e);M?Ne(E.x,E.y+b[u-1].y,b[u-1].x+Z):Ne(E.x,E.y,h+Z)}}}Y(),Q();function Y(){const K=s.length/3;if(d){let ie=0,Z=k*ie;for(let _e=0;_e<at;_e++){const A=ze[_e];Ee(A[2]+Z,A[1]+Z,A[0]+Z)}ie=u+m*2,Z=k*ie;for(let _e=0;_e<at;_e++){const A=ze[_e];Ee(A[0]+Z,A[1]+Z,A[2]+Z)}}else{for(let ie=0;ie<at;ie++){const Z=ze[ie];Ee(Z[2],Z[1],Z[0])}for(let ie=0;ie<at;ie++){const Z=ze[ie];Ee(Z[0]+k*u,Z[1]+k*u,Z[2]+k*u)}}n.addGroup(K,s.length/3-K,0)}function Q(){const K=s.length/3;let ie=0;Me(V,ie),ie+=V.length;for(let Z=0,_e=P.length;Z<_e;Z++){const A=P[Z];Me(A,ie),ie+=A.length}n.addGroup(K,s.length/3-K,1)}function Me(K,ie){let Z=K.length;for(;--Z>=0;){const _e=Z;let A=Z-1;A<0&&(A=K.length-1);for(let De=0,ye=u+m*2;De<ye;De++){const Fe=k*De,oe=k*(De+1),E=ie+_e+Fe,v=ie+A+Fe,I=ie+A+oe,W=ie+_e+oe;Je(E,v,I,W)}}}function Ne(K,ie,Z){l.push(K),l.push(ie),l.push(Z)}function Ee(K,ie,Z){lt(K),lt(ie),lt(Z);const _e=s.length/3,A=T.generateTopUV(n,s,_e-3,_e-2,_e-1);He(A[0]),He(A[1]),He(A[2])}function Je(K,ie,Z,_e){lt(K),lt(ie),lt(_e),lt(ie),lt(Z),lt(_e);const A=s.length/3,De=T.generateSideWallUV(n,s,A-6,A-3,A-2,A-1);He(De[0]),He(De[1]),He(De[3]),He(De[1]),He(De[2]),He(De[3])}function lt(K){s.push(l[K*3+0]),s.push(l[K*3+1]),s.push(l[K*3+2])}function He(K){r.push(K.x),r.push(K.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Wp(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new zo[s.type]().fromJSON(s)),new Es(n,e.options)}}const Hp={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],u=e[s*3+1];return[new ee(r,a),new ee(o,l),new ee(c,u)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],u=e[n*3+1],h=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ee(a,1-l),new ee(c,1-h),new ee(d,1-g),new ee(_,1-p)]:[new ee(o,1-l),new ee(u,1-h),new ee(f,1-g),new ee(m,1-p)]}};function Wp(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ks extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const T=p*d-a;for(let b=0;b<c;b++){const M=b*h-r;g.push(M,-T,0),_.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const b=T+c*p,M=T+c*(p+1),w=T+1+c*(p+1),C=T+1+c*p;f.push(b,M,C),f.push(M,w,C)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(_,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vr extends wt{constructor(e=new Yr([new ee(0,.5),new ee(-.5,-.5),new ee(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new _t(s,3)),this.setAttribute("normal",new _t(r,3)),this.setAttribute("uv",new _t(a,2));function c(u){const h=s.length/3,d=u.extractPoints(t);let f=d.shape;const g=d.holes;wn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const T=g[m];wn.isClockWise(T)===!0&&(g[m]=T.reverse())}const _=wn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const T=g[m];f=f.concat(T)}for(let m=0,p=f.length;m<p;m++){const T=f[m];s.push(T.x,T.y,0),r.push(0,0,1),a.push(T.x,T.y)}for(let m=0,p=_.length;m<p;m++){const T=_[m],b=T[0]+h,M=T[1]+h,w=T[2]+h;n.push(b,M,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Xp(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Vr(n,e.curveSegments)}}function Xp(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class ml extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new L,d=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const T=[],b=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&l===Math.PI&&(M=-.5/t);for(let w=0;w<=t;w++){const C=w/t;h.x=-e*Math.cos(s+C*r)*Math.sin(a+b*o),h.y=e*Math.cos(a+b*o),h.z=e*Math.sin(s+C*r)*Math.sin(a+b*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(C+M,1-b),T.push(c++)}u.push(T)}for(let p=0;p<n;p++)for(let T=0;T<t;T++){const b=u[p][T+1],M=u[p][T],w=u[p+1][T],C=u[p+1][T+1];(p!==0||a>0)&&f.push(b,M,C),(p!==n-1||l<Math.PI)&&f.push(M,w,C)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(_,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ml(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qp extends Dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class gl extends wi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cu,this.normalScale=new ee(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yp extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $p extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Zu extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class jp extends Zu{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Da=new vt,vc=new L,xc=new L;class Kp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ee(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ul,this._frameExtents=new ee(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;vc.setFromMatrixPosition(e.matrixWorld),t.position.copy(vc),xc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xc),t.updateMatrixWorld(),Da.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class _l extends Ou{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Zp extends Kp{constructor(){super(new _l(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Jp extends Zu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Zp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Qp extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class yc{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class em extends ko{constructor(e=10,t=10,n=4473924,s=8947848){n=new qe(n),s=new qe(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,f=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const _=d===r?n:s;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}const u=new wt;u.setAttribute("position",new _t(l,3)),u.setAttribute("color",new _t(c,3));const h=new $i({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class tm extends Ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){ke("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Sc(i,e,t,n){const s=nm(n);switch(t){case Tu:return i*e;case Au:return i*e/s.components*s.byteLength;case il:return i*e/s.components*s.byteLength;case es:return i*e*2/s.components*s.byteLength;case sl:return i*e*2/s.components*s.byteLength;case wu:return i*e*3/s.components*s.byteLength;case gn:return i*e*4/s.components*s.byteLength;case rl:return i*e*4/s.components*s.byteLength;case Cr:case Rr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pr:case Lr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ro:case oo:return Math.max(i,16)*Math.max(e,8)/4;case so:case ao:return Math.max(i,8)*Math.max(e,8)/2;case lo:case co:case ho:case fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case uo:case po:case mo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case go:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case _o:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case vo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case xo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case yo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case So:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Eo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case To:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case wo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ao:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Co:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ro:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Po:case Lo:case Do:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Io:case Uo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case No:case Fo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nm(i){switch(i){case nn:case Su:return{byteLength:1,components:1};case ws:case Mu:case Xn:return{byteLength:2,components:1};case tl:case nl:return{byteLength:2,components:4};case Pn:case el:case En:return{byteLength:4,components:1};case bu:case Eu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);function Ju(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function im(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<h.length;f++){const g=h[d],_=h[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,h[d]=_)}h.length=d+1;for(let f=0,g=h.length;f<g;f++){const _=h[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var sm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,am=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,om=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,um=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,fm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_m=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Am=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Im=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Um="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Om=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,km=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$m=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Km=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,t0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,s0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,r0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,a0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,o0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,h0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,f0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,M0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,b0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,w0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,A0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,R0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,D0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,I0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,B0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,G0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,H0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,X0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,j0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ig=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ag=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ug=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_g=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Mg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Eg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ig=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ng=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:sm,alphahash_pars_fragment:rm,alphamap_fragment:am,alphamap_pars_fragment:om,alphatest_fragment:lm,alphatest_pars_fragment:cm,aomap_fragment:um,aomap_pars_fragment:hm,batching_pars_vertex:dm,batching_vertex:fm,begin_vertex:pm,beginnormal_vertex:mm,bsdfs:gm,iridescence_fragment:_m,bumpmap_pars_fragment:vm,clipping_planes_fragment:xm,clipping_planes_pars_fragment:ym,clipping_planes_pars_vertex:Sm,clipping_planes_vertex:Mm,color_fragment:bm,color_pars_fragment:Em,color_pars_vertex:Tm,color_vertex:wm,common:Am,cube_uv_reflection_fragment:Cm,defaultnormal_vertex:Rm,displacementmap_pars_vertex:Pm,displacementmap_vertex:Lm,emissivemap_fragment:Dm,emissivemap_pars_fragment:Im,colorspace_fragment:Um,colorspace_pars_fragment:Nm,envmap_fragment:Fm,envmap_common_pars_fragment:Om,envmap_pars_fragment:Bm,envmap_pars_vertex:km,envmap_physical_pars_fragment:Km,envmap_vertex:zm,fog_vertex:Vm,fog_pars_vertex:Gm,fog_fragment:Hm,fog_pars_fragment:Wm,gradientmap_pars_fragment:Xm,lightmap_pars_fragment:qm,lights_lambert_fragment:Ym,lights_lambert_pars_fragment:$m,lights_pars_begin:jm,lights_toon_fragment:Zm,lights_toon_pars_fragment:Jm,lights_phong_fragment:Qm,lights_phong_pars_fragment:e0,lights_physical_fragment:t0,lights_physical_pars_fragment:n0,lights_fragment_begin:i0,lights_fragment_maps:s0,lights_fragment_end:r0,logdepthbuf_fragment:a0,logdepthbuf_pars_fragment:o0,logdepthbuf_pars_vertex:l0,logdepthbuf_vertex:c0,map_fragment:u0,map_pars_fragment:h0,map_particle_fragment:d0,map_particle_pars_fragment:f0,metalnessmap_fragment:p0,metalnessmap_pars_fragment:m0,morphinstance_vertex:g0,morphcolor_vertex:_0,morphnormal_vertex:v0,morphtarget_pars_vertex:x0,morphtarget_vertex:y0,normal_fragment_begin:S0,normal_fragment_maps:M0,normal_pars_fragment:b0,normal_pars_vertex:E0,normal_vertex:T0,normalmap_pars_fragment:w0,clearcoat_normal_fragment_begin:A0,clearcoat_normal_fragment_maps:C0,clearcoat_pars_fragment:R0,iridescence_pars_fragment:P0,opaque_fragment:L0,packing:D0,premultiplied_alpha_fragment:I0,project_vertex:U0,dithering_fragment:N0,dithering_pars_fragment:F0,roughnessmap_fragment:O0,roughnessmap_pars_fragment:B0,shadowmap_pars_fragment:k0,shadowmap_pars_vertex:z0,shadowmap_vertex:V0,shadowmask_pars_fragment:G0,skinbase_vertex:H0,skinning_pars_vertex:W0,skinning_vertex:X0,skinnormal_vertex:q0,specularmap_fragment:Y0,specularmap_pars_fragment:$0,tonemapping_fragment:j0,tonemapping_pars_fragment:K0,transmission_fragment:Z0,transmission_pars_fragment:J0,uv_pars_fragment:Q0,uv_pars_vertex:eg,uv_vertex:tg,worldpos_vertex:ng,background_vert:ig,background_frag:sg,backgroundCube_vert:rg,backgroundCube_frag:ag,cube_vert:og,cube_frag:lg,depth_vert:cg,depth_frag:ug,distance_vert:hg,distance_frag:dg,equirect_vert:fg,equirect_frag:pg,linedashed_vert:mg,linedashed_frag:gg,meshbasic_vert:_g,meshbasic_frag:vg,meshlambert_vert:xg,meshlambert_frag:yg,meshmatcap_vert:Sg,meshmatcap_frag:Mg,meshnormal_vert:bg,meshnormal_frag:Eg,meshphong_vert:Tg,meshphong_frag:wg,meshphysical_vert:Ag,meshphysical_frag:Cg,meshtoon_vert:Rg,meshtoon_frag:Pg,points_vert:Lg,points_frag:Dg,shadow_vert:Ig,shadow_frag:Ug,sprite_vert:Ng,sprite_frag:Fg},ge={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ee(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ee(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Mn={basic:{uniforms:Gt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:Gt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:Gt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:Gt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:Gt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:Gt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:Gt([ge.points,ge.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:Gt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:Gt([ge.common,ge.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:Gt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:Gt([ge.sprite,ge.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distance:{uniforms:Gt([ge.common,ge.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distance_vert,fragmentShader:Ye.distance_frag},shadow:{uniforms:Gt([ge.lights,ge.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};Mn.physical={uniforms:Gt([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ee(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ee},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ee},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const yr={r:0,b:0,g:0},di=new Ln,Og=new vt;function Bg(i,e,t,n,s,r,a){const o=new qe(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function g(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?t:e).get(M)),M}function _(b){let M=!1;const w=g(b);w===null?p(o,l):w&&w.isColor&&(p(w,1),M=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,M){const w=g(M);w&&(w.isCubeTexture||w.mapping===Xr)?(u===void 0&&(u=new ft(new cn(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:ns(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,R,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),di.copy(M.backgroundRotation),di.x*=-1,di.y*=-1,di.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Og.makeRotationFromEuler(di)),u.material.toneMapped=et.getTransfer(w.colorSpace)!==rt,(h!==w||d!==w.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=w,d=w.version,f=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new ft(new ks(2,2),new Dn({name:"BackgroundMaterial",uniforms:ns(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=et.getTransfer(w.colorSpace)!==rt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||d!==w.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=w,d=w.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,M){b.getRGB(yr,Fu(i)),n.buffers.color.setClear(yr.r,yr.g,yr.b,M,a)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,M=1){o.set(b),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:_,addToRenderList:m,dispose:T}}function kg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(y,P,F,B,X){let V=!1;const H=h(B,F,P);r!==H&&(r=H,c(r.object)),V=f(y,B,F,X),V&&g(y,B,F,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,M(y,P,F,B),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function h(y,P,F){const B=F.wireframe===!0;let X=n[y.id];X===void 0&&(X={},n[y.id]=X);let V=X[P.id];V===void 0&&(V={},X[P.id]=V);let H=V[B];return H===void 0&&(H=d(l()),V[B]=H),H}function d(y){const P=[],F=[],B=[];for(let X=0;X<t;X++)P[X]=0,F[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:B,object:y,attributes:{},index:null}}function f(y,P,F,B){const X=r.attributes,V=P.attributes;let H=0;const k=F.getAttributes();for(const J in k)if(k[J].location>=0){const ce=X[J];let de=V[J];if(de===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(de=y.instanceColor)),ce===void 0||ce.attribute!==de||de&&ce.data!==de.data)return!0;H++}return r.attributesNum!==H||r.index!==B}function g(y,P,F,B){const X={},V=P.attributes;let H=0;const k=F.getAttributes();for(const J in k)if(k[J].location>=0){let ce=V[J];ce===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor));const de={};de.attribute=ce,ce&&ce.data&&(de.data=ce.data),X[J]=de,H++}r.attributes=X,r.attributesNum=H,r.index=B}function _(){const y=r.newAttributes;for(let P=0,F=y.length;P<F;P++)y[P]=0}function m(y){p(y,0)}function p(y,P){const F=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;F[y]=1,B[y]===0&&(i.enableVertexAttribArray(y),B[y]=1),X[y]!==P&&(i.vertexAttribDivisor(y,P),X[y]=P)}function T(){const y=r.newAttributes,P=r.enabledAttributes;for(let F=0,B=P.length;F<B;F++)P[F]!==y[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function b(y,P,F,B,X,V,H){H===!0?i.vertexAttribIPointer(y,P,F,X,V):i.vertexAttribPointer(y,P,F,B,X,V)}function M(y,P,F,B){_();const X=B.attributes,V=F.getAttributes(),H=P.defaultAttributeValues;for(const k in V){const J=V[k];if(J.location>=0){let me=X[k];if(me===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(me=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(me=y.instanceColor)),me!==void 0){const ce=me.normalized,de=me.itemSize,Ge=e.get(me);if(Ge===void 0)continue;const ze=Ge.buffer,at=Ge.type,ot=Ge.bytesPerElement,Y=at===i.INT||at===i.UNSIGNED_INT||me.gpuType===el;if(me.isInterleavedBufferAttribute){const Q=me.data,Me=Q.stride,Ne=me.offset;if(Q.isInstancedInterleavedBuffer){for(let Ee=0;Ee<J.locationSize;Ee++)p(J.location+Ee,Q.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Ee=0;Ee<J.locationSize;Ee++)m(J.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,ze);for(let Ee=0;Ee<J.locationSize;Ee++)b(J.location+Ee,de/J.locationSize,at,ce,Me*ot,(Ne+de/J.locationSize*Ee)*ot,Y)}else{if(me.isInstancedBufferAttribute){for(let Q=0;Q<J.locationSize;Q++)p(J.location+Q,me.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Q=0;Q<J.locationSize;Q++)m(J.location+Q);i.bindBuffer(i.ARRAY_BUFFER,ze);for(let Q=0;Q<J.locationSize;Q++)b(J.location+Q,de/J.locationSize,at,ce,de*ot,de/J.locationSize*Q*ot,Y)}}else if(H!==void 0){const ce=H[k];if(ce!==void 0)switch(ce.length){case 2:i.vertexAttrib2fv(J.location,ce);break;case 3:i.vertexAttrib3fv(J.location,ce);break;case 4:i.vertexAttrib4fv(J.location,ce);break;default:i.vertexAttrib1fv(J.location,ce)}}}}T()}function w(){U();for(const y in n){const P=n[y];for(const F in P){const B=P[F];for(const X in B)u(B[X].object),delete B[X];delete P[F]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const F in P){const B=P[F];for(const X in B)u(B[X].object),delete B[X];delete P[F]}delete n[y.id]}function R(y){for(const P in n){const F=n[P];if(F[y.id]===void 0)continue;const B=F[y.id];for(const X in B)u(B[X].object),delete B[X];delete F[y.id]}}function U(){x(),a=!0,r!==s&&(r=s,c(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:x,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:T}}function zg(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let g=0;g<h;g++)f+=u[g];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Vg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==gn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==nn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==En&&!U)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(ke("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),C=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:b,maxFragmentUniforms:M,maxSamples:w,samples:C}}function Gg(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Qn,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const T=r?0:n,b=T*4;let M=p.clippingState||null;l.value=M,M=u(g,d,b,f);for(let w=0;w!==b;++w)M[w]=t[w];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,M=f;b!==_;++b,M+=4)a.copy(h[b]).applyMatrix4(T,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Hg(i){let e=new WeakMap;function t(a,o){return o===eo?a.mapping=yi:o===to&&(a.mapping=Qi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===eo||o===to)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ku(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const ti=4,Mc=[.125,.215,.35,.446,.526,.582],mi=20,Wg=256,ps=new _l,bc=new qe;let Ia=null,Ua=0,Na=0,Fa=!1;const Xg=new L;class Ec{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Xg}=r;Ia=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,Ua,Na),this._renderer.xr.enabled=Fa,e.scissorTest=!1,Xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yi||e.mapping===Qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Xn,format:gn,colorSpace:ts,depthBuffer:!1},s=Tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tc(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=qg(r)),this._blurMaterial=$g(r,e,t),this._ggxMaterial=Yg(r,e,t)}return s}_compileMaterial(e){const t=new ft(new wt,e);this._renderer.compile(t,ps)}_sceneToCubeUV(e,t,n,s,r){const l=new un(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(bc),h.toneMapping=An,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ft(new cn,new Iu({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const T=e.background;T?T.isColor&&(m.color.copy(T),e.background=null,p=!0):(m.color.copy(bc),p=!0);for(let b=0;b<6;b++){const M=b%3;M===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):M===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));const w=this._cubeSize;Xi(s,M*w,b>2?w:0,w,w),h.setRenderTarget(s),p&&h.render(_,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===yi||e.mapping===Qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Xi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ps)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:g}=this,_=this._sizeLods[n],m=3*_*(n>g-ti?n-g+ti:0),p=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Xi(r,m,p,3*_,2*_),s.setRenderTarget(r),s.render(o,ps),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Xi(e,m,p,3*_,2*_),s.setRenderTarget(e),s.render(o,ps)}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=c;const d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):mi;m>mi&&ke(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mi}`);const p=[];let T=0;for(let R=0;R<mi;++R){const U=R/_,x=Math.exp(-U*U/2);p.push(x),R===0?T+=x:R<m&&(T+=2*x)}for(let R=0;R<p.length;R++)p[R]=p[R]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const M=this._sizeLods[s],w=3*M*(s>b-ti?s-b+ti:0),C=4*(this._cubeSize-M);Xi(t,w,C,3*M,2*M),l.setRenderTarget(t),l.render(h,ps)}}function qg(i){const e=[],t=[],n=[];let s=i;const r=i-ti+1+Mc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-ti?l=Mc[a-i+ti-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,T=new Float32Array(_*g*f),b=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let C=0;C<f;C++){const R=C%3*2/3-1,U=C>2?0:-1,x=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];T.set(x,_*g*C),b.set(d,m*g*C);const y=[C,C,C,C,C,C];M.set(y,p*g*C)}const w=new wt;w.setAttribute("position",new vn(T,_)),w.setAttribute("uv",new vn(b,m)),w.setAttribute("faceIndex",new vn(M,p)),n.push(new ft(w,null)),s>ti&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Tc(i,e,t){const n=new Cn(i,e,t);return n.texture.mapping=Xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xi(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Yg(i,e,t){return new Dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Wg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$r(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function $g(i,e,t){const n=new Float32Array(mi),s=new L(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function wc(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ac(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$r(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function $r(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jg(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===eo||l===to,u=l===yi||l===Qi;if(c||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Ec(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Ec(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Kg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Cs("WebGLRenderer: "+n+" extension not supported."),s}}}function Zg(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],i.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const T=f.array;_=f.version;for(let b=0,M=T.length;b<M;b+=3){const w=T[b+0],C=T[b+1],R=T[b+2];d.push(w,C,C,R,R,w)}}else if(g!==void 0){const T=g.array;_=g.version;for(let b=0,M=T.length/3-1;b<M;b+=3){const w=b+0,C=b+1,R=b+2;d.push(w,C,C,R,R,w)}}else return;const m=new(Ru(d)?Nu:Uu)(d,1);m.version=_;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Jg(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function u(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function h(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*_[T];t.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Qg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function e_(i,e,t){const n=new WeakMap,s=new bt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let y=function(){U.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let w=o.attributes.position.count*M,C=1;w>e.maxTextureSize&&(C=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*C*4*h),U=new Pu(R,w,C,h);U.type=En,U.needsUpdate=!0;const x=M*4;for(let P=0;P<h;P++){const F=p[P],B=T[P],X=b[P],V=w*C*4*P;for(let H=0;H<F.count;H++){const k=H*x;g===!0&&(s.fromBufferAttribute(F,H),R[V+k+0]=s.x,R[V+k+1]=s.y,R[V+k+2]=s.z,R[V+k+3]=0),_===!0&&(s.fromBufferAttribute(B,H),R[V+k+4]=s.x,R[V+k+5]=s.y,R[V+k+6]=s.z,R[V+k+7]=0),m===!0&&(s.fromBufferAttribute(X,H),R[V+k+8]=s.x,R[V+k+9]=s.y,R[V+k+10]=s.z,R[V+k+11]=X.itemSize===4?s.w:1)}}d={count:h,texture:U,size:new ee(w,C)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function t_(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const n_={[fu]:"LINEAR_TONE_MAPPING",[pu]:"REINHARD_TONE_MAPPING",[mu]:"CINEON_TONE_MAPPING",[gu]:"ACES_FILMIC_TONE_MAPPING",[vu]:"AGX_TONE_MAPPING",[xu]:"NEUTRAL_TONE_MAPPING",[_u]:"CUSTOM_TONE_MAPPING"};function i_(i,e,t,n,s){const r=new Cn(e,t,{type:i,depthBuffer:n,stencilBuffer:s}),a=new Cn(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),o=new wt;o.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new _t([0,2,0,0,2,0],2));const l=new qp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new ft(o,l),u=new _l(-1,1,1,-1,0,1);let h=null,d=null,f=!1,g,_=null,m=[],p=!1;this.setSize=function(T,b){r.setSize(T,b),a.setSize(T,b);for(let M=0;M<m.length;M++){const w=m[M];w.setSize&&w.setSize(T,b)}},this.setEffects=function(T){m=T,p=m.length>0&&m[0].isRenderPass===!0;const b=r.width,M=r.height;for(let w=0;w<m.length;w++){const C=m[w];C.setSize&&C.setSize(b,M)}},this.begin=function(T,b){if(f||T.toneMapping===An&&m.length===0)return!1;if(_=b,b!==null){const M=b.width,w=b.height;(r.width!==M||r.height!==w)&&this.setSize(M,w)}return p===!1&&T.setRenderTarget(r),g=T.toneMapping,T.toneMapping=An,!0},this.hasRenderPass=function(){return p},this.end=function(T,b){T.toneMapping=g,f=!0;let M=r,w=a;for(let C=0;C<m.length;C++){const R=m[C];if(R.enabled!==!1&&(R.render(T,w,M,b),R.needsSwap!==!1)){const U=M;M=w,w=U}}if(h!==T.outputColorSpace||d!==T.toneMapping){h=T.outputColorSpace,d=T.toneMapping,l.defines={},et.getTransfer(h)===rt&&(l.defines.SRGB_TRANSFER="");const C=n_[d];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,T.setRenderTarget(_),T.render(c,u),_=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Qu=new kt,Wo=new Rs(1,1),eh=new Pu,th=new Bf,nh=new Bu,Cc=[],Rc=[],Pc=new Float32Array(16),Lc=new Float32Array(9),Dc=new Float32Array(4);function ss(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Cc[s];if(r===void 0&&(r=new Float32Array(s),Cc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Rt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jr(i,e){let t=Rc[e];t===void 0&&(t=new Int32Array(e),Rc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function s_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function r_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function a_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Rt(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function o_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function l_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Dc.set(n),i.uniformMatrix2fv(this.addr,!1,Dc),Pt(t,n)}}function c_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Lc.set(n),i.uniformMatrix3fv(this.addr,!1,Lc),Pt(t,n)}}function u_(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Rt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Rt(t,n))return;Pc.set(n),i.uniformMatrix4fv(this.addr,!1,Pc),Pt(t,n)}}function h_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function d_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function f_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function p_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function m_(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function g_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Rt(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function __(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Rt(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function v_(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Rt(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function x_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wo.compareFunction=t.isReversedDepthBuffer()?ol:al,r=Wo):r=Qu,t.setTexture2D(e||r,s)}function y_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||th,s)}function S_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||nh,s)}function M_(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||eh,s)}function b_(i){switch(i){case 5126:return s_;case 35664:return r_;case 35665:return a_;case 35666:return o_;case 35674:return l_;case 35675:return c_;case 35676:return u_;case 5124:case 35670:return h_;case 35667:case 35671:return d_;case 35668:case 35672:return f_;case 35669:case 35673:return p_;case 5125:return m_;case 36294:return g_;case 36295:return __;case 36296:return v_;case 35678:case 36198:case 36298:case 36306:case 35682:return x_;case 35679:case 36299:case 36307:return y_;case 35680:case 36300:case 36308:case 36293:return S_;case 36289:case 36303:case 36311:case 36292:return M_}}function E_(i,e){i.uniform1fv(this.addr,e)}function T_(i,e){const t=ss(e,this.size,2);i.uniform2fv(this.addr,t)}function w_(i,e){const t=ss(e,this.size,3);i.uniform3fv(this.addr,t)}function A_(i,e){const t=ss(e,this.size,4);i.uniform4fv(this.addr,t)}function C_(i,e){const t=ss(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function R_(i,e){const t=ss(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function P_(i,e){const t=ss(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function L_(i,e){i.uniform1iv(this.addr,e)}function D_(i,e){i.uniform2iv(this.addr,e)}function I_(i,e){i.uniform3iv(this.addr,e)}function U_(i,e){i.uniform4iv(this.addr,e)}function N_(i,e){i.uniform1uiv(this.addr,e)}function F_(i,e){i.uniform2uiv(this.addr,e)}function O_(i,e){i.uniform3uiv(this.addr,e)}function B_(i,e){i.uniform4uiv(this.addr,e)}function k_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Wo:a=Qu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function z_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||th,r[a])}function V_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||nh,r[a])}function G_(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);Rt(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||eh,r[a])}function H_(i){switch(i){case 5126:return E_;case 35664:return T_;case 35665:return w_;case 35666:return A_;case 35674:return C_;case 35675:return R_;case 35676:return P_;case 5124:case 35670:return L_;case 35667:case 35671:return D_;case 35668:case 35672:return I_;case 35669:case 35673:return U_;case 5125:return N_;case 36294:return F_;case 36295:return O_;case 36296:return B_;case 35678:case 36198:case 36298:case 36306:case 35682:return k_;case 35679:case 36299:case 36307:return z_;case 35680:case 36300:case 36308:case 36293:return V_;case 36289:case 36303:case 36311:case 36292:return G_}}class W_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=b_(t.type)}}class X_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=H_(t.type)}}class q_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Oa=/(\w+)(\])?(\[|\.)?/g;function Ic(i,e){i.seq.push(e),i.map[e.id]=e}function Y_(i,e,t){const n=i.name,s=n.length;for(Oa.lastIndex=0;;){const r=Oa.exec(n),a=Oa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Ic(t,c===void 0?new W_(o,i,e):new X_(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new q_(o),Ic(t,h)),t=h}}}class Dr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Y_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Uc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const $_=37297;let j_=0;function K_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Nc=new Xe;function Z_(i){et._getMatrix(Nc,et.workingColorSpace,i);const e=`mat3( ${Nc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Ur:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Fc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+K_(i.getShaderSource(e),o)}else return r}function J_(i,e){const t=Z_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Q_={[fu]:"Linear",[pu]:"Reinhard",[mu]:"Cineon",[gu]:"ACESFilmic",[vu]:"AgX",[xu]:"Neutral",[_u]:"Custom"};function ev(i,e){const t=Q_[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sr=new L;function tv(){et.getLuminanceCoefficients(Sr);const i=Sr.x.toFixed(4),e=Sr.y.toFixed(4),t=Sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xs).join(`
`)}function iv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function sv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xs(i){return i!==""}function Oc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(i){return i.replace(rv,ov)}const av=new Map;function ov(i,e){let t=Ye[e];if(t===void 0){const n=av.get(e);if(n!==void 0)t=Ye[n],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Xo(t)}const lv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(i){return i.replace(lv,cv)}function cv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const uv={[Ar]:"SHADOWMAP_TYPE_PCF",[_s]:"SHADOWMAP_TYPE_VSM"};function hv(i){return uv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const dv={[yi]:"ENVMAP_TYPE_CUBE",[Qi]:"ENVMAP_TYPE_CUBE",[Xr]:"ENVMAP_TYPE_CUBE_UV"};function fv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":dv[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const pv={[Qi]:"ENVMAP_MODE_REFRACTION"};function mv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":pv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const gv={[Qo]:"ENVMAP_BLENDING_MULTIPLY",[vf]:"ENVMAP_BLENDING_MIX",[xf]:"ENVMAP_BLENDING_ADD"};function _v(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":gv[i.combine]||"ENVMAP_BLENDING_NONE"}function vv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function xv(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=hv(t),c=fv(t),u=mv(t),h=_v(t),d=vv(t),f=nv(t),g=iv(r),_=s.createProgram();let m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xs).join(`
`),p.length>0&&(p+=`
`)):(m=[zc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),p=[zc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Ye.tonemapping_pars_fragment:"",t.toneMapping!==An?ev("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,J_("linearToOutputTexel",t.outputColorSpace),tv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xs).join(`
`)),a=Xo(a),a=Oc(a,t),a=Bc(a,t),o=Xo(o),o=Oc(o,t),o=Bc(o,t),a=kc(a),o=kc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=T+m+a,M=T+p+o,w=Uc(s,s.VERTEX_SHADER,b),C=Uc(s,s.FRAGMENT_SHADER,M);s.attachShader(_,w),s.attachShader(_,C),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(P){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",B=s.getShaderInfoLog(w)||"",X=s.getShaderInfoLog(C)||"",V=F.trim(),H=B.trim(),k=X.trim();let J=!0,me=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,C);else{const ce=Fc(s,w,"vertex"),de=Fc(s,C,"fragment");Qe("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+ce+`
`+de)}else V!==""?ke("WebGLProgram: Program Info Log:",V):(H===""||k==="")&&(me=!1);me&&(P.diagnostics={runnable:J,programLog:V,vertexShader:{log:H,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(w),s.deleteShader(C),U=new Dr(s,_),x=sv(s,_)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let x;this.getAttributes=function(){return x===void 0&&R(this),x};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,$_)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=j_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=C,this}let yv=0;class Sv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Mv(e),t.set(e,n)),n}}class Mv{constructor(e){this.id=yv++,this.code=e,this.usedTimes=0}}function bv(i,e,t,n,s,r,a){const o=new Lu,l=new Sv,c=new Set,u=[],h=new Map,d=s.logarithmicDepthBuffer;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,y,P,F,B){const X=F.fog,V=B.geometry,H=x.isMeshStandardMaterial?F.environment:null,k=(x.isMeshStandardMaterial?t:e).get(x.envMap||H),J=k&&k.mapping===Xr?k.image.height:null,me=g[x.type];x.precision!==null&&(f=s.getMaxPrecision(x.precision),f!==x.precision&&ke("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const ce=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,de=ce!==void 0?ce.length:0;let Ge=0;V.morphAttributes.position!==void 0&&(Ge=1),V.morphAttributes.normal!==void 0&&(Ge=2),V.morphAttributes.color!==void 0&&(Ge=3);let ze,at,ot,Y;if(me){const it=Mn[me];ze=it.vertexShader,at=it.fragmentShader}else ze=x.vertexShader,at=x.fragmentShader,l.update(x),ot=l.getVertexShaderID(x),Y=l.getFragmentShaderID(x);const Q=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Ne=B.isInstancedMesh===!0,Ee=B.isBatchedMesh===!0,Je=!!x.map,lt=!!x.matcap,He=!!k,K=!!x.aoMap,ie=!!x.lightMap,Z=!!x.bumpMap,_e=!!x.normalMap,A=!!x.displacementMap,De=!!x.emissiveMap,ye=!!x.metalnessMap,Fe=!!x.roughnessMap,oe=x.anisotropy>0,E=x.clearcoat>0,v=x.dispersion>0,I=x.iridescence>0,W=x.sheen>0,$=x.transmission>0,q=oe&&!!x.anisotropyMap,Ce=E&&!!x.clearcoatMap,le=E&&!!x.clearcoatNormalMap,we=E&&!!x.clearcoatRoughnessMap,Oe=I&&!!x.iridescenceMap,ne=I&&!!x.iridescenceThicknessMap,fe=W&&!!x.sheenColorMap,Ae=W&&!!x.sheenRoughnessMap,Re=!!x.specularMap,he=!!x.specularColorMap,$e=!!x.specularIntensityMap,D=$&&!!x.transmissionMap,xe=$&&!!x.thicknessMap,ae=!!x.gradientMap,Se=!!x.alphaMap,se=x.alphaTest>0,j=!!x.alphaHash,ue=!!x.extensions;let Ve=An;x.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ve=i.toneMapping);const pt={shaderID:me,shaderType:x.type,shaderName:x.name,vertexShader:ze,fragmentShader:at,defines:x.defines,customVertexShaderID:ot,customFragmentShaderID:Y,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Ee,batchingColor:Ee&&B._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&B.instanceColor!==null,instancingMorph:Ne&&B.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:ts,alphaToCoverage:!!x.alphaToCoverage,map:Je,matcap:lt,envMap:He,envMapMode:He&&k.mapping,envMapCubeUVHeight:J,aoMap:K,lightMap:ie,bumpMap:Z,normalMap:_e,displacementMap:A,emissiveMap:De,normalMapObjectSpace:_e&&x.normalMapType===Mf,normalMapTangentSpace:_e&&x.normalMapType===Cu,metalnessMap:ye,roughnessMap:Fe,anisotropy:oe,anisotropyMap:q,clearcoat:E,clearcoatMap:Ce,clearcoatNormalMap:le,clearcoatRoughnessMap:we,dispersion:v,iridescence:I,iridescenceMap:Oe,iridescenceThicknessMap:ne,sheen:W,sheenColorMap:fe,sheenRoughnessMap:Ae,specularMap:Re,specularColorMap:he,specularIntensityMap:$e,transmission:$,transmissionMap:D,thicknessMap:xe,gradientMap:ae,opaque:x.transparent===!1&&x.blending===Ki&&x.alphaToCoverage===!1,alphaMap:Se,alphaTest:se,alphaHash:j,combine:x.combine,mapUv:Je&&_(x.map.channel),aoMapUv:K&&_(x.aoMap.channel),lightMapUv:ie&&_(x.lightMap.channel),bumpMapUv:Z&&_(x.bumpMap.channel),normalMapUv:_e&&_(x.normalMap.channel),displacementMapUv:A&&_(x.displacementMap.channel),emissiveMapUv:De&&_(x.emissiveMap.channel),metalnessMapUv:ye&&_(x.metalnessMap.channel),roughnessMapUv:Fe&&_(x.roughnessMap.channel),anisotropyMapUv:q&&_(x.anisotropyMap.channel),clearcoatMapUv:Ce&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(x.sheenRoughnessMap.channel),specularMapUv:Re&&_(x.specularMap.channel),specularColorMapUv:he&&_(x.specularColorMap.channel),specularIntensityMapUv:$e&&_(x.specularIntensityMap.channel),transmissionMapUv:D&&_(x.transmissionMap.channel),thicknessMapUv:xe&&_(x.thicknessMap.channel),alphaMapUv:Se&&_(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(_e||oe),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!V.attributes.uv&&(Je||Se),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Me,skinning:B.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ge,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Je&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:De&&x.emissiveMap.isVideoTexture===!0&&et.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===tn,flipSided:x.side===jt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ue&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&x.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)y.push(P),y.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(T(y,x),b(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function T(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function b(x,y){o.disableAll(),y.instancing&&o.enable(0),y.instancingColor&&o.enable(1),y.instancingMorph&&o.enable(2),y.matcap&&o.enable(3),y.envMap&&o.enable(4),y.normalMapObjectSpace&&o.enable(5),y.normalMapTangentSpace&&o.enable(6),y.clearcoat&&o.enable(7),y.iridescence&&o.enable(8),y.alphaTest&&o.enable(9),y.vertexColors&&o.enable(10),y.vertexAlphas&&o.enable(11),y.vertexUv1s&&o.enable(12),y.vertexUv2s&&o.enable(13),y.vertexUv3s&&o.enable(14),y.vertexTangents&&o.enable(15),y.anisotropy&&o.enable(16),y.alphaHash&&o.enable(17),y.batching&&o.enable(18),y.dispersion&&o.enable(19),y.batchingColor&&o.enable(20),y.gradientMap&&o.enable(21),x.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),x.push(o.mask)}function M(x){const y=g[x.type];let P;if(y){const F=Mn[y];P=Zf.clone(F.uniforms)}else P=x.uniforms;return P}function w(x,y){let P=h.get(y);return P!==void 0?++P.usedTimes:(P=new xv(i,y,x,r),u.push(P),h.set(y,P)),P}function C(x){if(--x.usedTimes===0){const y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),h.delete(x.cacheKey),x.destroy()}}function R(x){l.remove(x)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:w,releaseProgram:C,releaseShaderCache:R,programs:u,dispose:U}}function Ev(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Tv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Vc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Gc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(h,d,f,g,_,m){const p=a(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||Tv),n.length>1&&n.sort(d||Vc),s.length>1&&s.sort(d||Vc)}function u(){for(let h=e,d=i.length;h<d;h++){const f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function wv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Gc,i.set(n,[a])):s>=r.length?(a=new Gc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Av(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new qe};break;case"SpotLight":t={position:new L,direction:new L,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Cv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ee,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Rv=0;function Pv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Lv(i){const e=new Av,t=Cv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new vt,a=new vt;function o(c){let u=0,h=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,T=0,b=0,M=0,w=0,C=0,R=0;c.sort(Pv);for(let x=0,y=c.length;x<y;x++){const P=c[x],F=P.color,B=P.intensity,X=P.distance;let V=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===es?V=P.shadow.map.texture:V=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=F.r*B,h+=F.g*B,d+=F.b*B;else if(P.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(P.sh.coefficients[H],B);R++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const k=P.shadow,J=t.get(P);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.directionalShadow[f]=J,n.directionalShadowMap[f]=V,n.directionalShadowMatrix[f]=P.shadow.matrix,T++}n.directional[f]=H,f++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(F).multiplyScalar(B),H.distance=X,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,n.spot[_]=H;const k=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,k.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[_]=k.matrix,P.castShadow){const J=t.get(P);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,n.spotShadow[_]=J,n.spotShadowMap[_]=V,M++}_++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(F).multiplyScalar(B),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=H,m++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const k=P.shadow,J=t.get(P);J.shadowIntensity=k.intensity,J.shadowBias=k.bias,J.shadowNormalBias=k.normalBias,J.shadowRadius=k.radius,J.shadowMapSize=k.mapSize,J.shadowCameraNear=k.camera.near,J.shadowCameraFar=k.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=V,n.pointShadowMatrix[g]=P.shadow.matrix,b++}n.point[g]=H,g++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(B),H.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=H,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const U=n.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==T||U.numPointShadows!==b||U.numSpotShadows!==M||U.numSpotMaps!==w||U.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+w-C,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,U.directionalLength=f,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=T,U.numPointShadows=b,U.numSpotShadows=M,U.numSpotMaps=w,U.numLightProbes=R,n.version=Rv++)}function l(c,u){let h=0,d=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const b=c[p];if(b.isDirectionalLight){const M=n.directional[h];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(b.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function Hc(i){const e=new Lv(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Dv(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Hc(i),e.set(s,[o])):r>=a.length?(o=new Hc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Uv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Nv=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Fv=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Wc=new vt,ms=new L,Ba=new L;function Ov(i,e,t){let n=new ul;const s=new ee,r=new ee,a=new bt,o=new Yp,l=new $p,c={},u=t.maxTextureSize,h={[ri]:jt,[jt]:ri,[tn]:tn},d=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ee},radius:{value:4}},vertexShader:Iv,fragmentShader:Uv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new wt;g.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ft(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ar;let p=this.type;this.render=function(C,R,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;C.type===du&&(ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),C.type=Ar);const x=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Gn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=p!==this.type;B&&R.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(V=>V.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,V=C.length;X<V;X++){const H=C[X],k=H.shadow;if(k===void 0){ke("WebGLShadowMap:",H,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const J=k.getFrameExtents();if(s.multiply(J),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/J.x),s.x=r.x*J.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/J.y),s.y=r.y*J.y,k.mapSize.y=r.y)),k.map===null||B===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===_s){if(H.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Cn(s.x,s.y,{format:es,type:Xn,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),k.map.texture.name=H.name+".shadowMap",k.map.depthTexture=new Rs(s.x,s.y,En),k.map.depthTexture.name=H.name+".shadowMapDepth",k.map.depthTexture.format=qn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=It,k.map.depthTexture.magFilter=It}else{H.isPointLight?(k.map=new ku(s.x),k.map.depthTexture=new hp(s.x,Pn)):(k.map=new Cn(s.x,s.y),k.map.depthTexture=new Rs(s.x,s.y,Pn)),k.map.depthTexture.name=H.name+".shadowMap",k.map.depthTexture.format=qn;const ce=i.state.buffers.depth.getReversed();this.type===Ar?(k.map.depthTexture.compareFunction=ce?ol:al,k.map.depthTexture.minFilter=Bt,k.map.depthTexture.magFilter=Bt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=It,k.map.depthTexture.magFilter=It)}k.camera.updateProjectionMatrix()}const me=k.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<me;ce++){if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,ce),i.clear();else{ce===0&&(i.setRenderTarget(k.map),i.clear());const de=k.getViewport(ce);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),F.viewport(a)}if(H.isPointLight){const de=k.camera,Ge=k.matrix,ze=H.distance||de.far;ze!==de.far&&(de.far=ze,de.updateProjectionMatrix()),ms.setFromMatrixPosition(H.matrixWorld),de.position.copy(ms),Ba.copy(de.position),Ba.add(Nv[ce]),de.up.copy(Fv[ce]),de.lookAt(Ba),de.updateMatrixWorld(),Ge.makeTranslation(-ms.x,-ms.y,-ms.z),Wc.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Wc,de.coordinateSystem,de.reversedDepth)}else k.updateMatrices(H);n=k.getFrustum(),M(R,U,k.camera,H,this.type)}k.isPointLightShadow!==!0&&this.type===_s&&T(k,U),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(x,y,P)};function T(C,R){const U=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Cn(s.x,s.y,{format:es,type:Xn})),d.uniforms.shadow_pass.value=C.map.depthTexture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(R,null,U,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(R,null,U,f,_,null)}function b(C,R,U,x){let y=null;const P=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)y=P;else if(y=U.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=y.uuid,B=R.uuid;let X=c[F];X===void 0&&(X={},c[F]=X);let V=X[B];V===void 0&&(V=y.clone(),X[B]=V,R.addEventListener("dispose",w)),y=V}if(y.visible=R.visible,y.wireframe=R.wireframe,x===_s?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:h[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,U.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=i.properties.get(y);F.light=U}return y}function M(C,R,U,x,y){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===_s)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const B=e.update(C),X=C.material;if(Array.isArray(X)){const V=B.groups;for(let H=0,k=V.length;H<k;H++){const J=V[H],me=X[J.materialIndex];if(me&&me.visible){const ce=b(C,me,x,y);C.onBeforeShadow(i,C,R,U,B,ce,J),i.renderBufferDirect(U,null,B,ce,C,J),C.onAfterShadow(i,C,R,U,B,ce,J)}}}else if(X.visible){const V=b(C,X,x,y);C.onBeforeShadow(i,C,R,U,B,V,null),i.renderBufferDirect(U,null,B,V,C,null),C.onAfterShadow(i,C,R,U,B,V,null)}}const F=C.children;for(let B=0,X=F.length;B<X;B++)M(F[B],R,U,x,y)}function w(C){C.target.removeEventListener("dispose",w);for(const U in c){const x=c[U],y=C.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const Bv={[Ya]:$a,[ja]:Ja,[Ka]:Qa,[Ji]:Za,[$a]:Ya,[Ja]:ja,[Qa]:Ka,[Za]:Ji};function kv(i,e){function t(){let D=!1;const xe=new bt;let ae=null;const Se=new bt(0,0,0,0);return{setMask:function(se){ae!==se&&!D&&(i.colorMask(se,se,se,se),ae=se)},setLocked:function(se){D=se},setClear:function(se,j,ue,Ve,pt){pt===!0&&(se*=Ve,j*=Ve,ue*=Ve),xe.set(se,j,ue,Ve),Se.equals(xe)===!1&&(i.clearColor(se,j,ue,Ve),Se.copy(xe))},reset:function(){D=!1,ae=null,Se.set(-1,0,0,0)}}}function n(){let D=!1,xe=!1,ae=null,Se=null,se=null;return{setReversed:function(j){if(xe!==j){const ue=e.get("EXT_clip_control");j?ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.ZERO_TO_ONE_EXT):ue.clipControlEXT(ue.LOWER_LEFT_EXT,ue.NEGATIVE_ONE_TO_ONE_EXT),xe=j;const Ve=se;se=null,this.setClear(Ve)}},getReversed:function(){return xe},setTest:function(j){j?Q(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(j){ae!==j&&!D&&(i.depthMask(j),ae=j)},setFunc:function(j){if(xe&&(j=Bv[j]),Se!==j){switch(j){case Ya:i.depthFunc(i.NEVER);break;case $a:i.depthFunc(i.ALWAYS);break;case ja:i.depthFunc(i.LESS);break;case Ji:i.depthFunc(i.LEQUAL);break;case Ka:i.depthFunc(i.EQUAL);break;case Za:i.depthFunc(i.GEQUAL);break;case Ja:i.depthFunc(i.GREATER);break;case Qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=j}},setLocked:function(j){D=j},setClear:function(j){se!==j&&(xe&&(j=1-j),i.clearDepth(j),se=j)},reset:function(){D=!1,ae=null,Se=null,se=null,xe=!1}}}function s(){let D=!1,xe=null,ae=null,Se=null,se=null,j=null,ue=null,Ve=null,pt=null;return{setTest:function(it){D||(it?Q(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(it){xe!==it&&!D&&(i.stencilMask(it),xe=it)},setFunc:function(it,xn,Un){(ae!==it||Se!==xn||se!==Un)&&(i.stencilFunc(it,xn,Un),ae=it,Se=xn,se=Un)},setOp:function(it,xn,Un){(j!==it||ue!==xn||Ve!==Un)&&(i.stencilOp(it,xn,Un),j=it,ue=xn,Ve=Un)},setLocked:function(it){D=it},setClear:function(it){pt!==it&&(i.clearStencil(it),pt=it)},reset:function(){D=!1,xe=null,ae=null,Se=null,se=null,j=null,ue=null,Ve=null,pt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,T=null,b=null,M=null,w=null,C=null,R=new qe(0,0,0),U=0,x=!1,y=null,P=null,F=null,B=null,X=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,k=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(J)[1]),H=k>=1):J.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),H=k>=2);let me=null,ce={};const de=i.getParameter(i.SCISSOR_BOX),Ge=i.getParameter(i.VIEWPORT),ze=new bt().fromArray(de),at=new bt().fromArray(Ge);function ot(D,xe,ae,Se){const se=new Uint8Array(4),j=i.createTexture();i.bindTexture(D,j),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ue=0;ue<ae;ue++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,se):i.texImage2D(xe+ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,se);return j}const Y={};Y[i.TEXTURE_2D]=ot(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(Ji),Z(!1),_e(Bl),Q(i.CULL_FACE),K(Gn);function Q(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Me(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Ne(D,xe){return h[D]!==xe?(i.bindFramebuffer(D,xe),h[D]=xe,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=xe),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ee(D,xe){let ae=f,Se=!1;if(D){ae=d.get(xe),ae===void 0&&(ae=[],d.set(xe,ae));const se=D.textures;if(ae.length!==se.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let j=0,ue=se.length;j<ue;j++)ae[j]=i.COLOR_ATTACHMENT0+j;ae.length=se.length,Se=!0}}else ae[0]!==i.BACK&&(ae[0]=i.BACK,Se=!0);Se&&i.drawBuffers(ae)}function Je(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const lt={[pi]:i.FUNC_ADD,[ef]:i.FUNC_SUBTRACT,[tf]:i.FUNC_REVERSE_SUBTRACT};lt[nf]=i.MIN,lt[sf]=i.MAX;const He={[rf]:i.ZERO,[af]:i.ONE,[of]:i.SRC_COLOR,[Xa]:i.SRC_ALPHA,[ff]:i.SRC_ALPHA_SATURATE,[hf]:i.DST_COLOR,[cf]:i.DST_ALPHA,[lf]:i.ONE_MINUS_SRC_COLOR,[qa]:i.ONE_MINUS_SRC_ALPHA,[df]:i.ONE_MINUS_DST_COLOR,[uf]:i.ONE_MINUS_DST_ALPHA,[pf]:i.CONSTANT_COLOR,[mf]:i.ONE_MINUS_CONSTANT_COLOR,[gf]:i.CONSTANT_ALPHA,[_f]:i.ONE_MINUS_CONSTANT_ALPHA};function K(D,xe,ae,Se,se,j,ue,Ve,pt,it){if(D===Gn){_===!0&&(Me(i.BLEND),_=!1);return}if(_===!1&&(Q(i.BLEND),_=!0),D!==Qd){if(D!==m||it!==x){if((p!==pi||M!==pi)&&(i.blendEquation(i.FUNC_ADD),p=pi,M=pi),it)switch(D){case Ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kl:i.blendFunc(i.ONE,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Qe("WebGLState: Invalid blending: ",D);break}else switch(D){case Ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zl:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Vl:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",D);break}T=null,b=null,w=null,C=null,R.set(0,0,0),U=0,m=D,x=it}return}se=se||xe,j=j||ae,ue=ue||Se,(xe!==p||se!==M)&&(i.blendEquationSeparate(lt[xe],lt[se]),p=xe,M=se),(ae!==T||Se!==b||j!==w||ue!==C)&&(i.blendFuncSeparate(He[ae],He[Se],He[j],He[ue]),T=ae,b=Se,w=j,C=ue),(Ve.equals(R)===!1||pt!==U)&&(i.blendColor(Ve.r,Ve.g,Ve.b,pt),R.copy(Ve),U=pt),m=D,x=!1}function ie(D,xe){D.side===tn?Me(i.CULL_FACE):Q(i.CULL_FACE);let ae=D.side===jt;xe&&(ae=!ae),Z(ae),D.blending===Ki&&D.transparent===!1?K(Gn):K(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);const Se=D.stencilWrite;o.setTest(Se),Se&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),De(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Z(D){y!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),y=D)}function _e(D){D!==Zd?(Q(i.CULL_FACE),D!==P&&(D===Bl?i.cullFace(i.BACK):D===Jd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),P=D}function A(D){D!==F&&(H&&i.lineWidth(D),F=D)}function De(D,xe,ae){D?(Q(i.POLYGON_OFFSET_FILL),(B!==xe||X!==ae)&&(i.polygonOffset(xe,ae),B=xe,X=ae)):Me(i.POLYGON_OFFSET_FILL)}function ye(D){D?Q(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function Fe(D){D===void 0&&(D=i.TEXTURE0+V-1),me!==D&&(i.activeTexture(D),me=D)}function oe(D,xe,ae){ae===void 0&&(me===null?ae=i.TEXTURE0+V-1:ae=me);let Se=ce[ae];Se===void 0&&(Se={type:void 0,texture:void 0},ce[ae]=Se),(Se.type!==D||Se.texture!==xe)&&(me!==ae&&(i.activeTexture(ae),me=ae),i.bindTexture(D,xe||Y[D]),Se.type=D,Se.texture=xe)}function E(){const D=ce[me];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{i.compressedTexImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function W(){try{i.texSubImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function $(){try{i.texSubImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function le(){try{i.texStorage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function we(){try{i.texStorage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function Oe(){try{i.texImage2D(...arguments)}catch(D){Qe("WebGLState:",D)}}function ne(){try{i.texImage3D(...arguments)}catch(D){Qe("WebGLState:",D)}}function fe(D){ze.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ze.copy(D))}function Ae(D){at.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),at.copy(D))}function Re(D,xe){let ae=c.get(xe);ae===void 0&&(ae=new WeakMap,c.set(xe,ae));let Se=ae.get(D);Se===void 0&&(Se=i.getUniformBlockIndex(xe,D.name),ae.set(D,Se))}function he(D,xe){const Se=c.get(xe).get(D);l.get(xe)!==Se&&(i.uniformBlockBinding(xe,Se,D.__bindingPointIndex),l.set(xe,Se))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},me=null,ce={},h={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,T=null,b=null,M=null,w=null,C=null,R=new qe(0,0,0),U=0,x=!1,y=null,P=null,F=null,B=null,X=null,ze.set(0,0,i.canvas.width,i.canvas.height),at.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:Me,bindFramebuffer:Ne,drawBuffers:Ee,useProgram:Je,setBlending:K,setMaterial:ie,setFlipSided:Z,setCullFace:_e,setLineWidth:A,setPolygonOffset:De,setScissorTest:ye,activeTexture:Fe,bindTexture:oe,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:I,texImage2D:Oe,texImage3D:ne,updateUBOMapping:Re,uniformBlockBinding:he,texStorage2D:le,texStorage3D:we,texSubImage2D:W,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:Ce,scissor:fe,viewport:Ae,reset:$e}}function zv(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ee,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return f?new OffscreenCanvas(E,v):Fr("canvas")}function _(E,v,I){let W=1;const $=oe(E);if(($.width>I||$.height>I)&&(W=I/Math.max($.width,$.height)),W<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const q=Math.floor(W*$.width),Ce=Math.floor(W*$.height);h===void 0&&(h=g(q,Ce));const le=v?g(q,Ce):h;return le.width=q,le.height=Ce,le.getContext("2d").drawImage(E,0,0,q,Ce),ke("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+Ce+")."),le}else return"data"in E&&ke("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,v,I,W,$=!1){if(E!==null){if(i[E]!==void 0)return i[E];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let q=v;if(v===i.RED&&(I===i.FLOAT&&(q=i.R32F),I===i.HALF_FLOAT&&(q=i.R16F),I===i.UNSIGNED_BYTE&&(q=i.R8)),v===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.R8UI),I===i.UNSIGNED_SHORT&&(q=i.R16UI),I===i.UNSIGNED_INT&&(q=i.R32UI),I===i.BYTE&&(q=i.R8I),I===i.SHORT&&(q=i.R16I),I===i.INT&&(q=i.R32I)),v===i.RG&&(I===i.FLOAT&&(q=i.RG32F),I===i.HALF_FLOAT&&(q=i.RG16F),I===i.UNSIGNED_BYTE&&(q=i.RG8)),v===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RG8UI),I===i.UNSIGNED_SHORT&&(q=i.RG16UI),I===i.UNSIGNED_INT&&(q=i.RG32UI),I===i.BYTE&&(q=i.RG8I),I===i.SHORT&&(q=i.RG16I),I===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RGB8UI),I===i.UNSIGNED_SHORT&&(q=i.RGB16UI),I===i.UNSIGNED_INT&&(q=i.RGB32UI),I===i.BYTE&&(q=i.RGB8I),I===i.SHORT&&(q=i.RGB16I),I===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),I===i.UNSIGNED_INT&&(q=i.RGBA32UI),I===i.BYTE&&(q=i.RGBA8I),I===i.SHORT&&(q=i.RGBA16I),I===i.INT&&(q=i.RGBA32I)),v===i.RGB&&(I===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),v===i.RGBA){const Ce=$?Ur:et.getTransfer(W);I===i.FLOAT&&(q=i.RGBA32F),I===i.HALF_FLOAT&&(q=i.RGBA16F),I===i.UNSIGNED_BYTE&&(q=Ce===rt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function M(E,v){let I;return E?v===null||v===Pn||v===As?I=i.DEPTH24_STENCIL8:v===En?I=i.DEPTH32F_STENCIL8:v===ws&&(I=i.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pn||v===As?I=i.DEPTH_COMPONENT24:v===En?I=i.DEPTH_COMPONENT32F:v===ws&&(I=i.DEPTH_COMPONENT16),I}function w(E,v){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==It&&E.minFilter!==Bt?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){const v=E.target;v.removeEventListener("dispose",C),U(v),v.isVideoTexture&&u.delete(v)}function R(E){const v=E.target;v.removeEventListener("dispose",R),y(v)}function U(E){const v=n.get(E);if(v.__webglInit===void 0)return;const I=E.source,W=d.get(I);if(W){const $=W[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&x(E),Object.keys(W).length===0&&d.delete(I)}n.remove(E)}function x(E){const v=n.get(E);i.deleteTexture(v.__webglTexture);const I=E.source,W=d.get(I);delete W[v.__cacheKey],a.memory.textures--}function y(E){const v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let $=0;$<v.__webglFramebuffer[W].length;$++)i.deleteFramebuffer(v.__webglFramebuffer[W][$]);else i.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)i.deleteFramebuffer(v.__webglFramebuffer[W]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const I=E.textures;for(let W=0,$=I.length;W<$;W++){const q=n.get(I[W]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),a.memory.textures--),n.remove(I[W])}n.remove(E)}let P=0;function F(){P=0}function B(){const E=P;return E>=s.maxTextures&&ke("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function X(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function V(E,v){const I=n.get(E);if(E.isVideoTexture&&ye(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&I.__version!==E.version){const W=E.image;if(W===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(I,E,v);return}}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+v)}function H(E,v){const I=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){Y(I,E,v);return}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+v)}function k(E,v){const I=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){Y(I,E,v);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+v)}function J(E,v){const I=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&I.__version!==E.version){Q(I,E,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+v)}const me={[no]:i.REPEAT,[Vn]:i.CLAMP_TO_EDGE,[io]:i.MIRRORED_REPEAT},ce={[It]:i.NEAREST,[yf]:i.NEAREST_MIPMAP_NEAREST,[Xs]:i.NEAREST_MIPMAP_LINEAR,[Bt]:i.LINEAR,[na]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},de={[bf]:i.NEVER,[Cf]:i.ALWAYS,[Ef]:i.LESS,[al]:i.LEQUAL,[Tf]:i.EQUAL,[ol]:i.GEQUAL,[wf]:i.GREATER,[Af]:i.NOTEQUAL};function Ge(E,v){if(v.type===En&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Bt||v.magFilter===na||v.magFilter===Xs||v.magFilter===gi||v.minFilter===Bt||v.minFilter===na||v.minFilter===Xs||v.minFilter===gi)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,me[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,me[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,me[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ce[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,de[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===It||v.minFilter!==Xs&&v.minFilter!==gi||v.type===En&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ze(E,v){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));const W=v.source;let $=d.get(W);$===void 0&&($={},d.set(W,$));const q=X(v);if(q!==E.__cacheKey){$[q]===void 0&&($[q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,I=!0),$[q].usedTimes++;const Ce=$[E.__cacheKey];Ce!==void 0&&($[E.__cacheKey].usedTimes--,Ce.usedTimes===0&&x(v)),E.__cacheKey=q,E.__webglTexture=$[q].texture}return I}function at(E,v,I){return Math.floor(Math.floor(E/I)/v)}function ot(E,v,I,W){const q=E.updateRanges;if(q.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,I,W,v.data);else{q.sort((ne,fe)=>ne.start-fe.start);let Ce=0;for(let ne=1;ne<q.length;ne++){const fe=q[Ce],Ae=q[ne],Re=fe.start+fe.count,he=at(Ae.start,v.width,4),$e=at(fe.start,v.width,4);Ae.start<=Re+1&&he===$e&&at(Ae.start+Ae.count-1,v.width,4)===he?fe.count=Math.max(fe.count,Ae.start+Ae.count-fe.start):(++Ce,q[Ce]=Ae)}q.length=Ce+1;const le=i.getParameter(i.UNPACK_ROW_LENGTH),we=i.getParameter(i.UNPACK_SKIP_PIXELS),Oe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let ne=0,fe=q.length;ne<fe;ne++){const Ae=q[ne],Re=Math.floor(Ae.start/4),he=Math.ceil(Ae.count/4),$e=Re%v.width,D=Math.floor(Re/v.width),xe=he,ae=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,$e,D,xe,ae,I,W,v.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,le),i.pixelStorei(i.UNPACK_SKIP_PIXELS,we),i.pixelStorei(i.UNPACK_SKIP_ROWS,Oe)}}function Y(E,v,I){let W=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=i.TEXTURE_3D);const $=ze(E,v),q=v.source;t.bindTexture(W,E.__webglTexture,i.TEXTURE0+I);const Ce=n.get(q);if(q.version!==Ce.__version||$===!0){t.activeTexture(i.TEXTURE0+I);const le=et.getPrimaries(et.workingColorSpace),we=v.colorSpace===ei?null:et.getPrimaries(v.colorSpace),Oe=v.colorSpace===ei||le===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let ne=_(v.image,!1,s.maxTextureSize);ne=Fe(v,ne);const fe=r.convert(v.format,v.colorSpace),Ae=r.convert(v.type);let Re=b(v.internalFormat,fe,Ae,v.colorSpace,v.isVideoTexture);Ge(W,v);let he;const $e=v.mipmaps,D=v.isVideoTexture!==!0,xe=Ce.__version===void 0||$===!0,ae=q.dataReady,Se=w(v,ne);if(v.isDepthTexture)Re=M(v.format===_i,v.type),xe&&(D?t.texStorage2D(i.TEXTURE_2D,1,Re,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,Re,ne.width,ne.height,0,fe,Ae,null));else if(v.isDataTexture)if($e.length>0){D&&xe&&t.texStorage2D(i.TEXTURE_2D,Se,Re,$e[0].width,$e[0].height);for(let se=0,j=$e.length;se<j;se++)he=$e[se],D?ae&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,he.width,he.height,fe,Ae,he.data):t.texImage2D(i.TEXTURE_2D,se,Re,he.width,he.height,0,fe,Ae,he.data);v.generateMipmaps=!1}else D?(xe&&t.texStorage2D(i.TEXTURE_2D,Se,Re,ne.width,ne.height),ae&&ot(v,ne,fe,Ae)):t.texImage2D(i.TEXTURE_2D,0,Re,ne.width,ne.height,0,fe,Ae,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Re,$e[0].width,$e[0].height,ne.depth);for(let se=0,j=$e.length;se<j;se++)if(he=$e[se],v.format!==gn)if(fe!==null)if(D){if(ae)if(v.layerUpdates.size>0){const ue=Sc(he.width,he.height,v.format,v.type);for(const Ve of v.layerUpdates){const pt=he.data.subarray(Ve*ue/he.data.BYTES_PER_ELEMENT,(Ve+1)*ue/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,Ve,he.width,he.height,1,fe,pt)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,he.width,he.height,ne.depth,fe,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Re,he.width,he.height,ne.depth,0,he.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,he.width,he.height,ne.depth,fe,Ae,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Re,he.width,he.height,ne.depth,0,fe,Ae,he.data)}else{D&&xe&&t.texStorage2D(i.TEXTURE_2D,Se,Re,$e[0].width,$e[0].height);for(let se=0,j=$e.length;se<j;se++)he=$e[se],v.format!==gn?fe!==null?D?ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Re,he.width,he.height,0,he.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ae&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,he.width,he.height,fe,Ae,he.data):t.texImage2D(i.TEXTURE_2D,se,Re,he.width,he.height,0,fe,Ae,he.data)}else if(v.isDataArrayTexture)if(D){if(xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Se,Re,ne.width,ne.height,ne.depth),ae)if(v.layerUpdates.size>0){const se=Sc(ne.width,ne.height,v.format,v.type);for(const j of v.layerUpdates){const ue=ne.data.subarray(j*se/ne.data.BYTES_PER_ELEMENT,(j+1)*se/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,ne.width,ne.height,1,fe,Ae,ue)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,fe,Ae,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,ne.width,ne.height,ne.depth,0,fe,Ae,ne.data);else if(v.isData3DTexture)D?(xe&&t.texStorage3D(i.TEXTURE_3D,Se,Re,ne.width,ne.height,ne.depth),ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,fe,Ae,ne.data)):t.texImage3D(i.TEXTURE_3D,0,Re,ne.width,ne.height,ne.depth,0,fe,Ae,ne.data);else if(v.isFramebufferTexture){if(xe)if(D)t.texStorage2D(i.TEXTURE_2D,Se,Re,ne.width,ne.height);else{let se=ne.width,j=ne.height;for(let ue=0;ue<Se;ue++)t.texImage2D(i.TEXTURE_2D,ue,Re,se,j,0,fe,Ae,null),se>>=1,j>>=1}}else if($e.length>0){if(D&&xe){const se=oe($e[0]);t.texStorage2D(i.TEXTURE_2D,Se,Re,se.width,se.height)}for(let se=0,j=$e.length;se<j;se++)he=$e[se],D?ae&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,fe,Ae,he):t.texImage2D(i.TEXTURE_2D,se,Re,fe,Ae,he);v.generateMipmaps=!1}else if(D){if(xe){const se=oe(ne);t.texStorage2D(i.TEXTURE_2D,Se,Re,se.width,se.height)}ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Ae,ne)}else t.texImage2D(i.TEXTURE_2D,0,Re,fe,Ae,ne);m(v)&&p(W),Ce.__version=q.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Q(E,v,I){if(v.image.length!==6)return;const W=ze(E,v),$=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+I);const q=n.get($);if($.version!==q.__version||W===!0){t.activeTexture(i.TEXTURE0+I);const Ce=et.getPrimaries(et.workingColorSpace),le=v.colorSpace===ei?null:et.getPrimaries(v.colorSpace),we=v.colorSpace===ei||Ce===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);const Oe=v.isCompressedTexture||v.image[0].isCompressedTexture,ne=v.image[0]&&v.image[0].isDataTexture,fe=[];for(let j=0;j<6;j++)!Oe&&!ne?fe[j]=_(v.image[j],!0,s.maxCubemapSize):fe[j]=ne?v.image[j].image:v.image[j],fe[j]=Fe(v,fe[j]);const Ae=fe[0],Re=r.convert(v.format,v.colorSpace),he=r.convert(v.type),$e=b(v.internalFormat,Re,he,v.colorSpace),D=v.isVideoTexture!==!0,xe=q.__version===void 0||W===!0,ae=$.dataReady;let Se=w(v,Ae);Ge(i.TEXTURE_CUBE_MAP,v);let se;if(Oe){D&&xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,$e,Ae.width,Ae.height);for(let j=0;j<6;j++){se=fe[j].mipmaps;for(let ue=0;ue<se.length;ue++){const Ve=se[ue];v.format!==gn?Re!==null?D?ae&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,0,0,Ve.width,Ve.height,Re,Ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,$e,Ve.width,Ve.height,0,Ve.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,0,0,Ve.width,Ve.height,Re,he,Ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue,$e,Ve.width,Ve.height,0,Re,he,Ve.data)}}}else{if(se=v.mipmaps,D&&xe){se.length>0&&Se++;const j=oe(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,$e,j.width,j.height)}for(let j=0;j<6;j++)if(ne){D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,fe[j].width,fe[j].height,Re,he,fe[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$e,fe[j].width,fe[j].height,0,Re,he,fe[j].data);for(let ue=0;ue<se.length;ue++){const pt=se[ue].image[j].image;D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,0,0,pt.width,pt.height,Re,he,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,$e,pt.width,pt.height,0,Re,he,pt.data)}}else{D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Re,he,fe[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$e,Re,he,fe[j]);for(let ue=0;ue<se.length;ue++){const Ve=se[ue];D?ae&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,0,0,Re,he,Ve.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ue+1,$e,Re,he,Ve.image[j])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),q.__version=$.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function Me(E,v,I,W,$,q){const Ce=r.convert(I.format,I.colorSpace),le=r.convert(I.type),we=b(I.internalFormat,Ce,le,I.colorSpace),Oe=n.get(v),ne=n.get(I);if(ne.__renderTarget=v,!Oe.__hasExternalTextures){const fe=Math.max(1,v.width>>q),Ae=Math.max(1,v.height>>q);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,q,we,fe,Ae,v.depth,0,Ce,le,null):t.texImage2D($,q,we,fe,Ae,0,Ce,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),De(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,$,ne.__webglTexture,0,A(v)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,$,ne.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(E,v,I){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){const W=v.depthTexture,$=W&&W.isDepthTexture?W.type:null,q=M(v.stencilBuffer,$),Ce=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;De(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,A(v),q,v.width,v.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,A(v),q,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ce,i.RENDERBUFFER,E)}else{const W=v.textures;for(let $=0;$<W.length;$++){const q=W[$],Ce=r.convert(q.format,q.colorSpace),le=r.convert(q.type),we=b(q.internalFormat,Ce,le,q.colorSpace);De(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,A(v),we,v.width,v.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,A(v),we,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,we,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ee(E,v,I){const W=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(v.depthTexture);if($.__renderTarget=v,(!$.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if($.__webglInit===void 0&&($.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ge(i.TEXTURE_CUBE_MAP,v.depthTexture);const Oe=r.convert(v.depthTexture.format),ne=r.convert(v.depthTexture.type);let fe;v.depthTexture.format===qn?fe=i.DEPTH_COMPONENT24:v.depthTexture.format===_i&&(fe=i.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,fe,v.width,v.height,0,Oe,ne,null)}}else V(v.depthTexture,0);const q=$.__webglTexture,Ce=A(v),le=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,we=v.depthTexture.format===_i?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===qn)De(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,we,le,q,0,Ce):i.framebufferTexture2D(i.FRAMEBUFFER,we,le,q,0);else if(v.depthTexture.format===_i)De(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,we,le,q,0,Ce):i.framebufferTexture2D(i.FRAMEBUFFER,we,le,q,0);else throw new Error("Unknown depthTexture format")}function Je(E){const v=n.get(E),I=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const W=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const $=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",$)};W.addEventListener("dispose",$),v.__depthDisposeCallback=$}v.__boundDepthTexture=W}if(E.depthTexture&&!v.__autoAllocateDepthBuffer)if(I)for(let W=0;W<6;W++)Ee(v.__webglFramebuffer[W],E,W);else{const W=E.texture.mipmaps;W&&W.length>0?Ee(v.__webglFramebuffer[0],E,0):Ee(v.__webglFramebuffer,E,0)}else if(I){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=i.createRenderbuffer(),Ne(v.__webglDepthbuffer[W],E,!1);else{const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,q)}}else{const W=E.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ne(v.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(E,v,I){const W=n.get(E);v!==void 0&&Me(W.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&Je(E)}function He(E){const v=E.texture,I=n.get(E),W=n.get(v);E.addEventListener("dispose",R);const $=E.textures,q=E.isWebGLCubeRenderTarget===!0,Ce=$.length>1;if(Ce||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=v.version,a.memory.textures++),q){I.__webglFramebuffer=[];for(let le=0;le<6;le++)if(v.mipmaps&&v.mipmaps.length>0){I.__webglFramebuffer[le]=[];for(let we=0;we<v.mipmaps.length;we++)I.__webglFramebuffer[le][we]=i.createFramebuffer()}else I.__webglFramebuffer[le]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){I.__webglFramebuffer=[];for(let le=0;le<v.mipmaps.length;le++)I.__webglFramebuffer[le]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(Ce)for(let le=0,we=$.length;le<we;le++){const Oe=n.get($[le]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&De(E)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let le=0;le<$.length;le++){const we=$[le];I.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[le]);const Oe=r.convert(we.format,we.colorSpace),ne=r.convert(we.type),fe=b(we.internalFormat,Oe,ne,we.colorSpace,E.isXRRenderTarget===!0),Ae=A(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,fe,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,I.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Ne(I.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Ge(i.TEXTURE_CUBE_MAP,v);for(let le=0;le<6;le++)if(v.mipmaps&&v.mipmaps.length>0)for(let we=0;we<v.mipmaps.length;we++)Me(I.__webglFramebuffer[le][we],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,we);else Me(I.__webglFramebuffer[le],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(v)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let le=0,we=$.length;le<we;le++){const Oe=$[le],ne=n.get(Oe);let fe=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(fe=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),Ge(fe,Oe),Me(I.__webglFramebuffer,E,Oe,i.COLOR_ATTACHMENT0+le,fe,0),m(Oe)&&p(fe)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(le=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,W.__webglTexture),Ge(le,v),v.mipmaps&&v.mipmaps.length>0)for(let we=0;we<v.mipmaps.length;we++)Me(I.__webglFramebuffer[we],E,v,i.COLOR_ATTACHMENT0,le,we);else Me(I.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,le,0);m(v)&&p(le),t.unbindTexture()}E.depthBuffer&&Je(E)}function K(E){const v=E.textures;for(let I=0,W=v.length;I<W;I++){const $=v[I];if(m($)){const q=T(E),Ce=n.get($).__webglTexture;t.bindTexture(q,Ce),p(q),t.unbindTexture()}}}const ie=[],Z=[];function _e(E){if(E.samples>0){if(De(E)===!1){const v=E.textures,I=E.width,W=E.height;let $=i.COLOR_BUFFER_BIT;const q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ce=n.get(E),le=v.length>1;if(le)for(let Oe=0;Oe<v.length;Oe++)t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const we=E.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Oe=0;Oe<v.length;Oe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Oe]);const ne=n.get(v[Oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ne,0)}i.blitFramebuffer(0,0,I,W,0,0,I,W,$,i.NEAREST),l===!0&&(ie.length=0,Z.length=0,ie.push(i.COLOR_ATTACHMENT0+Oe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ie.push(q),Z.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Z)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let Oe=0;Oe<v.length;Oe++){t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.RENDERBUFFER,Ce.__webglColorRenderbuffer[Oe]);const ne=n.get(v[Oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Oe,i.TEXTURE_2D,ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function A(E){return Math.min(s.maxSamples,E.samples)}function De(E){const v=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ye(E){const v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function Fe(E,v){const I=E.colorSpace,W=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==ts&&I!==ei&&(et.getTransfer(I)===rt?(W!==gn||$!==nn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",I)),v}function oe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=V,this.setTexture2DArray=H,this.setTexture3D=k,this.setTextureCube=J,this.rebindTextures=lt,this.setupRenderTarget=He,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=De,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Vv(i,e){function t(n,s=ei){let r;const a=et.getTransfer(s);if(n===nn)return i.UNSIGNED_BYTE;if(n===tl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===nl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Eu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Su)return i.BYTE;if(n===Mu)return i.SHORT;if(n===ws)return i.UNSIGNED_SHORT;if(n===el)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===Xn)return i.HALF_FLOAT;if(n===Tu)return i.ALPHA;if(n===wu)return i.RGB;if(n===gn)return i.RGBA;if(n===qn)return i.DEPTH_COMPONENT;if(n===_i)return i.DEPTH_STENCIL;if(n===Au)return i.RED;if(n===il)return i.RED_INTEGER;if(n===es)return i.RG;if(n===sl)return i.RG_INTEGER;if(n===rl)return i.RGBA_INTEGER;if(n===Cr||n===Rr||n===Pr||n===Lr)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===so||n===ro||n===ao||n===oo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===so)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===oo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lo||n===co||n===uo||n===ho||n===fo||n===po||n===mo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lo||n===co)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===uo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ho)return r.COMPRESSED_R11_EAC;if(n===fo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===po)return r.COMPRESSED_RG11_EAC;if(n===mo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===go||n===_o||n===vo||n===xo||n===yo||n===So||n===Mo||n===bo||n===Eo||n===To||n===wo||n===Ao||n===Co||n===Ro)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===go)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_o)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===vo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===So)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Eo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===To)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ao)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Co)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ro)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Po||n===Lo||n===Do)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Po)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Lo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Do)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Io||n===Uo||n===No||n===Fo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Io)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===No)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===As?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Gv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Wv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Gu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dn({vertexShader:Gv,fragmentShader:Hv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xv extends Ti{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new Wv,p={},T=t.getContextAttributes();let b=null,M=null;const w=[],C=[],R=new ee;let U=null;const x=new un;x.viewport=new bt;const y=new un;y.viewport=new bt;const P=[x,y],F=new Qp;let B=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=w[Y];return Q===void 0&&(Q=new Ea,w[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=w[Y];return Q===void 0&&(Q=new Ea,w[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=w[Y];return Q===void 0&&(Q=new Ea,w[Y]=Q),Q.getHandSpace()};function V(Y){const Q=C.indexOf(Y.inputSource);if(Q===-1)return;const Me=w[Q];Me!==void 0&&(Me.update(Y.inputSource,Y.frame,c||a),Me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",k);for(let Y=0;Y<w.length;Y++){const Q=C[Y];Q!==null&&(C[Y]=null,w[Y].disconnect(Q))}B=null,X=null,m.reset();for(const Y in p)delete p[Y];e.setRenderTarget(b),f=null,d=null,h=null,s=null,M=null,ot.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",H),s.addEventListener("inputsourceschange",k),T.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ne=null,Ee=null;T.depth&&(Ee=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=T.stencil?_i:qn,Ne=T.stencil?As:Pn);const Je={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Je),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Cn(d.textureWidth,d.textureHeight,{format:gn,type:nn,depthTexture:new Rs(d.textureWidth,d.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Me={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Cn(f.framebufferWidth,f.framebufferHeight,{format:gn,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ot.setContext(s),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function k(Y){for(let Q=0;Q<Y.removed.length;Q++){const Me=Y.removed[Q],Ne=C.indexOf(Me);Ne>=0&&(C[Ne]=null,w[Ne].disconnect(Me))}for(let Q=0;Q<Y.added.length;Q++){const Me=Y.added[Q];let Ne=C.indexOf(Me);if(Ne===-1){for(let Je=0;Je<w.length;Je++)if(Je>=C.length){C.push(Me),Ne=Je;break}else if(C[Je]===null){C[Je]=Me,Ne=Je;break}if(Ne===-1)break}const Ee=w[Ne];Ee&&Ee.connect(Me)}}const J=new L,me=new L;function ce(Y,Q,Me){J.setFromMatrixPosition(Q.matrixWorld),me.setFromMatrixPosition(Me.matrixWorld);const Ne=J.distanceTo(me),Ee=Q.projectionMatrix.elements,Je=Me.projectionMatrix.elements,lt=Ee[14]/(Ee[10]-1),He=Ee[14]/(Ee[10]+1),K=(Ee[9]+1)/Ee[5],ie=(Ee[9]-1)/Ee[5],Z=(Ee[8]-1)/Ee[0],_e=(Je[8]+1)/Je[0],A=lt*Z,De=lt*_e,ye=Ne/(-Z+_e),Fe=ye*-Z;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Fe),Y.translateZ(ye),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ee[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const oe=lt+ye,E=He+ye,v=A-Fe,I=De+(Ne-Fe),W=K*He/E*oe,$=ie*He/E*oe;Y.projectionMatrix.makePerspective(v,I,W,$,oe,E),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function de(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Q=Y.near,Me=Y.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),F.near=y.near=x.near=Q,F.far=y.far=x.far=Me,(B!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),B=F.near,X=F.far),F.layers.mask=Y.layers.mask|6,x.layers.mask=F.layers.mask&3,y.layers.mask=F.layers.mask&5;const Ne=Y.parent,Ee=F.cameras;de(F,Ne);for(let Je=0;Je<Ee.length;Je++)de(Ee[Je],Ne);Ee.length===2?ce(F,x,y):F.projectionMatrix.copy(x.projectionMatrix),Ge(Y,F,Ne)};function Ge(Y,Q,Me){Me===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(Me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Bo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(Y){return p[Y]};let ze=null;function at(Y,Q){if(u=Q.getViewerPose(c||a),g=Q,u!==null){const Me=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ne=!1;Me.length!==F.cameras.length&&(F.cameras.length=0,Ne=!0);for(let He=0;He<Me.length;He++){const K=Me[He];let ie=null;if(f!==null)ie=f.getViewport(K);else{const _e=h.getViewSubImage(d,K);ie=_e.viewport,He===0&&(e.setRenderTargetTextures(M,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(M))}let Z=P[He];Z===void 0&&(Z=new un,Z.layers.enable(He),Z.viewport=new bt,P[He]=Z),Z.matrix.fromArray(K.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(K.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(ie.x,ie.y,ie.width,ie.height),He===0&&(F.matrix.copy(Z.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ne===!0&&F.cameras.push(Z)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const He=h.getDepthInformation(Me[0]);He&&He.isValid&&He.texture&&m.init(He,s.renderState)}if(Ee&&Ee.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let He=0;He<Me.length;He++){const K=Me[He].camera;if(K){let ie=p[K];ie||(ie=new Gu,p[K]=ie);const Z=h.getCameraImage(K);ie.sourceTexture=Z}}}}for(let Me=0;Me<w.length;Me++){const Ne=C[Me],Ee=w[Me];Ne!==null&&Ee!==void 0&&Ee.update(Ne,Q,c||a)}ze&&ze(Y,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const ot=new Ju;ot.setAnimationLoop(at),this.setAnimationLoop=function(Y){ze=Y},this.dispose=function(){}}}const fi=new Ln,qv=new vt;function Yv(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Fu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,T,b,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,T,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const T=e.get(p),b=T.envMap,M=T.envMapRotation;b&&(m.envMap.value=b,fi.copy(M),fi.x*=-1,fi.y*=-1,fi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),m.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler(fi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $v(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,b){const M=b.program;n.uniformBlockBinding(T,M)}function c(T,b){let M=s[T.id];M===void 0&&(g(T),M=u(T),s[T.id]=M,T.addEventListener("dispose",m));const w=b.program;n.updateUBOMapping(T,w);const C=e.render.frame;r[T.id]!==C&&(d(T),r[T.id]=C)}function u(T){const b=h();T.__bindingPointIndex=b;const M=i.createBuffer(),w=T.__size,C=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,w,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function h(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const b=s[T.id],M=T.uniforms,w=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let C=0,R=M.length;C<R;C++){const U=Array.isArray(M[C])?M[C]:[M[C]];for(let x=0,y=U.length;x<y;x++){const P=U[x];if(f(P,C,x,w)===!0){const F=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let V=0;V<B.length;V++){const H=B[V],k=_(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+X,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,X),X+=k.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(T,b,M,w){const C=T.value,R=b+"_"+M;if(w[R]===void 0)return typeof C=="number"||typeof C=="boolean"?w[R]=C:w[R]=C.clone(),!0;{const U=w[R];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return w[R]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(T){const b=T.uniforms;let M=0;const w=16;for(let R=0,U=b.length;R<U;R++){const x=Array.isArray(b[R])?b[R]:[b[R]];for(let y=0,P=x.length;y<P;y++){const F=x[y],B=Array.isArray(F.value)?F.value:[F.value];for(let X=0,V=B.length;X<V;X++){const H=B[X],k=_(H),J=M%w,me=J%k.boundary,ce=J+me;M+=me,ce!==0&&w-ce<k.storage&&(M+=w-ce),F.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=k.storage}}}const C=M%w;return C>0&&(M+=w-C),T.__size=M,T.__cache={},this}function _(T){const b={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(b.boundary=4,b.storage=4):T.isVector2?(b.boundary=8,b.storage=8):T.isVector3||T.isColor?(b.boundary=16,b.storage=12):T.isVector4?(b.boundary=16,b.storage=16):T.isMatrix3?(b.boundary=48,b.storage=48):T.isMatrix4?(b.boundary=64,b.storage=64):T.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ke("WebGLRenderer: Unsupported uniform value type.",T),b}function m(T){const b=T.target;b.removeEventListener("dispose",m);const M=a.indexOf(b.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}const jv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let yn=null;function Kv(){return yn===null&&(yn=new rp(jv,16,16,es,Xn),yn.name="DFG_LUT",yn.minFilter=Bt,yn.magFilter=Bt,yn.wrapS=Vn,yn.wrapT=Vn,yn.generateMipmaps=!1,yn.needsUpdate=!0),yn}class Zv{constructor(e={}){const{canvas:t=Rf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=nn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=f,m=new Set([rl,sl,il]),p=new Set([nn,Pn,ws,As,tl,nl]),T=new Uint32Array(4),b=new Int32Array(4);let M=null,w=null;const C=[],R=[];let U=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let y=!1;this._outputColorSpace=ln;let P=0,F=0,B=null,X=-1,V=null;const H=new bt,k=new bt;let J=null;const me=new qe(0);let ce=0,de=t.width,Ge=t.height,ze=1,at=null,ot=null;const Y=new bt(0,0,de,Ge),Q=new bt(0,0,de,Ge);let Me=!1;const Ne=new ul;let Ee=!1,Je=!1;const lt=new vt,He=new L,K=new bt,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function _e(){return B===null?ze:1}let A=n;function De(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jo}`),t.addEventListener("webglcontextlost",Ve,!1),t.addEventListener("webglcontextrestored",pt,!1),t.addEventListener("webglcontextcreationerror",it,!1),A===null){const N="webgl2";if(A=De(N,S),A===null)throw De(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Qe("WebGLRenderer: "+S.message),S}let ye,Fe,oe,E,v,I,W,$,q,Ce,le,we,Oe,ne,fe,Ae,Re,he,$e,D,xe,ae,Se,se;function j(){ye=new Kg(A),ye.init(),ae=new Vv(A,ye),Fe=new Vg(A,ye,e,ae),oe=new kv(A,ye),Fe.reversedDepthBuffer&&d&&oe.buffers.depth.setReversed(!0),E=new Qg(A),v=new Ev,I=new zv(A,ye,oe,v,Fe,ae,E),W=new Hg(x),$=new jg(x),q=new im(A),Se=new kg(A,q),Ce=new Zg(A,q,E,Se),le=new t_(A,Ce,q,E),$e=new e_(A,Fe,I),Ae=new Gg(v),we=new bv(x,W,$,ye,Fe,Se,Ae),Oe=new Yv(x,v),ne=new wv,fe=new Dv(ye),he=new Bg(x,W,$,oe,le,g,l),Re=new Ov(x,le,Fe),se=new $v(A,E,Fe,oe),D=new zg(A,ye,E),xe=new Jg(A,ye,E),E.programs=we.programs,x.capabilities=Fe,x.extensions=ye,x.properties=v,x.renderLists=ne,x.shadowMap=Re,x.state=oe,x.info=E}j(),_!==nn&&(U=new i_(_,t.width,t.height,s,r));const ue=new Xv(x,A);this.xr=ue,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const S=ye.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ye.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ze},this.setPixelRatio=function(S){S!==void 0&&(ze=S,this.setSize(de,Ge,!1))},this.getSize=function(S){return S.set(de,Ge)},this.setSize=function(S,N,G=!0){if(ue.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}de=S,Ge=N,t.width=Math.floor(S*ze),t.height=Math.floor(N*ze),G===!0&&(t.style.width=S+"px",t.style.height=N+"px"),U!==null&&U.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(de*ze,Ge*ze).floor()},this.setDrawingBufferSize=function(S,N,G){de=S,Ge=N,ze=G,t.width=Math.floor(S*G),t.height=Math.floor(N*G),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(_===nn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}U.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy(Y)},this.setViewport=function(S,N,G,z){S.isVector4?Y.set(S.x,S.y,S.z,S.w):Y.set(S,N,G,z),oe.viewport(H.copy(Y).multiplyScalar(ze).round())},this.getScissor=function(S){return S.copy(Q)},this.setScissor=function(S,N,G,z){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,N,G,z),oe.scissor(k.copy(Q).multiplyScalar(ze).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(S){oe.setScissorTest(Me=S)},this.setOpaqueSort=function(S){at=S},this.setTransparentSort=function(S){ot=S},this.getClearColor=function(S){return S.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor(...arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,G=!0){let z=0;if(S){let O=!1;if(B!==null){const pe=B.texture.format;O=m.has(pe)}if(O){const pe=B.texture.type,be=p.has(pe),ve=he.getClearColor(),Te=he.getClearAlpha(),Pe=ve.r,Be=ve.g,Ie=ve.b;be?(T[0]=Pe,T[1]=Be,T[2]=Ie,T[3]=Te,A.clearBufferuiv(A.COLOR,0,T)):(b[0]=Pe,b[1]=Be,b[2]=Ie,b[3]=Te,A.clearBufferiv(A.COLOR,0,b))}else z|=A.COLOR_BUFFER_BIT}N&&(z|=A.DEPTH_BUFFER_BIT),G&&(z|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",it,!1),he.dispose(),ne.dispose(),fe.dispose(),v.dispose(),W.dispose(),$.dispose(),le.dispose(),Se.dispose(),se.dispose(),we.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",Ml),ue.removeEventListener("sessionend",bl),ai.stop()};function Ve(S){S.preventDefault(),Or("WebGLRenderer: Context Lost."),y=!0}function pt(){Or("WebGLRenderer: Context Restored."),y=!1;const S=E.autoReset,N=Re.enabled,G=Re.autoUpdate,z=Re.needsUpdate,O=Re.type;j(),E.autoReset=S,Re.enabled=N,Re.autoUpdate=G,Re.needsUpdate=z,Re.type=O}function it(S){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function xn(S){const N=S.target;N.removeEventListener("dispose",xn),Un(N)}function Un(S){fh(S),v.remove(S)}function fh(S){const N=v.get(S).programs;N!==void 0&&(N.forEach(function(G){we.releaseProgram(G)}),S.isShaderMaterial&&we.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,G,z,O,pe){N===null&&(N=ie);const be=O.isMesh&&O.matrixWorld.determinant()<0,ve=mh(S,N,G,z,O);oe.setMaterial(z,be);let Te=G.index,Pe=1;if(z.wireframe===!0){if(Te=Ce.getWireframeAttribute(G),Te===void 0)return;Pe=2}const Be=G.drawRange,Ie=G.attributes.position;let Ke=Be.start*Pe,ct=(Be.start+Be.count)*Pe;pe!==null&&(Ke=Math.max(Ke,pe.start*Pe),ct=Math.min(ct,(pe.start+pe.count)*Pe)),Te!==null?(Ke=Math.max(Ke,0),ct=Math.min(ct,Te.count)):Ie!=null&&(Ke=Math.max(Ke,0),ct=Math.min(ct,Ie.count));const St=ct-Ke;if(St<0||St===1/0)return;Se.setup(O,z,ve,G,Te);let Mt,dt=D;if(Te!==null&&(Mt=q.get(Te),dt=xe,dt.setIndex(Mt)),O.isMesh)z.wireframe===!0?(oe.setLineWidth(z.wireframeLinewidth*_e()),dt.setMode(A.LINES)):dt.setMode(A.TRIANGLES);else if(O.isLine){let Ue=z.linewidth;Ue===void 0&&(Ue=1),oe.setLineWidth(Ue*_e()),O.isLineSegments?dt.setMode(A.LINES):O.isLineLoop?dt.setMode(A.LINE_LOOP):dt.setMode(A.LINE_STRIP)}else O.isPoints?dt.setMode(A.POINTS):O.isSprite&&dt.setMode(A.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Cs("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ye.get("WEBGL_multi_draw"))dt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ue=O._multiDrawStarts,st=O._multiDrawCounts,tt=O._multiDrawCount,Zt=Te?q.get(Te).bytesPerElement:1,Ai=v.get(z).currentProgram.getUniforms();for(let Jt=0;Jt<tt;Jt++)Ai.setValue(A,"_gl_DrawID",Jt),dt.render(Ue[Jt]/Zt,st[Jt])}else if(O.isInstancedMesh)dt.renderInstances(Ke,St,O.count);else if(G.isInstancedBufferGeometry){const Ue=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,st=Math.min(G.instanceCount,Ue);dt.renderInstances(Ke,St,st)}else dt.render(Ke,St)};function Sl(S,N,G){S.transparent===!0&&S.side===tn&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,Hs(S,N,G),S.side=ri,S.needsUpdate=!0,Hs(S,N,G),S.side=tn):Hs(S,N,G)}this.compile=function(S,N,G=null){G===null&&(G=S),w=fe.get(G),w.init(N),R.push(w),G.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),S!==G&&S.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),w.setupLights();const z=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const pe=O.material;if(pe)if(Array.isArray(pe))for(let be=0;be<pe.length;be++){const ve=pe[be];Sl(ve,G,O),z.add(ve)}else Sl(pe,G,O),z.add(pe)}),w=R.pop(),z},this.compileAsync=function(S,N,G=null){const z=this.compile(S,N,G);return new Promise(O=>{function pe(){if(z.forEach(function(be){v.get(be).currentProgram.isReady()&&z.delete(be)}),z.size===0){O(S);return}setTimeout(pe,10)}ye.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Kr=null;function ph(S){Kr&&Kr(S)}function Ml(){ai.stop()}function bl(){ai.start()}const ai=new Ju;ai.setAnimationLoop(ph),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(S){Kr=S,ue.setAnimationLoop(S),S===null?ai.stop():ai.start()},ue.addEventListener("sessionstart",Ml),ue.addEventListener("sessionend",bl),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;const G=ue.enabled===!0&&ue.isPresenting===!0,z=U!==null&&(B===null||G)&&U.begin(x,B);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(U===null||U.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(N),N=ue.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,N,B),w=fe.get(S,R.length),w.init(N),R.push(w),lt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ne.setFromProjectionMatrix(lt,Tn,N.reversedDepth),Je=this.localClippingEnabled,Ee=Ae.init(this.clippingPlanes,Je),M=ne.get(S,C.length),M.init(),C.push(M),ue.enabled===!0&&ue.isPresenting===!0){const be=x.xr.getDepthSensingMesh();be!==null&&Zr(be,N,-1/0,x.sortObjects)}Zr(S,N,0,x.sortObjects),M.finish(),x.sortObjects===!0&&M.sort(at,ot),Z=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,Z&&he.addToRenderList(M,S),this.info.render.frame++,Ee===!0&&Ae.beginShadows();const O=w.state.shadowsArray;if(Re.render(O,S,N),Ee===!0&&Ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),(z&&U.hasRenderPass())===!1){const be=M.opaque,ve=M.transmissive;if(w.setupLights(),N.isArrayCamera){const Te=N.cameras;if(ve.length>0)for(let Pe=0,Be=Te.length;Pe<Be;Pe++){const Ie=Te[Pe];Tl(be,ve,S,Ie)}Z&&he.render(S);for(let Pe=0,Be=Te.length;Pe<Be;Pe++){const Ie=Te[Pe];El(M,S,Ie,Ie.viewport)}}else ve.length>0&&Tl(be,ve,S,N),Z&&he.render(S),El(M,S,N)}B!==null&&F===0&&(I.updateMultisampleRenderTarget(B),I.updateRenderTargetMipmap(B)),z&&U.end(x),S.isScene===!0&&S.onAfterRender(x,S,N),Se.resetDefaultState(),X=-1,V=null,R.pop(),R.length>0?(w=R[R.length-1],Ee===!0&&Ae.setGlobalState(x.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?M=C[C.length-1]:M=null};function Zr(S,N,G,z){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ne.intersectsSprite(S)){z&&K.setFromMatrixPosition(S.matrixWorld).applyMatrix4(lt);const be=le.update(S),ve=S.material;ve.visible&&M.push(S,be,ve,G,K.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ne.intersectsObject(S))){const be=le.update(S),ve=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),K.copy(S.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),K.copy(be.boundingSphere.center)),K.applyMatrix4(S.matrixWorld).applyMatrix4(lt)),Array.isArray(ve)){const Te=be.groups;for(let Pe=0,Be=Te.length;Pe<Be;Pe++){const Ie=Te[Pe],Ke=ve[Ie.materialIndex];Ke&&Ke.visible&&M.push(S,be,Ke,G,K.z,Ie)}}else ve.visible&&M.push(S,be,ve,G,K.z,null)}}const pe=S.children;for(let be=0,ve=pe.length;be<ve;be++)Zr(pe[be],N,G,z)}function El(S,N,G,z){const{opaque:O,transmissive:pe,transparent:be}=S;w.setupLightsView(G),Ee===!0&&Ae.setGlobalState(x.clippingPlanes,G),z&&oe.viewport(H.copy(z)),O.length>0&&Gs(O,N,G),pe.length>0&&Gs(pe,N,G),be.length>0&&Gs(be,N,G),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function Tl(S,N,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[z.id]===void 0){const Ke=ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[z.id]=new Cn(1,1,{generateMipmaps:!0,type:Ke?Xn:nn,minFilter:gi,samples:Fe.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace})}const pe=w.state.transmissionRenderTarget[z.id],be=z.viewport||H;pe.setSize(be.z*x.transmissionResolutionScale,be.w*x.transmissionResolutionScale);const ve=x.getRenderTarget(),Te=x.getActiveCubeFace(),Pe=x.getActiveMipmapLevel();x.setRenderTarget(pe),x.getClearColor(me),ce=x.getClearAlpha(),ce<1&&x.setClearColor(16777215,.5),x.clear(),Z&&he.render(G);const Be=x.toneMapping;x.toneMapping=An;const Ie=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),w.setupLightsView(z),Ee===!0&&Ae.setGlobalState(x.clippingPlanes,z),Gs(S,G,z),I.updateMultisampleRenderTarget(pe),I.updateRenderTargetMipmap(pe),ye.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let ct=0,St=N.length;ct<St;ct++){const Mt=N[ct],{object:dt,geometry:Ue,material:st,group:tt}=Mt;if(st.side===tn&&dt.layers.test(z.layers)){const Zt=st.side;st.side=jt,st.needsUpdate=!0,wl(dt,G,z,Ue,st,tt),st.side=Zt,st.needsUpdate=!0,Ke=!0}}Ke===!0&&(I.updateMultisampleRenderTarget(pe),I.updateRenderTargetMipmap(pe))}x.setRenderTarget(ve,Te,Pe),x.setClearColor(me,ce),Ie!==void 0&&(z.viewport=Ie),x.toneMapping=Be}function Gs(S,N,G){const z=N.isScene===!0?N.overrideMaterial:null;for(let O=0,pe=S.length;O<pe;O++){const be=S[O],{object:ve,geometry:Te,group:Pe}=be;let Be=be.material;Be.allowOverride===!0&&z!==null&&(Be=z),ve.layers.test(G.layers)&&wl(ve,N,G,Te,Be,Pe)}}function wl(S,N,G,z,O,pe){S.onBeforeRender(x,N,G,z,O,pe),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(x,N,G,z,S,pe),O.transparent===!0&&O.side===tn&&O.forceSinglePass===!1?(O.side=jt,O.needsUpdate=!0,x.renderBufferDirect(G,N,z,O,S,pe),O.side=ri,O.needsUpdate=!0,x.renderBufferDirect(G,N,z,O,S,pe),O.side=tn):x.renderBufferDirect(G,N,z,O,S,pe),S.onAfterRender(x,N,G,z,O,pe)}function Hs(S,N,G){N.isScene!==!0&&(N=ie);const z=v.get(S),O=w.state.lights,pe=w.state.shadowsArray,be=O.state.version,ve=we.getParameters(S,O.state,pe,N,G),Te=we.getProgramCacheKey(ve);let Pe=z.programs;z.environment=S.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(S.isMeshStandardMaterial?$:W).get(S.envMap||z.environment),z.envMapRotation=z.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",xn),Pe=new Map,z.programs=Pe);let Be=Pe.get(Te);if(Be!==void 0){if(z.currentProgram===Be&&z.lightsStateVersion===be)return Cl(S,ve),Be}else ve.uniforms=we.getUniforms(S),S.onBeforeCompile(ve,x),Be=we.acquireProgram(ve,Te),Pe.set(Te,Be),z.uniforms=ve.uniforms;const Ie=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ie.clippingPlanes=Ae.uniform),Cl(S,ve),z.needsLights=_h(S),z.lightsStateVersion=be,z.needsLights&&(Ie.ambientLightColor.value=O.state.ambient,Ie.lightProbe.value=O.state.probe,Ie.directionalLights.value=O.state.directional,Ie.directionalLightShadows.value=O.state.directionalShadow,Ie.spotLights.value=O.state.spot,Ie.spotLightShadows.value=O.state.spotShadow,Ie.rectAreaLights.value=O.state.rectArea,Ie.ltc_1.value=O.state.rectAreaLTC1,Ie.ltc_2.value=O.state.rectAreaLTC2,Ie.pointLights.value=O.state.point,Ie.pointLightShadows.value=O.state.pointShadow,Ie.hemisphereLights.value=O.state.hemi,Ie.directionalShadowMap.value=O.state.directionalShadowMap,Ie.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ie.spotShadowMap.value=O.state.spotShadowMap,Ie.spotLightMatrix.value=O.state.spotLightMatrix,Ie.spotLightMap.value=O.state.spotLightMap,Ie.pointShadowMap.value=O.state.pointShadowMap,Ie.pointShadowMatrix.value=O.state.pointShadowMatrix),z.currentProgram=Be,z.uniformsList=null,Be}function Al(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=Dr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Cl(S,N){const G=v.get(S);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function mh(S,N,G,z,O){N.isScene!==!0&&(N=ie),I.resetTextureUnits();const pe=N.fog,be=z.isMeshStandardMaterial?N.environment:null,ve=B===null?x.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:ts,Te=(z.isMeshStandardMaterial?$:W).get(z.envMap||be),Pe=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Be=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ie=!!G.morphAttributes.position,Ke=!!G.morphAttributes.normal,ct=!!G.morphAttributes.color;let St=An;z.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(St=x.toneMapping);const Mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,dt=Mt!==void 0?Mt.length:0,Ue=v.get(z),st=w.state.lights;if(Ee===!0&&(Je===!0||S!==V)){const zt=S===V&&z.id===X;Ae.setState(z,S,zt)}let tt=!1;z.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==st.state.version||Ue.outputColorSpace!==ve||O.isBatchedMesh&&Ue.batching===!1||!O.isBatchedMesh&&Ue.batching===!0||O.isBatchedMesh&&Ue.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ue.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ue.instancing===!1||!O.isInstancedMesh&&Ue.instancing===!0||O.isSkinnedMesh&&Ue.skinning===!1||!O.isSkinnedMesh&&Ue.skinning===!0||O.isInstancedMesh&&Ue.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ue.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ue.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ue.instancingMorph===!1&&O.morphTexture!==null||Ue.envMap!==Te||z.fog===!0&&Ue.fog!==pe||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==Ae.numPlanes||Ue.numIntersection!==Ae.numIntersection)||Ue.vertexAlphas!==Pe||Ue.vertexTangents!==Be||Ue.morphTargets!==Ie||Ue.morphNormals!==Ke||Ue.morphColors!==ct||Ue.toneMapping!==St||Ue.morphTargetsCount!==dt)&&(tt=!0):(tt=!0,Ue.__version=z.version);let Zt=Ue.currentProgram;tt===!0&&(Zt=Hs(z,N,O));let Ai=!1,Jt=!1,rs=!1;const mt=Zt.getUniforms(),Xt=Ue.uniforms;if(oe.useProgram(Zt.program)&&(Ai=!0,Jt=!0,rs=!0),z.id!==X&&(X=z.id,Jt=!0),Ai||V!==S){oe.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),mt.setValue(A,"projectionMatrix",S.projectionMatrix),mt.setValue(A,"viewMatrix",S.matrixWorldInverse);const qt=mt.map.cameraPosition;qt!==void 0&&qt.setValue(A,He.setFromMatrixPosition(S.matrixWorld)),Fe.logarithmicDepthBuffer&&mt.setValue(A,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&mt.setValue(A,"isOrthographic",S.isOrthographicCamera===!0),V!==S&&(V=S,Jt=!0,rs=!0)}if(Ue.needsLights&&(st.state.directionalShadowMap.length>0&&mt.setValue(A,"directionalShadowMap",st.state.directionalShadowMap,I),st.state.spotShadowMap.length>0&&mt.setValue(A,"spotShadowMap",st.state.spotShadowMap,I),st.state.pointShadowMap.length>0&&mt.setValue(A,"pointShadowMap",st.state.pointShadowMap,I)),O.isSkinnedMesh){mt.setOptional(A,O,"bindMatrix"),mt.setOptional(A,O,"bindMatrixInverse");const zt=O.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),mt.setValue(A,"boneTexture",zt.boneTexture,I))}O.isBatchedMesh&&(mt.setOptional(A,O,"batchingTexture"),mt.setValue(A,"batchingTexture",O._matricesTexture,I),mt.setOptional(A,O,"batchingIdTexture"),mt.setValue(A,"batchingIdTexture",O._indirectTexture,I),mt.setOptional(A,O,"batchingColorTexture"),O._colorsTexture!==null&&mt.setValue(A,"batchingColorTexture",O._colorsTexture,I));const an=G.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&$e.update(O,G,Zt),(Jt||Ue.receiveShadow!==O.receiveShadow)&&(Ue.receiveShadow=O.receiveShadow,mt.setValue(A,"receiveShadow",O.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Xt.envMap.value=Te,Xt.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null&&(Xt.envMapIntensity.value=N.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=Kv()),Jt&&(mt.setValue(A,"toneMappingExposure",x.toneMappingExposure),Ue.needsLights&&gh(Xt,rs),pe&&z.fog===!0&&Oe.refreshFogUniforms(Xt,pe),Oe.refreshMaterialUniforms(Xt,z,ze,Ge,w.state.transmissionRenderTarget[S.id]),Dr.upload(A,Al(Ue),Xt,I)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Dr.upload(A,Al(Ue),Xt,I),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&mt.setValue(A,"center",O.center),mt.setValue(A,"modelViewMatrix",O.modelViewMatrix),mt.setValue(A,"normalMatrix",O.normalMatrix),mt.setValue(A,"modelMatrix",O.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const zt=z.uniformsGroups;for(let qt=0,Jr=zt.length;qt<Jr;qt++){const oi=zt[qt];se.update(oi,Zt),se.bind(oi,Zt)}}return Zt}function gh(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function _h(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(S,N,G){const z=v.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),v.get(S.texture).__webglTexture=N,v.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const G=v.get(S);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0};const vh=A.createFramebuffer();this.setRenderTarget=function(S,N=0,G=0){B=S,P=N,F=G;let z=null,O=!1,pe=!1;if(S){const ve=v.get(S);if(ve.__useDefaultFramebuffer!==void 0){oe.bindFramebuffer(A.FRAMEBUFFER,ve.__webglFramebuffer),H.copy(S.viewport),k.copy(S.scissor),J=S.scissorTest,oe.viewport(H),oe.scissor(k),oe.setScissorTest(J),X=-1;return}else if(ve.__webglFramebuffer===void 0)I.setupRenderTarget(S);else if(ve.__hasExternalTextures)I.rebindTextures(S,v.get(S.texture).__webglTexture,v.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Be=S.depthTexture;if(ve.__boundDepthTexture!==Be){if(Be!==null&&v.has(Be)&&(S.width!==Be.image.width||S.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(S)}}const Te=S.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(pe=!0);const Pe=v.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pe[N])?z=Pe[N][G]:z=Pe[N],O=!0):S.samples>0&&I.useMultisampledRTT(S)===!1?z=v.get(S).__webglMultisampledFramebuffer:Array.isArray(Pe)?z=Pe[G]:z=Pe,H.copy(S.viewport),k.copy(S.scissor),J=S.scissorTest}else H.copy(Y).multiplyScalar(ze).floor(),k.copy(Q).multiplyScalar(ze).floor(),J=Me;if(G!==0&&(z=vh),oe.bindFramebuffer(A.FRAMEBUFFER,z)&&oe.drawBuffers(S,z),oe.viewport(H),oe.scissor(k),oe.setScissorTest(J),O){const ve=v.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+N,ve.__webglTexture,G)}else if(pe){const ve=N;for(let Te=0;Te<S.textures.length;Te++){const Pe=v.get(S.textures[Te]);A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,G,ve)}}else if(S!==null&&G!==0){const ve=v.get(S.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,ve.__webglTexture,G)}X=-1},this.readRenderTargetPixels=function(S,N,G,z,O,pe,be,ve=0){if(!(S&&S.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=v.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te){oe.bindFramebuffer(A.FRAMEBUFFER,Te);try{const Pe=S.textures[ve],Be=Pe.format,Ie=Pe.type;if(!Fe.textureFormatReadable(Be)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Fe.textureTypeReadable(Ie)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-z&&G>=0&&G<=S.height-O&&(S.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ve),A.readPixels(N,G,z,O,ae.convert(Be),ae.convert(Ie),pe))}finally{const Pe=B!==null?v.get(B).__webglFramebuffer:null;oe.bindFramebuffer(A.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(S,N,G,z,O,pe,be,ve=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=v.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&be!==void 0&&(Te=Te[be]),Te)if(N>=0&&N<=S.width-z&&G>=0&&G<=S.height-O){oe.bindFramebuffer(A.FRAMEBUFFER,Te);const Pe=S.textures[ve],Be=Pe.format,Ie=Pe.type;if(!Fe.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Fe.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Ke),A.bufferData(A.PIXEL_PACK_BUFFER,pe.byteLength,A.STREAM_READ),S.textures.length>1&&A.readBuffer(A.COLOR_ATTACHMENT0+ve),A.readPixels(N,G,z,O,ae.convert(Be),ae.convert(Ie),0);const ct=B!==null?v.get(B).__webglFramebuffer:null;oe.bindFramebuffer(A.FRAMEBUFFER,ct);const St=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await Pf(A,St,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Ke),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,pe),A.deleteBuffer(Ke),A.deleteSync(St),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,G=0){const z=Math.pow(2,-G),O=Math.floor(S.image.width*z),pe=Math.floor(S.image.height*z),be=N!==null?N.x:0,ve=N!==null?N.y:0;I.setTexture2D(S,0),A.copyTexSubImage2D(A.TEXTURE_2D,G,0,0,be,ve,O,pe),oe.unbindTexture()};const xh=A.createFramebuffer(),yh=A.createFramebuffer();this.copyTextureToTexture=function(S,N,G=null,z=null,O=0,pe=null){pe===null&&(O!==0?(Cs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=O,O=0):pe=0);let be,ve,Te,Pe,Be,Ie,Ke,ct,St;const Mt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(G!==null)be=G.max.x-G.min.x,ve=G.max.y-G.min.y,Te=G.isBox3?G.max.z-G.min.z:1,Pe=G.min.x,Be=G.min.y,Ie=G.isBox3?G.min.z:0;else{const an=Math.pow(2,-O);be=Math.floor(Mt.width*an),ve=Math.floor(Mt.height*an),S.isDataArrayTexture?Te=Mt.depth:S.isData3DTexture?Te=Math.floor(Mt.depth*an):Te=1,Pe=0,Be=0,Ie=0}z!==null?(Ke=z.x,ct=z.y,St=z.z):(Ke=0,ct=0,St=0);const dt=ae.convert(N.format),Ue=ae.convert(N.type);let st;N.isData3DTexture?(I.setTexture3D(N,0),st=A.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(I.setTexture2DArray(N,0),st=A.TEXTURE_2D_ARRAY):(I.setTexture2D(N,0),st=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,N.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,N.unpackAlignment);const tt=A.getParameter(A.UNPACK_ROW_LENGTH),Zt=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Ai=A.getParameter(A.UNPACK_SKIP_PIXELS),Jt=A.getParameter(A.UNPACK_SKIP_ROWS),rs=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,Mt.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Mt.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Pe),A.pixelStorei(A.UNPACK_SKIP_ROWS,Be),A.pixelStorei(A.UNPACK_SKIP_IMAGES,Ie);const mt=S.isDataArrayTexture||S.isData3DTexture,Xt=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const an=v.get(S),zt=v.get(N),qt=v.get(an.__renderTarget),Jr=v.get(zt.__renderTarget);oe.bindFramebuffer(A.READ_FRAMEBUFFER,qt.__webglFramebuffer),oe.bindFramebuffer(A.DRAW_FRAMEBUFFER,Jr.__webglFramebuffer);for(let oi=0;oi<Te;oi++)mt&&(A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,v.get(S).__webglTexture,O,Ie+oi),A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,v.get(N).__webglTexture,pe,St+oi)),A.blitFramebuffer(Pe,Be,be,ve,Ke,ct,be,ve,A.DEPTH_BUFFER_BIT,A.NEAREST);oe.bindFramebuffer(A.READ_FRAMEBUFFER,null),oe.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else if(O!==0||S.isRenderTargetTexture||v.has(S)){const an=v.get(S),zt=v.get(N);oe.bindFramebuffer(A.READ_FRAMEBUFFER,xh),oe.bindFramebuffer(A.DRAW_FRAMEBUFFER,yh);for(let qt=0;qt<Te;qt++)mt?A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,an.__webglTexture,O,Ie+qt):A.framebufferTexture2D(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,an.__webglTexture,O),Xt?A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,zt.__webglTexture,pe,St+qt):A.framebufferTexture2D(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,zt.__webglTexture,pe),O!==0?A.blitFramebuffer(Pe,Be,be,ve,Ke,ct,be,ve,A.COLOR_BUFFER_BIT,A.NEAREST):Xt?A.copyTexSubImage3D(st,pe,Ke,ct,St+qt,Pe,Be,be,ve):A.copyTexSubImage2D(st,pe,Ke,ct,Pe,Be,be,ve);oe.bindFramebuffer(A.READ_FRAMEBUFFER,null),oe.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Xt?S.isDataTexture||S.isData3DTexture?A.texSubImage3D(st,pe,Ke,ct,St,be,ve,Te,dt,Ue,Mt.data):N.isCompressedArrayTexture?A.compressedTexSubImage3D(st,pe,Ke,ct,St,be,ve,Te,dt,Mt.data):A.texSubImage3D(st,pe,Ke,ct,St,be,ve,Te,dt,Ue,Mt):S.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,pe,Ke,ct,be,ve,dt,Ue,Mt.data):S.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,pe,Ke,ct,Mt.width,Mt.height,dt,Mt.data):A.texSubImage2D(A.TEXTURE_2D,pe,Ke,ct,be,ve,dt,Ue,Mt);A.pixelStorei(A.UNPACK_ROW_LENGTH,tt),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,Zt),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Ai),A.pixelStorei(A.UNPACK_SKIP_ROWS,Jt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,rs),pe===0&&N.generateMipmaps&&A.generateMipmap(st),oe.unbindTexture()},this.initRenderTarget=function(S){v.get(S).__webglFramebuffer===void 0&&I.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?I.setTextureCube(S,0):S.isData3DTexture?I.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?I.setTexture2DArray(S,0):I.setTexture2D(S,0),oe.unbindTexture()},this.resetState=function(){P=0,F=0,B=null,oe.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Xc={type:"change"},vl={type:"start"},ih={type:"end"},Mr=new cl,qc=new Qn,Jv=Math.cos(70*Df.DEG2RAD),At=new L,Yt=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ka=1e-6;class Qv extends tm{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ji.ROTATE,MIDDLE:ji.DOLLY,RIGHT:ji.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Si,this._lastTargetPosition=new L,this._quat=new Si().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new yc,this._sphericalDelta=new yc,this._scale=1,this._panOffset=new L,this._rotateStart=new ee,this._rotateEnd=new ee,this._rotateDelta=new ee,this._panStart=new ee,this._panEnd=new ee,this._panDelta=new ee,this._dollyStart=new ee,this._dollyEnd=new ee,this._dollyDelta=new ee,this._dollyDirection=new L,this._mouse=new ee,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=tx.bind(this),this._onPointerDown=ex.bind(this),this._onPointerUp=nx.bind(this),this._onContextMenu=cx.bind(this),this._onMouseWheel=rx.bind(this),this._onKeyDown=ax.bind(this),this._onTouchStart=ox.bind(this),this._onTouchMove=lx.bind(this),this._onMouseDown=ix.bind(this),this._onMouseMove=sx.bind(this),this._interceptControlDown=ux.bind(this),this._interceptControlUp=hx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xc),this.update(),this.state=ht.NONE}update(e=null){const t=this.object.position;At.copy(t).sub(this.target),At.applyQuaternion(this._quat),this._spherical.setFromVector3(At),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Yt:n>Math.PI&&(n-=Yt),s<-Math.PI?s+=Yt:s>Math.PI&&(s-=Yt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(At.setFromSpherical(this._spherical),At.applyQuaternion(this._quatInverse),t.copy(this.target).add(At),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=At.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=At.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Mr.origin.copy(this.object.position),Mr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Mr.direction))<Jv?this.object.lookAt(this.target):(qc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Mr.intersectPlane(qc,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ka||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ka||this._lastTargetPosition.distanceToSquared(this.target)>ka?(this.dispatchEvent(Xc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Yt/60*this.autoRotateSpeed*e:Yt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){At.setFromMatrixColumn(t,0),At.multiplyScalar(-e),this._panOffset.add(At)}_panUp(e,t){this.screenSpacePanning===!0?At.setFromMatrixColumn(t,1):(At.setFromMatrixColumn(t,0),At.crossVectors(this.object.up,At)),At.multiplyScalar(e),this._panOffset.add(At)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;At.copy(s).sub(this.target);let r=At.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Yt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Yt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Yt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Yt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Yt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ee,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function ex(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function tx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function nx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ih),this.state=ht.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ix(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ji.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ht.DOLLY;break;case ji.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ht.ROTATE}break;case ji.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(vl)}function sx(i){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function rx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(i.preventDefault(),this.dispatchEvent(vl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(ih))}function ax(i){this.enabled!==!1&&this._handleKeyDown(i)}function ox(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ht.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ht.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(vl)}function lx(i){switch(this._trackPointer(i),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ht.NONE}}function cx(i){this.enabled!==!1&&i.preventDefault()}function ux(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hx(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const xt=1/1e3,dx=[["-go-oc-cho",7162931],["-go-soi",13213806],["-trang",15921129],["-da-nau",8014642],["-xam",9409948],["-den",3816770],["-xanh-reu",6056783],["-da",14210509]],fx={giuong:9413567,"giuong-tang":9413567,"tu-dau-giuong":11110755,"tu-ao":11110755,"ban-trang-diem":11901554,sofa:8361133,"ban-tra":11901554,"ke-tv":11110755,"ban-an":11901554,"ghe-an":10257508,"ban-lam-viec":11901554,"ghe-xoay":5922662,"ke-sach":11110755,"tu-giay":11110755,"tu-bep-duoi":9865071,"tu-bep-tren":11049602,"tu-lanh":13949406,bep:14277855,"bon-cau":15329766,lavabo:15329766,"voi-sen":13227740,"bon-tam":15329766,guong:12571865,"binh-nong-lanh":14606046,"may-giat":13685718,"may-lanh":15264492,"quat-cay":10133670,"den-cay":13220234,"cay-canh":6257999,"xe-may":10115658,"xe-dap":5204874,"o-to":8226964,"ban-tho":9067066};function px(i,e){for(const[t,n]of dx)if(i.endsWith(t))return n;return fx[e]??11578012}const Is=(i,e={})=>new gl({color:i,...e});function gt(i,e){const t=new qe(i),n=e>0?new qe(16777215):new qe(0);return t.lerp(n,Math.abs(e)).getHex()}function We(i,e,t,n,s=0,r=0,a=0,o=i.color){const l=new ft(new cn(e*xt,t*xt,n*xt),Is(o));return l.position.set(s*xt,r*xt,(a+n/2)*xt),i.g.add(l),l}function mn(i,e,t,n=0,s=0,r=0,a=i.color){const o=new ft(new Bs(e*xt,e*xt,t*xt,20),Is(a));return o.rotation.x=Math.PI/2,o.position.set(n*xt,s*xt,(r+t/2)*xt),i.g.add(o),o}function gs(i,e,t,n,s,r=3026478){const a=new ft(new Bs(e*xt,e*xt,t*xt,18),Is(r));return a.rotation.z=Math.PI/2,a.position.set(n*xt,s*xt,e*xt),i.g.add(a),a}function za(i,e,t,n,s=50,r=gt(i.color,-.3)){const a=e/2-s,o=t/2-s;for(const[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]])We(i,s,s,n,l*a,c*o,0,r)}function mx(i,e){const t=new Ht,{w:n,d:s,h:r}=i.footprint,a=px(e,i.category),o={g:t,color:a};switch(i.category){case"giuong":{We(o,n,s,r*.5),We(o,n-100,s-120,r*.45,0,10,r*.5,gt(a,.45)),We(o,n,80,900,0,-s/2+40,0,gt(a,-.2)),We(o,n*.6,s*.16,120,0,-s/2+90+s*.08,r*.95,16052712);break}case"giuong-tang":{We(o,n,s,300,0,0,250,gt(a,.3)),We(o,n,s,300,0,0,r-400,gt(a,.3));for(const[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]])We(o,60,60,r,l*(n-60)/2,c*(s-60)/2,0,gt(a,-.2));break}case"sofa":{We(o,n,s,420),We(o,n,180,380,0,-s/2+90,420,gt(a,-.12)),We(o,160,s,200,-n/2+80,0,420,gt(a,-.12)),We(o,160,s,200,n/2-80,0,420,gt(a,-.12));break}case"ban-an":case"ban-tra":case"ban-lam-viec":case"ban-trang-diem":{We(o,n,s,40,0,0,r-40,gt(a,.15)),za(o,n-40,s-40,r-40),i.category==="ban-trang-diem"&&We(o,n*.5,30,600,0,-s/2+15,r,12571865);break}case"ghe-an":{We(o,n,s,40,0,0,410,gt(a,.15)),za(o,n-30,s-30,410,40),We(o,n,40,r-450,0,-s/2+20,450,gt(a,-.1));break}case"ghe-xoay":{mn(o,40,350,0,0,0,3816770),We(o,n,s,80,0,0,350,a),We(o,n,60,r-550,0,-s/2+30,430,gt(a,-.1));break}case"ke-sach":{We(o,n,s,r,0,0,0,gt(a,-.15));const l=gt(a,.4),c=Math.max(3,Math.round(r/400));for(let u=1;u<c;u++)We(o,n-60,s-40,20,0,10,r/c*u,l);break}case"bep":{We(o,n,s,r),We(o,n-60,20,r*.45,0,s/2,r*.12,gt(a,-.45));for(const l of[-1,1])for(const c of[-1,1])mn(o,Math.min(n,s)/7.5,12,l*n/4.4,c*s/4.4,r,2829099);break}case"tu-bep-duoi":{if(We(o,n,s,r-40),We(o,n+10,s+10,40,0,0,r-40,15131354),n>=1500&&We(o,460,340,12,-n/2+n*.12+230,0,r,10134443),n>=2200)for(const l of[-105,115])mn(o,95,10,n/2-n*.3,l,r,2829099);break}case"tu-lanh":{We(o,n,s,r),We(o,n-40,20,4,0,s/2,r*.65,gt(a,-.35));break}case"bon-cau":{We(o,n,180,780,0,-s/2+90,0,a),mn(o,n/2-20,400,0,s*.12,0,gt(a,.1));break}case"lavabo":{mn(o,90,r-200,0,0,0,gt(a,-.08)),mn(o,Math.min(n,s)/2-30,180,0,0,r-200,a);break}case"voi-sen":{We(o,n,s,60,0,0,0,gt(a,.15)),We(o,50,50,r-60,-n/2+40,-s/2+40,60,10133670);break}case"bon-tam":{We(o,n,s,r),We(o,n-160,s-160,40,0,0,r-38,gt(a,-.25));break}case"may-giat":{We(o,n,s,r),mn(o,Math.min(n,r)*.3,20,0,s/2-8,r*.45,5924208).rotation.x=0;break}case"xe-may":{gs(o,220,90,0,-s/2+260),gs(o,220,90,0,s/2-260),We(o,n*.4,s*.55,260,0,40,380,a),We(o,n-80,60,40,0,-s/2+380,900,gt(a,-.25));break}case"xe-dap":{gs(o,330,40,0,-s/2+340),gs(o,330,40,0,s/2-340),We(o,40,s*.55,40,0,0,560,a);break}case"o-to":{We(o,n,s,650,0,0,250),We(o,n-250,s*.5,550,0,-s*.04,900,gt(a,.2));for(const[l,c]of[[1,1],[1,-1],[-1,1],[-1,-1]])gs(o,300,210,l*(n-230)/2,c*(s/2-750));break}case"ban-tho":{We(o,n,s,60,0,0,r-60,gt(a,.1)),za(o,n-60,s-60,r-60,70),We(o,n,30,300,0,-s/2+15,r,gt(a,-.15));break}case"cay-canh":{mn(o,Math.min(n,s)*.32,r*.25,0,0,0,10251087);const l=new ft(new ml(Math.min(n,s)/2*xt,12,10),Is(a));l.position.z=r*.62*xt,l.scale.z=r*.7/Math.min(n,s),t.add(l);break}case"den-cay":{mn(o,25,r-350,0,0,0,7040885);const l=new ft(new dl(n*.45*xt,350*xt,16,1,!0),Is(a,{side:tn}));l.rotation.x=Math.PI/2,l.position.z=(r-175)*xt,t.add(l);break}case"quat-cay":{mn(o,25,r-400,0,0,0,7040885),mn(o,n/2,120,0,0,r-400,gt(a,.2));break}case"guong":{We(o,n,s,r,0,0,0,12571865);break}default:{We(o,n,s,r);break}}return t}const zn=Math.PI/180,gx=[15,45,74,105,135,166,196,227,258,288,319,349];function _x(i,e,t,n){const s=gx[Math.min(11,Math.max(0,Math.round(e)-1))],r=23.45*Math.sin(zn*(360*(284+s)/365)),a=15*(i-12),o=t*zn,l=r*zn,c=a*zn,u=Math.sin(o)*Math.sin(l)+Math.cos(o)*Math.cos(l)*Math.cos(c),h=Math.asin(Math.min(1,Math.max(-1,u))),d=(Math.sin(l)-Math.sin(o)*u)/(Math.cos(o)*Math.cos(h)||1e-9);let f=Math.acos(Math.min(1,Math.max(-1,d)))/zn;a>0&&(f=360-f);const g=[-Math.sin(n*zn),Math.cos(n*zn)],_=[g[1],-g[0]],m=f*zn,p=g[0]*Math.cos(m)+_[0]*Math.sin(m),T=g[1]*Math.cos(m)+_[1]*Math.sin(m),b=Math.cos(h);return{dir:[p*b,T*b,Math.sin(h)],altitude:h/zn,azimuth:f}}const te=1/1e3,sh=Math.PI/180,vx=90*sh,br={frame:50,depth:60,sash:40,color:3817028},Dt={bg:1316635,ground:2106411,boundary:7250136,wall:15920609,edge:8683119,glass:10274792,door:11569512,slab:15130575,roof:13220003,stair:14209213,flash:2907030,label:"#4a453a"},xx={khach:13416847,"bep-an":13738091,ngu:12755894,wc:10336452,tho:14073234,"lam-viec":11123913,gara:11055288,"hanh-lang":12173480,"cau-thang":12103840,san:11188382,"gieng-troi":10864856,kho:11577496,"ban-cong":11124911},$t=(i,e={})=>new gl({color:i,...e});class yx{renderer;scene=new np;camera;controls;root=new Ht;env=new Ht;grid=null;groups=new Map;groupLevel=new Map;roofIds=new Set;levelZ=new Map;roofVisible=!0;doorsOpen=!1;doorPivots=new Set;levelFilter=null;openingWall=new Map;home=null;dirty=!0;disposed=!1;walk=null;lastTick=0;hemi=new jp(15265525,3817287,1.05);sun=new Jp(16774368,.9);sunMode=!1;constructor(e){this.renderer=new Zv({canvas:e,antialias:!0}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.shadowMap.type=du,this.scene.background=new qe(Dt.bg),this.camera=new un(45,1,.05,500),this.camera.position.set(9,8,12),this.controls=new Qv(this.camera,e),this.controls.addEventListener("change",()=>this.invalidate()),this.scene.add(this.hemi),this.sun.position.set(12,18,8),this.sun.target.position.set(0,0,0),this.scene.add(this.sun),this.scene.add(this.sun.target),this.root.rotation.x=-Math.PI/2,this.scene.add(this.root),this.root.add(this.env);const t=e.parentElement;new ResizeObserver(()=>this.resize(t)).observe(t),this.resize(t),e.addEventListener("mousemove",r=>this.onWalkLook(r));let n=!1;document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===this.renderer.domElement?n=!0:this.walk&&n&&(n=!1,this.exitWalk())}),window.addEventListener("keydown",r=>this.onWalkKey(r,!0)),window.addEventListener("keyup",r=>this.onWalkKey(r,!1));const s=r=>{if(this.disposed)return;requestAnimationFrame(s);const a=Math.min(.05,((r??0)-this.lastTick)/1e3||.016);this.lastTick=r??0,this.walk&&this.stepWalk(a),this.dirty&&(this.dirty=!1,this.renderer.render(this.scene,this.camera))};s()}invalidate(){this.dirty=!0}resize(e){const t=e.clientWidth,n=e.clientHeight;t===0||n===0||(this.renderer.setSize(t,n,!1),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.invalidate())}setModel(e){for(const t of[...this.groups.keys()])this.removeGroup(t);this.openingWall.clear(),this.levelZ=new Map(e.levels.map(t=>[t.id,t.elevation]));for(const t of e.levels){for(const n of e.walls)n.level===t.id&&this.setGroup(n.id,this.buildWall(e,n,t),t.id);for(const n of e.slabs)n.level===t.id&&this.setGroup(n.id,this.buildSlab(n,t),t.id);for(const n of Qr(e))n.level===t.id&&this.setGroup(n.id,this.buildRoof(e,n,t),t.id,!0);for(const n of e.stairs)n.level===t.id&&this.setGroup(n.id,this.buildStair(n,t),t.id);for(const n of e.furniture)n.level===t.id&&this.setGroup(n.id,this.buildFurniture(n,t),t.id);for(const n of e.rooms)n.level===t.id&&this.setGroup(n.id,this.buildRoom(e,n,t),t.id)}this.buildEnv(e),this.applyVisibility(),this.sunMode&&this.applyShadowFlags(!0),this.fitHome(),this.invalidate()}applyOps(e,t){const n=new Set,s=new Set;let r=!1;for(const a of t){const o=a.op==="add"?String(a.data.id??""):a.id;switch(a.entity){case"wall":s.add(o);break;case"opening":{if(n.add(o),a.op==="add"){const l=String(a.data.wall??"");l&&(s.add(l),this.openingWall.set(o,l))}else{const l=this.openingWall.get(a.id);l&&s.add(l),a.op==="update"&&typeof a.data.wall=="string"&&(s.add(a.data.wall),this.openingWall.set(a.id,a.data.wall)),a.op==="delete"&&this.openingWall.delete(a.id)}break}case"level":r=!0;break;case"slab":case"roof":case"stair":case"room":case"furniture":this.rebuildSingle(e,a.entity,o),n.add(o);break}}if(r)this.setModel(e);else{for(const a of s)this.rebuildWall(e,a),n.add(a);if(s.size)for(const a of Qr(e))this.rebuildSingle(e,"roof",a.id)}return this.levelZ=new Map(e.levels.map(a=>[a.id,a.elevation])),this.applyVisibility(),this.home||this.fitHome(),this.sunMode&&this.applyShadowFlags(!0),this.invalidate(),[...n]}rebuildWall(e,t){const n=e.walls.find(r=>r.id===t),s=n?e.levels.find(r=>r.id===n.level):void 0;if(!n||!s){this.removeGroup(t);for(const[r,a]of this.openingWall)a===t&&this.openingWall.delete(r);return}this.setGroup(t,this.buildWall(e,n,s),s.id)}rebuildSingle(e,t,n){const r={slab:e.slabs,roof:Qr(e),stair:e.stairs,room:e.rooms,furniture:e.furniture}[t].find(l=>l.id===n),a=r?e.levels.find(l=>l.id===r.level):void 0;if(!r||!a){this.removeGroup(n);return}const o=t==="slab"?this.buildSlab(r,a):t==="roof"?this.buildRoof(e,r,a):t==="stair"?this.buildStair(r,a):t==="room"?this.buildRoom(e,r,a):this.buildFurniture(r,a);this.setGroup(n,o,a.id,t==="roof")}buildWall(e,t,n){const s=new Ht,{wall:r,shift:a}=zh(e.walls.filter(d=>d.level===t.level),t),o=Ir(r),l=t.height??n.height,c=e.openings.filter(d=>d.wall===t.id);for(const d of c)this.openingWall.set(d.id,t.id);s.position.set(r.from[0]*te,r.from[1]*te,n.elevation*te),s.rotation.z=Math.atan2(t.to[1]-t.from[1],t.to[0]-t.from[0]);const u=t.kind==="kinh"?$t(Dt.glass,{transparent:!0,opacity:.4}):$t(Dt.wall),h=new $i({color:Dt.edge});for(const d of Hh(o,l,c.map(f=>({...f,offset:f.offset+a})))){const f=new cn((d.u1-d.u0)*te,t.thickness*te,(d.z1-d.z0)*te),g=new ft(f,u);g.position.set((d.u0+d.u1)/2*te,0,(d.z0+d.z1)/2*te),s.add(g);const _=new ko(new fc(f),h);_.position.copy(g.position),s.add(_)}for(const d of c){const f=(d.offset+a+d.width/2)*te;if(d.kind==="door"){const g=e.styles.openings[d.style]?.leaf,_=d.swing??Yh(e,d);if(_==="slide"||_==="none"||g==="truot"||g==="xep"){const M=new ft(new cn(d.width*.94*te,42*te,d.height*te),$t(Dt.door));M.position.set(f,0,d.height/2*te),s.add(M);continue}const m=_.startsWith("in")?1:-1,p=d.offset+a,T=p+d.width,b=g==="2-canh"?[[p,1,d.width/2],[T,-1,d.width/2]]:[_.endsWith("-L")?[p,1,d.width]:[T,-1,d.width]];for(const[M,w,C]of b){const R=new Ht;R.position.set(M*te,0,0);const U={pivot:R,open:w*m*vx};R.rotation.z=this.doorsOpen?U.open:0,R.userData.door=U,this.doorPivots.add(U);const x=new ft(new cn((C-20)*te,40*te,(d.height-10)*te),$t(Dt.door));x.position.set(w*(C/2)*te,0,d.height/2*te),R.add(x),s.add(R)}}else this.buildWindow(s,d.offset+a,d.width,d.sill,d.height,e.styles.openings[d.style]?.leaf==="truot")}return s}buildWindow(e,t,n,s,r,a){const o=$t(br.color),l=$t(Dt.glass,{transparent:!0,opacity:.35}),c=(b,M,w,C,R,U)=>{const x=new ft(new cn((M-b)*te,U*te,(C-w)*te),o);x.position.set((b+M)/2*te,R*te,(w+C)/2*te),e.add(x)},u=(b,M,w,C,R,U,x,y)=>{if(c(b,M,w,w+R,U,x),c(b,M,C-R,C,U,x),c(b,b+R,w+R,C-R,U,x),c(M-R,M,w+R,C-R,U,x),!y)return;const P=new ft(new cn((M-b-2*R)*te,6*te,(C-w-2*R)*te),l);P.position.set((b+M)/2*te,U*te,(w+C)/2*te),e.add(P)},[h,d]=[s,s+r],f=br.frame,g=br.sash;u(t,t+n,h,d,f,0,br.depth,!1);const[_,m,p,T]=[t+f,t+n-f,h+f,d-f];if(a){const b=(_+m)/2,M=Math.min(40,(m-_)*.04);u(_,b+M,p,T,g,14,24,!0),u(b-M,m,p,T,g,-14,24,!0)}else u(_,m,p,T,g,0,30,!0)}buildSlab(e,t){const n=new Ht,s=Er(e.outline,e.holes),r=new Es(s,{depth:e.thickness*te,bevelEnabled:!1}),a=new ft(r,$t(Dt.slab)),o=e.kind==="floor"?t.elevation:t.elevation+t.height;return a.position.z=o*te-e.thickness*te,n.add(a),n}buildRoof(e,t,n){const s=new Ht,r=Zh(t,n);t.kind==="gable"&&this.buildGables(e,t,n,r,s);const a=$t(Dt.roof,{side:tn}),o=new $i({color:Dt.edge});for(const l of r.faces){if(l.length<3)continue;const c=l.map(([g,_])=>new ee(g*te,_*te)),u=wn.triangulateShape(c,[]),h=[];for(const g of u)for(const _ of g){const m=l[_];h.push(m[0]*te,m[1]*te,m[2]*te)}const d=new wt;d.setAttribute("position",new _t(h,3)),d.computeVertexNormals(),s.add(new ft(d,a));const f=l.map(([g,_,m])=>new L(g*te,_*te,m*te));f.push(f[0].clone()),s.add(new hl(new wt().setFromPoints(f),o))}return s}buildGables(e,t,n,s,r){const a=$t(Dt.wall),o=new $i({color:Dt.edge}),l=e.walls.filter(u=>u.level===n.id&&(u.height??n.height)===n.height),c=n.elevation+n.height;for(const u of l){const h=Ir(u),d=Fs(u);if(![1,-1].some(w=>[.25,.5,.75].filter(C=>{const R=Ga(u,h*C);return Oh(e,n.id,[R[0]+d[0]*w*(u.thickness/2+150),R[1]+d[1]*w*(u.thickness/2+150)])}).length>=2))continue;const g=24,_=[];for(let w=0;w<=g;w++){const C=h*w/g,R=Ga(u,C);iu(R,t.outline)&&_.push([C,s.zAt(R)])}if(_.length<2||Math.max(..._.map(([,w])=>w))-c<30)continue;const m=new Yr;m.moveTo(_[0][0]*te,c*te);for(const[w,C]of _)m.lineTo(w*te,Math.max(c,C)*te);m.lineTo(_[_.length-1][0]*te,c*te);const p=new Es(m,{depth:u.thickness*te,bevelEnabled:!1});p.translate(0,0,-u.thickness/2*te);const T=new ft(p,a),b=new Ht;b.position.set(u.from[0]*te,u.from[1]*te,0),b.rotation.z=Math.atan2(u.to[1]-u.from[1],u.to[0]-u.from[0]),T.rotation.x=Math.PI/2,b.add(T);const M=new ko(new fc(p),o);M.rotation.x=Math.PI/2,b.add(M),r.add(b)}}buildStair(e,t){const n=new Ht,s=jh(e,t),r=s.riser*te,a=$t(Dt.stair);for(const o of s.flights){const l=Math.atan2(o.dir[1],o.dir[0]),c=new cn(e.width*te,e.tread*te,r);for(let u=0;u<o.treads;u++){const h=o.firstStep+u,d=o.start[0]+o.dir[0]*(u+.5)*e.tread,f=o.start[1]+o.dir[1]*(u+.5)*e.tread,g=new ft(c,a);g.position.set(d*te,f*te,(h-.5)*r),g.rotation.z=l-Math.PI/2,n.add(g)}}if(s.landing){const o=s.flights[0]?.treads??0,l=140*te,c=new ft(new Es(Er(s.landing),{depth:l,bevelEnabled:!1}),a);c.position.z=o*r-l,n.add(c)}return n.position.z=t.elevation*te,n}buildFurniture(e,t){const n=new Ht,s=Hr(e.asset);if(!s)return n;n.add(mx(s,e.asset));const r=e.elevation??s.mountHeight??0;return n.position.set(e.at[0]*te,e.at[1]*te,(t.elevation+r)*te),n.rotation.z=e.rotation*sh,n}buildRoom(e,t,n){const s=new Ht,r=t.finish?.floor?e.finishes[t.finish.floor]:void 0,a=new ft(new Vr(Er(t.polygon)),r?.color?$t(new qe(r.color).getHex(),{side:tn}):$t(xx[t.use]??12103840,{transparent:!0,opacity:.5,side:tn}));s.add(a);const o=Mx(t.name);if(o){const[l,c]=Sx(t.polygon);o.position.set(l*te,c*te,.05),s.add(o)}return s.position.z=(n.elevation+6)*te,s}buildEnv(e){Yc(this.env),this.grid&&(this.scene.remove(this.grid),this.grid.geometry.dispose(),this.grid.material.dispose(),this.grid=null);const t=e.site.boundary;if(t.length<3)return;const n=new cp(new wt().setFromPoints(t.map(([h,d])=>new L(h*te,d*te,.004))),new $i({color:Dt.boundary}));this.env.add(n);const s=t.map(h=>h[0]),r=t.map(h=>h[1]),a=Math.min(...s)-3e3,o=Math.max(...s)+3e3,l=Math.min(...r)-3e3,c=Math.max(...r)+3e3;if(e.site.terrain?.elevations?.length){const d=new ks((o-a)*te,(c-l)*te,32,32),f=d.getAttribute("position");for(let _=0;_<f.count;_++){const m=(a+o)/2+f.getX(_)/te,p=(l+c)/2+f.getY(_)/te;f.setZ(_,Rl(e,[m,p])*te-.03)}d.computeVertexNormals();const g=new ft(d,$t(Dt.ground));g.position.set((a+o)/2*te,(l+c)/2*te,0),g.receiveShadow=!0,this.env.add(g),n.geometry.setFromPoints(t.map(([_,m])=>new L(_*te,m*te,Rl(e,[_,m])*te+.004)))}else{const h=new ft(new Vr(Er([[a,l],[o,l],[o,c],[a,c]])),$t(Dt.ground));h.position.z=-.03,this.env.add(h)}const u=Math.max(o-a,c-l)*te;this.grid=new em(u,Math.round(u),2896443,2501426),this.grid.position.set((a+o)/2*te,-.02,-((l+c)/2)*te),this.scene.add(this.grid)}setDoorsOpen(e){this.doorsOpen=e;for(const t of this.doorPivots)t.pivot.rotation.z=e?t.open:0;this.invalidate()}setRoofVisible(e){this.roofVisible=e,this.applyVisibility()}setLevelFilter(e){this.levelFilter=e,this.applyVisibility()}applyVisibility(){const e=this.levelFilter!=null?this.levelZ.get(this.levelFilter)??1/0:1/0;for(const[t,n]of this.groups){const s=this.levelZ.get(this.groupLevel.get(t)??"")??-1/0,r=this.roofIds.has(t);n.visible=s<=e&&!(r&&(!this.roofVisible||this.levelFilter!=null))}this.invalidate()}fitHome(){const e=new ni;for(const r of this.groups.values())e.expandByObject(r);if(e.isEmpty())return;const t=e.getCenter(new L),n=Math.max(e.getSize(new L).length()/2,1),s=t.clone().add(new L(.95,.8,.95).normalize().multiplyScalar(n*2.3));this.camera.near=Math.max(n/200,.02),this.camera.far=n*40,this.camera.updateProjectionMatrix(),this.home={position:s,target:t},this.resetView()}resetView(){this.home||this.fitHome(),this.home&&(this.camera.position.copy(this.home.position),this.controls.target.copy(this.home.target),this.controls.update(),this.invalidate())}flash(e){const t=new Set;for(const n of e){const s=this.groups.get(n)??this.groups.get(this.openingWall.get(n)??"");s&&t.add(s)}for(const n of t){const s=[];n.traverse(r=>{const a=r.material;a instanceof gl&&(s.push({mat:a,prev:a.emissive.getHex()}),a.emissive.setHex(Dt.flash))}),setTimeout(()=>{for(const{mat:r,prev:a}of s)r.emissive.setHex(a);this.invalidate()},1500)}this.invalidate()}get walking(){return this.walk!=null}enterWalk(e,t,n){if(this.walk)return;const s=t??this.modelCenterXY(),r=(e.elevation+1600)*te,a=this.modelCenterXY(),o=Math.atan2(a[0]*te-s[0]*te,a[1]*te-s[1]*te)||0;this.walk={pos:new L(s[0]*te,s[1]*te,r),yaw:o,pitch:0,keys:new Set,...n?{onEnd:n}:{}},this.controls.enabled=!1,this.camera.fov=60,this.camera.updateProjectionMatrix(),this.renderer.domElement.requestPointerLock?.(),this.applyWalkCamera()}exitWalk(){if(!this.walk)return;const e=this.walk.onEnd;this.walk=null,document.pointerLockElement===this.renderer.domElement&&document.exitPointerLock(),this.controls.enabled=!0,this.camera.fov=45,this.camera.updateProjectionMatrix(),this.controls.update(),this.invalidate(),e?.()}modelCenterXY(){const e=new ni;for(const n of this.groups.values())e.expandByObject(n);if(e.isEmpty())return[0,0];const t=e.getCenter(new L);return[t.x/te,t.y/te]}onWalkKey(e,t){if(!this.walk)return;const n=e.key.toLowerCase();if(n==="escape"&&t){this.exitWalk();return}["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","shift"].includes(n)&&(t?this.walk.keys.add(n):this.walk.keys.delete(n),e.preventDefault())}onWalkLook(e){!this.walk||document.pointerLockElement!==this.renderer.domElement||(this.walk.yaw+=e.movementX*.0022,this.walk.pitch=Math.min(1.35,Math.max(-1.35,this.walk.pitch-e.movementY*.0022)),this.applyWalkCamera())}stepWalk(e){const t=this.walk;if(t.keys.size===0)return;const n=(t.keys.has("shift")?4.2:2.1)*e,s=[Math.sin(t.yaw),Math.cos(t.yaw)],r=[Math.cos(t.yaw),-Math.sin(t.yaw)];let a=0,o=0;(t.keys.has("w")||t.keys.has("arrowup"))&&(a+=s[0],o+=s[1]),(t.keys.has("s")||t.keys.has("arrowdown"))&&(a-=s[0],o-=s[1]),(t.keys.has("d")||t.keys.has("arrowright"))&&(a+=r[0],o+=r[1]),(t.keys.has("a")||t.keys.has("arrowleft"))&&(a-=r[0],o-=r[1]);const l=Math.hypot(a,o);l!==0&&(t.pos.x+=a/l*n,t.pos.y+=o/l*n,this.applyWalkCamera())}applyWalkCamera(){const e=this.walk;if(!e)return;this.root.updateWorldMatrix(!0,!1);const t=this.root.localToWorld(e.pos.clone()),n=new L(Math.sin(e.yaw)*Math.cos(e.pitch),Math.cos(e.yaw)*Math.cos(e.pitch),Math.sin(e.pitch)),s=this.root.localToWorld(e.pos.clone().add(n));this.camera.position.copy(t),this.camera.up.set(0,1,0),this.camera.lookAt(s),this.invalidate()}setSun(e){if(this.sunMode=e!=null,!e){this.renderer.shadowMap.enabled=!1,this.hemi.intensity=1.05,this.sun.intensity=.9,this.sun.castShadow=!1,this.sun.position.set(12,18,8),this.applyShadowFlags(!1),this.invalidate();return}const t=_x(e.hour,e.month,e.lat,e.north),n=t.altitude>0;this.renderer.shadowMap.enabled=n,this.hemi.intensity=n?.45:.22,this.sun.intensity=n?1.25:0,this.sun.castShadow=n;const s=40;this.sun.position.set(t.dir[0]*s,t.dir[2]*s,-t.dir[1]*s);const r=new ni;for(const l of this.groups.values())r.expandByObject(l);const a=r.isEmpty()?15:r.getSize(new L).length()/2+2,o=this.sun.shadow.camera;o.left=-a,o.right=a,o.top=a,o.bottom=-a,o.near=1,o.far=s*2+a,o.updateProjectionMatrix(),this.sun.shadow.mapSize.set(2048,2048),this.applyShadowFlags(n),this.invalidate()}applyShadowFlags(e){this.root.traverse(t=>{t.isMesh&&(t.castShadow=e,t.receiveShadow=e)})}capture(e){return this.root.updateWorldMatrix(!0,!1),e?.position&&this.camera.position.copy(this.toWorld(e.position)),e?.lookAt&&this.controls.target.copy(this.toWorld(e.lookAt)),(e?.position||e?.lookAt)&&this.controls.update(),this.renderer.render(this.scene,this.camera),this.renderer.domElement.toDataURL("image/png").split(",")[1]}toWorld([e,t,n]){return this.root.localToWorld(new L(e*te,t*te,n*te))}setGroup(e,t,n,s=!1){this.removeGroup(e),t.name=e,this.groups.set(e,t),n&&this.groupLevel.set(e,n),s&&this.roofIds.add(e),this.root.add(t),this.applyVisibility()}removeGroup(e){const t=this.groups.get(e);t&&(t.traverse(n=>{n.userData.door&&this.doorPivots.delete(n.userData.door)}),Yc(t),this.root.remove(t),this.groups.delete(e),this.groupLevel.delete(e),this.roofIds.delete(e))}}function Er(i,e){const t=new Yr(i.map(([n,s])=>new ee(n*te,s*te)));for(const n of e??[])t.holes.push(new Vo(n.map(([s,r])=>new ee(s*te,r*te))));return t}function Sx(i){let e=0,t=0;for(const[n,s]of i)e+=n,t+=s;return[e/i.length,t/i.length]}function Mx(i){if(!i.trim())return null;const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return null;const n="600 40px 'Be Vietnam Pro', 'Segoe UI', sans-serif";t.font=n;const s=Math.ceil(t.measureText(i).width)+24;e.width=s,e.height=56,t.font=n,t.fillStyle=Dt.label,t.textBaseline="middle",t.fillText(i,12,30);const r=new sp(new zu({map:new up(e),transparent:!0,depthWrite:!1})),a=Math.min(2.2,Math.max(.8,s/260));return r.scale.set(a,a*(56/s),1),r}function Yc(i){i.traverse(e=>{const t=e;t.geometry&&t.geometry.dispose();const n=t.material;if(Array.isArray(n))for(const s of n)s.dispose();else if(n){const s=n.map;s&&s.dispose(),n.dispose()}}),i.clear()}const $c={block:0,error:1,warn:2,info:3},rh=new Set(["thickness","width","height","offset","sill","elevation","tread","landing","rotation"]),bx={wall:[{key:"from",kind:"point"},{key:"to",kind:"point"},{key:"thickness",kind:"num"},{key:"height",kind:"num"}],opening:[{key:"offset",kind:"num"},{key:"width",kind:"num"},{key:"height",kind:"num"},{key:"sill",kind:"num"}],furniture:[{key:"at",kind:"point"},{key:"rotation",kind:"num"},{key:"elevation",kind:"num"}],room:[{key:"name",kind:"text"}],level:[{key:"name",kind:"text"},{key:"height",kind:"num"}]},Ot=i=>{const e=document.getElementById(i);if(!e)throw new Error(`Falta #${i} en index.html`);return e};class Ex{constructor(e,t={}){this.cb=e,this.readonly=t.readonly??!1;for(const n of document.querySelectorAll("[data-view-btn]"))n.addEventListener("click",()=>{for(const r of document.querySelectorAll("[data-view-btn]"))r.classList.remove("is-active");n.classList.add("is-active");const s=n.dataset.viewBtn;document.body.dataset.view=s,e.onView(s)});Ot("fit2d").addEventListener("click",()=>e.onFit2d()),Ot("reset3d").addEventListener("click",()=>e.onReset3d()),this.btnUndo.addEventListener("click",()=>e.onUndo()),this.btnRedo.addEventListener("click",()=>e.onRedo())}cb;projectName=Ot("project-name");levelTabs=Ot("level-tabs");revSeal=Ot("rev-seal");connDot=Ot("conn-dot");connText=Ot("conn-text");claudeCell=Ot("claude-note");issuesBody=Ot("issues-body");issuesCount=Ot("issues-count");propsBody=Ot("props-body");toasts=Ot("toasts");empty2d=Ot("empty2d");snapInput=Ot("snap-input");btnUndo=Ot("btn-undo");btnRedo=Ot("btn-redo");claudeTimer=null;readonly;snapGrid(){const e=Number(this.snapInput.value);return Number.isFinite(e)&&e>=0?Math.round(e):50}setUndoState(e,t){this.btnUndo.disabled=!e,this.btnRedo.disabled=!t}get propsBusy(){return this.propsBody.contains(document.activeElement)}setProject(e){this.projectName.textContent=e,document.title=`${e} — Arquitecto`,this.empty2d.hidden=!0}setConn(e){this.connDot.className=`dot ${e==="on"?"on":e==="off"?"off":""}`,this.connText.textContent=Ze(e==="on"?"conn.on":e==="connecting"?"conn.connecting":"conn.off")}setRevision(e,t){this.revSeal.textContent=`r ${e}`,t&&(this.revSeal.classList.remove("pulse"),this.revSeal.getBoundingClientRect(),this.revSeal.classList.add("pulse"))}setLevels(e,t){this.levelTabs.textContent="";for(const n of[...e].sort((s,r)=>s.elevation-r.elevation)){const s=document.createElement("button");s.className=`level-btn${n.id===t?" is-active":""}`,s.textContent=n.id,s.title=n.name,s.addEventListener("click",()=>this.cb.onLevel(n.id)),this.levelTabs.appendChild(s)}}setActiveLevel(e){for(const t of this.levelTabs.querySelectorAll(".level-btn"))t.classList.toggle("is-active",t.textContent===e)}setIssues(e){if(this.issuesCount.hidden=e.length===0,this.issuesCount.textContent=String(e.length),this.issuesBody.textContent="",e.length===0){const n=document.createElement("p");n.className="issue-ok",n.textContent=Ze("issues.clean"),this.issuesBody.appendChild(n);return}const t=[...e].sort((n,s)=>($c[n.severity]??9)-($c[s.severity]??9));for(const n of t){const s=document.createElement("button");s.className=`issue issue--${n.severity}`;const r=document.createElement("span");r.className="issue-rule",r.textContent=n.rule,s.appendChild(r),s.appendChild(document.createTextNode(n.message)),n.entities.length&&s.addEventListener("click",()=>this.cb.onIssueClick(n.entities)),this.issuesBody.appendChild(s)}}toast(e,t,n){for(;this.toasts.children.length>=4;)this.toasts.firstElementChild?.remove();const s=document.createElement("div");s.className=`toast${e==="user"?" toast--user":e==="reject"?" toast--reject":""}`;const r=document.createElement("div");r.className="toast-head";const a=document.createElement("span");if(a.className="toast-who",a.textContent=Ze(e==="claude"?"toast.claude":e==="user"?"toast.user":"toast.reject"),r.appendChild(a),n!=null){const l=document.createElement("span");l.className="toast-rev",l.textContent=`r ${n}`,r.appendChild(l)}s.appendChild(r);const o=document.createElement("div");o.className="toast-body",o.textContent=t,s.appendChild(o),this.toasts.appendChild(s),setTimeout(()=>{s.classList.add("leaving"),setTimeout(()=>s.remove(),260)},6e3)}claudeNote(e){this.claudeCell.textContent=`✎ ${e}`,this.claudeCell.classList.add("active"),this.claudeTimer!=null&&clearTimeout(this.claudeTimer),this.claudeTimer=window.setTimeout(()=>{this.claudeCell.textContent="—",this.claudeCell.classList.remove("active")},8e3)}showEntity(e,t){if(this.propsBody.textContent="",!e||!t){const l=document.createElement("p");l.className="panel-empty";const c=document.createElement("span");c.textContent=Ze("props.empty");const u=document.createElement("span");u.className="dim",u.textContent=Ze("props.empty.sub"),l.append(c,document.createElement("br"),u),this.propsBody.appendChild(l);return}const n=document.createElement("span");n.className="prop-id",n.textContent=`${Ze(`kind.${e.entity}`)} · ${t}`,this.propsBody.appendChild(n);const s=this.readonly?[]:bx[e.entity]??[],r=document.createElement("table");r.className="prop-table";const a=(l,c)=>{const u=document.createElement("tr"),h=document.createElement("th");h.textContent=l;const d=document.createElement("td");typeof c=="string"?d.textContent=c:d.appendChild(c),u.append(h,d),r.appendChild(u)},o=new Set;for(const l of s)o.add(l.key),a(l.key,this.buildEditor(e,t,l));for(const[l,c]of Object.entries(e.data)){if(l==="id"||c==null||o.has(l))continue;const u=Tx(l,c);u!=null&&a(l,u)}this.propsBody.appendChild(r)}buildEditor(e,t,n){const s=document.createElement("span");s.className="prop-edit";const r=e.data[n.key],a=(c,u)=>{const h=document.createElement("input");return h.className="prop-input",u&&(h.type="number",h.step="10"),h.value=c,h},o=()=>{if(n.kind==="point"){const[u,h]=s.querySelectorAll("input"),d=Number(u.value),f=Number(h.value),g=r;if(!Number.isFinite(d)||!Number.isFinite(f)||g&&Math.round(d)===g[0]&&Math.round(f)===g[1])return;this.cb.onPropEdit(e.entity,t,n.key,[Math.round(d),Math.round(f)]);return}const c=s.querySelector("input");if(n.kind==="num"){if(c.value.trim()==="")return;const u=Number(c.value);if(!Number.isFinite(u)||u===r)return;this.cb.onPropEdit(e.entity,t,n.key,Math.round(u));return}c.value!==r&&this.cb.onPropEdit(e.entity,t,n.key,c.value)},l=c=>{c.addEventListener("keydown",u=>{u.key==="Enter"&&(o(),c.blur()),u.stopPropagation()}),c.addEventListener("change",o)};if(n.kind==="point"){const c=r??[0,0],u=a(String(c[0]),!0),h=a(String(c[1]),!0);l(u),l(h),s.append(u,document.createTextNode(", "),h)}else{const c=a(r==null?"":String(r),n.kind==="num");n.kind==="num"&&rh.has(n.key)&&n.key!=="rotation"&&(c.placeholder="mm"),l(c),s.appendChild(c)}return s}}function Tx(i,e){return typeof e=="number"?rh.has(i)&&i!=="rotation"?`${e} mm`:String(e):typeof e=="string"||typeof e=="boolean"?String(e):Array.isArray(e)?e.length===2&&e.every(t=>typeof t=="number")?`${e[0]}, ${e[1]}`:`${e.length} elementos`:null}class wx{constructor(e,t=""){this.handlers=e,this.query=t}handlers;query;sock=null;lastRevision=null;session=null;retry=0;reconnectTimer=null;connect(){this.handlers.onConn(this.retry===0?"connecting":"off");const e=location.protocol==="https:"?"wss":"ws",t=new WebSocket(`${e}://${location.host}/ws${this.query}`);this.sock=t,t.onopen=()=>{this.retry=0,this.handlers.onConn("on"),this.send({type:"hello",clientKind:"browser",...this.lastRevision!=null?{lastRevision:this.lastRevision}:{},...this.session?{session:this.session}:{}})},t.onmessage=n=>{let s;try{s=JSON.parse(String(n.data))}catch{return}switch(s.type){case"snapshot":return this.lastRevision=s.revision,s.session&&(this.session=s.session),this.handlers.onSnapshot(s);case"patch":return this.lastRevision=s.revision,this.handlers.onPatch(s);case"validation":return this.handlers.onValidation(s);case"capture_request":return this.handlers.onCapture(s);case"reject":return this.handlers.onReject(s);default:return}},t.onclose=()=>{if(this.sock!==t)return;this.sock=null,this.handlers.onConn("off");const n=Math.min(1e3*2**this.retry,8e3);this.retry+=1,this.reconnectTimer=window.setTimeout(()=>this.connect(),n)},t.onerror=()=>t.close()}send(e){this.sock?.readyState===WebSocket.OPEN&&this.sock.send(JSON.stringify(e))}resync(){this.lastRevision=null,this.reconnectTimer!=null&&clearTimeout(this.reconnectTimer),this.sock?.close()}}const Ax={level:"levels",wall:"walls",opening:"openings",slab:"slabs",roof:"roofs",stair:"stairs",room:"rooms",furniture:"furniture"};function Cx(i,e,t){const n=Ax[e];return n?(i[n]??[]).find(s=>s.id===t)??null:e==="axis"?[...i.axes.x,...i.axes.y].find(s=>s.id===t)??null:e==="style"?i.styles.openings[t]??null:e==="finish"?i.finishes[t]??null:null}function Rx(i,e){const t=[];for(const n of[...e].reverse()){if(n.op==="add"){const r=n.data.id;if(typeof r!="string")return null;t.push({op:"delete",entity:n.entity,id:r});continue}const s=Cx(i,n.entity,n.id);if(!s)return null;if(n.op==="update"){const r={};for(const a of Object.keys(n.data))if(a!=="id"){if(!(a in s))return null;r[a]=structuredClone(s[a])}t.push({op:"update",entity:n.entity,id:n.id,data:r});continue}if(t.push({op:"add",entity:n.entity,data:structuredClone(s)}),n.entity==="wall")for(const r of i.openings)r.wall===n.id&&t.push({op:"add",entity:"opening",data:structuredClone(r)})}return t}const Px=100;class Lx{undos=[];redos=[];push(e){this.undos.push(e),this.undos.length>Px&&this.undos.shift(),this.redos=[]}get canUndo(){return this.undos.length>0}get canRedo(){return this.redos.length>0}peekUndo(){return this.undos[this.undos.length-1]??null}peekRedo(){return this.redos[this.redos.length-1]??null}confirmUndo(){const e=this.undos.pop();e&&this.redos.push(e)}confirmRedo(){const e=this.redos.pop();e&&this.undos.push(e)}clear(){this.undos=[],this.redos=[]}}Od();const ah=location.pathname.startsWith("/xem/")?location.pathname.split("/")[2]??null:null,zs=ah!=null,qo=ah??new URLSearchParams(location.search).get("token"),oh=qo?`?token=${encodeURIComponent(qo)}`:"",Le=new Pd,ii=new Lx,Rn=[];function bi(i,e,t){if(zs){Tt.toast("reject",Ze("toast.readonly"));return}if(!Le.model)return;let n=null;if(t==="edit"){const s=Rx(Le.model,i);n=s?{undo:s,redo:structuredClone(i),label:e}:null}Rn.push({ops:i,entry:n,kind:t}),si.send({type:"ops",baseRevision:Le.revision,ops:i,note:e})}function Vs(){Tt.setUndoState(ii.canUndo&&Rn.length===0,ii.canRedo&&Rn.length===0)}function lh(){if(Rn.length>0)return;const i=ii.peekUndo();i&&(bi(structuredClone(i.undo),Ze("note.undo",{label:i.label}),"undo"),Vs())}function ch(){if(Rn.length>0)return;const i=ii.peekRedo();i&&(bi(structuredClone(i.redo),Ze("note.redo",{label:i.label}),"redo"),Vs())}function Dx(){const i=Le.selection;if(!i||!Le.model)return;const e=Le.findEntity(i);if(e){if(!["wall","opening","furniture","room"].includes(e.entity)){Tt.toast("reject",Ze("toast.deleteUnsupported",{kind:Ze(`kind.${e.entity}`)}));return}bi([{op:"delete",entity:e.entity,id:i}],Ze("note.delete",{id:i}),"edit"),Le.select(null)}}const Tt=new Ex({onLevel:i=>Le.setLevel(i),onView:i=>Le.setView(i),onIssueClick:i=>{Wt.flash(i),Ut.flash(i);const e=i[0];e&&Le.select(e)},onFit2d:()=>Wt.fit(),onReset3d:()=>Ut.resetView(),onPropEdit:(i,e,t,n)=>{bi([{op:"update",entity:i,id:e,data:{[t]:n}}],Ze("note.prop",{id:e,field:t}),"edit")},onUndo:lh,onRedo:ch},{readonly:zs}),Wt=new Kd(document.getElementById("paper-viewport"),document.getElementById("paper"),{onSelect:i=>Le.select(i),getModel:()=>Le.model,getGrid:()=>Tt.snapGrid(),onDragIds:i=>si.send({type:"presence",draggingIds:i,tool:"V"}),onCommit:(i,e)=>bi([i],e,"edit"),readonly:zs,token:qo,onPlace:(i,e)=>{const t=Le.model;if(!t||!Le.activeLevel)return;const n=Hr(i),s=Eh(t,"F");bi([{op:"add",entity:"furniture",data:{id:s,level:Le.activeLevel,asset:i,at:e,rotation:0}}],Ze("note.place",{label:(Ei==="en"?n?.labelEn:n?.label)??i}),"edit")}}),Ut=new yx(document.getElementById("canvas3d")),si=new wx({onConn:i=>Tt.setConn(i),onSnapshot:i=>Le.setSnapshot(i),onPatch:i=>Le.applyPatch(i),onValidation:i=>Le.setValidation(i),onCapture:async i=>{try{const e=i.target==="3d"?Ut.capture(i.camera):await Wt.capture();si.send({type:"capture_result",requestId:i.requestId,png:e})}catch(e){si.send({type:"capture_result",requestId:i.requestId,error:e instanceof Error?e.message:String(e)})}},onReject:i=>{Rn.shift(),Wt.clearPreview(),Tt.toast("reject",i.errors.map(e=>e.message).join(" · ")||Ze("toast.rejectFallback")),Vs(),i.currentRevision>Le.revision&&si.resync()}},oh);Le.on("snapshot",({model:i})=>{Rn.length=0,ii.clear(),Vs(),Tt.setProject(i.meta.name),Tt.setRevision(i.meta.revision,!1),Tt.setLevels(i.levels,Le.activeLevel),Ut.setModel(i),Le.activeLevel&&Wt.show(Le.activeLevel,i.meta.revision)});Le.on("patch",({revision:i,ops:e,origin:t,note:n,summary:s,changedIds:r})=>{if(Tt.setRevision(i,!0),!Le.model)return;if(t==="user"&&Rn.length>0&&JSON.stringify(Rn[0].ops)===JSON.stringify(e)){const o=Rn.shift();o.kind==="edit"&&o.entry?ii.push(o.entry):o.kind==="undo"?ii.confirmUndo():o.kind==="redo"&&ii.confirmRedo(),Vs()}const a=Ut.applyOps(Le.model,e);if(Ut.flash(a),Le.activeLevel&&Wt.show(Le.activeLevel,i).then(()=>Wt.flash(r)),Tt.setLevels(Le.model.levels,Le.activeLevel),t==="claude"){const o=n??s??"actualización del modelo";Tt.toast("claude",o,i),Tt.claudeNote(o)}Le.selection&&r.includes(Le.selection)&&!Tt.propsBusy&&Tt.showEntity(Le.findEntity(Le.selection),Le.selection)});Le.on("validation",({issues:i})=>Tt.setIssues(i));Le.on("level",({level:i})=>{Tt.setActiveLevel(i),ys&&Ut.setLevelFilter(i),Wt.show(i,Le.revision)});Le.on("view",()=>{requestAnimationFrame(()=>{Wt.ensureFitted(),Ut.invalidate()})});Le.on("select",({id:i})=>{Tt.showEntity(i?Le.findEntity(i):null,i),Wt.setSelection(i),si.send({type:"presence",selection:i?[i]:[]}),i&&(Wt.flash([i]),Ut.flash([i]))});Le.on("resync",()=>si.resync());const xl=document.getElementById("tool-select"),Us=document.getElementById("tool-furniture"),Ns=new kd(document.getElementById("pane2d"),i=>{Wt.setPlacing(i),Us.classList.add("is-active"),xl.classList.remove("is-active")});function Gr(){Wt.setPlacing(null),Ns.hide(),Us.classList.remove("is-active"),xl.classList.add("is-active")}Us.addEventListener("click",()=>{if(Ns.visible){Gr();return}Ns.show(),Us.classList.add("is-active")});xl.addEventListener("click",Gr);function Ix(){const i=Le.selection;if(!i||!Le.model)return;const e=Le.model.furniture.find(t=>t.id===i);e&&bi([{op:"update",entity:"furniture",id:i,data:{rotation:(e.rotation+90)%360}}],Ze("note.rotate",{id:i}),"edit")}const Va=document.getElementById("walk3d"),jc=document.getElementById("sun3d"),Ux=document.getElementById("sun-controls"),uh=document.getElementById("sun-hour"),hh=document.getElementById("sun-month"),Nx=document.getElementById("sun-hour-val"),Fx=document.getElementById("sun-month-val"),Kc=document.getElementById("hint3d"),Ox=Ze("hint3d.orbit");function Bx(){const i=Le.model;if(!i||!Le.activeLevel)return;let e=null;for(const t of i.rooms){if(t.level!==Le.activeLevel||t.use==="gieng-troi")continue;const n=Ih(t.polygon);if(!e||n>e.area){const s=t.polygon.reduce((r,a)=>[r[0]+a[0],r[1]+a[1]],[0,0]);e={at:[s[0]/t.polygon.length,s[1]/t.polygon.length],area:n}}}return e?.at}Va.addEventListener("click",()=>{if(Ut.walking){Ut.exitWalk();return}const i=Le.model;if(!i)return;const e=i.levels.find(t=>t.id===Le.activeLevel)??i.levels[0];e&&(Ut.enterWalk(e,Bx(),()=>{Va.classList.remove("is-active"),Kc.textContent=Ox}),Va.classList.add("is-active"),Kc.textContent=Ze("walk.hint"))});const Zc=document.getElementById("doors3d");let Tr=!1;Zc.addEventListener("click",()=>{Tr=!Tr,Zc.classList.toggle("is-active",Tr),Ut.setDoorsOpen(Tr)});const Jc=document.getElementById("roof3d"),Qc=document.getElementById("levels3d");let wr=!1,ys=!1;Jc.addEventListener("click",()=>{wr=!wr,Jc.classList.toggle("is-active",wr),Ut.setRoofVisible(!wr)});Qc.addEventListener("click",()=>{ys=!ys,Qc.classList.toggle("is-active",ys),Ut.setLevelFilter(ys?Le.activeLevel:null)});let qi=!1;function yl(){if(!qi||!Le.model)return;const i=Number(uh.value),e=Number(hh.value);Nx.textContent=`${Math.floor(i)}:${i%1?"30":"00"}`,Fx.textContent=String(e),Ut.setSun({hour:i,month:e,lat:Le.model.brief?.dat?.vi_do??10.8,north:Le.model.site.north})}jc.addEventListener("click",()=>{qi=!qi,jc.classList.toggle("is-active",qi),Ux.hidden=!qi,qi?yl():Ut.setSun(null)});uh.addEventListener("input",yl);hh.addEventListener("input",yl);window.addEventListener("keydown",i=>{if(Wt.dragging)return;const e=i.target;if(!(e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable))){if(zs){i.key==="Escape"&&Le.select(null);return}(i.ctrlKey||i.metaKey)&&i.key.toLowerCase()==="z"&&!i.shiftKey?(i.preventDefault(),lh()):(i.ctrlKey||i.metaKey)&&(i.key.toLowerCase()==="y"||i.key.toLowerCase()==="z"&&i.shiftKey)?(i.preventDefault(),ch()):i.key==="Delete"?Dx():i.key.toLowerCase()==="r"&&!i.ctrlKey&&!i.metaKey?Ix():i.key==="5"?(Ns.show(),Us.classList.add("is-active")):i.key.toLowerCase()==="v"?Gr():i.key==="Escape"&&(Wt.placingAsset||Ns.visible?Gr():Le.select(null))}});const eu=document.getElementById("share-btn");if(zs){eu.hidden=!0;const i=document.createElement("span");i.className="view-badge",i.textContent=Ze("viewer.badge"),document.querySelector(".brand")?.appendChild(i);for(const e of document.querySelectorAll(".rail .tool"))e.disabled=!0,e.title=Ze("tool.locked");document.getElementById("snap-input").disabled=!0}else eu.addEventListener("click",async()=>{try{const i=await(await fetch(`/share${oh}`)).json();await navigator.clipboard.writeText(i.url),Tt.toast("user",Ze("share.copied",{url:i.url}))}catch{Tt.toast("reject",Ze("share.error"))}});const dh=document.getElementById("lang-btn");dh.textContent=Ei==="en"?"ES":"EN";dh.addEventListener("click",Bd);si.connect();
