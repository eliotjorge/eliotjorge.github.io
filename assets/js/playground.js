/*==================================================
=               PLAYGROUND v1.2                    =
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".playground")
        .forEach(initPlayground);

});


function initPlayground(playground) {

    const buttons = playground.querySelectorAll(".playground-btn");
    const panels = playground.querySelectorAll(".playground-panel");

    const copyButton = playground.querySelector(".playground-copy");
    const openButton = playground.querySelector(".playground-open");


    /*==================================================
    =                    HELPERS                       =
    ==================================================*/

    function getPanel(target) {

        return playground.querySelector(
            `.playground-panel[data-panel="${target}"]`
        );

    }


    function getPanelCopy(panel) {

        if (!panel) {
            return "";
        }

        /*
         * data-copy se utiliza para HTML, CSS, JavaScript,
         * PHP y el resultado completo.
         */
        if (panel.dataset.copy !== undefined) {

            return panel.dataset.copy;

        }

        /*
         * Las imágenes no tienen código copiable.
         */
        return "";

    }


    function setActiveTab(button) {

        if (!button) {
            return;
        }

        const target = button.dataset.target;
        const panel = getPanel(target);

        if (!panel) {
            return;
        }

        buttons.forEach(btn => {

            btn.classList.remove("active");

        });

        panels.forEach(currentPanel => {

            currentPanel.classList.remove("active");

        });

        button.classList.add("active");
        panel.classList.add("active");

        updateActions(target, panel);

    }


    function updateActions(target, panel) {

        /*
         * El botón de abrir solo tiene sentido para el resultado.
         */
        if (openButton) {

            openButton.hidden = target !== "result";

        }

        /*
         * La captura no tiene contenido copiable.
         */
        if (copyButton) {

            const copyContent = getPanelCopy(panel);
            const canCopy = copyContent.trim() !== "";

            copyButton.hidden = !canCopy;
            copyButton.disabled = !canCopy;

        }

    }


    function restoreCopyButton() {

        if (!copyButton) {
            return;
        }

        copyButton.innerHTML =
            '<i class="fa-fw fas fa-copy"></i>';

        copyButton.disabled = false;

    }


    /*==================================================
    =                     TABS                         =
    ==================================================*/

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            setActiveTab(button);

        });

    });


    /*
     * Si no existe una pestaña activa, se activa la primera.
     */
    let activeButton = playground.querySelector(
        ".playground-btn.active"
    );

    if (!activeButton || !getPanel(activeButton.dataset.target)) {

        activeButton = buttons[0];

    }

    if (activeButton) {

        setActiveTab(activeButton);

    }


    /*==================================================
    =                    COPIAR                         =
    ==================================================*/

    if (copyButton) {

        copyButton.addEventListener("click", async () => {

            const activePanel = playground.querySelector(
                ".playground-panel.active"
            );

            const content = getPanelCopy(activePanel);

            if (!content.trim()) {
                return;
            }

            try {

                await navigator.clipboard.writeText(content);

                copyButton.textContent = "✔ Copiado";
                copyButton.disabled = true;

                setTimeout(() => {

                    restoreCopyButton();

                }, 2000);

            } catch (error) {

                console.error(
                    "No se pudo copiar el contenido:",
                    error
                );

            }

        });

    }


    /*==================================================
    =               ABRIR RESULTADO                    =
    ==================================================*/

    if (openButton) {

        openButton.addEventListener("click", () => {

            const resultPanel = getPanel("result");

            if (!resultPanel) {
                return;
            }

            const html = getPanelCopy(resultPanel);

            if (!html.trim()) {
                return;
            }

            const blob = new Blob(

                [html],

                {
                    type: "text/html"
                }

            );

            const url = URL.createObjectURL(blob);

            window.open(url, "_blank");

            setTimeout(() => {

                URL.revokeObjectURL(url);

            }, 5000);

        });

    }

}