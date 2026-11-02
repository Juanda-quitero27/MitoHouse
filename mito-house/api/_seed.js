// Categorías (orden en la web) y platos base. Los base se cargan UNA vez en la base de datos
// (cada id es fijo: si borras uno, no vuelve a aparecer). Después todo se edita desde el admin.
const CATS = [
  ["entradas","Entradas","🍟"],["ceviches","Ceviches","🦐"],["pescados","Pescados y Mariscos","🐟"],
  ["pastas","Pastas","🍝"],["parrillas","Parrillas","🍖"],["cortes","Cortes de Carne","🥩"],
  ["gratinados","Gratinados","🍗"],["paellas","Paellas","🥘"],["brochetas","Brochetas","🍢"],
  ["hamburguesas","Hamburguesas","🍔"],["ensaladas","Ensaladas","🥗"],["kids","Kids","🍟"],
  ["cocteles","Cocteles House","🍹"],["micheladas","Micheladas","🍺"],["limonadas","Limonadas","🍋"],
  ["frapes","Frapés","🧊"],["sodas","Sodas","🥤"],["gaseosas","Bebidas Gaseosas","🥤"],
  ["cervezas","Cervezas","🍺"],["shots","Shots","🥃"],["licores","Nuestros Licores","🍾"]
].map(([id, n, e]) => ({ id, n, e }));

// IMPORTANTE: el orden de los primeros 19 (pastas..kids) no se debe cambiar: fija sus ids b1..b19.
const D = {
  pastas: [["Pasta Mito House","",55000,"🍝"],["Pasta con Lomo Saltado","",43000,"🥩"],["Pollo con Champiñón","",41500,"🍄"],["Pollo con Camarón","",43500,"🍤"],["Carbonara","",40000,"🥓"]],
  brochetas: [["Mariscos","",36000,"🦐"],["Chinchulla y Ubre","",33500,"🍢"],["Mixta","",33500,"🍢"],["Res","",33500,"🥩"],["Pollo","",33500,"🍗"]],
  ensaladas: [
    ["Ensalada de Mariscos","Lechuga fresca, tomate, aguacate, naranja, mango, camarón, calamar, pulpo, mejillón, almeja y queso parmesano.",43500,"🦑"],
    ["Ensalada César","Lechuga fresca, aderezo honey mustard, crotones, pollo al grill, maíz dulce, tocineta crunch y parmesano.",36000,"🥗"],
    ["Ensalada Salmón","Lechuga, salmón, aguacate, hinojo, semillas de sésamo, maní, parmesano, crotones y alcaparras.",46000,"🐟"]],
  hamburguesas: [
    ["Cucuteña","Croqueta de carne, pollo al grill, tocineta, chorizo, vegetales y papas fritas.",31500,"🍔"],
    ["La Llanera","Croqueta de res, brisket ahumado, chorizo, queso mozzarella, vegetales y papas fritas.",31500,"🍔"],
    ["Super House","Croqueta de carne, pollo y cerdo al grill, huevo frito, chorizo, brisket, aguacate, queso, vegetales y papas fritas.",48000,"🍔"]],
  kids: [["Mini Hamburguesa","",15000,"🍔"],["Mini Pincho","",15000,"🍢"],["Mini Salchipapa","",15000,"🍟"]],
  // ---- nuevos ----
  entradas: [["Plátanos con camarón","",19500],["Ceviche de chinchulla tropical","",18000],["Plátanos de ceviche de chicharrón","",18500],["Nachos","",25000],["Alitas BBQ","",22000],["Empanadas vallunas","",18000],["Porción de papa","",9000]],
  ceviches: [["Ceviche de Camarón","",48000],["Ceviche de Pulpo","",48000],["Ceviche de Mariscos","",48000],["Ceviche de Chicharrón","",42000]],
  pescados: [["Langosta","",145000],["Cazuela de mariscos","",43000],["Arroz Chaufa","",49000],["Cóctel de camarones","",41000],["Fideua marinero","",47000],["Róbalo marinero","",53500],["Salmón costa vasca","",55000],["Ronda marina","",65000]],
  parrillas: [["Parrilla Mar","Personal.",65000],["Parrilla Mar y Tierra","Personal.",65000],["Parrilla Argentina","Personal.",48000],["Parrilla Mar para 2","Para 2 personas.",145500],["Parrilla House para 2","Para 2 personas.",145500],["Parrilla Argentina para 2","Para 2 personas.",145500]],
  cortes: [["Ribeye 600 gr","",65000],["Tomahawk 900 gr","",80000],["New York Steak 400 gr","",49500],["Churrasco de Res 350 gr","",49000],["Churrasco de Pollo 350 gr","",49000],["Punta de Anca 350 gr","",49000],["Costillas de Cerdo","",49500]],
  gratinados: [["Pechuga gratinada con camarones","",50000],["Pechuga gratinada con champiñones","",49000],["Pechuga Cheese & Bacon","",49000],["Pechuga frutos del mar","",53000]],
  paellas: [["Paella Mediterránea","Personal.",47000],["Paella Sombra del Mar","Personal.",64000],["Paella Mediterránea para 2","Para 2 personas.",85000],["Paella Sombra del Mar para 2","Para 2 personas.",130000],["Paella de Langosta para 2","Para 2 personas.",150000]],
  cocteles: [
    ["Crema de Whisky House","Bitter de naranja, espolvoreado de cacao o canela.",24500],
    ["Cuba Libre","Ron dorado, dash de limón, Coca-Cola.",25000],
    ["Jamaica Beer","Maceración de mojito, tequila, bitter de naranja, vino tinto, infusión de flor de jamaica, cerveza Heineken.",28000],
    ["Sunrise Drink","Cítricos dulces, bitter de naranja, vodka, tequila, ron blanco, fondo de cereza. Bebida de amanecer, coctel ahumado.",28000],
    ["Corazón Rosa","Culis de frutos rojos, ginebra, ron blanco, cointreau, dash de jugo de cereza, dash de limón, bitter de naranja.",27000],
    ["Pasión Tamarindo","Tamarindo, dash de limón, tajín, tequila dorado, sal.",25000],
    ["Sex on the Beach","Ron blanco, ginebra, zumo de naranja, zumo de maracuyá, jarabe de goma, granadina.",29000],
    ["Mojitos","Clásico, fresa o maracuyá.",25000],
    ["Piña Colada","Zumo de piña, leche de coco, ron dorado, jarabe de goma.",31000],
    ["Daiquiri (fresa o maracuyá)","Dash de limón, jarabe de goma, ron blanco.",25000],
    ["Tinto Verano","Vino tinto, zumo de limón, zumo de naranja, triple sec, jarabe de goma.",26500],
    ["Romance Colombiano","Sandía, tamarindo, dash de limón, jarabe de goma, tajín, ron blanco.",25000],
    ["Lemon Pasión","Extracto de coco, limón, jarabe de goma, ron blanco, ginebra.",25000],
    ["Copa de Sangría","",26500]],
  micheladas: [["Michelada Corona","",13000],["Michelada Águila Light u Original","",12000],["Soda Michelada","",12000]],
  limonadas: ["Rosas","Sandía","Lichi","Frutos Amarillos","Hierbabuena","Frutos Rojos","Cerezada","Coco"].map(x => ["Limonada de " + x, "", 15000]),
  frapes: ["Mandarina","Maracuyá","Naranja","Limón"].map(x => ["Frapé de " + x, "", 10000]),
  sodas: ["Mango","Frutos Rojos","Rosas","Maracuyá","Michelada","Sandía"].map(x => ["Soda " + x, "", 15000]),
  gaseosas: [["Gaseosa 350 ml","",6000],["Soda","",5000],["Agua","",5500],["Hatsú","",12000],["Cola & Pola","",6000]],
  cervezas: [["Coronita","",8500],["Budweiser","",7000],["Smirnoff","",14000],["Águila Light y Original","",7000],["Heineken","",7500],["Club Colombia","",7000],["Stella Artois","",8500]],
  shots: [["Olpard 12 Años","",20000],["Bucanas 12 Años","",22000],["Aguardiente","",15000],["Ron","",15000],["Tequila","",20000],["Baileys","",20000],["Vocka Adsolut","",20000]],
  licores: [["Bucanas 12 Años Lt","",320000],["Bucanas 12 Años 750 ml","",270000],["Baileys Lt","",200000],["Baileys 750 ml","",153000],["Champaña Jp","",120000],["Champaña Lambrusco","",97000],["Vino Gato Negro","",125000],["Vino Casillero del Diablo","",125000],["Tequila José Cuervo","",220000],["Tequila Don Julio Reposado","",320000],["Tequila Don Julio Blanco","",300000],["Voka Adsolut","",217000],["Ginebra Beefeater","",240000],["Ginebra Tanqueray","",300000],["Ron Caldas Lt","",130000],["Ron Caldas 750 ml","",95000],["Aguardiente Lt","",135000],["Aguardiente 750 ml","",95000],["Sangría","",68000]]
};
const em = Object.fromEntries(CATS.map((c) => [c.id, c.e]));
let i = 0;
const BASE = Object.entries(D).flatMap(([c, list]) =>
  list.map(([n, d, p, e]) => { i++; return { id: "b" + i, c, n, d, p, e: e || em[c], img: "", t: i }; }));
module.exports = { CATS: CATS.map(({ id, n }) => ({ id, n })), BASE };
