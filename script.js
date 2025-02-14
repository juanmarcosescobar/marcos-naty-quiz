// Seleccionamos elementos del HTML
const output = document.getElementById("output");
const input = document.getElementById("input");

// Lista de preguntas del juego
const preguntas = [
    {
        pregunta: "\n¿Dónde fue nuestra primera cita?",
        opciones: ["Metrobowl", "Cayala", "Pasos y Pedales"],
        respuestaCorrecta: "Cayala"
    },
    {
        pregunta: "\n¿Cuál es mi comida favorita",
        opciones: ["Pizza", "Hamburguesa", "Lasaña"],
        respuestaCorrecta: "Lasaña"
    },
    {
        pregunta: "\n¿Cuándo es mi cumpleaños?",
        opciones: ["13 de Abril", "24 de Junio", "14 de Abril"],
        respuestaCorrecta: "13 de Abril"
    },
    {
        pregunta: "\n¿Cuál es mi deporte favorito?",
        opciones: ["Fútbol", "Natación", "Basketball"],
        respuestaCorrecta: "Fútbol"
    },
    {
        pregunta: "\n¿A dónde me gustaría viajar primero?",
        opciones: ["Paris", "Argentina", "Barcelona"],
        respuestaCorrecta: "Barcelona"
    },
    {
        pregunta: "\n¿Cuál es mi película favorita?",
        opciones: ["Spiderman", "Interestelar", "Avengers"],
        respuestaCorrecta: "Interestelar"
    },
    {
        pregunta: "\n¿Cuál es mi canción favorita?",
        opciones: ["Highs & Lows", "Gone Gone Gone", "Novatos"],
        respuestaCorrecta: "Highs & Lows"
    },
    {
        pregunta: "\n¿Qué me hace sentir más feliz?",
        opciones: ["Estar en casa", "Salir con amigos", "Estar contigo"],
        respuestaCorrecta: "Estar contigo"
    },
    {
        pregunta: "\n¿Qué me gustaría aprender a hacer?",
        opciones: ["Tocar la guitarra", "Cocinar", "Fotografía"],
        respuestaCorrecta: "Cocinar"
    },
    {
        pregunta: "\n¿En qué fecha nos conocimos?",
        opciones: ["18/08/2018", "07/08/2021", "15/08/2019"],
        respuestaCorrecta: "18/08/2018"
    },
];

let preguntaActual = 0;
let puntos = 0;

// Mensaje inicial en la "terminal"
const mensajesInicio = [
    "Accediendo al sistema...\n",
    "Autenticando usuario...\n",
    "Bienvenida, Natalia Gatica. ❤️\n",
    "Para desbloquear tu misión secreta,\n",
    "Por favor responde estas preguntas de Marcos.\n",
    "\nIniciando desafío...\n"
];

// Función para escribir texto correctamente, acumulando el texto sin eliminar el anterior
let textoAcumulado = "";

function escribirTexto(texto, delay = 50, callback = null) {
    let i = 0;

    function escribir() {
        if (texto[i] === "\n") {
            textoAcumulado += "<br>";
        } else {
            textoAcumulado += texto[i];
        }

        output.innerHTML = textoAcumulado;

        // Desplazar hacia abajo automáticamente
        output.scrollTop = output.scrollHeight; // Esto asegura que siempre se vea el final del contenido

        i++;
        if (i < texto.length) {
            requestAnimationFrame(escribir);
        } else if (callback) {
            setTimeout(callback, 500);
        }
    }

    requestAnimationFrame(escribir);
}

// Mostrar mensajes de inicio
function iniciarJuego() {
    let delay = 0;
    mensajesInicio.forEach((msg, index) => {
        setTimeout(() => escribirTexto(msg), delay);
        delay += 1000;
    });
    setTimeout(hacerPregunta, delay);
}

// Mostrar una pregunta con opciones
function hacerPregunta() {
    if (preguntaActual < preguntas.length) {
        const pregunta = preguntas[preguntaActual];
        escribirTexto(`\nPregunta ${preguntaActual + 1}: ${pregunta.pregunta}\n`);

        setTimeout(() => {
            pregunta.opciones.forEach((opcion, index) => {
                const boton = document.createElement("button");
                boton.textContent = opcion;
                boton.classList.add("opcion");
                boton.onclick = () => verificarRespuesta(opcion);
                document.body.appendChild(boton);
            });
        }, 1000);
    } else {
        desbloquearMensaje();
    }
}

// Verificar la respuesta seleccionada
function verificarRespuesta(respuestaUsuario) {
    const pregunta = preguntas[preguntaActual];

    if (respuestaUsuario === pregunta.respuestaCorrecta) {
        puntos++;
        escribirTexto("✅ Correcto! +1 punto\n", 50, () => {
            preguntaActual++;
            limpiarOpciones();
            hacerPregunta();
        });
    } else {
        escribirTexto("❌ Incorrecto. Inténtalo de nuevo.\n", 50);
    }
}

// Limpiar las opciones de respuesta (botones)
function limpiarOpciones() {
    const botones = document.querySelectorAll(".opcion");
    botones.forEach(boton => boton.remove());
}

// Mensaje final al completar el juego
function desbloquearMensaje() {
    escribirTexto("\n¡Felicidades, Natalia! Has completado la misión. 😍🎉\n");
    setTimeout(() => {
        escribirTexto("\nAhora, la pregunta más importante...\n");
        setTimeout(() => {
            escribirTexto("\n¿Quieres ser mi Valentine? 🥹🙏🏻❣️\n", 50, () => {
                escribirTexto("\nEscribe 'si' para aceptar. 👀\n");
            });
        }, 2000);
    }, 2000);
}

// Capturar respuesta final
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && preguntaActual >= preguntas.length) {
        const respuestaFinal = input.value.trim().toLowerCase();
        input.value = "";

        if (respuestaFinal === "si") {
            escribirTexto("\n\n¡Sabía que dirías que sí! Te amo mi amor. ❤️");
        } else {
            escribirTexto("\n\nVamos, inténtalo de nuevo. ¡Di que sí porfaaa! 🙃💕");
        }
    }
});

// Iniciar el juego cuando cargue la página
window.onload = iniciarJuego;
