/*==================================================
=               PLAYGROUND v1.0                    =
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".playground").forEach(initPlayground);

});

function initPlayground(playground){

    const buttons = playground.querySelectorAll(".playground-btn");
    const panels = playground.querySelectorAll(".playground-panel");

    /*=============================
    =            TABS             =
    =============================*/

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>btn.classList.remove("active"));

            panels.forEach(panel=>panel.classList.remove("active"));

            button.classList.add("active");

            const panel = playground.querySelector(
                `.playground-panel[data-panel="${button.dataset.target}"]`
            );

            if(panel){

                panel.classList.add("active");

            }

        });

    });

    /*=============================
    =            COPIAR           =
    =============================*/

    const copyButton = playground.querySelector(".playground-copy");

    copyButton.addEventListener("click",()=>{

        const active = playground.querySelector(".playground-panel.active");

        if(!active) return;

        navigator.clipboard.writeText(active.dataset.copy);

        //const old = copyButton.textContent;
        const old = "&lt;i class="fa-fw fas fa-copy"&gt;::before&lt;/i&gt;";

        copyButton.textContent="✔ Copiado";

        copyButton.disabled=true;

        setTimeout(()=>{

            copyButton.textContent=old;

            copyButton.disabled=false;

        },2000);

    });

    /*=============================
    =      ABRIR NUEVA PESTAÑA    =
    =============================*/

    const openButton = playground.querySelector(".playground-open");

    openButton.addEventListener("click",()=>{

        const result = playground.querySelector(
            '.playground-panel[data-panel="result"]'
        );

        if(!result) return;

        const html = result.dataset.copy;

        const blob = new Blob(

            [html],

            {type:"text/html"}

        );

        const url = URL.createObjectURL(blob);

        window.open(url,"_blank");

        setTimeout(()=>{

            URL.revokeObjectURL(url);

        },5000);

    });

};