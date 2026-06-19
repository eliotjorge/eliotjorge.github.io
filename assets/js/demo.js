function showDemoTab(button, targetId) {

    const container =
        button.closest('.demo-container');

    container
        .querySelectorAll('.demo-content')
        .forEach(el => {
            el.classList.remove('active');
        });

    container
        .querySelectorAll('.demo-tab')
        .forEach(el => {
            el.classList.remove('active');
        });

    document
        .getElementById(targetId)
        .classList.add('active');

    button.classList.add('active');
}