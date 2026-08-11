/**
 * Content Explorer
 *
 * Extrae únicamente el contenido textual
 * de una página web utilizando nuestro
 * Cloudflare Worker como proxy.
 */


/* ============================================================
   CONFIGURATION
============================================================ */

// Cloudflare Worker
const WORKER_URL =
    "https://proxy.jorgerosa.dev/";

// API Key
//
// Para esta primera versión la dejamos aquí.
//
// IMPORTANTE:
// cualquier API Key incluida en JavaScript del
// navegador puede ser inspeccionada por el usuario.
//
// Como esta herramienta es privada y además
// el Worker comprueba el Origin/Referer,
// nos sirve para nuestro uso personal.
//
// Más adelante podemos mejorar esta parte.
const API_KEY =
    "jrtools_8Pq7LmX9vKs3N2aR5Fd8WhY1Bc6Te01992dWqFTsxA23DCF";


/* ============================================================
   DOM ELEMENTS
============================================================ */

const form =
    document.getElementById("explorer-form");

const urlInput =
    document.getElementById("url");

const analyzeButton =
    document.getElementById("analyze-button");

const progressContainer =
    document.getElementById("progress-container");

const progressText =
    document.getElementById("progress-text");

const progressPercent =
    document.getElementById("progress-percent");

const progressFill =
    document.getElementById("progress-fill");

const errorElement =
    document.getElementById("error");

const results =
    document.getElementById("results");

const finalUrlElement =
    document.getElementById("final-url");

const pageTitleElement =
    document.getElementById("page-title");

const contentResults =
    document.getElementById("content-results");

const resultCount =
    document.getElementById("result-count");

const statTotal =
    document.getElementById("stat-total");

const statWords =
    document.getElementById("stat-words");

const statCharacters =
    document.getElementById("stat-characters");

const statHeadings =
    document.getElementById("stat-headings");


/* ============================================================
   EXTRACTION CONFIGURATION
============================================================ */

/*
 * Estos son los elementos que vamos a considerar
 * contenido textual.
 *
 * No incluimos:
 *
 * - img
 * - script
 * - style
 * - noscript
 * - svg
 * - iframe
 * - video
 * - audio
 *
 * Tampoco utilizamos atributos como:
 *
 * - alt
 * - title
 * - href
 * - src
 * - aria-label
 * - data-*
 */
const EXTRACTION_TAGS = [

    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",

    "p",

    "li",

    "blockquote",

    "th",
    "td",

    "figcaption",

    "summary"

];


/* ============================================================
   FORM SUBMIT
============================================================ */

form.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const url =
            urlInput.value.trim();

        if (!url) {
            return;
        }

        await analyzePage(url);

    }
);


/* ============================================================
   ANALYZE PAGE
============================================================ */

async function analyzePage(url) {

    resetInterface();

    showProgress(
        10,
        "Validando URL..."
    );

    try {

        /*
         * Validamos primero la URL en el navegador.
         */
        validateUrl(url);


        /*
         * Construimos la URL del Worker.
         */
        const workerUrl =
            new URL(WORKER_URL);

        workerUrl.searchParams.set(
            "url",
            url
        );


        showProgress(
            20,
            "Descargando página..."
        );


        /*
         * Petición al Cloudflare Worker.
         */
        const response =
            await fetch(
                workerUrl.toString(),
                {
                    method: "GET",

                    headers: {
                        "X-API-Key": API_KEY
                    }
                }
            );


        /*
         * Si el Worker devuelve un error,
         * intentamos obtener su mensaje.
         */
        if (!response.ok) {

            let errorMessage =
                `Error HTTP ${response.status}`;

            try {

                const data =
                    await response.json();

                if (data.error) {
                    errorMessage =
                        data.error;
                }

            } catch {
                // No hacemos nada.
            }

            throw new Error(
                errorMessage
            );

        }


        showProgress(
            60,
            "Página descargada. Analizando HTML..."
        );


        /*
         * Obtenemos el HTML.
         */
        const html =
            await response.text();


        /*
         * URL final después de redirecciones.
         */
        const finalUrl =
            response.headers.get(
                "X-Final-URL"
            ) || url;


        showProgress(
            75,
            "Extrayendo contenido..."
        );


        /*
         * Analizamos el HTML.
         */
        const data =
            extractContent(
                html,
                finalUrl
            );


        showProgress(
            95,
            "Preparando resultados..."
        );


        /*
         * Mostramos resultados.
         */
        renderResults(data);


        showProgress(
            100,
            "Análisis completado"
        );


        /*
         * Esperamos un poco antes de
         * ocultar la barra.
         */
        setTimeout(
            () => {

                progressContainer.hidden =
                    true;

            },
            500
        );


    } catch (error) {

        console.error(
            "Content Explorer error:",
            error
        );

        showError(
            error.message
        );

        progressContainer.hidden =
            true;

    } finally {

        analyzeButton.disabled =
            false;

        analyzeButton.textContent =
            "Analizar página";

    }

}


/* ============================================================
   VALIDATE URL
============================================================ */

function validateUrl(url) {

    let parsedUrl;

    try {

        parsedUrl =
            new URL(url);

    } catch {

        throw new Error(
            "La URL introducida no es válida."
        );

    }


    if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
    ) {

        throw new Error(
            "La URL debe utilizar HTTP o HTTPS."
        );

    }

}


/* ============================================================
   EXTRACT CONTENT
============================================================ */

function extractContent(
    html,
    url
) {

    /*
     * DOMParser convierte el HTML recibido
     * en un documento que podemos consultar.
     */
    const parser =
        new DOMParser();

    const document =
        parser.parseFromString(
            html,
            "text/html"
        );


    /*
     * Eliminamos elementos que no queremos
     * procesar.
     *
     * Aunque nuestro selector posterior
     * ya evita la mayoría, esto hace que el
     * DOM sea más limpio.
     */
    document
        .querySelectorAll(
            "script, style, noscript, svg, iframe, template"
        )
        .forEach(
            element => element.remove()
        );


    /*
     * TITLE
     *
     * document.title utiliza el contenido
     * del elemento <title>, no un atributo.
     */
    const title =
        cleanText(
            document.title
        );


    /*
     * Elementos de contenido.
     */
    const elements = [];


    /*
     * Recorremos únicamente los tags
     * definidos en EXTRACTION_TAGS.
     */
    for (
        const tag of EXTRACTION_TAGS
    ) {

        const nodes =
            document.querySelectorAll(
                tag
            );


        nodes.forEach(
            (node) => {

                const text =
                    cleanText(
                        node.textContent
                    );


                /*
                 * Ignoramos elementos vacíos.
                 */
                if (!text) {
                    return;
                }


                /*
                 * Guardamos únicamente:
                 *
                 * tag
                 * text
                 *
                 * No guardamos atributos.
                 */
                elements.push({

                    tag:
                        tag.toLowerCase(),

                    text

                });

            }
        );

    }


    /*
     * Estadísticas.
     */
    const statistics =
        calculateStatistics(
            title,
            elements
        );


    return {

        url,

        title,

        elements,

        statistics

    };

}


/* ============================================================
   CLEAN TEXT
============================================================ */

function cleanText(text) {

    if (!text) {
        return "";
    }


    /*
     * Normalizamos espacios y saltos
     * de línea.
     */
    return text
        .replace(/\s+/g, " ")
        .trim();

}


/* ============================================================
   STATISTICS
============================================================ */

function calculateStatistics(
    title,
    elements
) {

    /*
     * Unimos todo el contenido.
     */
    const allText =
        [
            title,
            ...elements.map(
                element => element.text
            )
        ]
        .filter(Boolean)
        .join(" ");


    /*
     * Palabras.
     */
    const words =
        allText
            .split(/\s+/)
            .filter(Boolean);


    /*
     * Número de headings.
     */
    const headings =
        elements.filter(
            element =>
                /^h[1-6]$/
                    .test(element.tag)
        ).length;


    return {

        totalElements:
            elements.length,

        words:
            words.length,

        characters:
            allText.length,

        headings

    };

}


/* ============================================================
   RENDER RESULTS
============================================================ */

function renderResults(data) {

    /*
     * Mostrar sección de resultados.
     */
    results.hidden =
        false;


    /*
     * URL final.
     */
    finalUrlElement.textContent =
        data.url;


    /*
     * TITLE.
     */
    pageTitleElement.textContent =
        data.title ||
        "(Sin título)";


    /*
     * Estadísticas.
     */
    statTotal.textContent =
        data.statistics.totalElements;

    statWords.textContent =
        data.statistics.words;

    statCharacters.textContent =
        data.statistics.characters;

    statHeadings.textContent =
        data.statistics.headings;


    /*
     * Número de resultados.
     */
    resultCount.textContent =
        `${data.elements.length} elementos`;


    /*
     * Limpiamos resultados anteriores.
     */
    contentResults.innerHTML =
        "";


    /*
     * Si no encontramos contenido.
     */
    if (
        data.elements.length === 0
    ) {

        contentResults.innerHTML =
            `
            <div class="empty-state">
                No se ha encontrado contenido textual.
            </div>
            `;

        return;

    }


    /*
     * Agrupamos por tag.
     */
    const groups =
        groupByTag(
            data.elements
        );


    /*
     * Orden de visualización.
     */
    const tagOrder = [

        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",

        "p",

        "li",

        "blockquote",

        "th",
        "td",

        "figcaption",

        "summary"

    ];


    for (
        const tag of tagOrder
    ) {

        if (!groups[tag]) {
            continue;
        }


        const group =
            createTagGroup(
                tag,
                groups[tag]
            );


        contentResults.appendChild(
            group
        );

    }

}


/* ============================================================
   GROUP BY TAG
============================================================ */

function groupByTag(elements) {

    const groups = {};


    for (
        const element of elements
    ) {

        if (!groups[element.tag]) {

            groups[element.tag] =
                [];

        }


        groups[element.tag]
            .push(element);

    }


    return groups;

}


/* ============================================================
   CREATE TAG GROUP
============================================================ */

function createTagGroup(
    tag,
    elements
) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "content-group";


    /*
     * Header del grupo.
     */
    const header =
        document.createElement(
            "div"
        );

    header.className =
        "content-group-header";


    const heading =
        document.createElement(
            "h3"
        );

    heading.textContent =
        `<${tag}>`;


    const count =
        document.createElement(
            "span"
        );

    count.className =
        "content-group-count";

    count.textContent =
        `${elements.length}`;


    header.appendChild(
        heading
    );

    header.appendChild(
        count
    );


    wrapper.appendChild(
        header
    );


    /*
     * Elementos.
     */
    const list =
        document.createElement(
            "div"
        );

    list.className =
        "content-group-list";


    elements.forEach(
        (element, index) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "content-item";


            /*
             * Índice.
             */
            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "content-item-number";

            number.textContent =
                index + 1;


            /*
             * Texto.
             */
            const text =
                document.createElement(
                    "div"
                );

            text.className =
                "content-item-text";

            text.textContent =
                element.text;


            item.appendChild(
                number
            );

            item.appendChild(
                text
            );


            list.appendChild(
                item
            );

        }
    );


    wrapper.appendChild(
        list
    );


    return wrapper;

}


/* ============================================================
   PROGRESS
============================================================ */

function showProgress(
    percentage,
    message
) {

    progressContainer.hidden =
        false;


    progressText.textContent =
        message;


    progressPercent.textContent =
        `${percentage}%`;


    progressFill.style.width =
        `${percentage}%`;


    analyzeButton.disabled =
        true;


    analyzeButton.textContent =
        "Analizando...";

}


/* ============================================================
   ERROR
============================================================ */

function showError(message) {

    errorElement.textContent =
        message;

    errorElement.hidden =
        false;

}


/* ============================================================
   RESET INTERFACE
============================================================ */

function resetInterface() {

    errorElement.hidden =
        true;

    errorElement.textContent =
        "";

    results.hidden =
        true;

    contentResults.innerHTML =
        "";

    progressContainer.hidden =
        false;

    progressFill.style.width =
        "0%";

    progressPercent.textContent =
        "0%";

}