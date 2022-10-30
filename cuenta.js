function calcularSalario(){
	let nombre=(document.getElementById('nombre').value);
    let salarioBasico=parseFloat(document.getElementById('salarioBasico').value);
	let ingreso=(document.getElementById('ingreso').value);
    let horasExtras1=parseInt(document.getElementById('horasExtras1').value);
    let horasExtras2=parseInt(document.getElementById('horasExtras2').value);
    let feriados1=parseInt(document.getElementById('feriados1').value);
    let feriados2=parseInt(document.getElementById('feriados2').value);
	let ausencias1=parseInt(document.getElementById('ausencias1').value);
	let	ausenciasJustificadas1=parseInt(document.getElementById('ausenciasJustificadas1').value);
	let	ausencias2=parseInt(document.getElementById('ausencias2').value);
	let	ausenciasJustificadas2=parseInt(document.getElementById('ausenciasJustificadas2').value);
	
	let valorHora=salarioBasico/176;
	let ausencias = ausencias1 + ausencias2;
	ausencias1 = (valorHora * 8) * ausencias1;
	ausencias2 = (valorHora * 4) * ausencias2;
	salarioBasico = salarioBasico - ausencias1;
	salarioBasico = salarioBasico - ausencias2;

	let ausenciasJustificadas = 0
	ausenciasJustificadas1 = (valorHora * 8) * ausenciasJustificadas1;
	ausenciasJustificadas2 = (valorHora * 4) * ausenciasJustificadas2;
	ausenciasJustificadas = ausenciasJustificadas1 + ausenciasJustificadas2;

	let horasExtras = 0;
	horasExtras1 = (valorHora * 1.5) * horasExtras1;
	horasExtras2 = (valorHora * 2) * horasExtras2;
	horasExtras =+ horasExtras1 + horasExtras2;

	let feriados = 0;
	feriados1 = (valorHora * 8) * feriados1;
	feriados2 = (valorHora * 4) * feriados2;
	feriados =+ feriados1 + feriados2
	
	let presentismo = 0;
	if (ausencias == 0)
		presentismo =+ (salarioBasico + horasExtras + feriados) * 0.25;
	else if (ausencias == 1)
		presentismo =+ (salarioBasico + horasExtras + feriados) * 0.2;
	else if (ausencias == 2)
		presentismo =+ (salarioBasico + horasExtras + feriados) * 0.15;
	else if (ausencias == 3)
		presentismo =+ (salarioBasico + horasExtras + feriados) * 0.1;
	else if (ausencias == 4)
		presentismo =+ (salarioBasico + horasExtras + feriados) * 0.05;
	
	let productividad = 0
	productividad =+ (salarioBasico + horasExtras + feriados) * 0.1;

	let salarioBruto = 0;
	salarioBruto =+ salarioBasico + horasExtras + feriados + presentismo + productividad;

	let jubilacion = 0;
	jubilacion =+ salarioBruto * 0.11;

	let obraSocial = 0;
	obraSocial =+ salarioBruto * 0.03;

	let ley = 0;
	ley =+ salarioBruto * 0.03;

	let retenciones = 0;
	retenciones =+ jubilacion + obraSocial + ley;

	let salarioNeto = 0;
	salarioNeto =+ salarioBruto - retenciones;
	
	let fechaIngreso = new Date(ingreso)
	const calcularAntiguedad1 = (ingreso) =>{
		const fechaActual = new Date();
		const anioActual = parseInt(fechaActual.getFullYear());
		const mesActual = parseInt(fechaActual.getMonth()) + 1;
		const diaActual = parseInt(fechaActual.getDate());
		
		const anioIngreso = parseInt(ingreso.getFullYear());
		const mesIngreso = parseInt(ingreso.getMonth() + 1);
		const diaIngreso = parseInt(ingreso.getDate());

		let anioAntiguedad = anioActual - anioIngreso
		if (mesActual < mesIngreso) {
			antiguedad--;
		}
		else if (mesActual == mesIngreso){
			if (diaActual < diaIngreso){
				antiguedad--;
			}
		}
		return anioAntiguedad;
	};
	const calcularAntiguedad2 = (ingreso) =>{
		const fechaActual = new Date();
		const mesActual = parseInt(fechaActual.getMonth()) + 1;
		const diaActual = parseInt(fechaActual.getDate());
		
		const mesIngreso = parseInt(ingreso.getMonth() + 1);
		const diaIngreso = parseInt(ingreso.getDate());

		let mesAntiguedad = mesActual - mesIngreso
		if (diaActual < diaIngreso){
			mesAntiguedad--;
		}
		return mesAntiguedad;
	};

	let diasVacaciones = 0;
	if (calcularAntiguedad1(fechaIngreso) >= 20) {
		diasVacaciones =+ 35
	}
	else if (calcularAntiguedad1(fechaIngreso) >= 10 && calcularAntiguedad1(fechaIngreso) < 20){
		diasVacaciones =+ 28
	}
	else if (calcularAntiguedad1(fechaIngreso) >= 5 && calcularAntiguedad1(fechaIngreso) < 10){
		diasVacaciones =+ 21
	}
	else if (calcularAntiguedad1(fechaIngreso) < 5){
		if (calcularAntiguedad1(fechaIngreso) == 0 && calcularAntiguedad2(fechaIngreso) < 6){
			diasVacaciones =+ calcularAntiguedad2(fechaIngreso)
		}
		else {
			diasVacaciones =+ 14
		}
	}
	
	let salarioVacaciones = 0;
	salarioVacaciones =+ salarioBasico / 22 * 1.10 * 1.25 * diasVacaciones;

	let aguinaldo = 0;
	aguinaldo =+ salarioBruto / 2

	imprimirRecibo(
		nombre,
		ingreso,
		salarioBasico,
		ausenciasJustificadas,
		horasExtras,
		feriados,
		presentismo,
		productividad,
		jubilacion,
		obraSocial,
		ley,
		salarioBruto,
		retenciones,
		salarioNeto,
		diasVacaciones,
		salarioVacaciones,
		aguinaldo
	);
}

function imprimirRecibo(id1,id2,id3,id4,id5,id6,id7,id8,id9,id10,id11,id12,id13,id14,id15,id16,id17){
	document.querySelector('#reciboNombre').innerHTML=id1;
	document.querySelector('#reciboIngreso').innerHTML=id2;
	document.querySelector('#reciboSalarioBasico').innerHTML=id3.toFixed(2);
	document.querySelector('#reciboAusenciasJustificadas').innerHTML=id4.toFixed(2);
	document.querySelector('#reciboHorasExtras').innerHTML=id5.toFixed(2);
	document.querySelector('#reciboFeriados').innerHTML=id6.toFixed(2);
	document.querySelector('#reciboPresentismo').innerHTML=id7.toFixed(2);
	document.querySelector('#reciboProductividad').innerHTML=id8.toFixed(2);
	document.querySelector('#reciboJubilacion').innerHTML=id9.toFixed(2);
	document.querySelector('#reciboObraSocial').innerHTML=id10.toFixed(2);
	document.querySelector('#reciboLey').innerHTML=id11.toFixed(2);
	document.querySelector('#reciboSalarioBruto').innerHTML=id12.toFixed(2);
	document.querySelector('#reciboRetenciones').innerHTML=id13.toFixed(2);
	document.querySelector('#reciboSalarioNeto').innerHTML=id14.toFixed(2);
	document.querySelector('#reciboDiasVacaciones').innerHTML=id15;
	document.querySelector('#reciboSalarioVacaciones').innerHTML=id16.toFixed(2);
	document.querySelector('#reciboAguinaldo').innerHTML=id17.toFixed(2);
	document.querySelector('#recibo').classList.remove("d-none");
}